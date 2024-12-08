import React, { useState } from "react";

interface AdvancedFilterProps {
  name: string;
  filterCryptos: (
    name: string,
    priceRange: [number, number],
    changeType: "positive" | "negative" | null,
    marketCap: number
  ) => void;
  resetFilteredCryptos: () => void;
}

const AdvancedFilter = ({
  name,
  filterCryptos,
  resetFilteredCryptos,
}: AdvancedFilterProps) => {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [changeType, setChangeType] = useState<"positive" | "negative" | null>(
    null
  );
  const [marketCap, setMarketCap] = useState<number | undefined>();

  const handleFilter = () => {
    filterCryptos(
      name,
      [minPrice || 0, maxPrice || Number.MAX_VALUE],
      changeType,
      marketCap || 0
    );
  };

  return (
    <div className="mb-4 p-4 border rounded-md flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium">Min Price</label>
          <input
            type="number"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border px-3 py-2 rounded-md w-full"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Max Price</label>
          <input
            type="number"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border px-3 py-2 rounded-md w-full"
            placeholder="No limit"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">24h Price Change</label>
        <div className="flex gap-4">
          <button
            onClick={() => setChangeType("positive")}
            className={`px-4 py-2 rounded-md border ${
              changeType === "positive" ? "bg-green-500 text-white" : ""
            }`}
          >
            Positive
          </button>
          <button
            onClick={() => setChangeType("negative")}
            className={`px-4 py-2 rounded-md border ${
              changeType === "negative" ? "bg-red-500 text-white" : ""
            }`}
          >
            Negative
          </button>
          <button
            onClick={() => setChangeType(null)}
            className={`px-4 py-2 rounded-md border ${
              changeType === null ? "bg-gray-300 text-black" : ""
            }`}
          >
            Any
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Min Market Cap</label>
        <input
          type="number"
          value={marketCap ?? ""}
          onChange={(e) => setMarketCap(Number(e.target.value))}
          className="border px-3 py-2 rounded-md w-full"
          placeholder="0"
        />
      </div>

      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
      <button
        onClick={resetFilteredCryptos}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default AdvancedFilter;
