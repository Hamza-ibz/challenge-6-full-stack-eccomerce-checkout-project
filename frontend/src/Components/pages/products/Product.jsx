
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../../../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <h2 className="font-semibbold">$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;



// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../../contexts/CartContext";
// import { BsPlus, BsEyeFill } from "react-icons/bs";
// import '../../css/Product.css'; // Import the CSS file

// const Product = ({ product }) => {
//   const { addToCart } = useContext(CartContext);

//   // destructure product
//   const { id, image, category, title, price } = product;
//   return (
//     <div>
//       <div className="product-container">
//         <div className="product-image-wrapper">
//           <div className="product-image">
//             <img className="product-img" src={image} alt="" />
//           </div>
//         </div>
//         <div className="product-buttons">
//           <div className="add-to-cart-button">

//             <button onClick={() => addToCart(product, id)}>
//               <BsPlus className="plus-icon" />
//             </button>
//           </div>
//           <Link to={`/product/${id}`} className="view-details-button">
//             <BsEyeFill />
//           </Link>
//         </div>
//       </div>
//       <div>
//         <div className="product-category">{category}</div>
//         <Link to={`/product/${id}`}>
//           <h2 className="product-title">{title}</h2>
//         </Link>
//         <h2 className="product-price">$ {price}</h2>
//       </div>
//     </div>
//   );
// };

// export default Product;
