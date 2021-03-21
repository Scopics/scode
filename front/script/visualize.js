
const COUNTING_SYSTEM = 16;
const INNER_RADIUS = 50;
const MIN_RADIUS = 30;
const MAX_RADIUS = 150;
const LINE_SCALE = MAX_RADIUS / COUNTING_SYSTEM;
const SERVICE_RAYS = 4;
const QUARTERS = 4;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const mid = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

function drawScode(code) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  quantity = code.length + SERVICE_RAYS;
  quantity += ceilToStep(quantity, QUARTERS)

  for(let i = 0; i < quantity; i++){

    let lineLength = 0;

    const quarter = quantity / QUARTERS;
    const bottom = quantity - quarter;

    if(i % quarter === 0){
      if(i === bottom){
        lineLength = MIN_RADIUS;
      }
      else {
        lineLength = MIN_RADIUS + MAX_RADIUS;
      }
    }
    else{
      lineLength = MIN_RADIUS + parseInt(code.shift() || 'f', COUNTING_SYSTEM) * LINE_SCALE;
    }

    const angle = - Math.PI * 2 * (i / quantity);
    const vector = createHeadingVector(angle)
    const start = multVector(vector, INNER_RADIUS);
    const end = multVector(vector, INNER_RADIUS + MIN_RADIUS + lineLength);
    const lineStart = addVector(mid, start);
    const lineEnd = addVector(mid, end);

    drawline(ctx, lineStart, lineEnd);
  }

}
