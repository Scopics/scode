const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scodeWidth = canvas.width * 0.7;
const MIN_RADIUS = scodeWidth * 0.1;
const MAX_RADIUS = scodeWidth * 0.3;
const INNER_RADIUS = scodeWidth * 0.1;
const MAX_ANGLE = Math.PI * 2;
const QUARTERS = 4;
const defaultBgColor = 'white';

const mid = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

console.log(mid.x, mid.y);

function fillScode(fillColor = defaultBgColor) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScode(code, bg = '#fff', color = '#000') {
  fillScode();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  let quantity = code.length;
  const maxItem = Math.max(...code);
  const scale = MAX_RADIUS / maxItem;
  if (quantity % QUARTERS !== 0) {
    console.log('rays are not divided by 4');
    return;
  }

  for (let i = 0; i < quantity; i++) {
    const len = code.shift();
    lineLength = MIN_RADIUS + len * scale;

    const step = 1 / quantity;

    // to start from top
    const angleOffset = Math.PI / 2;
    const angle = MAX_ANGLE * i * step - angleOffset;

    const vector = createHeadingVector(angle);
    const start = multVector(vector, INNER_RADIUS);
    const end = multVector(vector, INNER_RADIUS + lineLength);
    const lineStart = addVector(mid, start);
    const lineEnd = addVector(mid, end);

    drawline(ctx, lineStart, lineEnd);
  }
}
