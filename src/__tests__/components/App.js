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
    const converters = [
      {
        label: 'Test Converter',
        shortLabel: 'TC',
        exchangeRate: 0.4,
      },
    ];

    const { getAllByLabelText } = render(
      <App maxConversionCount={maxConversionCount} converters={converters} />,
    );

    const eurosInputs = getAllByLabelText('EUR');

    expect(eurosInputs.length).toBe(converters.length);

    for (let i = maxConversionCount; i >= 0; i--) {
      // 🐛?
      const randomIndex = Math.floor(Math.random() * eurosInputs.length);

      await userEvent.type(eurosInputs[randomIndex], `${i}`);
    }

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('does not interrupt premium users', async () => {
    window.alert.mockImplementationOnce(() => true);
    const maxConversionCount = 4;
    const converters = [
      {
        label: 'Test Converter',
        shortLabel: 'TC',
        exchangeRate: 0.4,
      },
    ];

    const { getAllByLabelText, getByText } = render(
      <App converters={converters} maxConversionCount={maxConversionCount} />,
    );

    const premiumButton = getByText('Become premium');

    // becoming premium
    await userEvent.click(premiumButton);

    const eurosInputs = getAllByLabelText('EUR');

    expect(eurosInputs.length).toBe(converters.length);

    for (let i = maxConversionCount; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * eurosInputs.length);

      await userEvent.type(eurosInputs[randomIndex], `${i}`);
    }

    expect(window.alert).toHaveBeenCalledTimes(0);
  });
});
