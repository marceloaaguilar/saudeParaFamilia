'use client'
import { useState } from "react"
import ModalAssinatura from "./ModalAssinatura";


export default function Simulador(){
    const [valorSimulacao, setValorSimulacao] = useState(0.00);
    const [qntDependentes, setQntDependentes] = useState(0);
    const [statusModal, setStatusModal]       = useState<string>("hidden");

    const processaAssinatura = () => {
        setStatusModal("");
    }

    const handleChangeModal = () => {
        setStatusModal("hidden")
    }

    const processaValorSimulacao = (valorSimulacao:Number) => {
        
        setValorSimulacao((prevValor) => prevValor + 37.90 * ( qntDependentes !== 0 ? qntDependentes : 1 ))
    }

    return (
        <div className="pb-10">
            <div className="flex justify-center">
                <div className="border px-5 py-5 my-5 justify-center lg:max-w-6xl w-full rounded-lg">
                    <div className="flex gap-2 text-2xl font-bold">
                        <h3 className="text-black">Clube</h3>  
                        <h3 className="text-custom-blue">Personalizado</h3>  
                    </div>
                    <p className="text-black">Que tal montar o Clube perfeito com o seu perfil?
                    Escolha os planos abaixo e aproveite!</p>
                    <div className="flex text-black items-end py-4">
                        <h3 className="text-5xl font-bold mr-2">R$ {valorSimulacao}</h3>
                        <p>por mês</p>
                    </div>
                    <div className="flex gap-2 my-4 flex-col lg:flex-row">
                        <button onClick={() => processaValorSimulacao(37.90)} className="bg-custom-blue hover:bg-custom-blue-dark focus:bg-custom-blue-dark text-white font-medium py-4 lg:px-10 px-2 rounded">
                            Telemedicina
                        </button> 
                        <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium py-4 lg:px-10 px-2 rounded">
                            Clube de descontos
                        </button>
                        <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium py-4 lg:px-10 px-2 rounded">
                            Assistência Pet
                        </button> 
                        <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium py-4 lg:px-10 px-2 rounded">
                            Seguro de vida
                        </button> 
                        <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium py-4 lg:px-12 px-2 rounded">
                            Assistência Funeral
                        </button> 
                    </div>
                    <div className="flex gap-2  flex-col lg:flex-row">
                        <div className="lg:max-w-5xl w-full flex flex-col gap-2 ">
                            <button className="bg-white border border-custom-blue text-custom-blue font-normal w-full rounded">
                                Adicionar Dependente
                            </button>

                            <div className="relative flex items-center w-full">
                                <button type="button" onClick={()=> qntDependentes > 0 ? setQntDependentes(qntDependentes -1) : 0} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-custom-blue hover:bg-custom-blue-dark border-gray-300 rounded-s-lg p-3 h-11">
                                    <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 h-11 text-center text-black text-sm border border-gray-400 w-full" placeholder="0" required value={qntDependentes} />
                                <button type="button" onClick={()=> setQntDependentes(qntDependentes + 1)} id="increment-button" data-input-counter-increment="quantity-input" className="bg-custom-blue hover:bg-custom-blue-dark  border-gray-300 rounded-e-lg p-3 h-11">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => processaAssinatura()} className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded lg:px-80 w-full h-20 lg:h-full">
                                Assinar agora
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
            <ModalAssinatura status={statusModal} onChange={()=> handleChangeModal()} valor={valorSimulacao}/>
        </div>
    )

}