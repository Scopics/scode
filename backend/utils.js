function codeItemASCII(item = '') {
  return item.charCodeAt().toString(16);
}

function codeASCII(text) {
  return text.split('').map(item => codeItemASCII(item));
}