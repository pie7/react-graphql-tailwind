import { createContext, useEffect, useContext } from 'react';
import useToggle from "../hooks/useToggle";
import { useKeydownEsc } from "../hooks/useKeydownEsc";

const NavbarContext = createContext(null)

const Hamburger = () =>
    <svg viewBox="0 0 100 80" className='fill-current w-6 h-6'>
        <rect width="100" height="20" rx="8"></rect>
        <rect y="30" width="100" height="20" rx="8"></rect>
        <rect y="60" width="100" height="20" rx="8"></rect>
    </svg>
const Close = () =>
    <svg
        className="w-6 h-6 fill-current stroke-2 stroke-current stork"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
    >
        <g strokeMiterlimit="10">
            <path d="m8.5 41.5 33-33M41.5 41.5l-33-33" />
        </g>
    </svg>

const DropDownSM = () => {
    const [isToggle, handleToggle] = useToggle()
    const { items} = useContext(NavbarContext)

    useKeydownEsc(handleToggle)
    return (
        <div className='ml-6 relative hidden sm:block'>
            <button
                className='relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-red-400'
                onClick={() => handleToggle(!isToggle)}
            >
                <img src="https://picsum.photos/300/300" alt="avatar" />
            </button>

            {isToggle &&
                <button className='w-full h-full fixed inset-0 bg-red-300 opacity-30 cursor-default cutter'
                    onClick={() => handleToggle(false)}
                    tabIndex={-1}
                />
            }
            {isToggle &&
                <div className='absolute right-0 bg-gray-200 rounded-lg py-2 w-48 mt-2 shadow-lg'>
                    {items.map((item, i) =>
                        <a className='block px-4 py-2 hover:bg-gray-500 hover:text-white'
                            href={item} key={`${item}-${i}`}>
                            {item}
                        </a>
                    )}
                </div>
            }

        </div>
    )
}


const DropDownMobile = () => {
    const [isToggle, handleToggle] = useToggle()
    const { items} = useContext(NavbarContext)
    return (
        <>
            <div className='border-t border-gray-300 mt-2'></div>
            <div className='sm:hidden'>
                <button
                    className='ml-2 mt-4 h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300'
                    onClick={() => handleToggle(!isToggle)}
                >
                    <img src="https://picsum.photos/300/300" alt="avatar" />
                </button>
                <div className=' text-white mt-1'>
                    {items.map((item, index) =>
                        <a
                            key={`${item}-${index}`}
                            className='block px-2 py-1 hover:bg-gray-500 hover:text-white'
                            href={item}
                        >
                            {item}
                        </a>
                    )}
                </div>
            </div>
        </>
    )
}

const Navbar = ({ items = [] }) => {
    const [isToggle, handleToggle] = useToggle()

    return (
        <header className='px-4 py-3 bg-black sm:flex sm:justify-between sm:items-center'>
            <div className='flex items-center justify-between'>
                {/* <div className='rounded-lg overflow-hidden'>
                    <img src="https://picsum.photos/64/64" alt="" />
                </div> */}
                <div className='sm:hidden'>
                    <button
                        type="button"
                        className='hover:text-gray-500 text-gray-300 focus:text-gray-500'
                        onClick={() => handleToggle(!isToggle)}
                    >
                        {isToggle ?
                            <Close />
                            :
                            <Hamburger />
                        }
                    </button>
                </div>
            </div>

            <header className={`text-white px-2 py-3 ${isToggle ? 'block' : 'hidden'} sm:flex sm:p-0 items-center`}>
                {items.map((item, index) =>
                    <a
                        key={`${item}-${index}`}
                        href={item}
                        className='block font-semibold hover:bg-gray-400 rounded px-2 py-1 mb-1 sm:mb-0 sm:ml-2 uppercase'
                    >
                        {item}
                    </a>
                )}
                <NavbarContext.Provider value={{items}}>
                    <DropDownSM />
                    {/* <DropDownMobile /> */}
                </NavbarContext.Provider>
            </header>

        </header>
    )
}
export default Navbar