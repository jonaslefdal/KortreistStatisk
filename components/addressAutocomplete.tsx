import React, { useState, useEffect } from "react";

interface AddressAutocompleteProps {
  selectedAddress: string;
  setSelectedAddress: (value: string) => void;
  inputBgClass?: string;
}

// Dummy adresser for statisk visning
const dummyAddresses = [
  "Osloveien 1, Oslo",
  "Storgata 5, Bergen",
  "Trondheimsveien 10, Trondheim",
  "Havnegata 7, Tromsø",
  "Markens gate 3, Kristiansand",
];

export default function AddressAutocomplete({
  selectedAddress,
  setSelectedAddress,
  inputBgClass = "bg-white",
}: AddressAutocompleteProps) {
  const [typedAddress, setTypedAddress] = useState(selectedAddress);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTypedAddress(selectedAddress);
  }, [selectedAddress]);

  const filteredSuggestions = dummyAddresses.filter((addr) =>
    addr.toLowerCase().includes(typedAddress.toLowerCase())
  );

  const handleSelect = (address: string) => {
    setTypedAddress(address);
    setSelectedAddress(address);
    setIsFocused(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      if (typedAddress !== selectedAddress) {
        setTypedAddress(selectedAddress);
      }
    }, 150);
  };

  return (
    <div className="address-autocomplete relative">
      <div className="relative mb-2">
        <input
          type="text"
          value={typedAddress}
          placeholder="F.eks. Storgata 1, Oslo"
          onChange={(e) => setTypedAddress(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`w-full p-3 pr-8 rounded border border-gray-300 ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-customViolet`}
        />
        {typedAddress && (
          <div className="absolute right-2 top-2.5 w-6 h-6 flex items-center justify-center z-10">
            <button
              type="button"
              onClick={() => {
                setTypedAddress("");
                setSelectedAddress("");
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      {isFocused && typedAddress.trim() && (
        <ul className="absolute z-10 w-full border border-gray-200 rounded shadow-md bg-white max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((address, index) => (
              <li
                key={index}
                onMouseDown={() => handleSelect(address)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {address}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Ingen treff på “{typedAddress}”</li>
          )}
        </ul>
      )}
    </div>
  );
}
