document.addEventListener('DOMContentLoaded', () => {


let challengeAnimals = [];
let waitingAnimals = [];

const resultsWindow = document.getElementById("output-resolution")
const fightButton = document.getElementById("fight-button")
const converseButton = document.getElementById("converse-button")

const meadow = document.getElementById('meadow');
const infoPanel = document.getElementById('animal-info');
const waitingArea = document.getElementById('waiting-area').querySelector(".animals-container")
const challengeArena = document.getElementById('challenge-arena').querySelector(".animals-container")

// results of the fight or the conversation occur here

function createAnimalElement(animal, parent) {
    const img = document.createElement("img")
    img.src = `assets/${animal.image}`;
    img.alt = animal.name;
    img.className = 'animal';

    img.style.width = '100px';

    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.8)';
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });

    img.addEventListener('click', () => {
        infoPanel.textContent = `${animal.name}: ${animal.info}`;
    });

    parent.appendChild(img);
    console.log("animals appended")

}

// FETCH ANIMALS FROM DB

fetch('http://localhost:3000/animals')
        .then(response => response.json())
        .then(animals => {
            console.log("fetched data:", animals);
            const shuffledAnimals = animals.sort( () => 0.5 - Math.random());


            // Update the global variables, whereas below we just created new ones
            challengeAnimals = shuffledAnimals.slice(0,2);
            waitingAnimals = shuffledAnimals.slice(2);

            console.log("Challenge animals:", challengeAnimals);
            console.log("Waiting animals:", waitingAnimals);

            // const challengeAnimals = shuffledAnimals.slice(0, 2);
        
            // const waitingAnimals = shuffledAnimals.slice(2);

            // Clear exisiting animals
            challengeArena.innerHTML = '';
            waitingArea.innerHTML = '';

            // Add animals to their areas
            challengeAnimals.forEach(animal => createAnimalElement(animal, challengeArena));
            waitingAnimals.forEach(animal => createAnimalElement(animal, waitingArea));

            // Set up button listeners after we have the animals
            setupButtonListeners();

        });

function setupButtonListeners() {
    fightButton.addEventListener('click', () => {
        if (challengeAnimals.length >= 2) {
            fightAnimals(challengeAnimals[0], challengeAnimals[1]);
        }
    })
    
    converseButton.addEventListener('click', () => {
        if (challengeAnimals.length >= 2) {
            converseAnimals(challengeAnimals[0], challengeAnimals[1]);
        }
    
    })
            console.log("Challenge animals:", challengeAnimals);
            console.log("Waiting animals:", waitingAnimals);
}
  
// ANIMALS INTERACT

async function findInteraction(animal1, animal2, type) {
    try {
        console.log(`Finding ${type} interaction for animals:`, animal1.id, animal2.id);
        const pairId1 = `${animal1.id}-${animal2.id}`;
        const pairId2 = `${animal2.id}-${animal1.id}`;
        console.log('Looking for pairs', pairId1, 'or', pairId2);

        const response = await fetch('http://localhost:3000/interactions');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log('Received data:', data);

        const interactions = data[type]; //fights or conversations
        console.log('Interactions for', type, ':', interactions);

        return interactions.find(interaction => 
            interaction.pair === pairId1 || interaction.pair === pairId2
        );
    } catch (error) {
        console.error('Error in findInteraction:', error);
        throw error;
    }
    }
    
        // console.log('Found interaction:', foundInteraction);
        // return foundInteraction;
        
        // .catch(error => {
        //     console.error('Error in findInteraction:', error);
        //     throw error;
        // });
        
async function fightAnimals(animal1, animal2) {
    try {
        const interaction = await findInteraction(animal1, animal2, 'fights');
        const outputDiv = document.getElementById('output-resolution');

        console.log('Output div found:', outputDiv);

        if (!outputDiv) {
            throw new Error('Output resolution div not found');
        }

        if (interaction) {
            outputDiv.textContent = interaction.outcome;
        } else {
            outputDiv.textContent = 'These animals have never fought before!';
        } 
    } catch (error) {
            console.error('Error in fight:', error);
        }
}

    // console.log('Fight initiated between:', animal1.name, 'and', animal2.name)

async function converseAnimals(animal1, animal2) {
    try {
        const interaction = await findInteraction(animal1, animal2, 'conversations');
        const outputDiv = document.getElementById('output-resolution');

        if (!outputDiv) {
            throw new Error('Output resolution div not found');
        }

        if (interaction) {
            outputDiv.textContent = interaction.outcome;
        } else {
            outputDiv.textContent = 'These animals have never had a conversation before.';
        }
    } catch (error) {
        console.error('Error in conversation;', error);
    }
}



console.log('waitingArea container:', waitingArea)
console.log('challengeArena container:', challengeArena)

// .catch(error = console.error('Error:', error));

// })

//buttons
// fight, talk, new contest

});