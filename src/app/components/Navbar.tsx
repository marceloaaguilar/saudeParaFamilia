export default function Navbar(){
    return (
        <nav className="bg-blue-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="logo-viva-bem-+.png" className="h-10" />
                </a>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li>
                        <a href="#" className="block py-2 px-3 text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">About</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">Services</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-3 text-white">Contact</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}