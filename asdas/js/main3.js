document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        displayFilteredPokemon(allPokemon);
    });
    await loadAllPokemon();
});

async function loadAllPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    allPokemon = data.results;
    displayAllPokemon(allPokemon);
}

function displayAllPokemon(pokemonList) {
    const catalogContainer = document.getElementById('catalog');
    catalogContainer.innerHTML = '';

    for (const pokemon of pokemonList) {
        const pokemonUrl = pokemon.url;
        loadPokemonDetails(pokemonUrl, catalogContainer);
    }
}

async function loadPokemonDetails(pokemonUrl, container) {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    displayPokemonInfo(data, container);
}

function displayFilteredPokemon(pokemonList) {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchText));
    displayAllPokemon(filteredPokemon);
}

function displayPokemonInfo(pokemon, container) {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon-item');
    pokemonDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p class="price">$${getRandomPrice()}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
    `;
    container.appendChild(pokemonDiv);
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // if (!currentUser) {
        //     alert('You need to log in first.');
        //     return;
        // }

        // не работает
        // if (typeof currentUser !== 'object' || !currentUser.email || !currentUser.password) {
        //     alert('Invalid user data. Please log in again.');
        //     localStorage.removeItem('currentUser');
        //     return;
        // }

        const pokemonDiv = event.target.closest('.pokemon-item');
        const pokemonName = pokemonDiv.querySelector('h2').textContent;
        const pokemonImage = pokemonDiv.querySelector('img').src;
        const pokemonPrice = parseFloat(pokemonDiv.querySelector('.price').textContent.substr(1)); // Убираем знак доллара и парсим в число
        addToCart(pokemonName, pokemonImage, pokemonPrice);
    }
});

function getRandomPrice() {
    return (Math.random() * (100 - 1) + 1).toFixed(2); 
}

function addToCart(name, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name, img: image, price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
    displayCartItems();
}

function displayCartItems() {

}
