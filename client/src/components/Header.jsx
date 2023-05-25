import { NavLink } from "react-router-dom"
import { Avatar, Logo } from "../assets/index"
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux'

const Header = () => {

    const user = useSelector(state => state.user)

    return (
        <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6'>
            <NavLink to={'/'} className="flex items-center justify-center gap-4">
                <img src={Logo} alt="logo" className='w-6' />
                <p className='font-semibold text-xl'>Food Court</p>
            </NavLink>

            <nav className='flex items-center justify-center gap-8'>
                <ul className='hidden md:flex items-center justify-center gap-16'>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/'}>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/menu'}>Menu</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/services'}>Services</NavLink>
                    <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={'/about'}>About us</NavLink>
                </ul>
                <div className='relative cursor-pointer'>
                    <MdShoppingCart className='text-2xl text-textColor' />
                    <div className='w-4 h-4 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1 '>
                        <p className='text-white text-sm font-semibold'>2</p>
                    </div>
                </div>
                {user ? <>
                    <div className='relative cursor-pointer'>
                        <div className='w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                            <img src={user?.picture ? user?.picture : Avatar}
                                referrerPolicy='no-referrer'
                                alt="" className='w-full h-full object-cover' />
                        </div>

                    </div>
                </> : <>
                    <NavLink to={'/login'}>
                        <button className='px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer'>Login</button>
                    </NavLink>
                </>}
            </nav>
        </header>
    )
}

export default Header