'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-custom-blue">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image className="w-24" src="/logoCartaoSaudeDaFamilia.png" alt="Logo Saúde da Família" width={1920} height={1080} />
        </a>
        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center p-2 ml-3 text-sm text-white bg-transparent rounded-lg md:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded={isOpen ? 'true' : 'false'}>
          <svg className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className={`w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg bg-custom-blue md:bg-transparent md:p-0 md:mt-0 md:flex-row md:space-x-8 md:border-0">
            <li>
              <Link href="#"  scroll={true}>
                <span className="block py-2 px-3 text-white" aria-current="page">Início</span>
              </Link>
            </li>

            <li>
              <Link href="#about-us"  scroll={true}>
                <span className="block py-2 px-3 text-white" aria-current="page">Sobre nós</span>
              </Link>
            </li>

            <li>
              <Link href="#cardPrices"  scroll={true}>
                <span className="block py-2 px-3 text-white" aria-current="page">Nossos planos</span>
              </Link>
            </li>
            
            <li>
              <a href="https://www.hotsite.clubecerto.com.br/axisaude" target='_blank' className="block py-2 px-3 text-white">Descontos</a>
            </li>

            <li>
              <a href="https://www.saude.clubecerto.com.br/axisaude" target='_blank' className="block py-2 px-3 text-white">Telemedicina</a>
            </li>
            
            <li>
              <a href="#" className="block py-2 px-3 text-white">Contato</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
