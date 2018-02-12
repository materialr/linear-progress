import { MDCLinearProgressFoundation } from '@material/linear-progress';

import adapterUtilities from './adapter-utilities';

export default ({ elementBufferBar, elementPrimaryBar, propClassNames, updateClassNames }) => {
  const {
    addClass,
    getBufferBar,
    getPrimaryBar,
    hasClass,
    removeClass,
    setStyle,
  } = adapterUtilities();

  return new MDCLinearProgressFoundation({
    addClass: addClass(updateClassNames),
    getBuffer: getBufferBar(elementBufferBar),
    getPrimaryBar: getPrimaryBar(elementPrimaryBar),
    hasClass: hasClass(propClassNames),
    removeClass: removeClass(updateClassNames),
    setStyle: setStyle(),
  });
};
