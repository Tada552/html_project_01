/* -------------------------
   カウンター
------------------------- */
let totalQuestions = 0;
let correctAnswers = 0;
let streak = 0;

function updateStats() {
  statsBox.textContent =
    `出題数: ${totalQuestions}\n正解数: ${correctAnswers}\n連続正解: ${streak}`;
}

/* -------------------------
   問題生成（2進数は7桁以内）
------------------------- */
let currentQuestion = null;
let currentAnswer = null;

// 1〜127（7ビット）を2進数に
function randomBinary7bit() {
  return (Math.floor(Math.random() * 127) + 1).toString(2);
}

// 1〜15（0は使わない）
function randomDecimalSmall() {
  return Math.floor(Math.random() * 15) + 1;
}

function generateQuestion() {
  const type = Math.floor(Math.random() * 4);
  // 0: 2→10, 1: 10→2, 2: 差(10進), 3: 計算して2進で答える

  if (type === 0) {
    // 2進 → 10進
    const bin = randomBinary7bit();
    currentQuestion = `次の 2進数を 10進数に変換せよ:\n${bin}`;
    currentAnswer = parseInt(bin, 2).toString();

  } else if (type === 1) {
    // 10進 → 2進
    const dec = randomDecimalSmall();
    currentQuestion = `次の 10進数を 2進数に変換せよ:\n${dec}`;
    currentAnswer = dec.toString(2);

  } else if (type === 2) {
    // 差の計算（答えは10進）
    let a = randomDecimalSmall();
    let b = randomDecimalSmall();
    const A = Math.max(a, b);
    const B = Math.min(a, b);

    const binA = A.toString(2); // 7桁以内に収まる

    currentQuestion =
      `次の差を求めよ（答えは10進数）:\n2進数の ${binA} と 10進数の ${B} の差`;

    currentAnswer = (A - B).toString();

  } else {
    // 新規：計算して答えを2進数で求める
    let a = randomDecimalSmall();
    let b = randomDecimalSmall();
    const A = Math.max(a, b);
    const B = Math.min(a, b);

    const op = ["+","-"][Math.floor(Math.random()*2)];

    const binA = A.toString(2); // 7桁以内

    currentQuestion =
      `次の式を計算し、答えを2進数で求めよ:\n2進数の ${binA} ${op} 10進数の ${B}`;

    const result10 = eval(`${A} ${op} ${B}`);
    currentAnswer = result10.toString(2); // 2進数で答える
  }

  totalQuestions++;
  updateStats();

  questionBox.style.display = "block";
  questionBox.textContent = currentQuestion;
  answerResult.textContent = "";
  answerInput.value = "";
}

document.getElementById("newQuestionBtn").onclick = generateQuestion;

/* -------------------------
   答え合わせ
------------------------- */
document.getElementById("checkAnswerBtn").onclick = () => {
  const userAns = answerInput.value.trim();

  if (!currentQuestion) {
    answerResult.textContent = "まず問題を出してください。";
    return;
  }
  if (!userAns) {
    answerResult.textContent = "答えを入力してください。";
    return;
  }

  if (userAns === currentAnswer) {
    answerResult.textContent = "正解！ よくできました。";
    correctAnswers++;
    streak++;
  } else {
    answerResult.textContent = `不正解。\n正しい答え: ${currentAnswer}`;
    streak = 0;
  }

  updateStats();
};