import { Product, Cart } from './components.js';

const app = document.getElementById('app');

const productData = {
    name: 'Modern E-commerce Product',
    price: 99.99,
    description: 'A beautifully designed, modern e-commerce product. Made with the finest materials, it\'s both stylish and functional. Perfect for any modern lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

const product = new Product(productData);
const cart = new Cart();

app.appendChild(product.render());
app.appendChild(cart.render());
