import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Product {
  productId: number;
  productName: string;
  company: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        const response: AxiosResponse<Product[]> = await axios.get(
          'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000',
          {
            cancelToken: source?.token,
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTQ2MDcwLCJpYXQiOjE3MTUxNDU3NzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYzMmQ0YWM2LTkyMDktNDU5MS04MDkxLTAzMGFkMTg1Y2Y4ZiIsInN1YiI6IjIxMjgwODBAa2lpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiNjMyZDRhYzYtOTIwOS00NTkxLTgwOTEtMDMwYWQxODVjZjhmIiwiY2xpZW50U2VjcmV0IjoiWFBWcWpTTlZEaU9rYlZKdyIsIm93bmVyTmFtZSI6IlBpeXVzaCBSYW5qYW4gU2F0YXBhdGh5Iiwib3duZXJFbWFpbCI6IjIxMjgwODBAa2lpdC5hYy5pbiIsInJvbGxObyI6IjIxMjgwODAifQ.dLEUciasTbDCX3Yeo07bMViIJu0LyD5OacwvJbsWL1E`
            }
          }
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error:any) {
        if (!axios.isCancel(error)) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    // Clean up function
    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Top N Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.productId}>
            <h2>{product.productName}</h2>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability ? 'Available' : 'Out of stock'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;