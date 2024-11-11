import  { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
//import bwlogo from '../assests/baoswheelslogo.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed w-[100vw] flex items-center justify-center sms:justify-between sms:p-2 bg-baseprimary px-4 z-50 transition-all duration-300'>

          {/* Image compartment */}
          <div className="hidden lgs:flex mds:flex  items-center justify-center w-[20vw] h-auto">
            <h2 className='font-russoone text-primary text-2xl' style={{fontWeight:'600'}}>
              MediLink
            </h2>
          </div>
    

        {/* Menu item compartment */}
        <div className='hidden lgs:flex mds:flex  w-[60vw] items-center justify-center'>
            <ul className="flex items-center font-ibmplexsans text-primary text-lg space-x-8">
                {/* Use Link component for routing */}
                <li className="p-4 hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out">
                  <Link to="/" className='flex flex-col'>Home</Link>
                </li>
                <li className="p-4 hover:scale-110  cursor-pointer transition-transform duration-300 ease-in-out">
                  <Link to="/reviews">Services</Link>
                </li>
                <li className="p-4 hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out">
                  <Link to="/articles">Cancer Care</Link>
                </li>
                <li className="p-4 hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out">
                  <Link to="/about">IVF & Fertility</Link>
                </li>
              </ul>
        </div>

         {/* Login and Profile compartment */}
         <div className='hidden lgs:flex mds:flex w-[20vw] items-center justify-stretch'>
       
        </div>


      <div className="mds:hidden lgs:hidden items-end sms:pl-3" onClick={handleNav}>
           <h2 className='font-russoone text-primary text-2xl' style={{fontWeight:'600'}}>
              MediLink
            </h2>
      </div>

      <div className="mds:hidden lgs:hidden items-end" onClick={handleNav}>
        {nav ? <AiOutlineClose size={30} color="#FFFFFF" /> : <AiOutlineMenu size={30} color="#FFFFFF" />}
      </div>


      <div
        className={`fixed left-0 top-0 sms:w-[80vw] mds:w-[80vw] h-full border-r rounded-r-2xl border-r-gray-400 bg-baseprimary transition-transform duration-500 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="p-4 font-russoone text-primary items-center justify-center">
          <div className="flex items-center justify-center">
            
          </div>
          {/* Use Link component for mobile navigation */}
          <li className="p-4 border-b border-gray-600 text-center">
            <Link to="/" onClick={handleNav}>Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600 text-center">
            <Link to="/reviews" onClick={handleNav}>Reviews</Link>
          </li>
          <li className="p-4 border-b border-gray-600 text-center">
            <Link to="/articles" onClick={handleNav}>Articles</Link>
          </li>
          <li className="p-4 border-b border-gray-600 text-center">
            <Link to="/about" onClick={handleNav}>About</Link>
          </li>
        </ul>
        <div className='flex items-center justify-center p-4 gap-4'>
          <span className="text-gray-400 hover:text-primary transition-transform cursor-pointer">
          
          </span>
          <span className="text-gray-400 hover:text-primary transition-transform cursor-pointer">
            
          </span>
          <span className="text-gray-400 hover:text-primary transition-transform cursor-pointer">
        
          </span>
          <span className="text-gray-400 hover:text-primary transition-transform cursor-pointer">
          
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
