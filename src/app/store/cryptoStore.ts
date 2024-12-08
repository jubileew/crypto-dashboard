import { create } from 'zustand';
import { Crypto } from '../types/Crypto';

interface CryptoState {
    cryptos: Crypto[];
    filteredCryptos: Crypto[];
    setCryptos: (cryptos: Crypto[]) => void;
    filterCryptos: (query: string) => void;
    addCrypto: (crypto: Crypto) => void;
    filterAdvanced: (
        name: string,
        priceRange: [number, number],
        changeType: 'positive' | 'negative' | null,
        marketCap: number,
      ) => void;
    resetFilteredCryptos: () => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
    cryptos: [],
    filteredCryptos: [],
    setCryptos: (cryptos) => set({ cryptos, filteredCryptos: cryptos }),
    filterCryptos: (query) =>
    set((state) => ({
        filteredCryptos: state.cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.symbol.toLowerCase().includes(query.toLowerCase())
        ),
    })),
    addCrypto: (crypto) =>
        set((state) => ({
          cryptos: [crypto, ...state.cryptos],
          filteredCryptos: [crypto, ...state.filteredCryptos],
    })),
    filterAdvanced: (name, priceRange, changeType, marketCap) =>
        set((state) => ({
          filteredCryptos: state.cryptos.filter((crypto) => {
            const withinPriceRange =
                priceRange[0] < priceRange[1] &&
              crypto.current_price >= priceRange[0] &&
              crypto.current_price <= priceRange[1];
            const matchesChangeType =
              changeType === null ||
              (changeType === 'positive' && crypto.price_change_percentage_24h > 0) ||
              (changeType === 'negative' && crypto.price_change_percentage_24h < 0);
            const meetsMarketCap = crypto.market_cap >= marketCap;
            const includesName = crypto.name.toLowerCase().includes(name.toLowerCase()) || crypto.symbol.toLowerCase().includes(name.toLowerCase())
;
    
            return withinPriceRange && matchesChangeType && meetsMarketCap && includesName;
          }),
        })),
        resetFilteredCryptos: () => set((state) => ({ filteredCryptos: state.cryptos })),
    }));
