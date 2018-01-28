import { MDCLinearProgressFoundation } from '@material/linear-progress';

import {
  addClass,
  getBufferBar,
  getPrimaryBar,
  hasClass,
  removeClass,
  setStyle,
} from './adapter-utilities';

export default ({ elementBufferBar, elementPrimaryBar, propClassNames, updateClassNames }) =>
  new MDCLinearProgressFoundation({
    addClass: addClass(updateClassNames),
    getBuffer: getBufferBar(elementBufferBar),
    getPrimaryBar: getPrimaryBar(elementPrimaryBar),
    hasClass: hasClass(propClassNames),
    removeClass: removeClass(updateClassNames),
    setStyle: setStyle(),
  });
