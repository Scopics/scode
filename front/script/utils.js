const CIRCLE_START = 0;
const CIRCLE_END = 2 * Math.PI;

function drawline(ctx, a, b){
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawCircle(ctx, pos, radius = 3){
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, CIRCLE_START, CIRCLE_END);
  ctx.stroke();
}

class Vector2 {
  constructor(_x = 0, _y = 0) {
    this.x = _x;
    this.y = _y;
  }

  static getAngle = (vector) => Math.acos(vector.x / vector.length()) * Math.sign(vector.y);

  static makeFromAngle = (magnitude, _angle) => {
    return new Vector2(Math.cos(_angle) * magnitude, Math.sin(_angle) * magnitude);
  }

  static equals (vector1, vector2){
    return vector1.x === vector2.x && vector1.y === vector2.y;
  }

  length = () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  normalized = () =>{
    return new Vector2(this.x / this.length(), this.y / this.length())
  }
  add = (_vector) => {
    return new Vector2(this.x + _vector.x, this.y + _vector.y)
  }
  subtract = (_vector) => {
    return new Vector2(this.x - _vector.x, this.y - _vector.y)
  }
  neg = () => {
    return new Vector2(-this.x, -this.y)
  }

  rotate = (_angle) => {
      return Vector2.makeFromAngle(this.length(), Vector2.getAngle(this) + _angle);
  }

  multiply = (n) => new Vector2(this.x * n, this.y * n);

  divide = (n) => new Vector2(this.x / n, this.y / n);

  ToString = () => {
    return '{ ' + Math.round(this.x) + ', ' + Math.round(this.y) + ' }';
  }

}
