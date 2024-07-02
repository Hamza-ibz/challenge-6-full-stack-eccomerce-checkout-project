
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
// import "./index.css";
import ProductDetails from "./contexts/ProductContext"
import Home from "./Components/pages/home/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
    return (
        <div className="overflow-hidden">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    {/* <Route path="/product/:id" element={<ProductDetails />}></Route> */}
                </Routes>
                {/* <Sidebar /> */}
                <Footer />
            </Router>
        </div>
    );
};

export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css"; // Import the CSS file

// import Home from "./Components/pages/home/Home";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";

// const App = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch("https://fakestoreapi.com/products");
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="overflow-hidden">
//             <Router>
//                 <Header />
//                 <Routes>
//                     <Route
//                         path="/"
//                         element={
//                             <div className="home">
//                                 <Home products={products} />
//                             </div>
//                         }
//                     ></Route>
//                 </Routes>
//                 <Footer />
//             </Router>
//         </div>
//     );
// };

// export default App;

