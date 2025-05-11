import { makeAutoObservable } from 'mobx';

class ProductStore {
  products = [];
  filtered = [];
  cart = [];
  search = '';
  sortOrder = '';
  category = 'All';
  categories = [];
  showPopup = false;
  popupMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products) {
    this.products = products;
    this.filtered = products;
    this.categories = ['All', ...new Set(products.map(p => p.category))];
  }

  setSearch(search) {
    this.search = search;
    this.filterProducts();
  }

  setSortOrder(order) {
    this.sortOrder = order;
    this.filterProducts();
  }

  setCategory(category) {
    this.category = category;
    this.filterProducts();
  }

  addToCart(product) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.showPopupMessage(`${product.title} added to cart!`);
  }

  updateQuantity(id, action) {
    const product = this.cart.find(p => p.id === id);
    if (product) {
      if (action === 'increase') {
        product.quantity += 1;
      } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity -= 1;
      }
    }
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(p => p.id !== id);
  }

  showPopupMessage(message) {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
      this.popupMessage = '';
    }, 2000);
  }

  filterProducts() {
    let result = [...this.products];

    // Search filter
    if (this.search.trim()) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    // Category filter
    if (this.category !== 'All') {
      result = result.filter(product => product.category === this.category);
    }

    // Sort by price
    if (this.sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filtered = result;
  }
}

const productStore = new ProductStore();
export default productStore;
