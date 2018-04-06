console.log("bell pokemon");

let localPokedex;
//1 is national
let kantoPokemon;
//https://pokeapi.co/api/v2/pokedex/2/
let johtoPokemon;
//https://pokeapi.co/api/v2/pokedex/7/
let hoennPokemon;
//https://pokeapi.co/api/v2/pokedex/4/
//https://pokeapi.co/api/v2/pokedex/15/ updated-hoenn
let sinnohPokemon;
//https://pokeapi.co/api/v2/pokedex/6/ (extend-sinnoh) and (5 = original-sinnoh)
let unovaPokemon;
//https://pokeapi.co/api/v2/pokedex/8/ (original)
//https://pokeapi.co/api/v2/pokedex/9/ (updated)
let kalosPokemon;
//https://pokeapi.co/api/v2/pokedex/12/ kalos-central
//https://pokeapi.co/api/v2/pokedex/13/ kalos-coastal
//https://pokeapi.co/api/v2/pokedex/14/ kalos-mountain

//sun moon found under Games
//https://pokeapi.co/api/v2/generation/7/

//alolan cards
//https://api.pokemontcg.io/v1/cards?name=Alolan
//cards?name=Alolan%20Vulpix

function loadPokemon(){
    return $.ajax({
        url: "pokedex.json"
     }).done((resolve) => {
         resolve.forEach((item) => {
             item.region = [];
         });
        return resolve;
     }).fail((error) => {
        return error;
     });
  }

function getRegionInfo(){
    //kanto
    return $.ajax({
        url: "https://pokeapi.co/api/v2/pokedex/2/"
    }).done((resolve) => {
        return resolve;
    })
}

function getJohtoInfo(){
    //updated johto
    return $.ajax({
        url: "https://pokeapi.co/api/v2/pokedex/7/"
    }).done((resolve) => {
        return resolve;
    })
}

function addKantoToLocal(){
    return new Promise((resolve, reject) => {
        kantoPokemon.forEach( (kp) => {
        localPokedex.forEach( (lp) => {
            if (kp.pokemon_species.name == lp.slug){
                //    lp.region = "Kanto";
                //need to push to array in case multiple regions
                lp.region.push("Kanto");
            }
            });
        });
        resolve();
    });
}

function callAddKantoToLocal(){
    let newLocal = addKantoToLocal()
    .then((resolve) => {
        console.log("new local", localPokedex);
    });
}


let step1 = loadPokemon()
    .then((response) => {
        console.log("local pokedex:", response.length);
        localPokedex = response;
    })
    .then(() => {
        getRegionInfo()
        .then((response) => {
            kantoPokemon = response.pokemon_entries;
            console.log("kantoPokemon", kantoPokemon);
            callAddKantoToLocal();
        });
    });

