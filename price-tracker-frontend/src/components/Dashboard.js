import React, { useEffect, useState } from 'react';
import axios from 'axios';

const addProduct = async (productData) => {
    try {
      const response = await axios.post('/api/products/add', { userId: user._id, productData });
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const updateProduct = async (productId, updates) => {
    try {
      const response = await axios.put(`/api/products/update/${productId}`, updates);
      console.log('Product updated:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/delete/${productId}`, { data: { userId: user._id } });
      console.log('Product deleted:', response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };  

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/user/products') // Example endpoint
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
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
            <tr key={product.id}>
              <td><a href={`/product/${product.id}`}>{product.name}</a></td>
              <td>{product.originalPrice}</td>
              <td>{product.currentPrice}</td>
              <td>{product.priceChanges}</td>
              <td>{product.percentChange}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
