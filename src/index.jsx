import { MDCLinearProgress } from '@material/linear-progress';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/linear-progress/mdc-linear-progress.scss';

class LinearProgress extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.linearProgress = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.setBuffer = this.setBuffer.bind(this);
    this.setProgress = this.setProgress.bind(this);
  }
  componentDidMount() {
    this.linearProgress = new MDCLinearProgress(this.elementRoot);
    this.setBuffer();
    this.setProgress();
  }
  componentDidUpdate({ buffer: previousBuffer, progress: previousProgress }) {
    if (this.props.buffer !== previousBuffer) {
      this.setBuffer();
    }
    if (this.props.progress !== previousProgress) {
      this.setProgress();
    }
  }
  componentWillUnmount() {
    this.linearProgress.destroy();
  }
  getClassNames() {
    const { className, indeterminate, reversed } = this.props;
    return classnames({
      'mdc-linear-progress': true,
      'mdc-linear-progress--indeterminate': indeterminate,
      'mdc-linear-progress--reversed': reversed,
      [className]: !!className,
    });
  }
  setBuffer() {
    this.linearProgress.buffer = this.props.buffer;
  }
  setProgress() {
    this.linearProgress.progress = this.props.progress;
  }
  render() {
    const {
      getClassNames,
      props: {
        buffer,
        className,
        indeterminate,
        progress,
        reversed,
        ...props
      },
    } = this;
    return (
      <div
        className={getClassNames()}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
        role="progressbar"
        {...props}
      >
        <div className="mdc-linear-progress__buffering-dots" />
        <div className="mdc-linear-progress__buffer" />
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
      </div>
    );
  }
}

LinearProgress.propTypes = {
  buffer: PropTypes.number,
  className: PropTypes.string,
  indeterminate: PropTypes.bool,
  progress: PropTypes.number,
  reversed: PropTypes.bool,
};

LinearProgress.defaultProps = {
  buffer: 0,
  className: '',
  indeterminate: false,
  progress: 0,
  reversed: false,
};

export default LinearProgress;
