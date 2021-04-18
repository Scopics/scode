const video = document.getElementById('video');
const defaultVideo = document.getElementById('#defaultVideo');
let videoStream;
let videoStarted = false;
// Elements for taking the snapshot

function fillVideoStart() {
  const bgColor = '#2d2d2d';
}

// start video
function startVideo() {
  // Get access to the camera!
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    stream = navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      //video.src = window.URL.createObjectURL(stream);
      videoStream = stream;
      video.srcObject = stream;
      video.play();
    });
  }
}

// stop camera
function stopVideo() {
  videoStream.getTracks().forEach(function(track) {
    if (track.readyState == 'live' && track.kind === 'video') {
      track.stop();
    }
  });
  video.srcObject = defaultVideo;
}

function setCameraVideoSize() {
  const screenProportion = 15 / 11;
  const width = $('#video-block').width();
  const height = width / screenProportion;
  $('#video').attr('width', width);
  $('#video').attr('height', height);
}

function setResponseVideoSize() {
  const screenProportion = 16 / 9;
  const width = $('#video-data').width();
  const height = width / screenProportion;
  $('#response-video').attr('width', width);
  $('#response-video').attr('height', height);
}

video.addEventListener('click', () => {
  console.log(videoStarted);
  videoStarted ? stopVideo() : startVideo();
  videoStarted = !videoStarted;
})

// code for sending to server
$('section#read button#makePhoto').click(function() {
  const rays = [15, 5, 9, 5, 3, 7, 3, 4, 15, 14, 4, 6, 5, 0, 3, 6, 0, 5, 4, 5, 6, 4, 8, 5, 15, 9, 2, 8, 2, 15, 15, 10];
  getLink(rays, (response) => {
    console.log(response);
    const { link } = response;
    $('#response-video').attr('src', link);
  })
})

setCameraVideoSize();
setResponseVideoSize();