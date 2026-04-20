import React from 'react'

const Signature = () => {
    return (
        <div className='signature'>
            <div className="col1">
                {/* <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" alt="" /> */}
            </div>
            <div className="col2">
                <div className="col2-inside-wrapper">
                    <p>This Season's Statement</p>
                    <h1>The Signature <br />
                        <i>Capsule</i><br />
                        Collection</h1>
                    <p>Fifteen timeless pieces, each designed to anchor a wardrobe for a lifetime. Hand-sourced from Florence's most revered ateliers.</p>

                    <div className="boxes-wrapper">

                        <div className="signature-boxes">
                            <div className="box">✦</div>
                            <p>Hand-finished in Florence, Italy</p>

                        </div>

                        <div className="signature-boxes">
                            <div className="box">⬡</div>
                            <p>Sustainable luxury materials</p>
                        </div>

                        <div className="signature-boxes">
                            <div className="box">◈</div>
                            <p>Lifetime repair guarantee</p>
                        </div>

                        <div className="signature-boxes">
                            <div className="box">✧</div>
                            <p>Complimentary monogramming Explore the</p>
                        </div>
                    </div>
                    <button>EXPLORE THE CAPSULE</button>
                </div>
            </div>
        </div>
    )
}

export default Signature