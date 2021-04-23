const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const MIN_RADIUS = canvasWidth * 0.1;
const MAX_RADIUS = canvasWidth * 0.3;
const INNER_RADIUS = canvasWidth * 0.1;
const MAX_ANGLE = Math.PI * 2;
const QUARTERS = 4;
const bgColor = '#2d2d2d';

const mid = {
  x: canvasWidth / 2,
  y: canvasWidth / 2
};

function fillScode(fillColor = bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScode(code, bg = '#fff', color = '#000') {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = color;

  quantity = code.length;
  const maxItem = Math.max(...code);
  const scale = MAX_RADIUS / maxItem;
  if (quantity % QUARTERS !== 0) {
    console.log('rays are not divided by 4');
    return;
  }
  
  for(let i = 0; i < quantity; i++){

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
