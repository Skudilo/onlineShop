import React from "react";

import { useGetProductsQuery } from "../features/productsApi";
import { Spin } from "antd";
import Product from "./Product";

const Home = () => {
  const { data = [], error, isLoading } = useGetProductsQuery();

  return (
    <div className="home">
      <div className="wrapper">
        {isLoading ? (
          <Spin size="large" />
        ) : error ? (
          <h2 className="error">{error.error}</h2>
        ) : (
          <>
            <h2 className="title">New Arrivals</h2>
            <ul className="products">
              {data.map((product) => (
                <Product product={product} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
