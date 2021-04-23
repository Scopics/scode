const cvs1 = document.getElementById('canvas1');
const cvs2 = document.getElementById('canvas2');
const ctx1 = cvs1.getContext('2d');
const ctx2 = cvs2.getContext('2d');

const img1 = new Image();
img1.src = './assets/img/scode_example2.png';

img1.onload = () => {
    cvs1.width = img.width;
    cvs1.height = img.height;
    ctx1.drawImage(img1, 0, 0);
}

let img = new Image();
img.src = './assets/img/scode_example2.png';

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

img.addEventListener('load', function() {
    cvs2.width = img.width;
    cvs2.height = img.height;
    ctx2.imageSmoothingEnabled = false;
    ctx2.drawImage(img, 0, 0);

    img = ctx2.getImageData(0, 0, img.width, img.height);
    
    blackwhite(img);

    ctx2.putImageData(img, 0, 0);

    ctx2.strokeStyle = 'red';

    ctx2.beginPath();

    ctx2.arc(350, 350, 100, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(350, 350, 10, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(350, 350, 300, 0, 2 * Math.PI);
    ctx2.stroke();
}, false);

