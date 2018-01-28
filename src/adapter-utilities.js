let classNames = [];

export const addClass = updateClassNames => (className) => {
  classNames = [...classNames, className];
  updateClassNames(classNames);
};

export const getBufferBar = bufferBar => () => bufferBar;

export const getPrimaryBar = primaryBar => () => primaryBar;

export const hasClass = propClassNames => className =>
  [...classNames, ...propClassNames].includes(className);

export const removeClass = updateClassNames => (className) => {
  classNames = classNames.filter(currentClassName => currentClassName !== className);
  updateClassNames(classNames);
};

export const setStyle = () => (element, property, value) => {
  // eslint-disable-next-line no-param-reassign
  element.style[property] = value;
};
