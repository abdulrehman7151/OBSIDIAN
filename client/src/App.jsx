import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import "./App.css"
import LandingPage from './components/LandingPage'
import ProductCard from './components/ProductCard'
import Collections from './components/Collections'
import Signature from './components/Signature'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import AddToCart from './components/AddToCart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import axios from 'axios'

const App = () => {


  const PRODUCTS = [
    { id: 1, name: "Silk Evening Drape", cat: "Evening Wear", price: "$1,280", old: "$1,680", r: 4.9, rv: 127, b: "new-in", bt: "New In", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" },
    { id: 2, name: "Cashmere Overcoat", cat: "Outerwear", price: "$2,450", r: 4.8, rv: 89, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80" },
    { id: 3, name: "Leather Tote Luxe", cat: "Accessories", price: "$890", old: "$1,100", r: 5.0, rv: 214, b: "sale", bt: "Sale", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
    { id: 4, name: "Merino Wrap Dress", cat: "Dresses", price: "$680", r: 4.7, rv: 156, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80" },
    { id: 5, name: "Velvet Blazer", cat: "Tailoring", price: "$1,150", r: 4.9, rv: 73, b: "new-in", bt: "New In", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80" },
    { id: 6, name: "Gold Cuff Bracelet", cat: "Jewellery", price: "$420", r: 4.8, rv: 301, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80" },
    { id: 7, name: "Suede Chelsea Boot", cat: "Footwear", price: "$760", old: "$940", r: 4.6, rv: 188, b: "sale", bt: "Sale", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
    { id: 8, name: "Linen Palazzo Set", cat: "Co-ords", price: "$520", r: 4.7, rv: 94, img: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=500&q=80" },
    { id: 9, name: "Diamond Drop Earrings", cat: "Fine Jewellery", price: "$3,200", r: 5.0, rv: 47, b: "new-in", bt: "New In", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80" },
    { id: 10, name: "Wide-Leg Trousers", cat: "Tailoring", price: "$640", r: 4.8, rv: 132, img: "https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&q=80" },
    { id: 11, name: "Angora Knit Cardigan", cat: "Knitwear", price: "$480", old: "$620", r: 4.7, rv: 200, b: "sale", bt: "Sale", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80" },
    { id: 12, name: "Structured Handbag", cat: "Accessories", price: "$1,640", r: 4.9, rv: 78, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80" },
  ];

  const [open, setOpen] = useState(false);
  const [cart, setcart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  // Fetch Cart from Backend
  const fetchCart = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setcart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  // Initial Load and Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      fetchCart(token);
    }
  }, []);

  // Sync Cart to Backend on Change
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user) {
      const syncCart = async () => {
        try {
          await axios.post('http://localhost:3000/api/cart/sync', 
            { items: cart },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error('Error syncing cart:', err);
        }
      };
      
      // Basic debounce to avoid too many requests
      const timeout = setTimeout(syncCart, 1000);
      return () => clearTimeout(timeout);
    }
  }, [cart, user]);

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* HOME PAGE */}
        <Route path="/" element={
          <>
            <div className="hero-section">
              <NavBar open={open} setOpen={setOpen} cart={cart} />
              <LandingPage />
              <AddToCart open={open} setOpen={setOpen} cart={cart} setcart={setcart} />
            </div>

            <div className="below-fold">
              <div className="product-upper-heading">
                <p>Trending Now</p>
                <h2>Most <i>Coveted</i><br />This season</h2>
                <p>Curated by our style team — the pieces our clients obsess over.</p>
              </div>

              <div className="product-search-bar">
                <span className="product-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="product-search-input"
                />
                {searchQuery && (
                  <button
                    className="product-search-clear"
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="product-card-section">
                {filteredProducts.map((item) => (
                  <ProductCard key={item.id} {...item} cart={cart} setcart={setcart} />
                ))}
                {filteredProducts.length === 0 && (
                  <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: '#5a6428', fontSize: '1.2rem' }}>No products found matching "{searchQuery}"</p>
                )}
              </div>
            </div>
            <button onClick={() => console.log(cart)}>click here</button>
            <Collections />
            <Signature />
            <Reviews />
            <Footer />
          </>
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App