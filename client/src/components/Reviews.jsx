import React, { useState, useEffect } from 'react';

const Reviews = () => {
    const TESTIMONIALS = [
        { q: "Absolutely breathtaking quality. Every piece I've received has been crafted with such precision — you can feel the luxury the moment you touch the fabric.", name: "Alexandra M.", role: "Fashion Editor, Paris", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", mark: `"` },
        { q: "I've shopped at every luxury retailer imaginable, and nothing compares. The curation here is extraordinary — each season is a work of art.", name: "Isabelle Chen", role: "Creative Director, London", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", mark: `"` },
        { q: "From the packaging to the garments themselves, every detail whispers excellence. This is luxury shopping reimagined for the discerning modern woman.", name: "Sophie Laurent", role: "Interior Designer, Milan", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", mark: `"` },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 3000); // change every 3 seconds

        return () => clearInterval(timer); // cleanup
    }, []);

    const current = TESTIMONIALS[index];

    return (
        <div className='review'>
            <div className="review-title">
                <p>--- Client Stories ---</p>
                <h1>What our clients </h1>
            </div>

            <div className="review-card fade">

                <h1 className='mark'>{current.mark}</h1>
                <h3>{current.q}</h3>

                <div className="dp">
                    <img src={current.img} alt={current.name} />
                </div>

                <p>{current.name}</p>
                <p className='role'>{current.role}</p>

                <div className="review-controls">
                    <button
                        className="review-btn"
                        onClick={() =>
                            setIndex((prev) =>
                                (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                            )
                        }
                    >
                        ←
                    </button>

                    <div className="review-dots">
                        {TESTIMONIALS.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === index ? "active" : ""}`}
                                onClick={() => setIndex(i)}
                            ></span>
                        ))}
                    </div>

                    <button
                        className="review-btn"
                        onClick={() =>
                            setIndex((prev) =>
                                (prev + 1) % TESTIMONIALS.length
                            )
                        }
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews