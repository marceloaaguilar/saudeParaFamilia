import { useContext, useState, createContext, use, useEffect } from "react"
import { sendRequest } from "../../lib/sendRequest";
import { Assinatura, Cliente, ModalAssinaturaProps } from "../../interfaces/interfaces";
import { ClipLoader } from 'react-spinners';
import Lottie from 'lottie-react';
import successAnimation from './success-animation.json';
import errorAnimation from'./error-animation.json';

const ModalAssinatura: React.FC<ModalAssinaturaProps> = ({ status, onChange, valor }) => {
    const handleChange = (status:string) => {
      onChange(status); 
    };

    const [demonstraMsgCampoObrigatorio, setDemonstraMsgCampoObrigatorio] = useState<boolean>(false);
    const [demonstraFormDados, setDemonstraFormDados]       = useState<boolean>(true);
    const [demonstraFormEndereco, setDemonstraFormEndereco] = useState<boolean>(false);
    const [demonstraFormCartao, setDemonstraFormCartao]     = useState<boolean>(false);
    const [cepCliente, setCepCliente]                       = useState<string>('');
    const [enderecoCliente, setEnderecoCliente]             = useState<string>('');
    const [numeroCliente, setNumeroCliente]                 = useState<string>('');
    const [complementoCliente, setComplementoCliente]       = useState<string>('');
    const [bairroCliente, setBairroCliente]                 = useState<string>('');
    const [cidadeCliente, setCidadeCliente]                 = useState<string>('');
    const [estadoCliente, setEstadoCliente]                 = useState<string>('');
    const [numCartao, setNumCartao]                         = useState<string>();
    const [nomeClienteCartao, setNomeClienteCartao]         = useState<string>('');
    const [mesCartao, setMesCartao]                         = useState<string>();
    const [anoCartao, setAnoCartao]                         = useState<string>();
    const [cvvCartao, setCVVCartao]                         = useState<string>();
    const [cpfCliente, setCPFCliente]                       = useState<string>('');
    const [nomeCliente, setNomeCliente]                     = useState<string>('');
    const [dataNascimentoCliente, setDataNascimentoCliente] = useState<string>('');
    const [emailCliente, setEmailCliente]                   = useState<string>('');
    const [telefoneCliente, setTelefoneCliente]             = useState<string>('');
    const [idUsuario, setIdUsuario]                         = useState<string>('');
    const [userIpAddress, setUserIpAddress]                 = useState<string>('');
    const [demonstraMsgErro, setDemonstraMsgErro]           = useState<boolean>(false);
    const CYCLE_SUBSCRIPTION = "MONTHLY";

    const [statusCheckout, setStatus] = useState<'loading' | 'success' | 'error' | null>(null);
    
    const processaCobrancaCartao = async () => {
        
        setStatus('loading');
        setDemonstraMsgCampoObrigatorio(false);

        if (!numCartao || !nomeClienteCartao || !mesCartao || !anoCartao || !cvvCartao) {
            setDemonstraMsgCampoObrigatorio(true);
            return false;
        }

        const nowUtc = new Date();
        const date = new Date(nowUtc.getTime() - 3 * 60 * 60 * 1000);

        const enderecoIpUsuario = await obterEnderecoIPUsuario();
       
        if (enderecoIpUsuario) {
            setUserIpAddress(enderecoIpUsuario.ip);
        }  
        
        if (idUsuario) {

            const assinatura:Assinatura = {
                customer: idUsuario,
                billingType: 'CREDIT_CARD',
                value: valor,
                nextDueDate: date,
                cycle: CYCLE_SUBSCRIPTION,
                description: "Assinatura - Cartão Saúde da Família",
                remoteIp: userIpAddress,
                creditCard: {
                    holderName: nomeClienteCartao,
                    number:numCartao,
                    expiryMonth: mesCartao, 
                    expiryYear: anoCartao,
                    ccv: cvvCartao

                },
                creditCardHolderInfo: {
                    name: nomeClienteCartao,
                    email: emailCliente,
                    cpfCnpj: cpfCliente,
                    postalCode: cepCliente,
                    addressNumber: numeroCliente,
                    addressComplement: complementoCliente,
                    mobilePhone: telefoneCliente
                }
            }

            const cardBillingRequest = await sendRequest({
                url: `${process.env.NEXT_PUBLIC_ASAAS_URL}/subscription`,
                method: 'POST',
                data: assinatura
            }).then((response)=> {
                if (!response || response.status !== "ACTIVE") {
                    setStatus('error');
                    return;
                }

                setStatus('success');

            });
        }
        
    }

    const processaCriacaoCliente = async () => {

        setDemonstraMsgErro(false);
        const clienteExiste:Cliente = await verificarCadastroCliente();
        
        if (clienteExiste) {
            setIdUsuario(clienteExiste.id);
            return clienteExiste;
        };

        if (!nomeCliente || !cpfCliente || !telefoneCliente || !enderecoCliente || !numeroCliente || !complementoCliente || !bairroCliente || !cepCliente) {
            return false;
        }

        const responseCadastroCliente = await sendRequest({
            url: `${process.env.NEXT_PUBLIC_ASAAS_URL}/customer`,
            headers: {accept: 'application/json', 'content-type': 'application/json'},
            method: 'POST',
            data: JSON.stringify({
                name: nomeCliente
                ,cpfCnpj: cpfCliente
                ,email: emailCliente
                ,mobilePhone: telefoneCliente
                ,address: enderecoCliente
                ,addressNumber: numeroCliente
                ,complement: complementoCliente
                ,province: bairroCliente
                ,postalCode: cepCliente
            })
        });

        if (!responseCadastroCliente) {
            setDemonstraMsgErro(true);
            return false;
        }

        return true;
        
    }

    const buscaDadosCEP = async () => {

        const cepSemMascara:string = cepCliente.replace(/\D/g, '');

        if (cepCliente.length === 9) {
            try {
                const response = await sendRequest({
                    url: `${process.env.NEXT_PUBLIC_VIA_CEP_URL}/${cepCliente}/json`,
                    method: 'GET'
                });
                
                if(response){
                    setEnderecoCliente(response.logradouro)
                    setBairroCliente(response.bairro)
                    setCidadeCliente(response.localidade)
                    setEstadoCliente(response.uf)
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    useEffect(()=> {

        if (cepCliente) {
            formatarCep()
        }

        setEnderecoCliente('')
        setBairroCliente('')
        setCidadeCliente('')    
        setEstadoCliente('')
        buscaDadosCEP();
    },[cepCliente]);

    useEffect(()=> {

        if (cpfCliente) {
            formatarCpf();
        }

    }, [cpfCliente]);

    useEffect(() => {

        if (dataNascimentoCliente) {
            formatarData();
        }

    }, [dataNascimentoCliente]);

    useEffect(()=> {

        if (telefoneCliente) {
            formatarTelefone();
        }

    },[telefoneCliente])

    const formatarCpf = () => {

        setCPFCliente(cpfCliente.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        );
    };

    const formatarData = () => {
        setDataNascimentoCliente(dataNascimentoCliente.replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '$1/$2') 
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})\d+?$/, '$1')
        )
    };

    const formatarTelefone = () => {
        setTelefoneCliente(telefoneCliente.replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
        )
    }

    const processaDemonstracaoEndereco = async () => {

        setDemonstraMsgCampoObrigatorio(false);

        if (!cpfCliente || !nomeCliente || !dataNascimentoCliente || !emailCliente || !telefoneCliente) {
            setDemonstraMsgCampoObrigatorio(true);
            return false;
        }

        setDemonstraFormDados(false), 
        setDemonstraFormEndereco(true)
    }

    const verificarCadastroCliente = async () => {

        const clienteRequest = await sendRequest({
            url: `${process.env.NEXT_PUBLIC_ASAAS_URL}/customers?${cpfCliente}`,
            method: 'GET'
        });

        if (clienteRequest.data.length === 0) {
            return false
        }


        return clienteRequest.data[0];
    }

    const processaDemonstracaoDadosCartao = async () => {

        setDemonstraMsgErro(false);

        if (!cepCliente || !enderecoCliente || !numeroCliente || !bairroCliente || !cidadeCliente || !estadoCliente) {
            setDemonstraMsgCampoObrigatorio(true);
            return false;
        }

        const retornoCriacaoCliente = await processaCriacaoCliente();

        if (retornoCriacaoCliente){
            setDemonstraFormEndereco(false); 
            setDemonstraFormCartao(true);
        }

    }

    const obterEnderecoIPUsuario = async () => {
        const userIpAddress =  await sendRequest({
            url: `${process.env.NEXT_PUBLIC_IPIFY_URL}/?format=json`,
            method: 'GET',
        });

        return userIpAddress;
    }

    const formatarCep = async () => {

        const cepFormatado = cepCliente.replace(/\D/g, '') 
        .replace(/^(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);

        setCepCliente(cepFormatado);
    }

    return (
        <div id="default-modal" className={`${status} flex overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen`}>
            <div className="relative p-4 w-full max-w-2xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-white">
                    
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-black dark:text-black">
                            Assinar Clube Personalizado
                        </h3>
                        <button type="button" onClick={()=> handleChange("hidden")} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {demonstraFormDados ?
                        <form className="px-8 py-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">CPF</label>
                                <input type="text" id="cpf" name="cpf" value={cpfCliente} onChange={(e)=>setCPFCliente(e.target.value)} maxLength={14} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="000.000.000-00" />
                                {demonstraMsgCampoObrigatorio && !cpfCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O CPF é obrigatório</p> : '' }
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Nome Completo</label>
                                <input type="text" id="nome-completo" value={nomeCliente}  onChange={(e)=>setNomeCliente(e.target.value)} name="nome-completo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !nomeCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O Nome é obrigatório</p> : '' }
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Data de Nascimento (dd/mm/aa)</label>
                                <input type="text" id="data" name="data" maxLength={10} value={dataNascimentoCliente} onChange={(e)=>setDataNascimentoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="dd/mm/aaaa" />
                                {demonstraMsgCampoObrigatorio && !dataNascimentoCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">A data de nascimento é obrigatória</p> : '' }
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Email</label>
                                <input type="email"  id="email" name="email" value={emailCliente} onChange={(e)=>setEmailCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !emailCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O e-mail é obrigatório</p> : '' }
                                
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Telefone</label>
                                <input type="text" id="telefone" name="telefone" maxLength={15}  value={telefoneCliente} onChange={(e)=>setTelefoneCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="(00) 00000-0000" />
                                {demonstraMsgCampoObrigatorio && !telefoneCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O telefone é obrigatório</p> : '' }
                            </div>

                            <div>
                                <button type="button" onClick={processaDemonstracaoEndereco} className="w-full p-2 my-4 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                Próximo
                                </button>
                            </div>
                        </form> : ''
                    }

                    {demonstraFormEndereco ?
                        <form className="px-8 py-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">CEP</label>
                                <input type="text" id="cep" value={cepCliente} onChange={(e)=> setCepCliente(e.target.value)} name="cep" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="00000-000" />
                                {demonstraMsgCampoObrigatorio && !cepCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O CEP é obrigatório</p> : '' }
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Endereço</label>
                                <input type="text" id="endereco" value={enderecoCliente}  onChange={(e)=> setEnderecoCliente(e.target.value)} name="endereco" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !enderecoCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O Endereço é obrigatório</p> : '' }
                                
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Número</label>
                                <input type="text" id="numero" name="numero"  value={numeroCliente?.toString()}  onChange={(e)=> setNumeroCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !numeroCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O número é obrigatório</p> : '' }
                                
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Complemento</label>
                                <input type="text" id="complemento" name="complemento" value={complementoCliente}  onChange={(e)=> setComplementoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Bairro</label>
                                <input type="text" id="bairro" name="bairro" value={bairroCliente}  onChange={(e)=> setBairroCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !bairroCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O bairro é obrigatório</p> : '' }
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Cidade</label>
                                <input type="text" id="cidade" name="cidade" value={cidadeCliente}  onChange={(e)=> setCidadeCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !cidadeCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">A cidade é obrigatória</p> : '' }
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Estado</label>
                                <input type="text" id="estado" name="estado" value={estadoCliente}  onChange={(e)=> setEstadoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                                {demonstraMsgCampoObrigatorio && !estadoCliente ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">O estado é obrigatória</p> : '' }
                            </div>

                            <div className="mb-4">
                                {demonstraMsgErro ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">Ocorreu um erro ao processar os dados. Tente novamente</p> : '' }
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {setDemonstraFormEndereco(false), setDemonstraFormDados(true)}}
                                    className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark"
                                >
                                    Voltar
                                </button>
                                
                                <button type="button" onClick={() => processaDemonstracaoDadosCartao()} className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                    Próximo
                                </button>
                            </div>
                        </form>: ''
                    }

                    {demonstraFormCartao && statusCheckout === null ?
                        <form className="px-8 py-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Número do Cartão</label>
                                <input
                                    type="text"
                                    id="numero-cartao"
                                    name="numero-cartao"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    placeholder="1234 5678 9012 3456"
                                    value={numCartao}
                                    onChange={(e)=> setNumCartao(e.target.value)}
                                />
                                {demonstraMsgCampoObrigatorio && !numCartao ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">Número inválido</p> : '' }
                            </div>
                        
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Nome no Cartão</label>
                                <input
                                    type="text"
                                    id="nome-cartao"
                                    name="nome-cartao"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    placeholder="Nome Completo"
                                    value={nomeClienteCartao}
                                    onChange={(e)=> setNomeClienteCartao(e.target.value)}
                                />
                                {demonstraMsgCampoObrigatorio && !nomeClienteCartao ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">Nome inválido</p> : '' }
                            </div>
                        
                            <div className="mb-4 flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-black">Mês</label>
                                    <input
                                        type="number"
                                        id="mes"
                                        name="mes"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        placeholder="MM"
                                        maxLength={2}
                                        value={mesCartao?.toString()}
                                        onChange={(e)=> setMesCartao(e.target.value)}
                                    />
                                    {demonstraMsgCampoObrigatorio && !mesCartao ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">Mês inválido</p> : '' }
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-black">Ano</label>
                                    <input
                                        type="number"
                                        id="ano"
                                        name="ano"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        placeholder="AAAA"
                                        maxLength={4}
                                        value={anoCartao?.toString()}
                                        onChange={(e)=> setAnoCartao(e.target.value)}
                                    />
                                    {demonstraMsgCampoObrigatorio && !anoCartao ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">Ano inválido</p> : '' }
                                </div>
                            </div>
                        
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    placeholder="123"
                                    maxLength={3}
                                    value={cvvCartao?.toString()}
                                    onChange={(e)=> setCVVCartao(e.target.value)}
                                />
                                {demonstraMsgCampoObrigatorio && !cvvCartao ?  <p className="mt-2 text-sm text-red-600" v-if="$v.user.email.$error">CVV inválido</p> : '' }
                            </div>
                        
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {setDemonstraFormCartao(false), setDemonstraFormEndereco(true)}}
                                    className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark"
                                >
                                    Voltar
                                </button>
                                
                                <button
                                    type="button" onClick={processaCobrancaCartao} className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" >
                                    Assinar
                                </button>
                            </div>
                        </form> : ''
                    }

                    {statusCheckout === 'loading' && (
                        <div className="flex flex-col items-center py-20">
                            <ClipLoader color="black" size={50} /> 
                            <p className="text-black">Processando pagamento...</p>
                        </div>
                    )}

                    {statusCheckout === 'success' && (
                        <div className="flex flex-col items-center py-20">
                            <Lottie animationData={successAnimation} style={{ width: 100, height: 100 }} loop={false} />
                            <p className="text-green-600 text-center">Assinatura criada com sucesso!</p>
                        </div>
                    )}

                    {statusCheckout === 'error' && (
                        <div className="flex flex-col items-center py-20">
                            <Lottie animationData={errorAnimation} style={{ width: 100, height: 100 }} loop={false} />
                            <p className="mt-4 text-red-600 ">Erro ao criar a assinatura. Tente novamente.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )

}
export default ModalAssinatura;