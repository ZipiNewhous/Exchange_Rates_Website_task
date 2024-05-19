import React from 'react';

const ExchangeRateTable = ({exchangeRates }) => {
  if (!exchangeRates) {
    return <div>Loading exchange rates...</div>;
  }
  const baseCurrency = exchangeRates.base;
  const conversionRates = exchangeRates.conversion_rates;

  return (
    <table>
      <thead>
        <tr>
          <th>Base</th>
          <th>Target</th>
          <th>Exchange Rates</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(conversionRates).map((targetCurrency) => (
          <tr key={targetCurrency}>
            <td>{baseCurrency}</td>
            <td>{targetCurrency}</td>
            <td>{conversionRates[targetCurrency]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeRateTable;
