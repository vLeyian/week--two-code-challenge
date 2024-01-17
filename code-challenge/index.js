let characters = [];

function fetchCharacters() {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            characters = data;
            displayCharacters(characters);
        })
        .catch(error => console.error('Error:', error));
}

function displayCharacters(characters) {
    const listContainer = document.getElementById('character-list');
    listContainer.innerHTML = ''; // Clear previous list
    const list = document.createElement('ul');

    characters.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        listItem.style.cursor = 'pointer';
        listItem.onclick = () => showCharacterDetails(character);
        list.appendChild(listItem);
    });

    listContainer.appendChild(list);
}

function showCharacterDetails(character) {
    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = ''; // Clear previous details

    const name = document.createElement('h2');
    name.textContent = character.name;

    const image = document.createElement('img');
    image.src = character.image;
    image.alt = character.name;
    image.style.width = '200px'; // Adjust size as needed

    const votes = document.createElement('p');
    votes.textContent = `Votes: ${character.votes}`;
    votes.id = 'vote-count';

    const voteButton = document.createElement('button');
    voteButton.textContent = 'Vote';
    voteButton.onclick = () => {
        character.votes++;
        document.getElementById('vote-count').textContent = `Votes: ${character.votes}`;
    };

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Votes';
    resetButton.onclick = () => {
        character.votes = 0;
        document.getElementById('vote-count').textContent = `Votes: ${character.votes}`;
    };

    detailsContainer.appendChild(name);
    detailsContainer.appendChild(image);
    detailsContainer.appendChild(votes);
    detailsContainer.appendChild(voteButton);
    detailsContainer.appendChild(resetButton);
}

// Handling the form submission
document.getElementById('add-character-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newName = document.getElementById('new-name').value;
    const newImage = document.getElementById('new-image').value;

    const newCharacter = {
        id: characters.length + 1,
        name: newName,
        image: newImage,
        votes: 0
    };

    characters.push(newCharacter);
    displayCharacters(characters);

    // Reset the form fields
    document.getElementById('new-name').value = '';
    document.getElementById('new-image').value = '';
});

fetchCharacters();