
const linkInput = document.getElementById('linkInput');
const linkButton = document.getElementById('linkButton');

const options = {
  linkSeparator: '='
}

const onInput = () => {
  const link = linkInput.value;

  if(link.length > 50 || link.length < 20 || link.search('=') === -1){
    console.error('Invalid link');
    return;
  }

  const test_data = hexGenerator(options, link);
  const crc16 = getCrc(16);
  const CRC = crc16(test_data);
  const result = test_data.join('') + CRC.toString(16);

  drawScode(Array.from(result));

}

linkButton.onclick = onInput;
