import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Clover as BoxingGlove, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { items } = useCartStore();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); 
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className={`my-4 px-6 py-4 rounded-[22px] transition-all duration-300 ${
          isScrolled ? 'bg-transparent' : 'bg-navy/80 backdrop-blur-md'
        }`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BoxingGlove className="h-8 w-8 text-gold" />
              <span className="text-xl font-bold tracking-tight">KNOCKOUT</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`hover:text-gold transition-colors duration-200 font-medium px-4 py-2 ${
                  location.pathname === '/' ? 'text-gold' : 'text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/customize" 
                className={`hover:text-gold transition-colors duration-200 font-medium px-4 py-2 ${
                  location.pathname === '/customize' ? 'text-gold' : 'text-white'
                }`}
              >
                Customize
              </Link>
              <Link 
                to="/about" 
                className={`hover:text-gold transition-colors duration-200 font-medium px-4 py-2 ${
                  location.pathname === '/about' ? 'text-gold' : 'text-white'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`hover:text-gold transition-colors duration-200 font-medium px-4 py-2 ${
                  location.pathname === '/contact' ? 'text-gold' : 'text-white'
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <Link 
                to="/account" 
                className="text-white hover:text-gold transition-colors duration-200"
              >
                <User className="h-6 w-6" />
              </Link>
              <Link 
                to="/cart" 
                className="text-white hover:text-gold transition-colors duration-200 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-gold transition-colors duration-200"
              >
                {isMenuOpen ? 
                  <X className="h-6 w-6" /> : 
                  <Menu className="h-6 w-6" />
                }
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-navy/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <nav className="flex flex-col items-center gap-6 p-6">
          <Link 
            to="/" 
            className={`text-xl hover:text-gold transition-colors duration-200 ${
              location.pathname === '/' ? 'text-gold' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/customize" 
            className={`text-xl hover:text-gold transition-colors duration-200 ${
              location.pathname === '/customize' ? 'text-gold' : 'text-white'
            }`}
          >
            Customize
          </Link>
          <Link 
            to="/about" 
            className={`text-xl hover:text-gold transition-colors duration-200 ${
              location.pathname === '/about' ? 'text-gold' : 'text-white'
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-xl hover:text-gold transition-colors duration-200 ${
              location.pathname === '/contact' ? 'text-gold' : 'text-white'
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;