import Image from "next/image"

export default function Info(){

    return (
      <div className="flex flex-col md:flex-row md:mx-10 my-4 columns-2 gap-10 items-center container px-5 justify-center">
        <div className="max-w-2xl">
            <h3 className="text-custom-blue text-3xl font-bold">Descubra o mundo de vantagens do clube que verdadeiramente pensa em você!</h3>
            <p className="text-black leading-10  text-lg my-2">Bem-vindo ao universo exclusivo de benefícios que o Cartão Saúde da Família oferece para você e sua família. Aqui, priorizamos o seu bem-estar e comodidade, proporcionando uma gama de vantagens para tornar sua vida mais fácil e segura através da telemedicina, assistência pet, assistência funeral, seguro de vida e clube de descontos.</p>     
            <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded  px-10 h-10">Quero conhecer agora</button> 
        </div>
        <div>
          <Image src='/familia.jpg' className="w-96 h-96 object-cover rounded-lg" alt="Banner de uma mulher com um cachorro" width={1920} height={1080}/>
        </div>

      </div>
    )


}