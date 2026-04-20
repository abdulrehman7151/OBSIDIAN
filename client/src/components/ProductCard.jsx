import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
const MAX_TILT = 10;

const ProductCard = ({ id, name, cat, price, old, r, rv, b, bt, img, cart, setcart }) => {
    const cardRef = useRef(null)
    const fullStars = Math.floor(r)
    const hasHalf = r % 1 >= 0.5
    const stars = '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0))

    const handleMouseMove = (e) => {
        const card = cardRef.current
        const { left, top, width, height } = card.getBoundingClientRect()
        const rotateY = (((e.clientX - left) / width) - 0.5) * 2 * MAX_TILT
        const rotateX = -(((e.clientY - top) / height) - 0.5) * 2 * MAX_TILT
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`
        card.style.boxShadow = `${-rotateY * 1.2}px ${rotateX * 1.2}px 30px rgba(0,0,0,0.18)`
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
        card.style.boxShadow = 'none'
        setTimeout(() => { card.style.transition = '' }, 500)
    }
    const handleCart = () => {
        const existingItemIndex = cart.findIndex(item => item.id === id);
        if (existingItemIndex >= 0) {
            const newCart = [...cart];
            newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1 };
            setcart(newCart);
        } else {
            setcart([...cart, { id, name, price, img, quantity: 1 }]);
        }
    }
    return (
        <div style={{ perspective: '800px' }}>
            <div
                className='product-card'
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
                <div className="product-image">
                    <img src={img} alt={name} />
                    {bt && <span className={`badge ${b}`}>{bt}</span>}

                    <div className="product-actions">
                        <button className="action-btn">♡</button>
                        <button className="action-btn">👁</button>
                        <button className="action-btn" onClick={handleCart}>🛒</button>
                    </div>

                    <div className="quick-add" onClick={handleCart}>+ Quick Add to Bag</div>
                </div>

                <div className="product-info">
                    <p className="product-category">{cat}</p>
                    <h2 className="product-name">{name}</h2>

                    <div className="product-rating">
                        <span className="stars">{stars}</span>
                        <span className="review-count">({rv})</span>
                    </div>

                    <div className="product-price">
                        <span className="price">{price}</span>
                        {old && <span className="old-price">{old}</span>}
                    </div>

                    <button className="add-to-bag" onClick={handleCart}>Add to Bag</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard