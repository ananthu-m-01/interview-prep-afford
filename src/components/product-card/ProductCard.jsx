import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import './ProductCard.css';
import productStore from './store';

const ProductCard = observer(() => {
  const {
    filtered,
    search,
    sortOrder,
    category,
    categories,
    cart,
    showPopup,
    popupMessage
  } = productStore;

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        productStore.setProducts(data.products); // ✅ direct method call
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      productStore.setSearch(searchInput); // ✅ direct method call
    }, 300); // debounce delay

    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <div className="card-main">
      <h2>All Products</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="search-input"
        />

        <select value={sortOrder} onChange={e => productStore.setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <select value={category} onChange={e => productStore.setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="cards">
        {filtered.map(product => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button className="add-to-cart" onClick={() => productStore.addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}

      <div className="cart-summary">
        <h3>Cart ({cart.length} items)</h3>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <p>{item.title} x {item.quantity} - ${item.price * item.quantity}</p>
              <button onClick={() => productStore.updateQuantity(item.id, 'increase')}>+</button>
              <button onClick={() => productStore.updateQuantity(item.id, 'decrease')}>-</button>
              <button onClick={() => productStore.removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
      </div>
    </div>
  );
});

export default ProductCard;
