
// ==== Sample Product Data ====
const products = [
    {
        name: 'Vintage Leather Journal',
        price: '45.99',
        image: 'https://images.unsplash.com/photo-1456743625079-86a97ff8bc8c?q=80&w=1974&auto=format&fit=crop'
    },
    {
        name: 'Artisan Ceramic Mug',
        price: '24.50',
        image: 'https://images.unsplash.com/photo-1594312524355-152445a64b4a?q=80&w=1974&auto=format&fit=crop'
    },
    {
        name: 'Minimalist Desk Lamp',
        price: '79.00',
        image: 'https://images.unsplash.com/photo-1517991104242-af5e3a758775?q=80&w=1974&auto=format&fit=crop'
    },
    {
        name: 'Organic Green Tea Set',
        price: '32.99',
        image: 'https://images.unsplash.com/photo-1576092762791-d059e53a393a?q=80&w=1974&auto=format&fit=crop'
    },
];

// ==== Web Component: SiteHeader ====
class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--header-bg, white);
                    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
                    padding: 1rem 2rem;
                }
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .logo {
                    font-family: var(--font-heading, serif);
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--primary-color, #2c3e50);
                    text-decoration: none;
                }
                nav a {
                    font-family: var(--font-body, sans-serif);
                    margin: 0 1rem;
                    text-decoration: none;
                    color: var(--text-color, #34495e);
                    font-weight: 700;
                    font-size: 1rem;
                }
                .icons svg {
                    width: 24px;
                    height: 24px;
                    margin-left: 1.5rem;
                    cursor: pointer;
                }
            </style>
            <header class="header-container">
                <a href="/" class="logo">LUXE</a>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">All Products</a>
                    <a href="#">Categories</a>
                </nav>
                <div class="icons">
                    <!-- Icons from https://feathericons.com/ -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </div>
            </header>
        `;
    }
}

// ==== Web Component: ProductCard ====
class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const price = this.getAttribute('price');
        const image = this.getAttribute('image');

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: var(--shadow-md, 0 10px 15px rgba(0,0,0,0.1));
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg, 0 20px 25px rgba(0,0,0,0.15));
                }
                .card-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }
                .card-content {
                    padding: 1.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }
                .product-name {
                    font-family: var(--font-heading, serif);
                    font-size: 1.3rem;
                    margin: 0 0 0.5rem;
                    color: var(--primary-color, #2c3e50);
                }
                .product-price {
                    font-family: var(--font-body, sans-serif);
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--secondary-color, #3498db);
                    margin: auto 0 1.5rem;
                }
                .add-to-cart-btn {
                    background: var(--primary-color, #2c3e50);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 0.75rem 1.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    text-align: center;
                    transition: background-color 0.3s, box-shadow 0.3s;
                    box-shadow: var(--shadow-sm);
                }
                .add-to-cart-btn:hover {
                    background: var(--secondary-color, #3498db);
                    box-shadow: 0 0 15px var(--secondary-color, #3498db);
                }
            </style>
            <div class="card">
                <img src="${image}" alt="${name}" class="card-image">
                <div class="card-content">
                    <h3 class="product-name">${name}</h3>
                    <p class="product-price">$${price}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;
    }
}

// ==== Web Component: SiteFooter ====
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: var(--primary-color, #2c3e50);
                    color: var(--background-color, #ecf0f1);
                    padding: 3rem 2rem;
                    margin-top: 4rem;
                    text-align: center;
                }
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    text-align: left;
                }
                h4 {
                    font-family: var(--font-heading, serif);
                    color: white;
                    margin-bottom: 1rem;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 0.5rem;
                }
                a {
                    color: var(--background-color, #ecf0f1);
                    text-decoration: none;
                }
                .copyright {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    text-align: center;
                    font-size: 0.9rem;
                }
            </style>
            <footer>
                <div class="footer-container">
                    <div>
                        <h4>About Us</h4>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Follow Us</h4>
                        <!-- Placeholder for social icons -->
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    &copy; ${new Date().getFullYear()} LUXE. All Rights Reserved.
                </div>
            </footer>
        `;
    }
}

// ==== Define Custom Elements ====
customElements.define('site-header', SiteHeader);
customElements.define('product-card', ProductCard);
customElements.define('site-footer', SiteFooter);


// ==== Dynamically Populate Products ====
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        products.forEach(product => {
            const card = document.createElement('product-card');
            card.setAttribute('name', product.name);
            card.setAttribute('price', product.price);
            card.setAttribute('image', product.image);
            gridContainer.appendChild(card);
        });
    }
});

