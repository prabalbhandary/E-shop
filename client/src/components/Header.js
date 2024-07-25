import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.svg';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('user') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <header className={`${isActive ? 'bg-white p-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between'>
        <Link to={"/"}>
          <div>
            <img className='w-[40px]' src={Logo} alt='' />
          </div>
        </Link>
        {isLoggedIn ? (
          <>
            <div className='cursor-pointer flex relative'>
              <div onClick={handleClick} className='ml-2 cursor-pointer'>
                Logout
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='cursor-pointer flex relative'>
              <Link to='/signup'>Signup</Link>
            </div>
            <div className='cursor-pointer flex relative'>
              <Link to='/login'>Login</Link>
            </div>
          </>
        )}
        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
          <BsBag className='text-2xl' />
          <div className='absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white bg-red-500 rounded-full flex justify-center items-center'>
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
