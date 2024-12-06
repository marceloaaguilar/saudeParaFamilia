'use client';
import { FaCheck } from "react-icons/fa";
import ModalAssinatura from "./ModalAssinatura/ModalAssinatura";
import { useState } from "react";

export default function CardPrices(){

  const [valorSimulacao, setValorSimulacao] = useState(0.00);
  const [statusModal, setStatusModal]       = useState<string>("hidden");
  const handleChangeModal = () => {
    setStatusModal("hidden")
}

  const HANDLE_CLICK_BUTTON = (plano:String) => {
    setValorSimulacao(plano === "saudeIndividual" ? 24.90 : 44.90);
    setStatusModal("");
  }


  return (
    <>
      <div className="container flex justify-center lg:px-0 px-5 mx-auto">
        <div className="max-w-5xl py-8 text-center">
          <p className="text-custom-blue text-xl my-3 tracking-widest">Nossos planos</p>
          <p className="text-black text-5xl font-bold my-4">Os melhores descontos no</p>
          <p className="text-custom-blue font-light text-5xl">Melhor Clube de Benefícios</p>

          <div className="grid md:grid-cols-2 my-8 justify-between gap-10">
            <div className="p-9 rounded-2xl border-gray-400 border text-left max-w-sm">
              <h4 className="text-black text-2xl">Saúde <strong className="text-custom-blue">Individual</strong></h4>
              <p className="text-gray-500">O plano ideal para quem valoriza a própria saúde e quer cuidar de si com qualidade e tranquilidade.</p>

              <div className="py-4">
                <p className="text-gray-500">A partir de</p>
                <div className="flex items-end gap-2">
                  <h4 className="text-5xl text-black font-bold">R$ 24.90</h4>
                  <p className="text-gray-500">por mês</p>
                </div>

                <button onClick={() => HANDLE_CLICK_BUTTON("saudeIndividual")} className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-5 py-2 my-4">Quero assinar</button> 
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Telemedicina</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Funeral</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Clube de Descontos</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Descontos em clínicas</p>
                </div>

              </div>
            </div>
  
            <div className="p-9 rounded-2xl border-gray-400 border text-left max-w-sm">
              <h4 className="text-black text-2xl">Clube <strong className="text-custom-blue">Smart</strong></h4>
              <p className="text-gray-500">O plano completo para proteger toda a sua família, oferecendo cuidado e segurança em cada momento.</p>

              <div className="py-4">
                <p className="text-gray-500">A partir de</p>

                <div className="flex items-end gap-2">
                  <h4 className="text-5xl text-black font-bold">R$ 44.90</h4>
                  <p className="text-gray-500">por mês</p>
                </div>

                <button onClick={() => HANDLE_CLICK_BUTTON("familiaCoberturaTotal")} className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-5 py-2 my-4">Quero assinar</button> 
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Telemedicina</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Funeral</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Clube de Descontos</p>
                </div>

                <div className="flex items-center gap-2">
                  <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                  <p className="text-black font-medium ">Descontos em clínicas</p>
                </div>

              </div>
            </div>
            
          </div>

        </div>


      </div>

      <ModalAssinatura status={statusModal} onChange={()=> handleChangeModal()} valor={valorSimulacao}/>

    </>
  )





}