import {getFormattedValue} from '../utils';

test('formats the value', () => {
    const expected = '1,234.0'
    const actual = getFormattedValue('1234.0')

    expect(actual).toBe(expected)
});