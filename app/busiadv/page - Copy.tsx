"use client";
import React, { useState, useEffect } from "react";
import DropDown, { OptionType } from "../../components/DropDown";
import CategoriesDropDown1 from "../../components/newdd";
import citydata from "../../app/test1.json"; // Adjust the import path as necessary
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type StateCity = {
  state: string;
  cities: string[];
};

type Selection = {
  country: string;
  state: string;
  city: string;
};

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState<OptionType>("");
  const [stateCities, setStateCities] = useState<StateCity[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);

  // When a new country is selected, update stateCities and clear selections for that country
  useEffect(() => {
    const countryData = citydata.find((c) => c.Country === selectedCountry);
    setStateCities(countryData ? countryData.StateCity : []);
    // Clear previous selections from the same country
    setSelections((selections) =>
      selections.filter((s) => s.country !== selectedCountry)
    );
  }, [selectedCountry]);

  const handleCitySelectionChange = (selectedItems: string[]) => {
    // Map the new selections for the current country
    const newSelections = selectedItems
      .map((city) => {
        const stateCity = stateCities.find((sc) => sc.cities.includes(city));
        return stateCity
          ? {
              country: selectedCountry,
              state: stateCity.state,
              city: city,
            }
          : null;
      })
      .filter(Boolean); // Remove any null entries if the state wasn't found

    // Update the selections state with new selections for the current country
    setSelections((selections) => [
      ...selections.filter((s) => s.country !== selectedCountry), // Retain selections from other countries
      ...newSelections, // Add new selections for the current country
    ]);
  };

  // Construct the display string from the selections state
  const displayString = selections
    .map((s) => `${s.country}: ${s.state} - ${s.city}`)
    .join(", ");

  return (
    <div className="flex w-3/4 max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />

      {/* Country Dropdown */}
      <DropDown
        selectedOption={selectedCountry}
        setOption={setSelectedCountry}
        options={citydata.map((c) => c.Country)}
      />

      {/* State and City Dropdown */}
      {stateCities.length > 0 && (
        <CategoriesDropDown1
          subcategories={stateCities.map((sc) => ({
            name: sc.state,
            items: sc.cities,
          }))}
          onSelectionChange={handleCitySelectionChange}
        />
      )}

      {/* Display all selections */}
      <div className="selected-cities">
        {selections.length > 0 && (
          <>
            <p>Selected Cities:</p>
            <div>{displayString}</div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
