import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Tracked Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Original Price</th>
            <th>Current Price</th>
            <th># Price Changes</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><a href={`/product/${product._id}`}>{product.name}</a></td>
              <td>{product.originalPrice}</td>
              <td>{product.currentPrice}</td>
              <td>{product.priceChanges.length}</td>
              <td>{(((product.currentPrice - product.originalPrice) / product.originalPrice) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
