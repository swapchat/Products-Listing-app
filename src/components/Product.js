import React from "react";

export default function Product({ image, name }) {
  return (
    <li className="product">
      <img src={image} alt={name} className="product-img" />
      <div className="product-title">{name}</div>
    </li>
  );
}
