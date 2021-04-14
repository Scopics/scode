
const youtubeLinkElem = $('#youtube-link');
const bgElem = $('#scode-bg');
const colorElem = $('#scode-lines-color');
const sizeElem = $('#scode-size');
const formatElem = $('#scode-format');

const options = {
  linkSeparator: '='
}

function setCanvasSize() {
  const canvas = document.getElementById('canvas');
  const wrapperWidth = $('#scode-photo').width();
  canvas.width = wrapperWidth;
  canvas.height = wrapperWidth;
}

const onInput = () => {
  const defaulLink = 'https://www.youtube.com/watch?v=YSsNFP6TVHY';
  const link = youtubeLinkElem.val() || defaulLink;
  const bg = bgElem.val();
  const color = colorElem.val();
  const size = sizeElem.val();
  const format = formatElem.val();

  if(link.length > 50 || link.length < 20 || link.search('=') === -1){
    console.error('Invalid link');
    return;
  }

  const test_data = hexGenerator(options, link);
  const crc16 = getCrc(16);
  const CRC = crc16(test_data);
  const result = test_data.join('') + CRC.toString(16);

  drawScode(Array.from(result), bg, color);
}

setCanvasSize();
onInput();

youtubeLinkElem.change(() => onInput());
bgElem.change(() => onInput());
colorElem.change(() => onInput());