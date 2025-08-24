const API_BASE_URL = 'https://api.binance.us/api/v3';

// Fetches the full list of symbols and their information from the exchange.
async function fetchExchangeInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/exchangeInfo`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.symbols; // Returns the array of all tradable symbols
  } catch (e) {
    console.error("Failed to fetch exchange info:", e);
    return [];
  }
}

// Fetches live 24hr ticker data for a list of tickers.
async function fetchLiveStockData(tickers) {
  if (tickers.length === 0) {
    return {};
  }
  
  const symbolsString = JSON.stringify(tickers.map(t => t.ticker));
  const url = `${API_BASE_URL}/ticker/24hr?symbols=${encodeURIComponent(symbolsString)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform the array response into an object for easier lookup by ticker
    const dataObject = data.reduce((acc, current) => {
      acc[current.symbol] = current;
      return acc;
    }, {});
    
    return dataObject;
  } catch (e) {
    console.error("Failed to fetch live stock data:", e);
    return {};
  }
}

export { fetchExchangeInfo, fetchLiveStockData };