import Converter from '../../components/Converter';
import React from 'react';
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
});
