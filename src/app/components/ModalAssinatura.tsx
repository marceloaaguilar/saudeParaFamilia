import { useContext, useState, createContext, use, useEffect } from "react"
import Simulador from "./Simulador";
import { stat } from "fs";
import { sendRequest } from "../lib/sendRequest";

  const ModalAssinatura: React.FC<ModalAssinaturaProps> = ({ status, onChange, valor }) => {
    const handleChange = (status:string) => {
      onChange(status); 
    };

    const [demonstraFormDados, setDemonstraFormDados]       = useState<boolean>(true);
    const [demonstraFormEndereco, setDemonstraFormEndereco] = useState<boolean>(false);
    const [demonstraFormCartao, setDemonstraFormCartao]     = useState<boolean>(false);
    const [cepCliente, setCepCliente]                       = useState<string>('');
    const [enderecoCliente, setEnderecoCliente]             = useState<string>('');
    const [numeroCliente, setNumeroCliente]                 = useState<Number>();
    const [complementoCliente, setComplementoCliente]       = useState<string>('');
    const [bairroCliente, setBairroCliente]                 = useState<string>('');
    const [cidadeCliente, setCidadeCliente]                 = useState<string>('');
    const [estadoCliente, setEstadoCliente]                 = useState<string>('');
    const [numCartao, setNumCartao]                         = useState<Number>();
    const [nomeClienteCartao, setNomeClienteCartao]         = useState<string>('');
    const [anoCartao, setAnoCartao]                         = useState<Number>();
    const [cvvCartao, setCVVCartao]                         = useState<Number>();
    const [cpfCliente, setCPFCliente]                       = useState<string>('');
    const [nomeCliente, setNomeCliente]                     = useState<string>('');
    const [dataNascimentoCliente, setDataNascimentoCliente] = useState<string>('');
    const [emailCliente, setEmailCliente]                   = useState<string>('');
    const [telefoneCliente, setTelefoneCliente]             = useState<string>('');

    const processaCobrancaCartao = () => {
        
    }

    const processaCriacaoCliente = async () => {
        const response = await sendRequest({
            url: `${process.env.NEXT_PUBLIC_ASAAS_CLIENT_URL}`,
            headers: {accept: 'application/json', 'content-type': 'application/json', 'access_token': `$${process.env.NEXT_PUBLIC_ASAAS_API_TOKEN}==`, 'User-Agent': 'teste'},
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
        })

        console.log(response);
    }


    const buscaDadosCEP = async () => {
        if (cepCliente.length === 8) {
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
        setEnderecoCliente('')
        setBairroCliente('')
        setCidadeCliente('')
        setEstadoCliente('')
        buscaDadosCEP();
    },[cepCliente])

    return (
        <div id="default-modal" aria-hidden="true" className={`${status} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen`}>
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
                                <input type="text" id="cpf" name="cpf" value={cpfCliente} onChange={(e)=>setCPFCliente(e.target.value)} maxLength={11} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="000.000.000-00" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Nome Completo</label>
                                <input type="text" id="nome-completo" value={nomeCliente}  onChange={(e)=>setNomeCliente(e.target.value)} name="nome-completo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>

                            <div className="mb-4">
                                <label  className="block text-sm font-medium text-black">Data de Nascimento (dd/mm/aa)</label>
                                <input type="text" id="data" name="data" value={dataNascimentoCliente} onChange={(e)=>setDataNascimentoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="dd/mm/aa" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Email</label>
                                <input type="email" id="email" name="email" value={emailCliente} onChange={(e)=>setEmailCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Telefone</label>
                                <input type="text" id="telefone" name="telefone"  value={telefoneCliente} onChange={(e)=>setTelefoneCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" placeholder="(00) 00000-0000" />
                            </div>

                            <div>
                                <button type="submit" onClick={() => {setDemonstraFormDados(false), setDemonstraFormEndereco(true)}} className="w-full p-2 my-4 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
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
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Endereço</label>
                                <input type="text" id="endereco" value={enderecoCliente}  onChange={(e)=> setEnderecoCliente(e.target.value)} name="endereco" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Número</label>
                                <input type="text" id="numero" name="numero"  value={numeroCliente?.toString()}  onChange={(e)=> setNumeroCliente(parseInt(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Complemento</label>
                                <input type="text" id="complemento" name="complemento" value={complementoCliente}  onChange={(e)=> setComplementoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Bairro</label>
                                <input type="text" id="bairro" name="bairro" value={bairroCliente}  onChange={(e)=> setBairroCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Cidade</label>
                                <input type="text" id="cidade" name="cidade" value={cidadeCliente}  onChange={(e)=> setCidadeCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Estado</label>
                                <input type="text" id="estado" name="estado" value={estadoCliente}  onChange={(e)=> setEstadoCliente(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
                            </div>
                            
                            <div>
                               
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {setDemonstraFormEndereco(false), setDemonstraFormDados(true)}}
                                    className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark"
                                >
                                    Voltar
                                </button>
                                
                                <button type="submit" onClick={() => {setDemonstraFormEndereco(false), setDemonstraFormCartao(true), processaCriacaoCliente()}} className="w-full p-2 bg-custom-blue text-white font-semibold rounded-md shadow-md hover:bg-custom-blue-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                    Próximo
                                </button>
                            </div>
                        </form>: ''
                    }

                    {demonstraFormCartao ?
                        <form className="px-8 py-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Número do Cartão</label>
                                <input
                                    type="text"
                                    id="numero-cartao"
                                    name="numero-cartao"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    placeholder="1234 5678 9012 3456"
                                    value={numCartao?.toString()}
                                    onChange={(e)=> setNumCartao(parseInt(e.target.value))}
                                />
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
                            </div>
                        
                            <div className="mb-4 flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-black">Mês</label>
                                    <input
                                        type="text"
                                        id="mes"
                                        name="mes"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        placeholder="MM"
                                        maxLength={2}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-black">Ano</label>
                                    <input
                                        type="text"
                                        id="ano"
                                        name="ano"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                        placeholder="AAAA"
                                        maxLength={4}
                                        value={anoCartao?.toString()}
                                        onChange={(e)=> setAnoCartao(parseInt(e.target.value))}
                                    />
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
                                    onChange={(e)=> setCVVCartao(parseInt(e.target.value))}
                                />
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
                </div>
            </div>
        </div>
    )

}
export default ModalAssinatura;