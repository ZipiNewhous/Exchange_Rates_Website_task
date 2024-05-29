import React from 'react';


const ExchangeRateTable = ({ baseCurrency, exchangeRates }) => {
  
  if (!exchangeRates) {
    return <div>Loading exchange rates...</div>;
  }

  return(
    <table>
      <thead>
        <tr>
          <th>Base</th>
          <th>Target</th>
          <th>Exchange Rates</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(exchangeRates).map((targetCurrency) => (
          <tr key={targetCurrency}>
            <td>{baseCurrency}</td>
            <td>{targetCurrency}</td>
            <td>{exchangeRates[targetCurrency]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeRateTable;
