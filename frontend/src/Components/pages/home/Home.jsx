// import React from "react";
import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import Product from '../products/Product';
import Hero from './Hero';
// import '../../css/Home.css'; // Import the CSS file

const Home = () => {
    // get products from product context
    const { products } = useContext(ProductContext);

    console.log(ProductContext);

    // get only men's and women's clothing category
    const filteredProducts = products.filter((item) => {
        return (
            item.category === "men's clothing" || item.category === "women's clothing" || item.category === "jewelery"
        );
    });

    return (
        <div>
            <Hero />
            <section className="py-20">
                <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
                <div className="container mx-auto">
                    {/* <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                        {filteredProducts.map((product) => {
                            return (
                                <Product product={product} key={product.id} />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;




// import React from "react";
// import Product from '../products/Product';
// import Hero from './Hero';
// import '../../css/Home.css'; // Import the CSS file

// const Home = ({ products }) => {
//     const filteredProducts = products.filter((item) => (
//         item.category === "men's clothing" ||
//         item.category === "women's clothing" ||
//         item.category === "electronics"
//     ));

//     return (
//         <div>
//             <Hero />
//             <section className="product-section">
//                 <h1 className="section-title">Explore Our Products</h1>
//                 <div className="container">

//                     <div className="product-grid">
//                         {filteredProducts.map((product) => (
//                             <Product product={product} key={product.id} />
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Home;
