import React from "react";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category-component";
import "./shop.styles.scss";
import shopStore from "../../store/shopStore";

class Shop extends React.Component {
  componentDidMount() {
    shopStore.setCategories([
      { id: 1, title: "Clothes" },
      { id: 2, title: "Shoes" },
    ]);
  }

  render() {
    const categories = shopStore.categories;

    return (
      <Routes>
        <Route index element={<CategoriesPreview categories={categories} />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    );
  }
}

export default observer(Shop);
