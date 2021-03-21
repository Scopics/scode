function stabilize(rays) {
  if (rays.length % 4 !== 0)
    throw new Error('Something is wrong...');
  const len = rays.length;
  const step = len / 4;
  
  let startFound = false;
  let iterator = 0;
  const neededLen = {
    top: 15,
    right: 15,
    bottom: 0,
    left: 15
  }
  while(!startFound && iterator < len) {
    const topInd = iterator % len;
    const top = rays[topInd];
    const rightInd = (iterator + step) % len;
    const right = rays[rightInd];
    const bottomInd = (iterator + step * 2) % len;
    const bottom = rays[bottomInd];
    const leftInd = (iterator + step * 3) % len;
    const left = rays[leftInd];
    if (neededLen.top === top && 
      neededLen.right === right && 
      neededLen.bottom === bottom && 
      neededLen.left === left
    ) {
      startFound = true;
    } else {
      iterator++;
    }
  }

  const stabilized = rays.slice(iterator).concat(rays.slice(0, iterator));
  return stabilized;
}

function removeGuides(rays) {
  const raysCopy = [...rays];
  const sides = 4;
  const step = rays.length / sides;
  const guidesIndexes = Array.from({ length: sides }, (item, index) => step * index);

  guidesIndexes.reverse().forEach(index => raysCopy.splice(index, 1));
  return raysCopy;
}

const getChunksOfString = (str, size) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
};

