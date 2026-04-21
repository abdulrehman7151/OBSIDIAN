import React from 'react'
import { useState, useEffect } from 'react';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';

const LandingPage = () => {

    const data = [
        { capsule: "EXCLUSIVE EDIT", line1: "BEYOND", line2: "ORDINARY", line3: "& PURE" },
        { capsule: "New SESSION SS-25", line1: "REGIN", line2: "FIRE", line3: "& SILK" },
        { capsule: "New Arrival", line1: "TIMELESS", line2: "POWER", line3: "& GRACE" },
    ];

    const images = [hero1, hero2, hero3];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);   // ← smooth text fade on slide change

    const goTo = (nextIndex) => {
        setFade(false);
        setTimeout(() => {
            setIndex(nextIndex);
            setFade(true);
        }, 250);
    };

    const handleLeft = () => goTo((index - 1 + data.length) % data.length);
    const handleRight = () => goTo((index + 1) % data.length);

    // Auto-advance every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            goTo((index + 1) % data.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [index]);

    return (
        <>

            <div
                className="landing-page"
                style={{
                    backgroundImage: `url(${images[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100%',
                    transition: 'background-image 0.6s ease-in-out',
                }}
            >
                <div className="left-glow-overlay" />

                <div
                    className="homepage-heading"
                    style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.25s ease' }}
                >
                    <span className="capsule">{data[index].capsule}</span>

                    <h1 className="line1">{data[index].line1}</h1>
                    <h1 className="line2">{data[index].line2}</h1>
                    <h2 className="line3">{data[index].line3}</h2>
                    <p>Fifteen pieces. Infinite possibilities. The capsule wardrobe of your dreams.</p>

                    <div className="shop-view-btn">
                        <button className="SHOP-NOW-BTN">SHOP NOW</button>
                        <button className="view-lookbook-btn">VIEW LOOKBOOK</button>
                    </div>

                    <div className="left-right-btn">
                        <button onClick={handleLeft}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="white" strokeWidth="1"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="20" y1="12" x2="4" y2="12" />
                                <polyline points="10 18 4 12 10 6" />
                            </svg>
                        </button>
                        <button onClick={handleRight}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="white" strokeWidth="1"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <polyline points="14 6 20 12 14 18" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Slide indicator dots ── */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                        {data.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    width: i === index ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: i === index ? '#5a6428' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'width 0.3s ease, background 0.3s ease',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Floating Product Cards - right side */}
                <div className="floating-cards" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                    <div className="floating-card card-1">
                        <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" alt="Leather Tote" />
                        <div className="floating-card-info">
                            <span className="floating-card-cat">Accessories</span>
                            <h4>Leather Tote Luxe</h4>
                            <p>$890</p>
                        </div>
                    </div>
                    <div className="floating-card card-2">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" alt="Silk Drape" />
                        <div className="floating-card-info">
                            <span className="floating-card-cat">Evening Wear</span>
                            <h4>Silk Evening Drape</h4>
                            <p>$1,280</p>
                        </div>
                    </div>
                    <div className="floating-card card-3">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" alt="Chelsea Boot" />
                        <div className="floating-card-info">
                            <span className="floating-card-cat">Footwear</span>
                            <h4>Suede Chelsea Boot</h4>
                            <p>$760</p>
                        </div>
                    </div>
                </div>
            </div>













        </>
    );
};

export default LandingPage;