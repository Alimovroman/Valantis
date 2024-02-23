import { FC, useEffect, useState } from "react";
import { productsApi } from "./products.api";

export const ListOfProducts: FC = () => {
  let [products, setProducts] = useState<Products[]>();

  useEffect(() => {
    productsApi
      .getIds({})
      .then((res) => {
        return productsApi.getItems(res.data.result);
      })
      .then((res) => {
        setProducts(res.data.result);
      });
  }, []);

  return (
    <div>
      {products?.map((e, i) => {
        return (
          <div key={e.id}>
            Brand: {e.brand} Price: {e.price} Product: {e.product}
          </div>
        );
      })}
    </div>
  );
};

type Products = {
  brand: string;
  id: string;
  price: number;
  product: string;
};
