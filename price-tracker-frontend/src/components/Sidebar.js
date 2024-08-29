import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar() {
  const [trackedProducts, setTrackedProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/user/tracked-products') // Replace with actual endpoint
      .then(response => setTrackedProducts(response.data))
      .catch(error => console.error('Error fetching tracked products:', error));
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        {trackedProducts.map(product => (
          <li key={product.id}>
            <a href={`/product/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

