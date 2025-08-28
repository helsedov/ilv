const poems = [
    "Солнце светит в окно,\nПтички поют на заре,\nСердце поет тихо,\nГлядя на тебя в тени.",
    "Ветер шепчет мне вслед:\n\"Ты прекрасна, как сон\",\nА я думаю только\nО твоей красоте.",
    "Звезды падают с неба,\nСловно слезы мои,\nКаждая - это память\nО наших мечтах.",
    "Любовь - это чувство,\nЧто греет душу,\nКак весенний лучик,\nПробивающийся сквозь облака."
];

let currentPoemIndex = 0;
const poemElement = document.getElementById('poemText');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function showPoem(index) {
    poemElement.textContent = poems[index];
}

prevButton.addEventListener('click', () => {
    currentPoemIndex = (currentPoemIndex - 1 + poems.length) % poems.length;
    showPoem(currentPoemIndex);
});

nextButton.addEventListener('click', () => {
    currentPoemIndex = (currentPoemIndex + 1) % poems.length;
    showPoem(currentPoemIndex);
});

// Показать первый стих при загрузке
showPoem(currentPoemIndex);
