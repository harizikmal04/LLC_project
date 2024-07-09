document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    const wordListSection = document.getElementById('word-list-section');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const editWordInput = document.getElementById('edit-word-input');
    const saveEditButton = document.getElementById('save-edit-button');

    let editWordIndex = null;

    function loadWords() {
        console.log("Loading favorite words");
        const words = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        const wordList = document.createElement('ul');
        wordList.id = 'word-list';
        wordList.innerHTML = words.map((word, index) => `
            <li>
                ${word} 
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="remove-button" data-index="${index}">Remove</button>
            </li>
        `).join('');
        wordListSection.innerHTML = ''; // Clear any previous content
        wordListSection.appendChild(wordList);
    }

    function removeWord(index) {
        console.log("Removing word at index:", index);
        let words = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        words.splice(index, 1);
        localStorage.setItem('favoriteWords', JSON.stringify(words));
        loadWords();
    }

    function editWord(index) {
        console.log("Editing word at index:", index);
        const words = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        editWordInput.value = words[index];
        editModal.style.display = 'block';
        editWordIndex = index;
    }

    function saveEditWord() {
        console.log("Saving edited word at index:", editWordIndex);
        const words = JSON.parse(localStorage.getItem('favoriteWords')) || [];
        words[editWordIndex] = editWordInput.value;
        localStorage.setItem('favoriteWords', JSON.stringify(words));
        editModal.style.display = 'none';
        loadWords();
    }

    closeModal.addEventListener('click', () => {
        console.log("Close modal clicked");
        editModal.style.display = 'none';
    });

    saveEditButton.addEventListener('click', () => {
        console.log("Save edit button clicked");
        saveEditWord();
    });

    wordListSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.getAttribute('data-index');
            removeWord(index);
        } else if (event.target.classList.contains('edit-button')) {
            const index = event.target.getAttribute('data-index');
            editWord(index);
        }
    });

    // Initial load
    loadWords();
});
