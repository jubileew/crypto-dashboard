import { Crypto } from "../types/Crypto";

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const CURRENCY = 'usd';

export const fetchCryptos = async (): Promise<Crypto[]> => {
  const url = `${API_URL}?vs_currency=${CURRENCY}&order=market_cap_desc&per_page=20&page=1`;
  
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrency data');
  }

  const data: Crypto[] = await response.json();
  console.log(data)
  return data;
};
