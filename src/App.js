import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCategories } from "./actions/categoriesActions";
import SelectDropdown from "./components/SelectDropdown";
import Header from "./components/Header";
import { getProducts } from "./actions/productsActions";
import Product from "./components/Product";

const App = ({ categories, products, loading_info, dispatch }) => {
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const category = event.target.value.trim();
    if (category) {
      dispatch(getProducts(category));
    }
  };

  return (
    <div>
      <Header />
      <div className="category-dropdown">
        <SelectDropdown
          categories={categories}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      {loading_info.error && <p className="errorMsg">{loading_info.error}</p>}
      <div>
        <ul className="products">
          {loading_info.loading ? (
            <p>Loading...</p>
          ) : (
            <React.Fragment>
              {products.map(({ name, image }) => {
                return <Product key={name} name={name} image={image} />;
              })}
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { categories, products, loading_info } = state;

  return {
    categories,
    products,
    loading_info,
  };
};

export default connect(mapStateToProps)(App);
