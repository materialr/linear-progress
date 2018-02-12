import adapterUtilities from './adapter-utilities';

const adapterUtilitiesInstance = adapterUtilities();

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';

test('\'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_1);
  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'getBufferBar()\' returns the buffer bar element', () => {
  const BUFFER_BAR = 'BUFFER_BAR';
  const expected = BUFFER_BAR;

  const actual = adapterUtilitiesInstance.getBufferBar(BUFFER_BAR)();

  expect(actual).toBe(expected);
});

test('\'getPrimaryBar()\' returns the primary bar element', () => {
  const PRIMARY_BAR = 'PRIMARY_BAR';
  const expected = PRIMARY_BAR;

  const actual = adapterUtilitiesInstance.getPrimaryBar(PRIMARY_BAR)();

  expect(actual).toBe(expected);
});

test('\'hasClass()\' returns whether the element has the given className', () => {
  const PROP_CLASS_NAME = 'PROP_CLASS_NAME';
  const checkClass = adapterUtilitiesInstance.hasClass([PROP_CLASS_NAME]);
  const expectedFirst = true;
  const expectedSecond = true;
  const expectedThird = false;

  const actualFirst = checkClass(CLASS_NAME_1);
  const actualSecond = checkClass(PROP_CLASS_NAME);
  const actualThird = checkClass('NONEXISTANT_CLASS');

  expect(actualFirst).toBe(expectedFirst);
  expect(actualSecond).toBe(expectedSecond);
  expect(actualThird).toBe(expectedThird);
});

test('\'removeClass()\' removes a classNames and sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_2);
  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'setStyle()\' sets the style attribute on the element', () => {
  const PROPERTY = 'PROPERTY';
  const VALUE = 'VALUE';
  const element = { style: {} };
  const expected = { style: { [PROPERTY]: 'VALUE' } };

  adapterUtilitiesInstance.setStyle()(element, PROPERTY, VALUE);
  const actual = element;

  expect(actual).toEqual(expected);
});
