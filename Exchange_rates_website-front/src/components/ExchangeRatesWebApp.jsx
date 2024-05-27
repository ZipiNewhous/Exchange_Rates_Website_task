import { useState, useEffect } from 'react'
import CurrencyDropdown from './CurrencyDropdown'
import ExchangeRateTable from './ExchangeRateTable';
import TanstackExchangeRateTable from './TanstackExchangeRateTable';


function ExchangeRatesWebApp() {
  const [supportedCurrencies, setSupportedCurrencies] = useState([])
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);
  const URL = "http://127.0.0.1:8000/";

  const getExchangeRates = async (baseCurrency) => {
    const response = await fetch(URL + `exchange_rates/${baseCurrency}`);
    const data = await response.json();
    setExchangeRates(data.exchange_rates);
  };
  // const getExchangeRates = (baseCurrency) => {
  //   fetch(URL + `exchange_rates/${baseCurrency}`)
  //     .then(response => response.json())
  //     .then(data => {setExchangeRates(data.exchange_rates);})
  //     .catch(error => {console.error("some error:", error);});
  // };

  const getSupportedCurrencies = async () => {
    const response = await fetch(URL+'currencies');
    const data = await response.json();
    setSupportedCurrencies(data.currencies);
  };
  // const getSupportedCurrencies = () => {
  //   fetch(URL + 'currencies')
  //     .then(response => response.json())
  //     .then(data => {setSupportedCurrencies(data.currencies);})
  //     .catch(error => {console.error("some error:", error);});
  // };


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
      {/* <div className='exchange-rate-table'>
        <ExchangeRateTable baseCurrency={baseCurrency} exchangeRates={exchangeRates} />
      </div> */}
      <div className='tanstack-exchange-rate-table'>
        <TanstackExchangeRateTable baseCurrency={baseCurrency} exchangeRates={exchangeRates}/>
      </div>
    </>
  )
}

export default ExchangeRatesWebApp

