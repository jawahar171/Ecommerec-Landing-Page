document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://fakestoreapi.com/products';
    const productContainer = document.getElementById('productContainer');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalQuantity = document.getElementById('modalQuantity');
    const closeModal = document.getElementById('closeModal');

    // Fetch products from API
    async function fetchProducts() {
        try {
            const response = await fetch(apiURL);
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Display products in cards
    function displayProducts(products) {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer" onclick="openModal(${product.id})">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover mb-4 rounded">
                    <h2 class="text-lg font-semibold">${product.title}</h2>
                    <p class="text-green-500 font-bold">$${product.price}</p>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });
    }

    // Open modal with product details
    window.openModal = async function(productId) {
        try {
            const response = await fetch(`${apiURL}/${productId}`);
            const product = await response.json();
            modalTitle.textContent = product.title;
            modalImage.src = product.image;
            modalDescription.textContent = product.description;
            modalQuantity.textContent = product.rating.count;
            modal.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Search products by title
    searchInput.addEventListener('input', async function(e) {
        const searchQuery = e.target.value.toLowerCase();
        try {
            const response = await fetch(apiURL);
            const products = await response.json();
            const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchQuery));
            displayProducts(filteredProducts);
        } catch (error) {
            console.error('Error filtering products:', error);
        }
    });

    // Fetch products on page load
    fetchProducts();
});
