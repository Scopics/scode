const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const mid = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

const createHeadingVector = (a) => ({
  x: Math.cos(a),
  y: Math.sin(a)
});

const multVector = (vector, n) => ({
  x: vector.x * n,
  y: vector.y * n
});

const addVector = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y
});

function drawline(a, b){
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}
