import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const currentUsername = useAppSelector(state => state.user.username)

    const navItems = ['Home', 'Practice', 'Play Online', 'Contact Us'];

    const navClasses = isOpen ? "flex flex-col" : "hidden";

    const openMenu = () => {
        setIsOpen(!isOpen);
    }

    const characters = useAppSelector(state => state.characters);
    const current = useAppSelector(state => state.current);


    return (
        <>
            <nav className="bg-blue-950 px-2 py-2 md:justify-center md:item-center text-white text-opacity-60 top-0 sticky">
                <div className=" container mx-auto flex justify-between">

                    <button className="hover:bg-white hover:bg-opacity-20 hover:border hover:border-white hover:border-2 md:hidden" onClick={openMenu}>


                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            {isOpen ? <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
                        </svg>
                    </button>

                    {/* Logo */}
                    <div>
                        <img src="" alt="" />
                        <NavLink to="/"><div className="text-xl text-white font-bold">Quest Gear</div></NavLink>

                    </div>


                    {/* navigation links */}

                    <ul className={`hidden md:flex md:items-center md:justify-center space-x-12`}>
                        {navItems.map((item) => {
                            return (
                                <NavLink to={item === "Home" ? "/" : `/${item}/${characters[current].name}`} className={({ isActive }) =>
                                    isActive ? "text-white p-1" : "hover:text-white p-1"
                                }>
                                    <li className=''>
                                        {item}
                                    </li>
                                </NavLink>

                            )
                        })}
                    </ul>

                    {/* Login */}
                    <div>

                        <button className="text-opacity-70 hover:text-white m-1">
                            <NavLink to={currentUsername ? "/profile" : "/login"} className={({ isActive }) =>
                                isActive ? "text-white p-1" : "hover:text-white p-1"
                            } >{currentUsername ? currentUsername : "Login"}</NavLink>
                        </button>
                    </div>


                </div>

                {isOpen &&
                    <ul className={`${navClasses} md:hidden`}>
                        {navItems.map((item) => {
                            return (
                                <NavLink to={item === "Home" ? "/" : `/${item}/${characters[current].name}`} className={({ isActive }) =>
                                    isActive ? "bg-white text-blue-500 rounded" : "hover:bg-white hover:bg-opacity-50 rounded"
                                }>
                                    <li className="hover:bg-white hover:bg-opacity-20 hover:cursor-pointer w-full">

                                        {item}

                                    </li>
                                </NavLink>
                            )
                        })}
                    </ul>}
            </nav >
        </>
    )
}

export default Navbar;