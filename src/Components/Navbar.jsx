import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['Home', 'Practice', 'Play Online', 'Contact Us'];

    const navClasses = isOpen ? "flex flex-col" : "hidden";

    const openMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="bg-blue-500 px-2 py-2 md:justify-center md:item-center text-white">
                <div className=" container mx-auto flex justify-between">

                    <button className="hover:bg-white hover:bg-opacity-20 hover:border hover:border-white hover:border-2 md:hidden" onClick={openMenu}>


                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            {isOpen ? <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
                        </svg>
                    </button>

                    {/* Logo */}
                    <div>
                        <img src="" alt="" />
                        <div className="text-xl font-bold">Quest Gear</div>
                    </div>


                    {/* navigation links */}

                    <ul className={`hidden md:flex space-x-4`}>
                        {navItems.map((item) => {
                            return (
                                <li className="hover:bg-white hover:bg-opacity-50">
                                    <a href={`#${item}`}>{item}</a>
                                </li>

                            )
                        })}
                    </ul>

                    {/* Sign up buttons */}
                    <div>
                        <button className="m-1">Sign Up</button>
                        <button className="m-1">Login</button>
                    </div>


                </div>

                {isOpen &&
                    <ul className={`${navClasses} md:hidden`}>
                        {navItems.map((item) => {
                            return (
                                <li className="hover:bg-white hover:bg-opacity-20 hover:cursor-pointer w-full">
                                    <a href={'#' + item}>{item}</a>
                                </li>
                            )
                        })}
                    </ul>}
            </nav>
        </>
    )
}

export default Navbar;