const DIAGONAL = Math.sqrt(2);

const MAX_PATH_ITERATIONS = 4000;

const PIX_DATA_LEN = 4;

const BLACKWHITE_THRESHOLD = 80;
const BLACKWHITE_MID_THRESHOLD = 128;


const cvs1 = document.getElementById('canvas1');
const cvs2 = document.getElementById('canvas2');
const ctx1 = cvs1.getContext('2d');
const ctx2 = cvs2.getContext('2d');

cvs1.width = 700;
cvs1.height = 700;
const videoW = 933;
const videoH = 700;
const videoOffsetX = (cvs1.width - videoW) / 2;
const videoOffsetY = (cvs1.height - videoH) / 2;


let correctPercentage = [
    {min: 0, max: 0}, 
    {min: 5, max : 10}, 
    {min: 0, max: 0}
];

let imageMid = {x: 350, y: 350}

radiuses = [10, 100, 300];

const circleWidth = 0.5;

const img1 = new Image();

let img = new Image();
img.src = './assets/img/scode_example2.png';

function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const square = (x) => x * x;

const checkCircle = (x, y, radius) => Math.abs(Math.sqrt(square(x - imageMid.x)  + square(y - imageMid.y)) - radius) < circleWidth;

function blackwhite(img) {
    const picLength = img.width * img.height;

    for (let i = 0; i < picLength * PIX_DATA_LEN; i += PIX_DATA_LEN) {
        const R = img.data[i];
        const G = img.data[i + 1];
        const B = img.data[i + 2];

        brightness = parseInt((R + G + B) / 3);
        white = 255 * (brightness >= BLACKWHITE_THRESHOLD ? 1 : 0);

        img.data[i] = white;
        img.data[i + 1] = white;
        img.data[i + 2] = white;
    }
}

function checkIfScode(matrix){
    const amounts = [0, 0, 0];
    const blackAmounts = [0, 0, 0];

    const h = matrix.length;
    const w = matrix[0].length;

    for(let y = 0; y < h; y++){
        for(let x = 0; x < w; x++){
            const pix = matrix[x][y];
            for(let i = 0; i < 3; i++){
                if(checkCircle(x, y, radiuses[i])){
                    amounts[i]++;
                    if(pix){
                        blackAmounts[i]++;
                    }
                }
            }
        }
    }

    let percents = [0, 0, 0];
    percents = percents.map((val, i) => blackAmounts[i] / amounts[i] * 100);

    console.log('Circles black / white pixels percentage:');
    console.log(percents[0], percents[1], percents[2]);
    
    for(let i = 0; i < 3; i++){
        if(percents[i] < correctPercentage[i].min || percents[i] > correctPercentage[i].max){
           return false; 
        }
    }
    return true;
}

function getMatrix(img){
    const matrix = [];
    const row = img.width;
    const column = img.height;
    for(let j = 0; j < column; j ++){
        matrix[j] = [];
        for(let i = 0; i < row; i++){
            const ind = PIX_DATA_LEN * j * row + PIX_DATA_LEN * i;
            const pixel = img.data[ind] >= BLACKWHITE_MID_THRESHOLD ? 0 : 1;
            matrix[j].push(pixel);
        }
    }
    return matrix;
}

