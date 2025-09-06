// Quick Quiz – vanilla JS
// Edit QUESTIONS below to add your own!

const QUESTIONS = [
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C++", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "Who was the first person to climb Mount Everest?"",
    choices: ["Tenzing Norgay & Edmund Hillary", "Reinhold Messner", "George Mallory", "Anatoli Boukreev"],
    answer: 1
  },
  {
    question: "Which is the largest desert in the world?",
    choices: ["Sahara", "Gobi", "Antarctic Desert", "Kalahari"],
    answer: 1
  },
  {
    question: "Which country invented paper?",
    choices:["India", "China", "Egypt", "Greece"],
    answer: 2
  },
  {
    question: "If 3x + 5 = 20, what is the value of x?",
    choices: ["3", "4", "5", "6"],
    answer: 3
  }
];

// --- State ---
let current = 0;
let score = 0;

const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');

const questionNumber = document.getElementById('question-number');
const questionTotal  = document.getElementById('question-total');
const questionText   = document.getElementById('question-text');
const choicesList    = document.getElementById('choices');
const scorePill      = document.getElementById('score-pill');
const progressBar    = document.getElementById('progress-bar');

const startBtn    = document.getElementById('start-btn');
const nextBtn     = document.getElementById('next-btn');
const restartBtn  = document.getElementById('restart-btn');
const playAgainBtn= document.getElementById('play-again-btn');
const resultSummary = document.getElementById('result-summary');
const shareLink = document.getElementById('share-link');

questionTotal.textContent = QUESTIONS.length.toString();

// --- Helpers ---
function show(el)  { el.classList.remove('hidden'); }
function hide(el)  { el.classList.add('hidden'); }
function disable(el){ el.setAttribute('disabled', ''); }
function enable(el) { el.removeAttribute('disabled'); }

function updateProgress() {
  const pct = Math.round((current / QUESTIONS.length) * 100);
  progressBar.style.width = pct + '%';
}

function renderQuestion() {
  const q = QUESTIONS[current];
  questionNumber.textContent = (current + 1).toString();
  questionText.textContent   = q.question;
  choicesList.innerHTML = '';

  q.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleChoice(idx));
    li.appendChild(btn);
    choicesList.appendChild(li);
  });

  disable(nextBtn);
  scorePill.textContent = `Score: ${score}`;
  updateProgress();
}

function handleChoice(idx) {
  const q = QUESTIONS[current];
  const buttons = Array.from(document.querySelectorAll('.choice'));
  buttons.forEach(b => disable(b));
  const correctIdx = q.answer;

  buttons[idx].classList.add(idx === correctIdx ? 'correct' : 'wrong');
  buttons[correctIdx].classList.add('correct');

  if (idx === correctIdx) score++;
  scorePill.textContent = `Score: ${score}`;
  enable(nextBtn);
}

function startQuiz() {
  current = 0;
  score = 0;
  hide(startScreen);
  hide(resultScreen);
  show(quizScreen);
  renderQuestion();
}

function nextQuestion() {
  current++;
  if (current < QUESTIONS.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  hide(quizScreen);
  show(resultScreen);
  const pct = Math.round((score / QUESTIONS.length) * 100);
  resultSummary.textContent = `You scored ${score} out of ${QUESTIONS.length} (${pct}%).`;
  shareLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('I scored ' + pct + '% on Quick Quiz!')}`;
}

function restartQuiz() {
  startQuiz();
}

// --- Events ---
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
playAgainBtn.addEventListener('click', restartQuiz);

// Focus main for accessibility after load
window.addEventListener('load', () => {
  document.getElementById('app').focus();
});
