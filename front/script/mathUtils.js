
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

const ceilToStep = (number, step) => step - ((number % step) || step);
