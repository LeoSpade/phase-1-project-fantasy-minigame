const meadow = document.getElementById('meadow');
const infoPanel = document.getElementById('animal-info');
const waitingArea = document.getElementById('waiting-area').querySelector(".animals-container")
const challengeArena = document.getElementById('challenge-arena').querySelector(".animals-container")

const resultsWindow = document.getElementById("#output-resolution")
const fightButton = document.getElementById("#fight-button")
const converseButton = document.getElementById("#converse-button")


// results of the fight or the conversation occur here


// Event Listeners for buttons

fightButton.addEventListener('click', () => {
    const animal1 = challengeAnimals[0];
    const animal2 = challengeAnimals[1];
    fightAnimals(animal1, animal2);
})

converseAnimals.addEventListener('click', () => {
    const animal1 = challengeAnimals[0];
    const animal2 = challengeAnimals[1];
    converseAnimals(animal1, animal2);

})


function fightAnimals() {
    const fightButton = document.createElement("button")
    fightButton.textContent = "Let's Fight !"
    const img = document.querySelector("#fight-button")



}

function converseAnimals() {
    const converseButton = document.createElement("button")
    converseButton.textContent = "Okay, let's talk this out."
    const img = document.querySelector("#converse-button")


}

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

fetch('http://localhost:3000/animals')
        .then(response => response.json())
        .then(animals => {
            console.log("fetched animals:", animals);
// animals.forEach(animal => {
//     console.log(`Attempting to create image for ${animal.name}`);
//     const img = document.createElement('img');
//     img.src = `../assets/${animal.image}`;
//     console.log(`Image source set to: ${img.src}`);
//     img.alt = animal.name;
//     img.className = 'animal';

            // Shuffle the animals array
    const shuffledAnimals = animals.sort( () => 0.5 - Math.random());

    const challengeAnimals = shuffledAnimals.slice(0, 2);

    const waitingAnimals = shuffledAnimals.slice(2);

    console.log("Challenge animals:", challengeAnimals);
    console.log("Waiting animals:", waitingAnimals);

    // // //Positioning animals 
    // img.style.bottom = `${Math.random() * 30 + 5}%`; // Between 5% and 35% from bottom
    // img.style.left = `${Math.random() * 80 + 10}%`; // Between 10% and 90% from left

    // // // Adjust size based on "vertical" position
    // const scale = 0.5 + parseFloat(img.style.bottom) / 100; // Smaller animals "further away"
    // img.style.width = '100px';  // Adjust size as needed

    challengeAnimals.forEach(animal => createAnimalElement(animal, challengeArena))

    waitingAnimals.forEach(animal => createAnimalElement(animal, waitingArea));
});

console.log('waitingArea container:', waitingArea)
console.log('challengeArena container:', challengeArena)

// .catch(error = console.error('Error:', error));

// })

//buttons
// fight, talk, new contest