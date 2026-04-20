import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ open, setOpen, cart, searchQuery, setSearchQuery }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
        <nav style={{
            backgroundColor: isScrolled ? 'white' : 'transparent',
            boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.3s ease-in-out'
        }}>
            <div className="nav-heading">
                <h3>OBSIDIAN</h3>
            </div>

            <ul>
                <li><a href="#">COLLECTION</a></li>
                <li><a href="#">PRODUCTS</a></li>
                <li><a href="#">LOOKBOOK</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#">CONTACT</a></li>
            </ul>

            <div className="right-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="search-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {!isSearchOpen && (
                        <div
                            onClick={() => setIsSearchOpen(true)}
                            style={{ cursor: "pointer", fontSize: "1.2rem", paddingTop: "2px" }}
                        >
                            🔍
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery?.(e.target.value)}
                        onBlur={() => {
                            if (!searchQuery) setIsSearchOpen(false);
                        }}
                        ref={input => input && isSearchOpen && input.focus()}
                        style={{
                            padding: isSearchOpen ? '6px 12px 6px 30px' : '0px',
                            borderRadius: '20px',
                            border: isSearchOpen ? '1px solid #ccc' : 'none',
                            outline: 'none',
                            fontSize: '0.85rem',
                            width: isSearchOpen ? '200px' : '0px',
                            opacity: isSearchOpen ? 1 : 0,
                            background: isScrolled ? '#f8f8f8' : 'rgba(255,255,255,0.7)',
                            transition: 'all 0.3s ease',
                            pointerEvents: isSearchOpen ? 'auto' : 'none'
                        }}
                    />
                    <span
                        onClick={() => {
                            if (!searchQuery) setIsSearchOpen(false);
                        }}
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '0.9rem',
                            color: '#888',
                            opacity: isSearchOpen ? 1 : 0,
                            pointerEvents: isSearchOpen ? 'auto' : 'none',
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        🔍
                    </span>
                </div>
                {/* REMOVE routing, just use click */}
                <div onClick={handleClick} style={{ cursor: "pointer", position: "relative", display: "inline-block" }}>
                    <span style={{ fontSize: "1.2rem" }}>🛒</span>
                    {cart && cart.length > 0 && (
                        <span style={{ position: "absolute", top: "-8px", right: "-12px", background: "#5a6428", color: "white", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "bold" }}>
                            {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                        </span>
                    )}
                </div>
                <button className='members'>MEMBERS</button>
                <button className='menu' onClick={() => setIsMenuOpen(true)}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </nav>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
            <div 
                onClick={() => setIsMenuOpen(false)}
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 999 }}
            />
        )}

        {/* Mobile Menu Panel */}
        <div 
            className="mobile-menu"
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '300px',
                height: '100vh',
                backgroundColor: '#f8f8f8',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease',
                zIndex: 1000,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#5a6428', fontFamily: '"Playfair Display", serif' }}>Menu</h3>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#5a6428' }}
                >
                    ✕
                </button>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li><a href="#" className="mobile-link">COLLECTION</a></li>
                <li><a href="#" className="mobile-link">PRODUCTS</a></li>
                <li><a href="#" className="mobile-link">LOOKBOOK</a></li>
                <li><a href="#" className="mobile-link">ABOUT</a></li>
                <li><a href="#" className="mobile-link">CONTACT</a></li>
            </ul>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                <button className="mobile-login-btn">LOGIN</button>
                <button className="mobile-signup-btn">SIGN UP</button>
            </div>
        </div>
        </>
    );
};

export default NavBar;