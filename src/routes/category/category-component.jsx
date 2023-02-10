import { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  const [sortBy, setSortBy] = useState("price-asc");
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    let sortedProducts;
    if (sortBy === "price-asc") {
      sortedProducts = products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProducts = products.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = products;
    }
    setProducts(sortedProducts);
  }, [category, categoriesMap, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Fragment>
      <div className="sort-container">
        <label htmlFor="sort-select" className="sort-by">
          Sort By:
        </label>
        <select id="sort-select" onChange={handleSortChange} value={sortBy}>
          <option value="price-desc">Price (Low to High)</option>
          <option value="price-asc">Price (High to Low)</option>
        </select>
      </div>

      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
