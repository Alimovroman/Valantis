import { FC, useEffect, useState } from "react";
import { productsApi } from "./products.api";

export const ListOfProducts: FC = () => {
  let [products, setProducts] = useState<Products[]>();
  let [totalProducts, setTotalProducts] = useState<number | null>(null);
  let pages = totalProducts ? Math.ceil(totalProducts / 50) : 1;

  useEffect(() => {
    productsApi
      .getIds({})
      .then((res) => setTotalProducts(res.data.result.length));

    productsApi
      .getIds({ offset: 10, limit: 50 })
      .then((res) => {
        return productsApi.getItems(res.data.result);
      })
      .then((res) => {
        setProducts(res.data.result);
      });
  }, []);
  console.log(pages);

  return (
    <div>
      <table>
        <caption>Products</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((e, i) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.product}</td>
                <td>{e.price}</td>
                <td>{e.brand}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

type Products = {
  brand: string;
  id: string;
  price: number;
  product: string;
};
