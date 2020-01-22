import App from '../../components/App';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  beforeEach(() => {
    window.matchMedia = () => ({
      matches: 'light',
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    window.alert = jest.fn();

    cleanup();
  });
  test('interrupts the user after 5 conversions', async () => {
    window.alert.mockImplementationOnce(() => true);

    const { getAllByLabelText } = render(<App />);

    const eurosInputs = getAllByLabelText('EUR');

    expect(eurosInputs.length).toBe(2);

    await userEvent.type(eurosInputs[1], '1');
    await userEvent.type(eurosInputs[1], '2');
    await userEvent.type(eurosInputs[1], '3');
    await userEvent.type(eurosInputs[0], '4');
    await userEvent.type(eurosInputs[0], '5');
    // 🐛?
    await userEvent.type(eurosInputs[0], '6');

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
