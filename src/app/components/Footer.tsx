import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer(){

    return(
      <footer className="bg-custom-blue text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div>
              <Image className='w-36 py-4' src='/logoCartaoSaudeDaFamilia.png' alt="Logo Saúde da Família" width={1920} height={1080}/>
              <p className="text-sm">
                A melhor solução em benefícios para você e sua família.
              </p>
            </div>
            {/* Links Rápidos */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
              <ul>
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Sobre Nós</a></li>
                <li><a href="#" className="hover:underline">Serviços</a></li>
                <li><a href="#" className="hover:underline">Contato</a></li>
              </ul>
            </div>
            {/* Endereço */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Endereço</h3>
              <p className="text-sm">
                Rua Exemplo, 123<br />
                Bairro Central<br />
                Cidade, Estado, CEP 12345-678
              </p>
            </div>
            {/* Redes Sociais e WhatsApp */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Siga-nos</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-gray-400"> <FaFacebookF className="h-6 w-6" /></a>
                <a href="#" className="hover:text-gray-400"><FaInstagram className="h-6 w-6" /></a>
                <a href="#" className="hover:text-gray-400"><FaLinkedinIn className="h-6 w-6" /></a>
                <a href="https://wa.me/5511999999999" className="flex items-center justify-center  text-white rounded-full" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="h-6 w-6 mr-2" /> </a>
              </div>
            </div>
          </div>
          {/* Rodapé */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
            <p>&copy; 2024 Cartão Saúde da Família. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    )

}