import React, { useState, useEffect } from 'react';

const AddToCart = ({ open, setOpen, cart, setcart }) => {
    const handleClick = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (open) {
                setOpen(false);
            }
        };

        if (open) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [open, setOpen]);

    const updateQuantity = (index, delta) => {
        const newCart = [...cart];
        if ((newCart[index].quantity || 1) + delta > 0) {
            newCart[index] = { ...newCart[index], quantity: (newCart[index].quantity || 1) + delta };
            setcart(newCart);
        } else {
            newCart.splice(index, 1);
            setcart(newCart);
        }
    };

    return (
        <div className="cart-wrapper">
            <div 
                className="cart-overlay" 
                onClick={handleClick} 
                style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100vw', 
                    height: '100vh', 
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    zIndex: 998,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease'
                }}
            />
            <div className={`cart-panel ${open ? "active" : ""}`} style={{ zIndex: 999 }}>

                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={handleClick}>✕</button>
                </div>

                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.img} alt={item.name} />
                            <div className="cart-item-info">
                                <p className="item-name">{item.name}</p>
                                <span className="item-price">{item.price}</span>
                                <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                                    <button onClick={() => updateQuantity(index, -1)} style={{ width: '24px', height: '24px', cursor: 'pointer', border: '1px solid #e5e5e5', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.quantity || 1}</span>
                                    <button onClick={() => updateQuantity(index, 1)} style={{ width: '24px', height: '24px', cursor: 'pointer', border: '1px solid #e5e5e5', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                </div>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => {
                                    const newCart = [...cart];
                                    newCart.splice(index, 1);
                                    setcart(newCart);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {cart.length === 0 && (
                        <p style={{ textAlign: "center", padding: "20px" }}>Cart is empty</p>
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total</span>
                        <h3>${cart.reduce((total, item) => {
                            const priceString = item.price ? item.price.replace(/[\$,]/g, '') : "0";
                            const price = parseFloat(priceString);
                            return total + (price * (item.quantity || 1));
                        }, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                </div>

            </div>
        </div>
    );
};

export default AddToCart;