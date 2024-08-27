import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Original Price: {product.originalPrice}</p>
      <p>Current Price: {product.currentPrice}</p>
      <p># Price Changes: {product.priceChanges.length}</p>
      <h3>Price Change History</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Previous Price</th>
            <th>New Price</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {product.priceChanges.map((change, index) => (
            <tr key={index}>
              <td>{new Date(change.time).toLocaleString()}</td>
              <td>{change.previousPrice}</td>
              <td>{change.newPrice}</td>
              <td>{(((change.newPrice - change.previousPrice) / change.previousPrice) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;