import React, { useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import ProductCard from "../product-card/product-card.component";

import "./filter-product.styles.scss";

const FilterProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getCategoriesAndDocuments();
      setProducts(Object.values(productsData).flat());
      const uniqueSizes = [...new Set(products.map((product) => product.size))];
      const uniqueMaterials = [
        ...new Set(products.map((product) => product.material)),
      ];

      setSizes(uniqueSizes);
      setMaterials(uniqueMaterials);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (selectedSize === "S") {
        filtered = filtered.filter((product) => product.size === "S");
      } else if (selectedSize === "M") {
        filtered = filtered.filter((product) => product.size === "M");
      } else if (selectedSize === "L") {
        filtered = filtered.filter((product) => product.size === "L");
      } else if (selectedSize === "42") {
        filtered = filtered.filter((product) => product.size === "42");
      } else if (selectedSize === "44") {
        filtered = filtered.filter((product) => product.size === "44");
      } else if (selectedSize === "45") {
        filtered = filtered.filter((product) => product.size === "45");
      } else if (selectedSize === "46") {
        filtered = filtered.filter((product) => product.size === "46");
      }

      if (selectedMaterial === "Polyester") {
        filtered = filtered.filter(
          (product) => product.material === "Polyester"
        );
      } else if (selectedMaterial === "Buckram") {
        filtered = filtered.filter((product) => product.material === "Buckram");
      } else if (selectedMaterial === "Twill") {
        filtered = filtered.filter((product) => product.material === "Twill");
      } else if (selectedMaterial === "Leather") {
        filtered = filtered.filter((product) => product.material === "Leather");
      } else if (selectedMaterial === "Felt") {
        filtered = filtered.filter((product) => product.material === "Felt");
      } else if (selectedMaterial === "Straw") {
        filtered = filtered.filter((product) => product.material === "Straw");
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedSize, selectedMaterial]);

  return (
    <div className="label">
      <label className="filterBy">Filter by:</label>
      <div className="sizeTitle">
        <label className="size">Size:</label>
        <select
          className="select"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="42">42</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
        </select>
      </div>
      <div className="materialTitle">
        <label className="material">Material:</label>
        <select
          className="select1"
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="">All</option>
          <option value="Polyester">Polyester</option>
          <option value="Buckram">Buckram</option>
          <option value="Twill">Twill</option>
          <option value="Leather">Leather</option>
          <option value="Felt">Felt</option>
          <option value="Straw">Straw</option>
        </select>
      </div>
      <div>
        <div className="filter">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
