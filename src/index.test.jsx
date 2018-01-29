import { mount, shallow } from 'enzyme';
import React from 'react';

import linearProgressFoundation from './foundation';
import LinearProgress from './index';

test('Adds the default classNames', () => {
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const expected = 'mdc-linear-progress';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Adds classNames based on props', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <LinearProgress className={CLASS_NAME} indeterminate reversed />,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-linear-progress mdc-linear-progress--indeterminate ' +
    `mdc-linear-progress--reversed ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Creates the foundation on mount', () => {
  const linearProgressCreate = jest.fn();
  const updateProgress = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedLinearProgressCreate = 1;
  const expectedUpdateProgress = 1;
  instance.linearProgressCreate = linearProgressCreate;
  instance.updateProgress = updateProgress;
  instance.componentDidMount();

  const actualLinearProgressCreate = linearProgressCreate.mock.calls.length;
  const actualUpdateProgress = updateProgress.mock.calls.length;

  expect(actualLinearProgressCreate).toBe(expectedLinearProgressCreate);
  expect(actualUpdateProgress).toBe(expectedUpdateProgress);
});

test('Updates progress when the buffer amount changes', () => {
  const updateProgress = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedUpdateProgress = 1;
  instance.updateProgress = updateProgress;
  instance.componentDidUpdate({ buffer: 1, indeterminate: false, progress: 0, reversed: false });

  const actualUpdateProgress = updateProgress.mock.calls.length;

  expect(actualUpdateProgress).toBe(expectedUpdateProgress);
});

test('Updates progress when the progress amount changes', () => {
  const updateProgress = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedUpdateProgress = 1;
  instance.updateProgress = updateProgress;
  instance.componentDidUpdate({ buffer: 0, indeterminate: false, progress: 1, reversed: false });

  const actualUpdateProgress = updateProgress.mock.calls.length;

  expect(actualUpdateProgress).toBe(expectedUpdateProgress);
});

test('Updates determinate when the determinate value changes', () => {
  const updateDeterminate = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedUpdateDeterminate = 1;
  instance.updateDeterminate = updateDeterminate;
  instance.componentDidUpdate({ buffer: 0, indeterminate: true, progress: 0, reversed: false });

  const actualUpdateDeterminate = updateDeterminate.mock.calls.length;

  expect(actualUpdateDeterminate).toBe(expectedUpdateDeterminate);
});

test('Updates reversed when the reversed value changes', () => {
  const updateReversed = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedUpdateReversed = 1;
  instance.updateReversed = updateReversed;
  instance.componentDidUpdate({ buffer: 0, indeterminate: false, progress: 0, reversed: true });

  const actualUpdateReversed = updateReversed.mock.calls.length;

  expect(actualUpdateReversed).toBe(expectedUpdateReversed);
});

test('Destroys linear progress when the component unmounts', () => {
  const linearProgressDestroy = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedLinearProgressDestroy = 1;
  instance.linearProgressDestroy = linearProgressDestroy;
  instance.componentWillUnmount();

  const actualLinearProgressDestroy = linearProgressDestroy.mock.calls.length;

  expect(actualLinearProgressDestroy).toBe(expectedLinearProgressDestroy);
});

test('Builds the proper linear progress foundation', () => {
  const wrapper = mount(<LinearProgress />);
  const instance = wrapper.instance();
  const expected = linearProgressFoundation({
    elementBufferBar: instance.bufferBar,
    elementPrimaryBar: instance.primaryBar,
    propClassNames: instance.getClassNamesFromProps().split(' '),
    updateClassNames: instance.updateClassNames,
  });
  expected.init();

  instance.linearProgressCreate();
  const actual = instance.linearProgressFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Properly destroys the linear progress foundation', () => {
  const destroy = jest.fn();
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedLinearProgress = undefined;
  const expectedLinearProgressDestroy = 1;

  instance.linearProgressCreate();
  instance.linearProgressFoundation = { destroy };
  instance.linearProgressDestroy();
  const actualLinearProgress = instance.linearProgressFoundation;
  const actualLinearProgressDestroy = destroy.mock.calls.length;

  expect(actualLinearProgress).toBe(expectedLinearProgress);
  expect(actualLinearProgressDestroy).toBe(expectedLinearProgressDestroy);
});

test('Updates classNames in state if the component is mounted', () => {
  const CLASS_NAMES = ['CLASS_NAMES'];
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;
  instance.componentIsMounted = true;

  instance.updateClassNames(CLASS_NAMES);
  const actual = wrapper.state().classNames;

  expect(actual).toBe(expected);
});

test('Does not update classNames if component is not mounted', () => {
  const CLASS_NAMES = ['CLASS_NAMES'];
  const wrapper = shallow(<LinearProgress />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = [];
  instance.componentIsMounted = false;

  instance.updateClassNames(CLASS_NAMES);
  const actual = wrapper.state().classNames;

  expect(actual).toEqual(expected);
});

test('Updates the determinate value on the foundation correctly', () => {
  const INDETERMINATE = true;
  const setDeterminate = jest.fn();
  const wrapper = shallow(
    <LinearProgress indeterminate={INDETERMINATE} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = !INDETERMINATE;
  instance.linearProgressFoundation = { setDeterminate };

  instance.updateDeterminate();
  const actual = setDeterminate.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('Updates progress if determinate', () => {
  const BUFFER = 100;
  const PROGRESS = 100;
  const setBuffer = jest.fn();
  const setProgress = jest.fn();
  const wrapper = shallow(
    <LinearProgress buffer={BUFFER} indeterminate={false} progress={PROGRESS} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expectedSetBuffer = BUFFER;
  const expectedSetProgress = PROGRESS;
  instance.linearProgressFoundation = { setBuffer, setProgress };

  instance.updateProgress();
  const actualSetBuffer = setBuffer.mock.calls[0][0];
  const actualSetProgress = setBuffer.mock.calls[0][0];

  expect(actualSetBuffer).toBe(expectedSetBuffer);
  expect(actualSetProgress).toBe(expectedSetProgress);
});

test('Does not update progress if indeterminate', () => {
  const setBuffer = jest.fn();
  const setProgress = jest.fn();
  const wrapper = shallow(<LinearProgress indeterminate />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expectedSetBuffer = 0;
  const expectedSetProgress = 0;
  instance.linearProgressFoundation = { setBuffer, setProgress };

  instance.updateProgress();
  const actualSetBuffer = setBuffer.mock.calls.length;
  const actualSetProgress = setBuffer.mock.calls.length;

  expect(actualSetBuffer).toBe(expectedSetBuffer);
  expect(actualSetProgress).toBe(expectedSetProgress);
});

test('Updates reversed correctly', () => {
  const REVERSED = true;
  const setReverse = jest.fn();
  const wrapper = shallow(
    <LinearProgress reversed={REVERSED} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = REVERSED;
  instance.linearProgressFoundation = { setReverse };

  instance.updateReversed();
  const actual = setReverse.mock.calls[0][0];

  expect(actual).toBe(expected);
});
