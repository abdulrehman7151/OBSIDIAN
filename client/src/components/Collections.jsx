import React from 'react'

const Collections = () => {
    const COLLS = [
        { id: 1, eye: "SS 2025", title: "The Evening Collection", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80" },
        { id: 2, eye: "Holiday", title: "Resort Luxe", img: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80" },
        { id: 3, eye: "Office Edit", title: "Power Suiting", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" },
        { id: 4, eye: "Fine Jewels", title: "The Jewellery Edit", img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80" },
        { id: 5, eye: "Weekend", title: "Casuals & Ease", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80" },
    ];

    const hero = COLLS[0];          // first item → big left card
    const sideCards = COLLS.slice(1);    // items 2-5  → right 2×2 grid

    return (
        <>
            <div className="collection-headings">
                <p>——— CURATED WORLDS</p>
                <h2>Step Into Our <br /><i>Collections</i></h2>
            </div>

            <div className="collections-banner">
                <div className="grid">

                    {/* ── Hero card (left, full-height) ── */}
                    <div
                        className="card hero"
                        style={{ backgroundImage: `url(${hero.img})` }}
                    >
                        <span className="eye-label">{hero.eye}</span>
                        <h3 className='hero-cards-heading'>{hero.title}</h3>
                        <a href="#">Shop Now ⟶</a>
                    </div>

                    {/* ── 2×2 grid on the right ── */}
                    <div className="right-side">
                        {sideCards.map((item) => (   // ✅ (item, index) — item first
                            <div
                                key={item.id}        // ✅ key on the outermost element
                                className="card"
                                style={{ backgroundImage: `url(${item.img})` }}
                            >
                                <span className="eye-label">{item.eye}</span>
                                <h3 className='card-heading'>{item.title}</h3>
                                <a href="#">Shop Now ⟶</a>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Collections