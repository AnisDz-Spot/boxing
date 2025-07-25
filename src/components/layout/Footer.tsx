import React from 'react';
import { Link } from 'react-router-dom';
import { Clover as BoxingGlove, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy/80 backdrop-blur-sm pt-12 pb-6 section-with-ropes">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BoxingGlove className="h-8 w-8 text-gold" />
              <span className="text-xl font-bold tracking-tight">KNOCKOUT</span>
            </Link>
            <p className="text-neutral-400 mb-4">
              Create your perfect pair of boxing gloves with our custom 3D designer. Premium quality, tailored to your style.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
           
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/customize" className="text-neutral-400 hover:text-gold transition-colors">Custom Gloves</Link></li>
              <li><Link to="/products" className="text-neutral-400 hover:text-gold transition-colors">Pre-designed</Link></li>
              <li><Link to="/accessories" className="text-neutral-400 hover:text-gold transition-colors">Accessories</Link></li>
              <li><Link to="/gift-cards" className="text-neutral-400 hover:text-gold transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-400 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-neutral-400 hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-neutral-400 hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-neutral-400 hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link to="/sizing" className="text-neutral-400 hover:text-gold transition-colors">Sizing Guide</Link></li>
              <li><Link to="/shipping" className="text-neutral-400 hover:text-gold transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-neutral-400 hover:text-gold transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gold/20 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Knockout Custom Gloves. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-neutral-500 hover:text-gold text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-neutral-500 hover:text-gold text-sm transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="text-neutral-500 hover:text-gold text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;