const DIAGONAL = Math.sqrt(2);

const CIRCLE_START = 0;
const CIRCLE_END = 2 * Math.PI;
const PIXEL_DATA_LENGTH = 4;

const BLACKWHITE_THRESHOLD = 80;

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

    for (let i = 0; i < picLength * PIXEL_DATA_LENGTH; i += PIXEL_DATA_LENGTH) {
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
    for(let i = 0; i < column; i ++){
        matrix[i] = [];
        for(let j = 0; j < row; j ++){
            const pixel = img.data[4 * i * row + 4 * j] > 128 ? 0 : 1;
            matrix[i].push(pixel);
        }
    }
    return matrix;
}

function exploreLine(matrix, startPos = new Vector2()){
    const h = matrix.length;
    const w = matrix[0].length;
    const openedNodes = [];
    const closedNodes = [];
    if(!matrix[startPos.x][startPos.y]){
        console.log('fail');
        return null;
    }
    const startNode = { pos: startPos, g: 0, parent: null };
    openedNodes.push(startNode);
    let curr = startNode;
    let counter = 0;
    let thebest = curr;
    while(openedNodes.length > 0 && counter < 4000){
        counter++;
        if(counter === 4000) throw(new Error("too many iterations"));
        let bestNode = openedNodes[0];
        for (let i = 1; i < openedNodes.length; i++){
            let nextNode = openedNodes[i];
            if (nextNode.g > bestNode.g){
               bestNode = nextNode;
            }
        }
        if(bestNode.g > thebest.g){
            thebest = bestNode;
        }

        curr = bestNode;
        openedNodes.splice(openedNodes.indexOf(curr), 1);
        closedNodes.push(curr);
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if((i !== 0 || j !== 0)){
                    const x = curr.pos.x + i;
                    const y = curr.pos.y + j;
                    if(x < 0 || y < 0 || x >= w || y >= h) continue;
                    if(!matrix[x][y]) continue;
                    let b = false;
                    for (const node of closedNodes){
                      if (node.pos.x === curr.pos.x + i && node.pos.y === curr.pos.y + j) {
                        b = true;
                        break;
                      }
                    }
                    const newG = curr.g + (Math.abs(i) + Math.abs(j) === 1 ? 1 : DIAGONAL);
                    
                    if (!b){
                        const neighbour = { pos: curr.pos.add(new Vector2(i, j)), g: newG , parent: curr };

                        let c = false;
                        for (const node of openedNodes){
                            if (Vector2.equals(node.pos, neighbour.pos)){
                                c = true;
                            }
                        }   
                        if(!c || newG < neighbour.g){
                            neighbour.g = newG;
                            if(!c) openedNodes.push(neighbour);
                        }
                    }
                }
            }
        }
        if (openedNodes.length === 0){
            const res = [];
            let parent = thebest;
            while (parent.parent) {
                parent = parent.parent;
                if(!parent.parent) res.push(parent.pos);
            }
            res.push(thebest.pos);
            // for (const node of closedNodes){
            //     ctx2.beginPath();
            //     ctx2.fillStyle = 'red';
            //     ctx2.fillRect(node.pos.y, node.pos.x, 0.8, 0.8);
            //     ctx2.fill();
            // }
            return res;
        }
    }
}

function getLine(matrix, startPos){
    const line = exploreLine(matrix, startPos);
    const endPos = line[1];
    const line2 = exploreLine(matrix, endPos);

    const a = line2[0];
    const b = line2[1];

    ctx2.strokeStyle = 'green';
    ctx2.lineWidth = 4;

    ctx2.beginPath();
    ctx2.moveTo(a.y, a.x);
    ctx2.lineTo(b.y, b.x);
    ctx2.stroke();

    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 2;

    ctx2.beginPath();
    ctx2.arc(a.y, a.x, 3, CIRCLE_START, CIRCLE_END);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(b.y, b.x, 3, CIRCLE_START, CIRCLE_END);
    ctx2.stroke();

    return line2;
}

function findlines(matrix){
    const lines = [];
    const h = matrix.length;
    const w = matrix[0].length;
    let cntr = 0;
    for(let i = 0; i < h; i++){
        for(let j = 0; j < w; j++){
            if(!matrix[i][j]) continue;
            // if(cntr > 3342) {
            //     const a = lines[lines.length - 1][0];
            //     ctx2.strokeStyle = 'green';
            //     ctx2.lineWidth = 4;

            //     ctx2.beginPath();
            //     ctx2.arc(a.y, a.x, 5, CIRCLE_START, CIRCLE_END);
            //     ctx2.stroke();

            //     const b = lines[lines.length - 1][1];
            //     ctx2.strokeStyle = 'blue';
            //     ctx2.lineWidth = 4;

            //     ctx2.beginPath();
            //     ctx2.arc(b.y, b.x, 5, CIRCLE_START, CIRCLE_END);
            //     ctx2.stroke();

            //     console.log(lines.length);
            //     return;
            // };
            cntr++;
            let bool = false;
            for(const line of lines){
                const V2 = line[1].subtract(line[0]);
                const V = V2.rotate(Math.PI / 2);
                // const a = line[0];
                // const b = line[0].add(V);
    
                // ctx2.strokeStyle = 'red';
                // ctx2.lineWidth = 4;
    
                // ctx2.beginPath();
                // ctx2.moveTo(a.y, a.x);
                // ctx2.lineTo(b.y, b.x);
                // ctx2.stroke();
                // console.log(V);

                const A = V.x;
                const B = V.y;
                const C = - A * line[0].x - B * line[0].y; 
                const dist = Math.abs(A * i + B * j + C) / Math.sqrt(A * A + B * B);

                const mid = line[0].add(line[1]).divide(2);
                const A2 = V2.x;
                const B2 = V2.y;
                const C2 = - A2 * mid.x - B2 * mid.y; 
                const dist2 = Math.abs(A2 * i + B2 * j + C2) / Math.sqrt(A2 * A2 + B2 * B2);

                // const a = mid;
                // const b = mid.add(V);
    
                // ctx2.strokeStyle = 'red';
                // ctx2.lineWidth = 4;
    
                // ctx2.beginPath();
                // ctx2.moveTo(a.y, a.x);
                // ctx2.lineTo(b.y, b.x);
                // ctx2.stroke();
                const border = 3;
                const len = V2.length() / 2;
                if(dist < 3 && dist2 <= len + 3){
                    bool = true;
                    break;
                }
            }

            if(bool) continue;

            const line = getLine(matrix, new Vector2(i, j));
            lines.push(line);
        }
    }
    console.log(lines.length);
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
        ctx2.beginPath();
        ctx2.arc(imageMid.x, imageMid.y, radiuses[i], CIRCLE_START, CIRCLE_END);
        ctx2.stroke();
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
