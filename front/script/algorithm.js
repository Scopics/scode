const cvs1 = document.getElementById('canvas1');
const cvs2 = document.getElementById('canvas2');
const ctx1 = cvs1.getContext('2d');
const ctx2 = cvs2.getContext('2d');

let imageMid = {x: 350, y: 350}

const innerCircleRadius = 10;
const middleCircleRadius = 100;
const outerCircleRadius = 300;

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

const checkCircle = (x, y, radius) => Math.abs(Math.sqrt(Math.pow((x - imageMid.x), 2) + Math.pow((y - imageMid.y), 2)) - radius) < circleWidth;

function blackwhite(img) {
    const picLength = img.width * img.height;

    for (let i = 0; i < picLength * 4; i += 4) {
        const R = img.data[i];
        const G = img.data[i + 1];
        const B = img.data[i + 2];

        brightness = parseInt((R + G + B) / 3);
        white = 255 * (brightness >= 128 ? 1 : 0);

        img.data[i] = white;
        img.data[i + 1] = white;
        img.data[i + 2] = white;
    }
}

function checkIfScode(img){
    let innerAmount = 0;
    let innerBlacks = 0;

    let middleAmount = 0;
    let middleBlacks = 0;

    let outerAmount = 0;
    let outerBlacks = 0;

    for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){
            const i = (y * img.width + x) * 4;
            const R = img.data[i];
            if(checkCircle(x, y, innerCircleRadius)){
                innerAmount++;
                if(R === 0){
                    innerBlacks++;
                }
            }
            if(checkCircle(x, y, middleCircleRadius)){
                middleAmount++;
                if(R === 0){
                    middleBlacks++;
                }
            }
            if(checkCircle(x, y, outerCircleRadius)){
                outerAmount++;
                if(R === 0){
                    outerBlacks++;
                }
            }
        }
    }

    const innerPercents = innerBlacks / innerAmount * 100;
    const middlePercents = middleBlacks / middleAmount * 100;
    const outerPercents = outerBlacks / outerAmount * 100;

    console.log('Circles black / white pixels percentage:');
    console.log(innerPercents, middlePercents, outerPercents);
    
    return (innerPercents === 0) && (middlePercents > 5 && middlePercents < 10) && (outerPercents === 0);
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
    }

    ctx2.putImageData(img, 0, 0);

    ctx2.strokeStyle = 'red';

    ctx2.beginPath();
    ctx2.arc(imageMid.x, imageMid.y, middleCircleRadius, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(imageMid.x, imageMid.y, innerCircleRadius, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(imageMid.x, imageMid.y, outerCircleRadius, 0, 2 * Math.PI);
    ctx2.stroke();
}, false);
