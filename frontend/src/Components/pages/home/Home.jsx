import React from "react";
import Product from '../products/Product';
import Hero from './Hero';

const Home = ({ products }) => {
    const filteredProducts = products.filter((item) => (
        item.category === "men's clothing" ||
        item.category === "women's clothing" ||
        item.category === "jewelery"
    ));

    return (
        <div>
            <Hero />
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
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
