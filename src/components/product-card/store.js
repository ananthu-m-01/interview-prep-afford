import { makeAutoObservable, runInAction } from 'mobx';

class ProductStore {
  products = [];
  search = '';
  sortOrder = '';
  category = 'All';
  cart = [];
  popupMessage = '';
  showPopup = false;

  constructor() {
    makeAutoObservable(this); // MobX auto observables and actions
  }

  get categories() {
    const all = this.products.map(p => p.category);
    return ['All', ...new Set(all)];
  }

  get filtered() {
    let filtered = this.products;

    if (this.search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.category && this.category !== 'All') {
      filtered = filtered.filter(product => product.category === this.category);
    }

    if (this.sortOrder === 'asc') {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  setProducts(products) {
    this.products = products;
  }

  setSearch(value) {
    this.search = value;
  }

  setSortOrder(value) {
    this.sortOrder = value;
  }

  setCategory(value) {
    this.category = value;
  }

  addToCart(product) {
    const existing = this.cart.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.showPopupMessage(`${product.title} added to cart!`);
  }

  updateQuantity(id, action) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'increase') item.quantity++;
    else if (action === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(i => i.id !== id);
  }

  showPopupMessage(message) {
    this.popupMessage = message;
    this.showPopup = true;

    setTimeout(() => {
      runInAction(() => {
        this.showPopup = false;
      });
    }, 2000);
  }
}

const productStore = new ProductStore();
export default productStore;
