import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/pages/home/Home";
// import ProductDetails from "./pages/ProductDetails";

// import Sidebar from "./components/Sidebar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-hidden">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home products={products} />}></Route>
                    {/* <Route path="/product/:id" element={<ProductDetails />}></Route> */}
                </Routes>
                {/* <Sidebar /> */}
                <Footer />
            </Router>
        </div>
    );
};

export default App;



