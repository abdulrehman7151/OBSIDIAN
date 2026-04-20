import React, { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setDone(true);
      setEmail("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const cols = [
    { t: "Shop", l: ["New Arrivals", "Dresses", "Outerwear", "Jewellery", "Footwear", "Sale"] },
    { t: "About", l: ["Our Story", "Sustainability", "Craftsmanship", "Press", "Careers"] },
    { t: "Help", l: ["Sizing Guide", "Shipping", "Returns", "Care Guide", "FAQs"] },
  ];

  return (
    <footer className="ftr">
      {/* Newsletter Section inside Footer */}
      <div className="ftr-newsletter">
        <div className="ftr-nl-inner">
          <div className="ftr-nl-icon">✉</div>
          <h3 className="ftr-nl-title">Stay <em>Inspired</em></h3>
          <p className="ftr-nl-desc">
            Early access, exclusive drops, and style curation delivered to you first.
          </p>

          {done ? (
            <div className="ftr-nl-success">Welcome to the circle. ✦</div>
          ) : (
            <div className="ftr-nl-form">
              <input
                className="ftr-nl-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                onKeyDown={handleKeyDown}
                type="email"
              />
              <button className="ftr-nl-submit" onClick={handleSubmit}>
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="ftr-grid">
        <div>
          <div className="ftr-brand">
            <div className="ftr-brand-dot" />
            OBSIDIAN
          </div>
          <p className="ftr-desc">
            The dark horse of luxury fashion. For those who understand that true elegance is never loud — it simply is.
          </p>
          <div className="social-icons">
            {["IG", "TW", "FB", "PI", "YT"].map(social => (
              <button key={social} className="sic" aria-label={`Visit our ${social} page`}>
                {social}
              </button>
            ))}
          </div>
        </div>

        {cols.map(column => (
          <div key={column.t}>
            <div className="fcol-t">{column.t}</div>
            <ul className="flinks">
              {column.l.map(link => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ftr-bottom">
        <span>© 2025 OBSIDIAN. Crafted in the dark, delivered in light.</span>
        <span>
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Cookies</a>
        </span>
      </div>


    </footer>
  );
}

export default Footer;