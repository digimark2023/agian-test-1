"use client";
import "../../styles/globals.css";
import "../styles.css";
import React, { useState, useEffect } from "react";
import DropDown, { OptionType } from "../../components/DropDown";
import CategoriesDropDown1 from "../../components/newdd";
import citydata from "../../app/test1.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { XCircleIcon } from "@heroicons/react/20/solid"; // Import XCircleIcon

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
  const [selectionStrings, setSelectionStrings] = useState<string[]>([]);

  useEffect(() => {
    const countryData = citydata.find((c) => c.Country === selectedCountry);
    setStateCities(countryData ? countryData.StateCity : []);

    // Clear previous selections from the same country
    setSelections((selections) =>
      selections.filter((s) => s.country !== selectedCountry)
    );
  }, [selectedCountry]);
  useEffect(() => {
    setSelectionStrings(
      selections
        .map((s) => {
          if (s !== null) {
            return `${s.country}: ${s.state} - ${s.city}`;
          }
          return "";
        })
        .filter((str) => str !== "")
    );
  }, [selections]);

  // const handleCitySelectionChange = (selectedItems: string[]) => {
  //   // Filter out previous selections from the current country
  //   const filteredSelections = selections.filter(
  //     (s) => s.country !== selectedCountry
  //   );

  //   // Create new selections for the current country
  //   const newSelections = selectedItems
  //     .map((city) => {
  //       const stateCity = stateCities.find((sc) => sc.cities.includes(city));
  //       return stateCity
  //         ? {
  //             country: selectedCountry,
  //             state: stateCity.state,
  //             city: city,
  //           }
  //         : null;
  //     })
  //     .filter(Boolean); // Remove any null entries

  //   // Combine previous selections with new selections
  //   const updatedSelections = [...filteredSelections, ...newSelections];

  //   // Update the selections state
  //   setSelections(updatedSelections);

  //   // Update the selection strings
  //   setSelectionStrings(
  //     updatedSelections.map((s) => `${s.country}: ${s.state} - ${s.city}`)
  //   );
  // };

  // ...

  const handleCitySelectionChange = (selectedItems: string[]) => {
    // Filter out previous selections from the current country
    const filteredSelections = selections.filter(
      (s) => s.country !== selectedCountry
    );

    // Create new selections for the current country
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
      .filter(Boolean); // Remove any null entries

    // Combine previous selections with new selections
    const updatedSelections = [...filteredSelections, ...newSelections];

    // Update the selections state
    setSelections(updatedSelections);

    // Update the selection strings
    // setSelectionStrings(
    //   updatedSelections.map((s) => `${s.country}: ${s.state} - ${s.city}`)
    // );
  };
  // const removeSelection = (indexToRemove: number) => {
  //   // Create a new array without the selection to remove
  //   const updatedSelections = selections.filter(
  //     (_, index) => index !== indexToRemove
  //   );

  //   // Update the selections state
  //   setSelections(updatedSelections);

  //   // Update the selection strings
  //   setSelectionStrings(
  //     updatedSelections.map((s) => `${s.country}: ${s.state} - ${s.city}`)
  //   );
  // };
  const removeSelection = (indexToRemove: number) => {
    // Create a new array without the selection to remove
    const updatedSelections = selections.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the selections state
    setSelections(updatedSelections);

    // Update the selection strings, asserting non-null
    setSelectionStrings(
      updatedSelections.map((s) => `${s.country}: ${s.state} - ${s.city}`)
    );
  };
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

      {/* Display all selections with a close button */}
      <div className="selected-cities">
        {selections.map((selection, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{`${selection.country}: ${selection.state} - ${selection.city}`}</span>
            <button onClick={() => removeSelection(index)} className="p-1">
              <XCircleIcon className="h-5 w-5 text-gray-700 hover:text-gray-900" />
            </button>
          </div>
        ))}
      </div>

      {/* Display the string array of selections in another div */}
      <div className="selection-strings">
        <p>All Selections:</p>
        {selectionStrings.map((str, index) => (
          <div key={index}>{str}</div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
