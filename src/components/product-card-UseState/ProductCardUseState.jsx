import { useEffect, useState } from 'react';
import './ProductCard.css';

const ProductCardUseState = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setCategories(['All', ...new Set(data.products.map(p => p.category))]);
      });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, sortOrder, category, products]);

  const filterProducts = () => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter(product => product.category === category);
    }

    // Sort by price
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showPopupMessage(`${product.title} added to cart!`);
  };

  const updateQuantity = (id, action) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        if (action === 'increase') {
          item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setPopupMessage('');
    }, 2000);
  };

  return (
    <div className="card-main">
      <h2>All Products</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <select value={category} onChange={e => setCategory(e.target.value)}>
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
            <button className="add-to-cart" onClick={() => addToCart(product)}>
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
              <button onClick={() => updateQuantity(item.id, 'increase')}>+</button>
              <button onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
      </div>
    </div>
  );
};

export default ProductCardUseState;
