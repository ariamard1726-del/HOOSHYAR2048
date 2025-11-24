body {
  font-family: "Tahoma", sans-serif;
  text-align: center;
  background-color: #faf8ef;
  color: #776e65;
}

h1 {
  font-size: 32px;
  margin: 20px 0;
  color: #333;
}

#grid-container {
  width: 320px;
  height: 320px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  background-color: #bbada0;
  padding: 10px;
  border-radius: 10px;
}

.grid-cell {
  background-color: #cdc1b4;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #776e65;
}

/* رنگ‌های مخصوص کاشی‌ها */
.grid-cell[data-value="2"] { background-color: #eee4da; color: #776e65; }
.grid-cell[data-value="4"] { background-color: #ede0c8; color: #776e65; }
.grid-cell[data-value="8"] { background-color: #f2b179; color: #f9f6f2; }
.grid-cell[data-value="16"] { background-color: #f59563; color: #f9f6f2; }
.grid-cell[data-value="32"] { background-color: #f67c5f; color: #f9f6f2; }
.grid-cell[data-value="64"] { background-color: #f65e3b; color: #f9f6f2; }
.grid-cell[data-value="128"] { background-color: #edcf72; color: #f9f6f2; }
.grid-cell[data-value="256"] { background-color: #edcc61; color: #f9f6f2; }
.grid-cell[data-value="512"] { background-color: #edc850; color: #f9f6f2; }
.grid-cell[data-value="1024"] { background-color: #edc53f; color: #f9f6f2; }
.grid-cell[data-value="2048"] { background-color: #edc22e; color: #f9f6f2; }
let score = 0;

function updateScore(points) {
  score += points;
  document.getElementById("score").textContent = score;
}

function checkWin(arr) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (arr[i][j] === 2048) {
        document.getElementById("message").textContent = "🎉 تبریک! شما برنده شدید!";
        return true;
      }
    }
  }
  return false;
}

function checkGameOver(arr) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (arr[i][j] === 0) return false;
      if (j < size - 1 && arr[i][j] === arr[i][j + 1]) return false;
      if (i < size - 1 && arr[i][j] === arr[i + 1][j]) return false;
    }
  }
  document.getElementById("message").textContent = "❌ بازی تمام شد!";
  return true;
}

function setGrid(arr) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = grid[i * size + j];
      if (arr[i][j] === 0) {
        cell.textContent = "";
        cell.removeAttribute("data-value");
      } else {
        cell.textContent = arr[i][j];
        cell.setAttribute("data-value", arr[i][j]);

        // انیمیشن ظاهر شدن
        cell.classList.add("new");
        setTimeout(() => cell.classList.remove("new"), 200);
      }
    }
  }
}
let coins = 0;

function updateCoins(amount) {
  coins += amount;
  document.getElementById("coins").textContent = coins;
}
if (row[i] === row[i + 1]) {
  row[i] *= 2;
  updateScore(row[i]); // امتیاز
  updateCoins(1);      // هر ترکیب یک سکه
  row[i + 1] = 0;
}