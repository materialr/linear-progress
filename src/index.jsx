import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/linear-progress/mdc-linear-progress.scss';

import linearProgressFoundation from './foundation';

class LinearProgress extends React.Component {
  constructor(props) {
    super(props);
    this.componentIsMounted = undefined;
    this.bufferBar = undefined;
    this.primaryBar = undefined;
    this.state = {
      classNames: [],
    };
    this.linearProgressFoundation = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.linearProgressCreate = this.linearProgressCreate.bind(this);
    this.linearProgressDestroy = this.linearProgressDestroy.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateDeterminate = this.updateDeterminate.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateReversed = this.updateReversed.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    this.linearProgressCreate();
    this.updateProgress();
  }
  componentDidUpdate({
    buffer: nextBuffer,
    indeterminate: nextIndeterminate,
    progress: nextProgress,
    reversed: nextReversed,
  }) {
    const { buffer, indeterminate, progress, reversed } = this.props;
    if (buffer !== nextBuffer || progress !== nextProgress) {
      this.updateProgress();
    }
    if (indeterminate !== nextIndeterminate) {
      this.updateDeterminate();
    }
    if (reversed !== nextReversed) {
      this.updateReversed();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    this.linearProgressDestroy();
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesFromProps() {
    const {
      indeterminate,
      reversed,
    } = this.props;
    return classnames({
      'mdc-linear-progress': true,
      'mdc-linear-progress--indeterminate': indeterminate,
      'mdc-linear-progress--reversed': reversed,
    });
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  linearProgressCreate() {
    console.log('CREATE');
    this.linearProgressFoundation = linearProgressFoundation({
      elementBufferBar: this.bufferBar,
      elementPrimaryBar: this.primaryBar,
      propClassNames: this.getClassNamesFromProps().split(' '),
      updateClassNames: this.updateClassNames,
    });
    this.linearProgressFoundation.init();
  }
  linearProgressDestroy() {
    this.linearProgressFoundation.destroy();
    this.linearProgressFoundation = undefined;
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateDeterminate() {
    this.linearProgressFoundation.setDeterminate(!this.props.indeterminate);
  }
  updateProgress() {
    const { buffer, indeterminate, progress } = this.props;
    if (!indeterminate) {
      this.linearProgressFoundation.setBuffer(buffer);
      this.linearProgressFoundation.setProgress(progress);
    }
  }
  updateReversed() {
    this.linearProgressFoundation.setReverse(this.props.reversed);
  }
  render() {
    return (
      <div
        role="progressbar"
        className={this.getClassNamesAsString()}
      >
        <div className="mdc-linear-progress__buffering-dots" />
        <div
          className="mdc-linear-progress__buffer"
          ref={(bufferBar) => { this.bufferBar = bufferBar; }}
        />
        <div
          className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ref={(primaryBar) => { this.primaryBar = primaryBar; }}
        >
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
