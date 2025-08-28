const lettersContainer = document.getElementById('lettersContainer');
const messageElement = document.getElementById('message');
const heartsContainer = document.getElementById('heartsContainer');
const gameContainer = document.getElementById('gameContainer');

const targetWord = "ILOVEYOU";
const letters = targetWord.split('').sort(() => Math.random() - 0.5);

let draggedElement = null;

// Создаем буквы
letters.forEach((letter, index) => {
    const letterElement = document.createElement('div');
    letterElement.className = 'letter';
    letterElement.textContent = letter;
    letterElement.draggable = true;
    letterElement.dataset.index = index;
    
    letterElement.addEventListener('dragstart', (e) => {
        draggedElement = letterElement;
        setTimeout(() => letterElement.classList.add('dragging'), 0);
    });
    
    letterElement.addEventListener('dragend', () => {
        letterElement.classList.remove('dragging');
        draggedElement = null;
    });
    
    lettersContainer.appendChild(letterElement);
});

// Добавляем обработчики для контейнера
lettersContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(lettersContainer, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (draggable) {
        if (afterElement == null) {
            lettersContainer.appendChild(draggable);
        } else {
            lettersContainer.insertBefore(draggable, afterElement);
        }
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.letter:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Проверяем правильность расположения букв
function checkWord() {
    const currentLetters = [...lettersContainer.querySelectorAll('.letter')];
    const currentWord = currentLetters.map(el => el.textContent).join('');
    
    if (currentWord === targetWord) {
        showMessage();
        showHearts();
    }
}

// Добавляем проверку при каждом перемещении
lettersContainer.addEventListener('dragend', checkWord);

function showMessage() {
    messageElement.textContent = "I LOVE YOU";
    messageElement.classList.add('show');
    gameContainer.style.backgroundColor = 'transparent';
    gameContainer.style.boxShadow = 'none';
}

function showHearts() {
    heartsContainer.style.display = 'block';
    
    for (let i = 0; i < 50; i++) {
        createHeart();
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.classList.add('heart');
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.opacity = Math.random();
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
                            }
