export default () => {
  let classNames = [];

  return {
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    getBufferBar: bufferBar => () => bufferBar,
    getPrimaryBar: primaryBar => () => primaryBar,
    hasClass: propClassNames => className =>
      [...classNames, ...propClassNames].includes(className),
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
    setStyle: () => (element, property, value) => {
      // eslint-disable-next-line no-param-reassign
      element.style[property] = value;
    },
  };
};
