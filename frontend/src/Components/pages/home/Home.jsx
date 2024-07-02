import React from "react";
import Product from '../products/Product';
import Hero from './Hero';
import '../../css/Home.css'; // Import the CSS file

const Home = ({ products }) => {
    const filteredProducts = products.filter((item) => (
        item.category === "men's clothing" ||
        item.category === "women's clothing" ||
        item.category === "electronics"
    ));

    return (
        <div>
            <Hero />
            <section className="product-section">
                <h1 className="section-title">Explore Our Products</h1>
                <div className="container">

                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <Product product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
