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
    const maxConversionCount = 5;

    const { getAllByLabelText } = render(
      <App maxConversionCount={maxConversionCount} />,
    );

    const eurosInputs = getAllByLabelText('EUR');

    expect(eurosInputs.length).toBe(2);

    for (let i = maxConversionCount; i >= 0; i--) {
      // 🐛?
      await userEvent.type(eurosInputs[i % 2], `${i}`);
    }

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('does not interrupt premium users', async () => {
    window.alert.mockImplementationOnce(() => true);
    const maxConversionCount = 4;

    const { getAllByLabelText, getByText } = render(
      <App maxConversionCount={maxConversionCount} />,
    );

    const premiumButton = getByText('Become premium');

    // becoming premium
    await userEvent.click(premiumButton);

    const eurosInputs = getAllByLabelText('EUR');

    expect(eurosInputs.length).toBe(2);

    for (let i = maxConversionCount; i >= 0; i--) {
      await userEvent.type(eurosInputs[i % 2], `${i}`);
    }

    expect(window.alert).toHaveBeenCalledTimes(0);
  });
});
