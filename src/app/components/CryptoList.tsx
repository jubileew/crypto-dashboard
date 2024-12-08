import { Crypto } from "../types/Crypto";

interface CryptoListProps {
  cryptos: Crypto[];
  filteredCryptos: Crypto[];
}

const CryptoList = ({ cryptos, filteredCryptos }: CryptoListProps) => {
  if (!cryptos.length) {
    return <div className="pt-52 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto overflow-y-scroll max-h-[70vh]">
      <table className="table-auto w-full border-collapse">
        <thead className="sticky top-0">
          <tr className="text-left bg-gray-300">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">24h Change</th>
            <th className="px-4 py-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map((crypto, index) => (
            <tr
              key={crypto.id}
              className={`${index % 2 !== 0 ? "bg-gray-200" : ""}`}
            >
              <td className="px-4 py-2">
                <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
              </td>
              <td className="px-4 py-2">{crypto.name}</td>
              <td className="px-4 py-2">{crypto.symbol.toUpperCase()}</td>
              <td className="px-4 py-2">
                ${crypto.current_price.toLocaleString()}
              </td>
              <td
                className={`px-4 py-2 ${
                  crypto.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-4 py-2">
                ${crypto.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
