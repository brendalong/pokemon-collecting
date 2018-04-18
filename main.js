console.log("bell pokemon");
//https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"


let localPokedex;
let uniquePokedex;
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

/*
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
*/

function addRegions(){
    return new Promise((resolve, reject) => {
        localPokedex.forEach( (item) => {
            let whichOne = item.number;
            if (whichOne <= 151){
                item.region = "Kanto";
            }else if (whichOne >= 152 && whichOne <= 251){
                item.region = "Johto";
            }else if (whichOne >= 252 && whichOne <= 386){
                item.region = "Hoenn";
            }else if (whichOne >= 387 && whichOne <= 493){
                item.region = "Sinnoh";
            }else if (whichOne >= 494 && whichOne <= 649){
                item.region = "Unova";
            }else if (whichOne >= 650 && whichOne <= 721){
                item.region = "Kalos";
            }else if (whichOne >= 722 && whichOne <= 806){
                item.region = "Alola";
            }

            let str = item.ThumbnailImage;
            let newLink = str.replace("detail", "full");
            item.FullImageURL = newLink;

        });
        resolve();
    });
}

function addFullImageLink(){
    return new Promise((resolve, reject) => {
        localPokedex.forEach( (item) => {
            //https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
            //https://assets.pokemon.com/assets/cms2/img/pokedex/detail/800.png
            let str = item.ThumbnailImage;
            let newLink = str.replace("detail", "full");
            item.FullImageURL = newLink;
        });
        resolve();
    });
}

let regionPokemon = [];

