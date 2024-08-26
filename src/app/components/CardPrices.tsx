import { FaCheck } from "react-icons/fa";


export default function CardPrices(){
  return (
    <div className="container flex justify-center lg:px-0 px-5">
      <div className="max-w-6xl py-8 text-center">
        <p className="text-custom-blue text-xl my-3 tracking-widest">Nossos planos</p>
        <p className="text-black text-5xl font-bold my-4">Os melhores descontos no</p>
        <p className="text-custom-blue font-light text-5xl">Melhor Clube de Benefícios</p>

        <div className="grid md:grid-cols-3 gap-5 my-8">
          <div className="p-9 rounded-2xl border-gray-400 border text-left">
            <h4 className="text-black text-2xl">Clube <strong className="text-custom-blue">Basic</strong></h4>
            <p className="text-gray-500">O Clube perfeito para você que busca economia e não abre mão dos melhores descontos.</p>

            <div className="py-4">
              <p className="text-gray-500">A partir de</p>

              <div className="flex items-end gap-2">
                <h4 className="text-5xl text-black font-bold">R$ 37.90</h4>
                <p className="text-gray-500">por mês</p>
              </div>

              <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-5 py-2 my-4">Quero conhecer agora</button> 
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Telemedicina</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Clube de Descontos</p>
              </div>
            </div>
          </div>
 
          <div className="p-9 rounded-2xl border-custom-blue border-4 text-left">
            <h4 className="text-black text-2xl">Clube <strong className="text-custom-blue">Premium</strong></h4>
            <p className="text-gray-500">Para você que não abre mão de ter o plano completo com benefícios e segurança.</p>

            <div className="py-4">
              <p className="text-gray-500">A partir de</p>

              <div className="flex items-end gap-2">
                <h4 className="text-5xl text-black font-bold">R$ 145.00</h4>
              </div>
                <p className="text-gray-500">por mês</p>

              <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-5 py-2 my-4">Quero conhecer agora</button> 
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Telemedicina</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Clube de Descontos</p>
              </div>
              
              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Assistência Pet</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Assistência Funeral</p>
              </div>
            </div>
          </div>

          <div className="p-9 rounded-2xl border-gray-400 border text-left">
            <h4 className="text-black text-2xl">Clube <strong className="text-custom-blue">Smart</strong></h4>
            <p className="text-gray-500">O Clube perfeito para você que busca economia mas quer um benefícios para seu querido Pet.</p>

            <div className="py-4">
              <p className="text-gray-500">A partir de</p>

              <div className="flex items-end gap-2">
                <h4 className="text-5xl text-black font-bold">R$ 65.00</h4>
                <p className="text-gray-500">por mês</p>
              </div>

              <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-5 py-2 my-4">Quero conhecer agora</button> 
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Telemedicina</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Clube de Descontos</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCheck className="bg-custom-blue text-2xl px-1 rounded-xl text-white"/> 
                <p className="text-black font-medium ">Assistência Pet</p>
              </div>
            </div>
          </div>
          
        </div>

      </div>


    </div>
  )





}