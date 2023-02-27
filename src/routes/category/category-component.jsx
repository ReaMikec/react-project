import { observer } from "mobx-react-lite";
import { useContext, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import { addCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoryStore from "../../store/categoryStore";

import "./category.styles.scss";

const Category = observer(() => {
  const { category } = useParams();
  const { categoriesMap, handleSortChange, sortBy } =
    useContext(CategoriesContext);

  const categoryStore = CategoryStore;

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
    categoryStore.setSortedProducts(sortedProducts);
  }, [categoriesMap, category, categoryStore, sortBy]);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    addCollectionAndDocuments("products", [categoryStore.newProduct]);
    categoryStore.setSortedProducts([
      ...categoryStore.sortedProducts,
      categoryStore.newProduct,
    ]);
    categoryStore.resetNewProduct();
    categoryStore.setShowAddForm(false);
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    categoryStore.setNewProduct({ ...categoryStore.newProduct, [name]: value });
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category}</h1>
        <form>
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </form>
      </div>
      {categoryStore.showAddForm ? (
        <form className="add-product-form" onSubmit={handleAddFormSubmit}>
          <h2>Add Product</h2>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryStore.newProduct.name}
              onChange={handleNewProductChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={categoryStore.newProduct.description}
              onChange={handleNewProductChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={categoryStore.newProduct.price}
              onChange={handleNewProductChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={categoryStore.newProduct.imageUrl}
              onChange={handleNewProductChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Add Product</button>
            <button
              type="button"
              onClick={() => categoryStore.setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="add-product-button"
          onClick={() => categoryStore.setShowAddForm(true)}
        >
          Add Product
        </button>
      )}
      <div className="category-container">
        {categoryStore.sortedProducts.map((product) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </div>
    </div>
  );
});

export default Category;
