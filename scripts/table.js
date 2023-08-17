const pokeID = document.querySelector('.poke-id');


async function pokemonID(id) {
    const response = fetch('https://pogoapi.net/api/v1/pokemon_names.json');
    const data = (await response).json();
    return data;
}

// pokemonID(id = 1)
//     .then(data => {
//         console.log(data);
//         return data
//     })
//     .then(data => {
//         console.log(data[1]['id'])
//         pokeID.innerHTML = data[1]['id']
//     })