import { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import { addCollectionAndDocuments } from "../../utils/firebase/firebase.utils";

import "./category.styles.scss";

const Category = observer(() => {
  const { category } = useParams();
  const { categoriesMap, handleSortChange, sortBy } =
    useContext(CategoriesContext);

  const [sortedProducts, setSortedProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    size: "",
    material: "",
    price: 0,
    imageUrl: "",
  });

  useEffect(() => {
    const unsortedProducts = categoriesMap[category] || [];
    let sortedProducts;
    if (sortBy === "price-asc") {
      sortedProducts = unsortedProducts
        .slice()
        .sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProducts = unsortedProducts
        .slice()
        .sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = unsortedProducts;
    }
    setSortedProducts(sortedProducts);
  }, [categoriesMap, category, sortBy]);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    addCollectionAndDocuments("products", [newProduct]);
    setSortedProducts([...sortedProducts, newProduct]);
    setNewProduct({ name: "", description: "", imageUrl: "", price: 0 });
    setShowAddForm(false);
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleRemoveImage = (productId, productImageUrl) => {
    const updatedProducts = sortedProducts.map((product) => {
      if (product.id === productId) {
        const updatedImages = product.imageUrl
          .split(",")
          .filter((url) => url !== productImageUrl)
          .join(",");
        return { ...product, imageUrl: updatedImages };
      }
      return product;
    });
    setSortedProducts(updatedProducts);
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
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleRemoveImage={handleRemoveImage}
          />
        ))}
      </div>

      {showAddForm ? (
        <form onSubmit={handleAddFormSubmit}>
          <div className="add-product-form">
            <div className="form-group">
              <label htmlFor="name-input">Name:</label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="size-input">Size:</label>
              <input
                id="size-input"
                type="text"
                name="size"
                value={newProduct.size}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="material-input">Material:</label>
              <input
                id="material-input"
                type="text"
                name="material"
                value={newProduct.material}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price-input">Price: </label>
              <input
                id="price-input"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image-url-input">Image URL:</label>
              <input
                id="image-url-input"
                type="url"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <button className="add-product-button" type="submit">
              Add Product
            </button>
            <button
              className="cancel-add-button"
              type="button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="add-product-button-container">
          <button
            className="add-product-button1"
            onClick={() => setShowAddForm(true)}
          >
            ADD PRODUCT
          </button>
        </div>
      )}
    </Fragment>
  );
});

export default Category;
