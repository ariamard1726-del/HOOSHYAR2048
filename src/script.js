document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelectorAll(".grid-cell");

  // تابع برای قرار دادن عدد جدید در خانه خالی
  function addNumber() {
    let emptyCells = [];
    grid.forEach((cell, index) => {
      if (cell.textContent === "") emptyCells.push(index);
    });
    if (emptyCells.length > 0) {
      let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[randomIndex].textContent = Math.random() < 0.9 ? 2 : 4;
    }
  }

  // شروع بازی با دو عدد
  addNumber();
  addNumber();

  // حرکت کاشی‌ها
  document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      move(e.key);
      addNumber();
    }
  });

  function move(direction) {
    // فعلاً فقط پاک کردن همه خانه‌ها برای تست
    grid.forEach(cell => {
      if (cell.textContent !== "") {
        cell.textContent = ""; // بعداً منطق ترکیب اضافه می‌شود
      }
    });
    console.log("حرکت شد:", direction);
  }
});