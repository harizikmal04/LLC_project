document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    const searchButton = document.getElementById('search-button');
    const wordInput = document.getElementById('word-input');
    const resultContainer = document.getElementById('result-container');
    const addWordButton = document.getElementById('add-word-button');

    searchButton.addEventListener('click', async () => {
        const word = wordInput.value;
        console.log("Search button clicked, word:", word);
        if (!word) return;

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            console.log("Data fetched:", data);
            displayResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            resultContainer.innerHTML = 'Error fetching data.';
        }
    });

    function displayResults(data) {
        console.log("Displaying results for:", data);
        const { word, meanings, phonetics } = data[0];
        const definitions = meanings.map(meaning => 
            `<li><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</li>`
        ).join('');
        const sound = phonetics[0]?.audio ? `<audio controls src="${phonetics[0].audio}"></audio>` : '';

        resultContainer.innerHTML = `
            <h2>${word}</h2>
            ${sound}
            <ul>${definitions}</ul>
        `;
    }

    function addWord(word) {
        console.log("Adding word:", word);
        const words = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        if (!words.includes(word)) {
            words.push(word);
            localStorage.setItem('favoriteWords', JSON.stringify(words));
        }
    }

    addWordButton.addEventListener('click', () => {
        const word = wordInput.value;
        console.log("Add word button clicked, word:", word);
        if (word) {
            addWord(word);
            wordInput.value = '';
        }
    });
});
