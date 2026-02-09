import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

interface IvaResponse {
  product_id: string;
  product_name: string;
  iva: number;
}

const API_BASE_URL = 'https://examu3-backend.vercel.app/api';

const App: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [iva, setIva] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const searchProductIva = async () => {
    if (!productId.trim()) {
      setError('Ingrese un ID de producto');
      return;
    }

    setLoading(true);
    setError('');
    setIva(null);
    setProductName('');

    try {
      const response = await axios.get<IvaResponse>(`${API_BASE_URL}/products/${productId}/iva`);
      setProductName(response.data.product_name);
      setIva(response.data.iva);
    } catch (err) {
      setError('Producto no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🧾 Buscar IVA de Producto</h1>

        <div className="search-container">
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Ingrese ID del producto"
            onKeyPress={(e) => e.key === 'Enter' && searchProductIva()}
          />
          <button onClick={searchProductIva}>Buscar</button>
        </div>

        {loading && <p className="loading">Buscando...</p>}
        {error && <p className="error">{error}</p>}

        {iva !== null && (
          <div className="iva-result">
            <div className="iva-card">
              <p className="product-name">{productName}</p>
              <h2>💰 IVA (16%)</h2>
              <div className="iva-value-big">${iva.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;