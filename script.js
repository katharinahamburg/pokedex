async function loadPokemon() {
  document.getElementById("pokemon").innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    let currentPokemon = await loadPokemonJ(i);
    document.getElementById("pokemon").innerHTML += renderPokemonSmallCard(
      i,
      currentPokemon
    );
  }
}

async function loadPokemonJ(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  let currentPokemon = await response.json();
  console.log("loaded Pokemon", currentPokemon);

  return currentPokemon;
}

function renderPokemonSmallCard(i, currentPokemon) {
  return `<div class="pokemonCardSmall" id="pokemonCardSmall${i}" onclick="openCard(${i})">

    <div class="pokemonIndex" id="pokemonIndex">
        <h1 id="pokemonName${i}">${currentPokemon["name"]}</h1>
        <span class="index" id="index${i}">#0${currentPokemon["id"]}</span>
    </div>
    
    
    <div class="pokemonTypeImage" id="pokemonTypeImage">
    <div class="pokemonTypeAll" id="pokemonTypeAll">
            <div class="pokemonTypeA" id="pokemonTypeA${i}">${currentPokemon["types"][0]["type"]["name"]}</div>
            ${secondType(i, currentPokemon)}
        </div>
    </div>  
        <img class="pokemonImage" id="pokemonImage" src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}";>
    
    </div>`;
}


function openCard(i) {
  let currentPokemon = loadPokemonJ(i);
  let container = document.getElementById("containerB");

  container.innerHTML = "";
  container.innerHTML += openCardB(currentPokemon, i);
  document.getElementById("containerB").style.display = "flex";
  setBackgroundColorSingleCard(currentPokemon);
  statsChart(currentPokemon);
  
}

function secondType(i, currentPokemon) {
  if (typeof currentPokemon["types"][1] !== 'undefined') {
    return `<div class="pokemonTypeB" id="pokemonTypeB${i}">${currentPokemon["types"]["1"]["type"]["name"]}</div>`;
  } else {
    return `<div class="pokemonTypeBempty"></div>`;
  }
}


function openCardB(i, currentPokemon) {
  return `<div class="pokemonCardB" id="pokemonCardB" onclick="closeCard()">
                            
                              
                                <div class="cardBContainer">
                                    <div class="cardContainer">
                                    <h1 id="pokemonName${i}">${currentPokemon["name"]}</h1>
                                      
                                    </div>
                                    <img onclick="closePokemonCard()" class="closePokemonCard" src="./img/close.jpg" alt="close">
                                </div>
                               
                                <div class="container">
                                <span class="index" id="index${i}">#0${currentPokemon["id"]}</span>
                                </div>
                               
                                <div class="container-row">
                                    <img onclick="previousPokemon(${i})" class="card-button" src="./img/arrow-back.png" alt="">
                                    <div class="pokemonTypeA" id="pokemonTypeA${i}">${currentPokemon["types"][0]["type"]["name"]}</div>
                                    <div class="pokemonTypeB" id="pokemonTypeB${i}"></div>
                                </div>
    
    
                                    <img onclick="followingPokemon(${i})" class="card-button" src="./img/arrow-forward.png" alt="">
                            
                               
                                <ul class="tricks">
                                    <li onclick="renderAboutPokemonCard(${i})" id="about" class="about">About</li>
                                    <li onclick="renderStatsDialogPokemonCard(${i})" id="stats" class="stats">Stats</li>
                                </ul>
                                
                
                            </div>
                        </div>`;
}

function previousPokemon() {
  if (currentPokemonIndex === 0) {
    openCard(pokemons.length);
  } else {
    openCard(currentPokemonIndex);
  }
}

function nextPokemon() {
  if (currentPokemonIndex === pokemons.length - 1) {
    openCard(1);
  } else {
    openCard(currentPokemonIndex + 2);
  }
}
