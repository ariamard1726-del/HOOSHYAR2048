document.addEventListener("DOMContentLoaded", () => {
  const size = 4;
  const grid = document.querySelectorAll(".grid-cell");

  // تبدیل گرید به آرایه
  function getGrid() {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr[i] = [];
      for (let j = 0; j < size; j++) {
        let cell = grid[i * size + j];
        arr[i][j] = cell.textContent === "" ? 0 : parseInt(cell.textContent);
      }
    }
    return arr;
  }

  function setGrid(arr) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let cell = grid[i * size + j];
        cell.textContent = arr[i][j] === 0 ? "" : arr[i][j];
      }
    }
  }

  // اضافه کردن عدد جدید
  function addNumber(arr) {
    let empty = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (arr[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      let [x, y] = empty[Math.floor(Math.random() * empty.length)];
      arr[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  // حرکت و ترکیب
  function slide(row) {
    row = row.filter(val => val); // حذف صفرها
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }
    row = row.filter(val => val);
    while (row.length < size) {
      row.push(0);
    }
    return row;
  }

  function moveLeft(arr) {
    for (let i = 0; i < size; i++) {
      arr[i] = slide(arr[i]);
    }
    return arr;
  }

  function moveRight(arr) {
    for (let i = 0; i < size; i++) {
      arr[i] = slide(arr[i].reverse()).reverse();
    }
    return arr;
  }

  function moveUp(arr) {
    for (let j = 0; j < size; j++) {
      let col = [];
      for (let i = 0; i < size; i++) col.push(arr[i][j]);
      col = slide(col);
      for (let i = 0; i < size; i++) arr[i][j] = col[i];
    }
    return arr;
  }

  function moveDown(arr) {
    for (let j = 0; j < size; j++) {
      let col = [];
      for (let i = 0; i < size; i++) col.push(arr[i][j]);
      col = slide(col.reverse()).reverse();
      for (let i = 0; i < size; i++) arr[i][j] = col[i];
    }
    return arr;
  }

  // شروع بازی
  let arr = getGrid();
  addNumber(arr);
  addNumber(arr);
  setGrid(arr);

  document.addEventListener("keydown", (e) => {
    let old = JSON.stringify(arr);
    if (e.key === "ArrowLeft") arr = moveLeft(arr);
    if (e.key === "ArrowRight") arr = moveRight(arr);
    if (e.key === "ArrowUp") arr = moveUp(arr);
    if (e.key === "ArrowDown") arr = moveDown(arr);
    if (JSON.stringify(arr) !== old) {
      addNumber(arr);
      setGrid(arr);
    }
  });
});