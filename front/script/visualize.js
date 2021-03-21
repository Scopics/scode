
const COUNTING_SYSTEM = 16;
const INNER_RADIUS = 50;
const MIN_RADIUS = 30;
const MAX_RADIUS = 150;
const LINE_SCALE = MAX_RADIUS / COUNTING_SYSTEM;

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

function drawScode(code) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  quantity = code.length + 4;
  quantity += 4 - ((quantity % 4) || 4);

  for(let i = 0; i < quantity; i++){

    let lineLength = 0;

    if(i % (quantity / 4) === 0){
      if((i + quantity / 4) % quantity === 0){
        lineLength = MIN_RADIUS;
      }
      else {
        lineLength = MIN_RADIUS + MAX_RADIUS;
      }
    }
    else{
      lineLength = MIN_RADIUS + parseInt(code.shift() || 'f', 16) * LINE_SCALE;
    }

    const angle = - Math.PI * 2 * (i / quantity);
    const vector = createHeadingVector(angle)
    const start = multVector(vector, INNER_RADIUS);
    const end = multVector(vector, INNER_RADIUS + MIN_RADIUS + lineLength);
    const lineStart = addVector(mid, start);
    const lineEnd = addVector(mid, end);

    drawline(lineStart, lineEnd);
  }

}
