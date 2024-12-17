import Image from "next/image";
import Link from "next/link";

export default function Info(){

    return (
      <div className="flex flex-col md:flex-row md:mx-auto my-4 columns-1 md:columns-2 gap-10 items-center container px-5 justify-center w-full" id="about-us">
        <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-custom-blue text-3xl font-bold">Descubra o mundo de vantagens do clube que verdadeiramente pensa em você!</h3>
            <p className="text-black leading-10 text-lg my-2">Bem-vindo ao universo exclusivo de benefícios que o Cartão Saúde da Família oferece para você e sua família. Aqui, priorizamos o seu bem-estar e comodidade, proporcionando uma gama de vantagens para tornar sua vida mais fácil e segura através da telemedicina, assistência pet, assistência funeral, seguro de vida e clube de descontos.</p>
            <Link href="#cardPrices"  scroll={true}>
              <button className="bg-custom-blue hover:bg-custom-blue-dark text-white font-medium rounded px-10 h-10">Quero conhecer agora</button>
            </Link>
        </div>
        <div className="text-center md:text-left">
            <Image src='/familia.jpg' className="w-96 h-96 object-cover rounded-lg" alt="Banner de uma mulher com um cachorro" width={1920} height={1080}/>
        </div>
      </div>

    )


}