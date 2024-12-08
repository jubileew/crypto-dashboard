"use client";
import Filter from "./components/Filter";
import CryptoList from "./components/CryptoList";
import AddCrypto from "./components/AddCrypto";
import { useCryptoStore } from "./store/cryptoStore";
import { fetchCryptos } from "./hooks/fetchData";
import { useEffect } from "react";

export default function Home() {
  const {
    addCrypto,
    setCryptos,
    filterAdvanced,
    cryptos,
    filterCryptos,
    filteredCryptos,
    resetFilteredCryptos,
  } = useCryptoStore();

  useEffect(() => {
    const loadCryptos = async () => {
      const data = await fetchCryptos();
      setCryptos(data);
    };
    loadCryptos();
  }, [setCryptos]);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="p-4 mb-4">
        <Filter
          filterAdvanced={filterAdvanced}
          filterCryptos={filterCryptos}
          resetFilteredCryptos={resetFilteredCryptos}
        />
        <CryptoList cryptos={cryptos} filteredCryptos={filteredCryptos} />
        <AddCrypto addCrypto={addCrypto} />
      </div>
    </main>
  );
}
