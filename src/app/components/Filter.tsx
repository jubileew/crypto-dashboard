import React, { useState } from "react";
import AdvancedFilter from "./AdvancedFilter";

interface FilterProps {
  filterCryptos: (query: string) => void;
  filterAdvanced: (
    name: string,
    priceRange: [number, number],
    changeType: "positive" | "negative" | null,
    marketCap: number
  ) => void;
  resetFilteredCryptos: () => void;
}

const Filter = ({ filterCryptos, filterAdvanced, resetFilteredCryptos }: FilterProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [query, setQuery] = useState("");

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    filterCryptos(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Filter by name or symbol..."
        onChange={handleFilter}
        className="border rounded-md px-4 py-2 w-full"
      />
      <button
        className="text-gray-400 px-2 text-sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {!showAdvanced ? "Advanced" : "Hide Advanced"}
      </button>
      {showAdvanced && (
        <AdvancedFilter name={query} filterCryptos={filterAdvanced} resetFilteredCryptos={resetFilteredCryptos} />
      )}
    </div>
  );
};

export default Filter;
