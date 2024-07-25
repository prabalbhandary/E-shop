import React, {createContext, useState, useEffect} from 'react';

export const ProductContext = createContext()

const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=> {
      const res = await fetch("http://localhost:4000/api/v1/products/all")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  },[])
  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
