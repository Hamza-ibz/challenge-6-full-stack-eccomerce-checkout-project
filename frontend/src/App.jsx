// src/App.jsx
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/pages/user/Login';
import Register from './Components/pages/user/Register';
import ProductDetails from './Components/pages/products/ProductDetails';
import Home from './Components/pages/home/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import UpdatePassword from './Components/pages/user/UpdatePassword';
import Admin from './Components/pages/user/Admin';
import { fetchCart } from './services/cartService';
import { CartContext } from './contexts/CartContext';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const loadCart = async () => {
            if (loggedIn) {
                try {
                    const cartData = await fetchCart();
                    setCart(cartData);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        if (loggedIn) {
            loadCart();
        }
    }, [loggedIn, setCart]);

    return (
        <div className="overflow-hidden">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/update-password" element={<UpdatePassword />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
                <Sidebar />
                <Footer />
            </Router>
        </div>
    );
};

export default App;


// import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/pages/user/Login";
// import Register from './Components/pages/user/Register';
// import ProductDetails from "./Components/pages/products/ProductDetails";
// import Home from "./Components/pages/home/Home";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import Sidebar from "./Components/Sidebar";
// import UpdatePassword from './Components/pages/user/UpdatePassword';
// import { fetchCart } from "./services/cartService";
// import { CartContext } from './contexts/CartContext'; // Import CartContext

// const App = () => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const { cart, setCart } = useContext(CartContext); // Access cart state and setter from CartContext
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             setLoggedIn(true);
//         }
//     }, []);

//     useEffect(() => {
//         const loadCart = async () => {
//             if (loggedIn) {
//                 try {
//                     const cartData = await fetchCart();
//                     console.log(cartData)
//                     setCart(cartData); // Set cart data from API to CartContext
//                 } catch (error) {
//                     console.error('Error fetching cart:', error);
//                 }
//             }
//         };

//         if (loggedIn) {
//             loadCart();
//         }
//     }, [loggedIn, setCart]);

//     return (
//         <div className="overflow-hidden">
//             <Router>
//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/product/:id" element={<ProductDetails />} />
//                     <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/update-password" element={<UpdatePassword />} />
//                 </Routes>
//                 <Sidebar />
//                 <Footer />
//             </Router>
//         </div>
//     );
// };

// export default App;

