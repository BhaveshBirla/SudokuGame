const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const initialBoard = [
  [5, 3, '', 6, '', 8, 9, '', 2],
  [6, '', 2, '', 9, 5, '', 4, ''],
  ['', 9, '', 3, '', 2, '', '', 7],
  ['', 5, '', '', 6, '', 4, 2, 3],
  [4, '', 6, 8, '', 3, 7, '', 1],
  [7, 1, '', '', 2, '', '', 5, ''],
  [9, '', '', 5, '', 7, 2, 8, ''],
  ['', 8, '', 4, 1, '', 6, '', ''],
  [3, '', 5, 2, '', 6, '', 7, 9]
];

const sudokuSolution = [
    [4, 5, 2, 3, 7, 6, 9, 8, 1],
    [3, 7, 6, 9, 8, 1, 4, 5, 2],
    [9, 8, 1, 4, 5, 2, 3, 7, 6],
    [5, 2, 3, 7, 6, 9, 8, 1, 4],
    [7, 6, 9, 8, 1, 4, 5, 2, 3],
    [8, 1, 4, 5, 2, 3, 7, 6, 9],
    [2, 3, 7, 6, 9, 8, 1, 4, 5],
    [6, 9, 8, 1, 4, 5, 2, 3, 7],
    [1, 4, 5, 2, 3, 7, 6, 9, 8]
];

const sudokuPuzzle = [
    [4, '', 2, 3, '', '', '', 8, 1],
    ['', '', 6, '', 8, '', '', '', ''],
    [9, '', 1, '', '', '', 3, '', 6],
    [5, '', 3, 7, 6, 9, 8, 1, 4],
    ['', '', 9, 8, 1, '', '', 2, 3],
    ['', 1, 4, 5, '', 3, '', '', ''],
    [2, 3, '', '', '', 8, 1, 4, 5],
    [6, 9, 8, 1, 4, 0, 2, '', 7],
    ['', '', '', '', 3, '', '', 9, '']
  ];

function createBoard(board) {
  const table = document.getElementById('sudokuBoard');
  table.innerHTML = '';
  board.forEach((row, rIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell, cIndex) => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.value = cell;
      input.maxLength = 1;
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      if (cell !== '') input.disabled = true;
      td.appendChild(input);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

function checkSolution() {
  const inputs = document.querySelectorAll('input');
  let correct = true;
  inputs.forEach((input, index) => {
    const r = Math.floor(index / 9);  // ye math.floor function float value ko integer me convert kar deta hai
    const c = index % 9;
    if(ans==false){
      if (Number(input.value) !== solution[r][c]) {
        input.style.backgroundColor = 'lightcoral';
        correct = false;
      } else {
        input.style.backgroundColor = 'lightgreen';
      }
    }
    else{
      if (Number(input.value) !== sudokuSolution[r][c]) {
        input.style.backgroundColor = 'lightcoral';
        correct = false;
      } else {
        input.style.backgroundColor = 'lightgreen';
      }
    }
  });
  if (correct) alert('Congratulations! You solved it.');
}
let ans=true;
function newGame() {
  if(ans==true){
    createBoard(initialBoard);
    ans=false;
  }
  else{
    createBoard(sudokuPuzzle);
    ans=true;
  }
}
function seeSolution() {
  if(ans==false){
    createBoard(solution);
  }
  else{
   createBoard(sudokuSolution);
  }
}

window.onload = newGame;
