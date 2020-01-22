import './App.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Converter from './Converter';
import ConverterContext from '../contexts/ConverterContext';
import PremiumLabel from './PremiumLabel';
import ThemeSelector from './ThemeSelector';
import BecomePremiumButton from './BecomePremiumButton';
import usePreferredColorScheme from '../hooks/usePreferredColorScheme';
import useCachedState from '../hooks/useCachedState';

export default function App({ maxConversionCount, converters = [] }) {
  const [conversionCount, setConversionCount] = useState(0);
  const preferredColorScheme = usePreferredColorScheme();
  const [selectedTheme, setSelectedTheme] = useCachedState('theme', '');
  const [premium, setPremium] = useCachedState('premium', false);

  const theme = selectedTheme || preferredColorScheme;

  const handleConvert = () => {
    setConversionCount(prevConversionCount => prevConversionCount + 1);
  };

  useEffect(() => {
    if (!premium && conversionCount > maxConversionCount) {
      alert('Convert without limits with out Premium Package');
      setConversionCount(0);
    }
  }, [conversionCount, maxConversionCount, premium]);

  return (
    <ConverterContext.Provider value={{ theme, premium }}>
      <main className={`App App--${theme}`}>
        <header className="App__header">
          <ThemeSelector theme={selectedTheme} onChange={setSelectedTheme} />

          {premium ? (
            <PremiumLabel />
          ) : (
            <BecomePremiumButton onClick={() => setPremium(true)} />
          )}
        </header>

        <section className="App__section">
          {converters.map(converterConfig => {
            return (
              <Converter
                key={converterConfig.shortLabel}
                cryptoLabel={converterConfig.label}
                cryptoShortLabel={converterConfig.shortLabel}
                exchangeRate={converterConfig.exchangeRate}
                onConvert={handleConvert}
              />
            );
          })}
        </section>
      </main>
    </ConverterContext.Provider>
  );
}

App.propTypes = {
  maxConversionCount: PropTypes.number.isRequired,
  converters: PropTypes.arrayOf(
    PropTypes.shape({
      shortLabel: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      exchangeRate: PropTypes.number.isRequired,
    }),
  ),
};