function makeKantoPokemon(){
    return $.ajax({
        url: 'kanto.json'
      }).done((data) => {
          console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 1,
                regionName: "Kanto",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeJohtoPokemon(){
    return $.ajax({
        url: 'updated-johto.json'
      }).done((data) => {
          console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 2,
                regionName: "Johto",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeHoennPokemon(){
    return $.ajax({
        url: 'updated-hoenn.json'
      }).done((data) => {
          console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 3,
                regionName: "Hoenn",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeSinnohPokemon(){
    return $.ajax({
        url: 'extended-sinnoh.json'
      }).done((data) => {
          console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 4,
                regionName: "Sinnoh",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeUnovaPokemon(){
    return $.ajax({
        url: 'updated-unova.json'
      }).done((data) => {
        //   console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 5,
                regionName: "Unova",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

//need to merge kalos together and remove duplicates//////////////////////////

function makeKalosCentralPokemon(){
    return $.ajax({
        url: 'kalos-central.json'
      }).done((data) => {
        //   console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 6,
                regionName: "Kalos",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeKalosCoastalPokemon(){
    return $.ajax({
        url: 'kalos-coastal.json'
      }).done((data) => {
        //   console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 6,
                regionName: "Kalos",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}

function makeKalosMountainPokemon(){
    return $.ajax({
        url: 'kalos-mountain.json'
      }).done((data) => {
        //   console.log("waht data", data);
        data.pokemon_entries.forEach(item => {
            let obj = {
                regionId: 6,
                regionName: "Kalos",
                pName: item.pokemon_species.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}
/////////////////////////////////////////////////////////////

function makeAlolaPokemon(){
    return $.ajax({
        url: 'alola.json'
      }).done((data) => {
        //   console.log("waht data", data);
        data.pokemon_species.forEach(item => {
            let obj = {
                regionId: 7,
                regionName: "Alola",
                pName: item.name
            }
            regionPokemon.push(obj);
        });
        return data;
      });
}




function uploadPokemon(){
    let allPokemon = firebase.database().ref('allPokemon/');
      uniquePokedex.forEach( (item) => {
        allPokemon.push(item);
    });
}

function uploadRegions(){
    return new Promise((resolve, reject) => {
        let regional = firebase.database().ref('regional/');
            regionPokemon.forEach( (item) => {
            regional.push(item);
        });
        resolve("uploaded");
    });
}

function loadPokemon(){
    return $.ajax({
        url: "pokedex.json"
     }).done((resolve) => {
         resolve.forEach((item) => {
             item.region = null;
         });
        return resolve;
     }).fail((error) => {
        return error;
     });
  }

  //remove duplicates from the pokedex.json
  function uniqueSort(arrayToSort){
    return new Promise((resolve, reject) => {
        let uniqueArrayOfObjects = arrayToSort.filter(function(obj, index, self) {
            return index === self.findIndex(function(t) {
                return t['slug'] === obj['slug']
            });
        });
    resolve(uniqueArrayOfObjects);
    });
    }

function startHere(){
    loadPokemon()
    .then((response) => {
        localPokedex = response;
         console.log("1");
    })
    .then(() => {
        addRegions()
        .then(() => {
            console.log("2 localPokedex", localPokedex);

        });
    })
    .then(() => {
        uniqueSort(localPokedex)
        .then((data) => {
            console.log("3 uniqueLocal", data);
            return data;
        })
      .then((data) => {
         uniquePokedex = data;
         console.log("4 done,", data);
   //only run when ready!!
         // uploadPokemon();
         //makeRegions();
      });
    });
}

// makeKantoPokemon
// makeJohtoPokemon
// makeHoennPokemon
// makeSinnohPokemon
// makeUnovaPokemon
// makeAlolaPokemon

// run this for each region
function makeRegions(){
    makeAlolaPokemon()
    .then(() => {
        console.log("done");
//only run when ready!!
        uploadRegions()
        .then((result) => {
            console.log("upload done");
        });
    })
}

// makeRegions();

/////// make each one independently - uncomment as necessary //////////////
//     .then(() => {
//         regionPokemon = [];
//         makeJohtoPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("johto done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeHoennPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("hoenn done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeSinnohPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("sinnoh done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeUnovaPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("unova done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeKalosCentralPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("kalos central done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeKalosCoastalPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("kalos coastal done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeKalosMountainPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("kalos mountain done");
//             });
//         });
//     })
//     .then(() => {
//         regionPokemon = [];
//         makeAlolaPokemon()
//         .then((data) => {
//             console.log("done");
// //only run when ready!!
//             uploadRegions()
//             .then((result) => {
//                 console.log("alola done");
//             });
//         });
//     });
// }


//     .then(()=>{
//         makeJohtoPokemon()
//         .then((data) => {
//             console.log("with johto", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeHoennPokemon()
//         .then((data) => {
//             console.log("with hoenn", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeSinnohPokemon()
//         .then((data) => {
//             console.log("with sinnoh", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeUnovaPokemon()
//         .then((data) => {
//             console.log("with unova", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeKalosCentralPokemon()
//         .then((data) => {
//             console.log("with kalos central", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeKalosCoastalPokemon()
//         .then((data) => {
//             console.log("with kalos coastal", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeKalosMountainPokemon()
//         .then((data) => {
//             console.log("with kalos mountain", regionPokemon)
//         });
//     })
//     .then(()=>{
//         makeAlolaPokemon()
//         .then((data) => {
//             console.log("with alola", regionPokemon)
//         });
//     })
//     .then(() =>{
//         console.log("final done");
// //only run when ready!!
//         // uploadRegions();

//     });
// }

///////// for the kalos region - remove duplicates
function uniqueSortRegion(arrayToSort){
    return new Promise((resolve, reject) => {
        let uniqueArrayOfObjects = arrayToSort.filter(function(obj, index, self) {
            return index === self.findIndex(function(t) {
                return t['pName'] === obj['pName']
            });
        });
    resolve(uniqueArrayOfObjects);
    });
    }

    function alphabet(arr){
        return new Promise((resolve, reject) => {
            arr.sort(function(a, b) {
                var textA = a.pName;
                var textB = b.pName;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            console.log("arr", arr);
            resolve(arr)
        })
    }
/////////////// merge kalos and then remove duplicates

//          .then(()=>{
    //         makeAlolaPokemon()
    //         .then((data) => {
    //             console.log("with alola", regionPokemon)
    //         });
    //     })
    //     .then(() =>{
    //         console.log("final done");
    // //only run when ready!!
    //         // uploadRegions();

    //     });
function makeFullKalos(){
    // regionPokemon = [];
        makeKalosCentralPokemon()
        .then((data) => {
            console.log("central done", regionPokemon.length);
        })
        .then(() => {
            makeKalosCoastalPokemon()
            .then((data) => {
                console.log("coastal done", regionPokemon.length);
            })
        .then(() => {
            makeKalosMountainPokemon()
            .then((data) => {
                console.log("mountain done", regionPokemon.length);
            })
            .then(() => {
                uniqueSortRegion(regionPokemon)
                .then((data) => {
                    console.log("newKalos", regionPokemon.length, regionPokemon);
                }).then(() => {
                    console.log("all done");
                })
                .then(() => {
                   alphabet(regionPokemon)
                   .then((data) => {
                       console.log("alphabet data", data);
                   })
                   .then(() => {
                       console.log("all done really");
                       uploadRegions()
                        .then((result) => {
                        console.log("upload done");
                        });
                   });

                });
            });
        });
});
        // .then(() => {
        //     console.log("full kalos:", regionPokemon.length);
        //     uniqueSort(regionPokemon)
        //     .then((data) => {
        //         console.log("newKalos", data.length, data);
        //         // return data;
        //     });
        // })
        // .then(() => {
        //     //alphabet(data)
        //     //.then((data) => {
        //         //return data;
        //    // });
        // //    return data;
        // })
        // .then(() => {
        //     console.log("newKalos", regionPokemon.length, regionPokemon);

        // })
        // .then(() => {
        //     console.log("all done now");
        //     //only run when ready!!
        //     // uploadRegions()
        //     // .then((result) => {
        //     //     console.log("kalos done");
        //     // });
        // });
}
// makeFullKalos();



//use this only when populating the DB
 startHere();
//

//////// for testing ////////////////////////////////////////////
// Kanto
// Johto
// Hoenn
// Sinnoh
// Unova
// Alola

function getPoke() {
    // console.log("url", firebase.getFBsettings().databaseURL);
     return $.ajax({
         url: `https://bell-pokemon.firebaseio.com/regional.json?orderBy="regionName"&equalTo="Alola"`
     }).done((pokeData) => {
        //  console.log("pokeData in promise", pokeData);
         return pokeData;
    });
 }

//  getPoke()
//  .then((data) => {
//      console.log("got data", data);
//  });
