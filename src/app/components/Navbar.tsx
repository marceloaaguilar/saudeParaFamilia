import Image from "next/image"

export default function Navbar(){
    return (
        <nav className="bg-custom-blue">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image className='w-24' src='/logoCartaoSaudeDaFamilia.png' alt="Logo Saúde da Família" width={1920} height={1080}/>
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                        <a href="#" className="block py-2 px-3 text-white" aria-current="page">Início</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">Sobre Nós</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">Nossos Planos</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">Contato</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}