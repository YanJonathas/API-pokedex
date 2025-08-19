const pokemonList = document.getElementById("pokemonList");
const LoadMoreButton = document.getElementById("loadMoreButton");
const limit = 12;
let offset = 0;
const maxRecords = 151;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  // usando o resultado pronto para formar a lista "parte5"
        const newHtml = pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join("")}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
            `
        ).join("");
        pokemonList.innerHTML += newHtml;
        //join é usado para converter um array em uma string, concatenando seus elementos.
        //map() é um método de array que cria um novo array aplicando uma função a cada elemento do array original.
    });
};

loadPokemonItens(offset, limit)

LoadMoreButton.addEventListener('click', () => {
    offset += limit;
    
    const qtdRecordNextPage = offset + limit; 

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)
        LoadMoreButton.parentElement.removeChild(LoadMoreButton);
    } else {
        loadPokemonItens(offset, limit)
    }
})
