import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl tracking-wide">
              Portfolio Bridge
            </Link>
          </div>

          {/* 메뉴 아이템들 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors px-3 py-2 text-sm font-medium">
              홈
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors px-3 py-2 text-sm font-medium">
              소개
            </Link>
            <Link to="/service" className="text-white/80 hover:text-white transition-colors px-3 py-2 text-sm font-medium">
              서비스
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors px-3 py-2 text-sm font-medium">
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 