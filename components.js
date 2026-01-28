class Product {
    constructor(data) {
        this.data = data;
    }

    render() {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productImage = document.createElement('img');
        productImage.className = 'product-image';
        productImage.src = this.data.imageUrl;
        productImage.alt = this.data.name;

        const productName = document.createElement('h1');
        productName.textContent = this.data.name;

        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `$${this.data.price}`;

        const productDescription = document.createElement('p');
        productDescription.className = 'product-description';
        productDescription.textContent = this.data.description;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('addToCart', { detail: this.data }));
        });

        productCard.append(productImage, productName, productPrice, productDescription, addToCartBtn);
        return productCard;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.cartCard = document.createElement('div');
        this.cartCard.className = 'cart-card';
        document.addEventListener('addToCart', this.handleAddToCart.bind(this));
    }

    handleAddToCart(event) {
        const product = event.detail;
        this.items.push(product);
        this.renderCartItems();
    }

    renderCartItems() {
        this.cartCard.innerHTML = '<h2>Shopping Cart</h2>';
        const cartItemsList = document.createElement('ul');
        cartItemsList.className = 'cart-items';

        this.items.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';

            const itemName = document.createElement('span');
            itemName.className = 'cart-item-name';
            itemName.textContent = item.name;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-from-cart-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                this.items.splice(index, 1);
                this.renderCartItems();
            });

            cartItem.append(itemName, `$${item.price}`, removeBtn);
            cartItemsList.appendChild(cartItem);
        });

        const cartTotal = document.createElement('div');
        cartTotal.className = 'cart-total';
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        this.cartCard.appendChild(cartItemsList);
        this.cartCard.appendChild(cartTotal);
    }

    render() {
        this.renderCartItems();
        return this.cartCard;
    }
}


export { Product, Cart };
