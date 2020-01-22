import Converter from '../../components/Converter';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Converter', () => {
  test('renders titles and labels', () => {
    const expectedCryptoLabel = 'Test coin';
    const expectedCryptoShortLabel = 'TC';
    const exchangeRate = 0.5;

    const { getByText } = render(
      <Converter
        cryptoLabel={expectedCryptoLabel}
        cryptoShortLabel={expectedCryptoShortLabel}
        exchangeRate={exchangeRate}
      />,
    );

    expect(getByText(expectedCryptoShortLabel)).toBeInTheDocument();

    expect(getByText(`Euros to ${expectedCryptoLabel}`)).toBeInTheDocument();
  });

  test('converts values inputed at a given rate', async () => {
    const expectedCryptoLabel = 'Test coin';
    const expectedCryptoShortLabel = 'TC';
    const exchangeRate = 0.5;

    const { getByLabelText } = render(
      <Converter
        cryptoLabel={expectedCryptoLabel}
        cryptoShortLabel={expectedCryptoShortLabel}
        exchangeRate={exchangeRate}
      />,
    );

    const eurosInput = getByLabelText('EUR');
    const testCoinInput = getByLabelText(expectedCryptoShortLabel);

    await userEvent.type(eurosInput, '5');

    expect(testCoinInput.value).toBe('2.5');
  });
});
