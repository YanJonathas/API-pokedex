const pokeApi = {};

function convertPokeApiDatailsPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
};

pokeApi.getPokemonsDetails = (pokemon) => { // função para adicionar os detalhes, foi feita em 2º
    return fetch(pokemon.url)
    .then((response)=> response.json())
    .then(convertPokeApiDatailsPokemon)
};

pokeApi.getPokemons = (offset = 0, limit = 12) => { //função para add os pokemon feita 1º
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` //"parte1"

    return fetch(url) //solicitou uma requisição e recebeu uma promeça "parte2"
        .then((response) => response.json()) //transformou a requisição em um json  "parte3"
        .then((jsonBody) => jsonBody.results) // pegou o resuisição já em formato json e trasnformou no resultado final "parte4"
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => (pokemonsDetails))
};

