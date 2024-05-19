import React, { useState } from 'react';


const CurrencyDropdown = ({ currencies, onCurrencySelected }) => {

  if (!currencies) {
    return <div>Loading currencies...</div>;
  }

  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencyChange = (event) => {
    const selected = event.target.value;
    setSelectedCurrency(selected);
    onCurrencySelected(selected);
  };

  return (
    <div className="currency-dropdown">
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
