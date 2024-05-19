import { useState, useEffect } from 'react'
import './App.css'
import CurrencyDropdown from './components/CurrencyDropdown'
import ExchangeRateTable from './components/ExchangeRateTable';


function App() {
  const [supportedCurrencies, setSupportedCurrencies] = useState([])
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);
  const URL = "http://127.0.0.1:8000/";

  const getExchangeRates = async (baseCurrency) => {
    const response = await fetch(URL + `exchange_rates/${baseCurrency}`);
    const data = await response.json();
    setExchangeRates(data.exchange_rates);
  };

  const getSupportedCurrencies = async () => {
    const response = await fetch(URL+'currencies');
    const data = await response.json();
    setSupportedCurrencies(data.currencies);
  };

  useEffect(() => {
    getSupportedCurrencies();
    getExchangeRates(baseCurrency);
  }, []);


  const handleCurrencySelected = (selectedCurrency) => {
    setBaseCurrency(selectedCurrency);
    getExchangeRates(selectedCurrency);
  };

  return (
    <>
      <div className='currency-dropdown'>
        <CurrencyDropdown currencies={supportedCurrencies} onCurrencySelected={handleCurrencySelected} />
      </div>
      <div className='exchange-rate-table'>
        <ExchangeRateTable exchangeRates={exchangeRates} />
      </div>

    </>
  )
}

export default App

