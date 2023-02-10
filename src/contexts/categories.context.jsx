import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
  sortBy: "price-asc",
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const [sortBy, setSortBy] = useState("price-asc");

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      let sortedCategoryMap = {};
      for (const category in categoryMap) {
        let sortedProducts;
        if (sortBy === "price-asc") {
          sortedProducts = categoryMap[category].sort(
            (a, b) => a.price - b.price
          );
        } else if (sortBy === "price-desc") {
          sortedProducts = categoryMap[category].sort(
            (a, b) => b.price - a.price
          );
        } else {
          sortedProducts = categoryMap[category];
        }
        sortedCategoryMap[category] = sortedProducts;
      }
      setCategoriesMap(sortedCategoryMap);
    };
    getCategoriesMap();
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const value = { categoriesMap, sortBy, handleSortChange };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
