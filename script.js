const emojis = [
  { type: 'flower', emoji: '🌷' },
  { type: 'tree',   emoji: '🌳' },
  { type: 'house',  emoji: '🏡' },
  { type: 'leaf',   emoji: '🌱' }
];
const gridSize = 7;

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// Pro zámek, vždy bude mít stejný emoji pod zámkem!
function createTile(emojiObj, locked = false) {
  const div = document.createElement('div');
  div.className = `tile ${emojiObj.type}${locked ? ' locked' : ''}`;
  div.innerHTML = `
    <span class="emoji">${emojiObj.emoji}</span>
    ${locked ? `<span class="lock">🔒</span>` : ''}
  `;
  return div;
}

// Generování hrací plochy:
function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  // Pozice pro zámky – náhodně 10 zamčených polí:
  let lockPositions = [];
  while (lockPositions.length < 10) {
    let idx = Math.floor(Math.random() * (gridSize * gridSize));
    if (!lockPositions.includes(idx)) lockPositions.push(idx);
  }
  for (let i = 0; i < gridSize * gridSize; i++) {
    const emojiObj = randomEmoji();
    let locked = lockPositions.includes(i);
    board.appendChild(createTile(emojiObj, locked));
  }
}

window.onload = renderBoard;
window.onresize = () => setTimeout(renderBoard, 300);