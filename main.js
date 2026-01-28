document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.tab);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(c => c.classList.remove('active'));
            target.classList.add('active');
        });
    });

    const optionSelect = document.getElementById('option1');
    const selectedProductsContainer = document.getElementById('selected-products');
    const totalPriceElement = document.getElementById('total-price');
    const basePrice = 39900; // Updated base price for the laptop stand
    let selectedOptions = {};

    optionSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !selectedOptions[selectedValue]) {
            selectedOptions[selectedValue] = 1; // Add with quantity 1
            renderSelectedProducts();
            updateTotalPrice();
            e.target.value = ""; // Reset dropdown
        }
    });

    function renderSelectedProducts() {
        selectedProductsContainer.innerHTML = '';
        if (Object.keys(selectedOptions).length > 0) {
            selectedProductsContainer.style.display = 'block';
        } else {
            selectedProductsContainer.style.display = 'none';
        }

        for (const option in selectedOptions) {
            const productItem = document.createElement('div');
            productItem.className = 'selected-product-item';
            productItem.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.8rem 0;
                border-bottom: 1px solid #eee;
            `;

            productItem.innerHTML = `
                <span>${option}</span>
                <div class="quantity-controls" style="display: flex; align-items: center;">
                    <button class="quantity-down" data-option="${option}">-</button>
                    <input type="text" value="${selectedOptions[option]}" readonly style="width: 30px; text-align: center; border: 1px solid #ccc; margin: 0 5px; background-color: #fff;">
                    <button class="quantity-up" data-option="${option}">+</button>
                    <button class="remove-item" data-option="${option}" style="margin-left: 15px; background: none; border: none; color: #f44336; cursor: pointer; font-weight: bold;">X</button>
                </div>
            `;
            selectedProductsContainer.appendChild(productItem);
        }

        attachItemEventListeners();
    }

    function attachItemEventListeners() {
        document.querySelectorAll('.quantity-up').forEach(btn => {
            btn.onclick = (e) => {
                const option = e.target.dataset.option;
                selectedOptions[option]++;
                renderSelectedProducts();
                updateTotalPrice();
            };
        });

        document.querySelectorAll('.quantity-down').forEach(btn => {
            btn.onclick = (e) => {
                const option = e.target.dataset.option;
                if (selectedOptions[option] > 1) {
                    selectedOptions[option]--;
                    renderSelectedProducts();
                    updateTotalPrice();
                }
            };
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = (e) => {
                const option = e.target.dataset.option;
                delete selectedOptions[option];
                renderSelectedProducts();
                updateTotalPrice();
            };
        });
    }

    function updateTotalPrice() {
        let total = 0;
        for (const option in selectedOptions) {
            total += basePrice * selectedOptions[option];
        }
        totalPriceElement.textContent = `${total.toLocaleString()}원`;
    }

    // Sticky purchase bar visibility
    const stickyBar = document.querySelector('.sticky-purchase-bar');
    const productDetailsSection = document.querySelector('.product-details-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the product details section scrolls out of view, show the sticky bar
            stickyBar.classList.toggle('visible', !entry.isIntersecting);
        });
    }, { rootMargin: "-100px 0px 0px 0px" });

    if (productDetailsSection) {
        observer.observe(productDetailsSection);
    }
    
    // Initially hide the selected products container if it's empty
    if (Object.keys(selectedOptions).length === 0) {
        selectedProductsContainer.style.display = 'none';
    }
});