function exploreLine(matrix, startPos = new Vector2()){
    const h = matrix.length;
    const w = matrix[0].length;
    const openedNodes = [];
    const closedNodes = [];
    if(!matrix[startPos.y][startPos.x]){
        console.log('fail');
        return null;
    }
    const startNode = { pos: startPos, dist: 0, parent: null };
    openedNodes.push(startNode);
    let curr = startNode;
    let counter = 0;
    let bestNode = curr;
    while(openedNodes.length > 0 && counter < MAX_PATH_ITERATIONS){
        counter++;
        if(counter === MAX_PATH_ITERATIONS) throw(new Error('too many iterations'));
        let bestOpenNode = openedNodes[0];
        for (let i = 1; i < openedNodes.length; i++){
            let nextNode = openedNodes[i];
            if (nextNode.dist > bestOpenNode.dist){
               bestOpenNode = nextNode;
            }
        }
        if(bestOpenNode.dist > bestNode.dist){
            bestNode = bestOpenNode;
        }

        curr = bestOpenNode;
        openedNodes.splice(openedNodes.indexOf(curr), 1);
        closedNodes.push(curr);
        for(let j = -1; j <= 1; j++){
            for(let i = -1; i <= 1; i++){
                if((i !== 0 || j !== 0)){
                    const x = curr.pos.x + i;
                    const y = curr.pos.y + j;
                    if(x < 0 || y < 0 || x >= w || y >= h) continue;
                    if(!matrix[y][x]) continue;
                    let nodeClosed = false;
                    for (const node of closedNodes){
                      if (node.pos.x === curr.pos.x + i && node.pos.y === curr.pos.y + j) {
                        nodeClosed = true;
                        break;
                      }
                    }
                    const newG = curr.dist + (Math.abs(i) + Math.abs(j) === 1 ? 1 : DIAGONAL);
                    
                    if (!nodeClosed){
                        const neighbour = { pos: curr.pos.add(new Vector2(i, j)), dist: newG , parent: curr };

                        let nodeOpened = false;
                        for (const node of openedNodes){
                            if (Vector2.equals(node.pos, neighbour.pos)){
                                nodeOpened = true;
                            }
                        }   
                        if(!nodeOpened || newG < neighbour.dist){
                            neighbour.dist = newG;
                            if(!nodeOpened) openedNodes.push(neighbour);
                        }
                    }
                }
            }
        }
        if (openedNodes.length === 0){
            const res = Object.create(null);
            let parent = bestNode;
            while (parent.parent) {
                parent = parent.parent;
                if(!parent.parent) res.start = parent.pos;
            }
            res.end = bestNode.pos;
            return res;
        }
    }
}

function getLine(matrix, startPos){
    const line = exploreLine(matrix, startPos);
    const endPos = line.end;
    const line2 = exploreLine(matrix, endPos);

    ctx2.strokeStyle = 'green';
    ctx2.lineWidth = 4;

    drawline(ctx2, line2.start, line2.end);

    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 2;

    drawCircle(ctx2, line2.start);
    drawCircle(ctx2, line2.end);

    return line2;
}

function findDistanceToLine(point, linePos, lineNormVector){

    const A = lineNormVector.x;
    const B = lineNormVector.y;
    const C = - A * linePos.x - B * linePos.y;

    return Math.abs(A * point.x + B * point.y + C) / Math.sqrt(A * A + B * B);
}

function findlines(matrix){
    const lines = [];
    const h = matrix.length;
    const w = matrix[0].length;

    for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
            if(!matrix[j][i]) continue;

            let lineExists = false;

            for(const line of lines){

                const v = line.end.subtract(line.start);
                const n = v.rotate(Math.PI / 2);

                const point = new Vector2(i, j);

                const dist = findDistanceToLine(point, line.start, n);

                const mid = line.start.add(line.end).divide(2);

                const dist2 = findDistanceToLine(point, mid, v);

                const border = 3;
                const len = v.length() / 2;
                if(dist < border && dist2 <= len + border){
                    lineExists = true;
                    break;
                }
            }

            if(lineExists) continue;

            const line = getLine(matrix, new Vector2(i, j));
            lines.push(line);
        }
    }
    console.log('Found lines: ' + lines.length);
}

function onLoad(){
    cvs2.width = img.width;
    cvs2.height = img.height;
    imageMid.x = img.width / 2;
    imageMid.y = img.height / 2;
    ctx2.imageSmoothingEnabled = false;
    clearCanvas(cvs2);
    ctx2.drawImage(img, 0, 0);

    img = ctx2.getImageData(0, 0, img.width, img.height);
    
    blackwhite(img);
    ctx2.putImageData(img, 0, 0);

    const matrix = getMatrix(img);

    if(checkIfScode(matrix)){
        console.log('Image is scode!');
    } else {
        console.log('Image is not scode');        
    }

    findlines(matrix);

    ctx2.strokeStyle = 'red';

    for(let i = 0; i < 3; i++){
        drawCircle(ctx2, imageMid, radiuses[i]);
    }
}

document.getElementById('makePhoto').addEventListener('click', function() {
    clearCanvas(cvs1);
    ctx1.drawImage(video, videoOffsetX, videoOffsetY, videoW, videoH);
    img = new Image();
    img.src = cvs1.toDataURL('image/png', 1);
    img.onload = () => {
        onLoad();
    }
});

img.onload = () => {
    cvs1.width = img.height;
    cvs1.height = img.width;
    ctx1.drawImage(img, 0, 0);
    onLoad();
};
