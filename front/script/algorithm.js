const CIRCLE_START = 0;
const CIRCLE_END = 2 * Math.PI;
const PIXEL_DATA_LENGTH = 4;

const BLACKWHITE_THRESHOLD = 80;

const cvs1 = document.getElementById('canvas1');
const cvs2 = document.getElementById('canvas2');
const ctx1 = cvs1.getContext('2d');
const ctx2 = cvs2.getContext('2d');

let correctPercentage = [
    {min: 0, max: 0}, 
    {min: 5, max : 10}, 
    {min: 0, max: 0}
];

let imageMid = {x: 350, y: 350}

radiuses = [10, 100, 300];

const circleWidth = 0.5;

const img1 = new Image();
img1.src = './assets/img/scode_example2.png';

img1.onload = () => {
    cvs1.width = img.width;
    cvs1.height = img.height;
    ctx1.drawImage(img1, 0, 0);
}

let img = new Image();
img.src = './assets/img/scode_example2.png';

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

function checkIfScode(img){
    const amounts = [0, 0, 0];
    const blackAmounts = [0, 0, 0];

    for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){
            const i = (y * img.width + x) * 4;
            const R = img.data[i];
            for(let i = 0; i < 3; i++){
                if(checkCircle(x, y, radiuses[i])){
                    amounts[i]++;
                    if(R === 0){
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

img.addEventListener('load', function() {
    cvs2.width = img.width;
    cvs2.height = img.height;
    imageMid.x = img.width / 2;
    imageMid.y = img.height / 2;
    ctx2.imageSmoothingEnabled = false;
    ctx2.drawImage(img, 0, 0);

    img = ctx2.getImageData(0, 0, img.width, img.height);
    
    blackwhite(img);

    if(checkIfScode(img)){
        console.log('Image is scode!');
    } else {
        console.log('Image is not scode');        
    }

    ctx2.putImageData(img, 0, 0);

    ctx2.strokeStyle = 'red';

    for(let i = 0; i < 3; i++){
        ctx2.beginPath();
        ctx2.arc(imageMid.x, imageMid.y, radiuses[i], CIRCLE_START, CIRCLE_END);
        ctx2.stroke();
    }
}, false);
