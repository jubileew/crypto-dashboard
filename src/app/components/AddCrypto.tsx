import React, { useState } from "react";
import { Crypto } from "../types/Crypto";

interface AddCryptoProps {
  addCrypto: (crypto: Crypto) => void;
}

const AddCrypto = ({ addCrypto }: AddCryptoProps) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!name || !symbol || currentPrice < 0 || marketCap < 0) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const newCrypto: Crypto = {
      id: `${symbol}-${Date.now()}`,
      name,
      symbol,
      current_price: currentPrice,
      market_cap: marketCap,
      price_change_percentage_24h: 0,
      image: image || "https://via.placeholder.com/32",
    };

    addCrypto(newCrypto);

    setName("");
    setSymbol("");
    setCurrentPrice(0);
    setMarketCap(0);
    setImage("");
  };

  return (
    <div className="my-6 flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Symbol</label>
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border rounded-md px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Current Price</label>
        <input
          type="number"
          placeholder="Current Price"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(Number(e.target.value))}
          className="border rounded-md px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Market Price</label>
        <input
          type="number"
          placeholder="Market Cap"
          value={marketCap}
          onChange={(e) => setMarketCap(Number(e.target.value))}
          className="border rounded-md px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border rounded-md px-4 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 h-10 rounded-md hover:bg-blue-600"
      >
        Add Crypto
      </button>
    </div>
  );
};

export default AddCrypto;
