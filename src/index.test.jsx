import * as linearProgress from '@material/linear-progress';
import { mount, shallow } from 'enzyme';
import React from 'react';

import LinearProgress from './index';

test('Renders the default classNames', () => {
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const expected = 'mdc-linear-progress';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <LinearProgress className={CLASS_NAME} />,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-linear-progress ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders an indeterminate progress bar', () => {
  const wrapper = shallow(<LinearProgress indeterminate />, { disableLifecycleMethods: true });
  const expected = 'mdc-linear-progress mdc-linear-progress--indeterminate';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders an reversed progress bar', () => {
  const wrapper = shallow(<LinearProgress reversed />, { disableLifecycleMethods: true });
  const expected = 'mdc-linear-progress mdc-linear-progress--reversed';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Creates the MDCLinearProgress component on mount', () => {
  const BUFFER = 10;
  const PROGRESS = 10;
  const implementation = { buffer: 0, progress: 0 };
  const MDCLinearProgress = jest.fn();
  MDCLinearProgress.mockImplementation(() => implementation);
  linearProgress.MDCLinearProgress = MDCLinearProgress;
  const wrapper = mount(<LinearProgress buffer={BUFFER} progress={PROGRESS} />);
  const instance = wrapper.instance();
  const expectedBuffer = BUFFER;
  const expectedMDCProgress = instance.elementRoot;
  const expectedProgress = PROGRESS;

  const actualBuffer = implementation.buffer;
  const actualMDCProgress = MDCLinearProgress.mock.calls[0][0];
  const actualProgress = implementation.progress;

  expect(actualBuffer).toBe(expectedBuffer);
  expect(actualMDCProgress).toBe(expectedMDCProgress);
  expect(actualProgress).toBe(expectedProgress);
});

test('Destroys the MDCLinearProgress component on unmount', () => {
  const destroy = jest.fn();
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  const expected = 1;
  instance.linearProgress.destroy = destroy;

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Updates the buffer when the prop changes', () => {
  const BUFFER = 10;
  const implementation = { buffer: 0 };
  const wrapper = mount(<LinearProgress buffer={0} />);
  const instance = wrapper.instance();
  instance.linearProgress = implementation;
  const expected = BUFFER;

  wrapper.setProps({ buffer: BUFFER });
  const actual = implementation.buffer;

  expect(actual).toBe(expected);
});

test('Does not update the buffer when the prop doesn\'t change', () => {
  const BUFFER = 10;
  const implementation = { buffer: BUFFER };
  const wrapper = mount(<LinearProgress buffer={BUFFER} />);
  const instance = wrapper.instance();
  instance.linearProgress = implementation;
  const expected = BUFFER;

  wrapper.setProps({ buffer: BUFFER });
  const actual = implementation.buffer;

  expect(actual).toBe(expected);
});

test('Updates the progress when the prop changes', () => {
  const PROGRESS = 10;
  const implementation = { progress: 0 };
  const wrapper = mount(<LinearProgress progress={0} />);
  const instance = wrapper.instance();
  instance.linearProgress = implementation;
  const expected = PROGRESS;

  wrapper.setProps({ progress: PROGRESS });
  const actual = implementation.progress;

  expect(actual).toBe(expected);
});

test('Does not update the progress when the prop doesn\'t change', () => {
  const PROGRESS = 10;
  const implementation = { progress: PROGRESS };
  const wrapper = mount(<LinearProgress progress={PROGRESS} />);
  const instance = wrapper.instance();
  instance.linearProgress = implementation;
  const expected = PROGRESS;

  wrapper.setProps({ progress: PROGRESS });
  const actual = implementation.progress;

  expect(actual).toBe(expected);
});

test('Passes through additional props', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(<LinearProgress data-qa={DATA_QA} />, { disableLifecycleMethods: true });
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
