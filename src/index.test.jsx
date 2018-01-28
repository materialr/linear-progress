import { shallow } from 'enzyme';
import React from 'react';

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
