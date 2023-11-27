const isExistLenStrargegy = (arr) => {
  return arr.reduce((prev, current) => {
    const isExistColon = current.includes(':');
    isExistColon ? (prev = 'len') : (prev = 'noLen');
    return prev;
  }, '');
}

const isExistSeparator = (key) => {
  const isExist = key.includes(':');
  if (!isExist) return [key];
  const splitKey = key.split(':');
  return [
    splitKey[0],
    splitKey[1]
  ]
}


const getObjectKeys = (obj) => {
  return Object.keys(obj);
}

export {
  getObjectKeys,
  isExistLenStrargegy,
  isExistSeparator
}