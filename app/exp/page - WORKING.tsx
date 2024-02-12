// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import MultiSelectDropDown from "../../components/MultiSelectDropDown";
import DropDown from "../../components/DropDown";
import budgetRangeOptionsData from "../../app/budgetRange_modified.json";

// Define the types for your data
type SubCategory = {
  subRange: string;
  items: string[];
};

type BudgetRange = {
  range: string;
  description: string;
  subcategories: SubCategory[];
};

const Page: React.FC = () => {
  // State for the selected budget range
  const [selectedBudgetRange, setSelectedBudgetRange] =
    useState<BudgetRange | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  // When the selected budget range changes, update the selectedBudgetRange state
  useEffect(() => {
    const budgetRange = budgetRangeOptionsData.budgetRanges.find(
      (br: any) => br.range === selectedBudgetRange?.range
    );
    setSelectedBudgetRange(budgetRange || null);
  }, [selectedBudgetRange?.range]);

  const handleBudgetRangeSelection = (range: string) => {
    // Find the budget range object and set it
    const budgetRange = budgetRangeOptionsData.budgetRanges.find(
      (br: any) => br.range === range
    );
    setSelectedBudgetRange(budgetRange || null);
  };

  const handleSubcategorySelection = (selectedItems: string[]) => {
    setSelectedSubcategories(selectedItems);
  };

  // Extract subcategories and their items into a flattened array for the dropdown
  const subcategoryOptions = selectedBudgetRange
    ? selectedBudgetRange.subcategories.flatMap((sub) => [
        sub.subRange,
        ...sub.items,
      ])
    : [];

  return (
    <div
      // bg-gradient-to-r from-blue-600 to-indigo-900 bg-[#266443]
      //max-w-4xl w-4/5
      className=" font-thin    mb-4 items-start space-y-3 p-5 rounded-lg  text-[#237040] border-2
     border-blue-100  shadow-blue-500/30 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
    >
      <div>
        {/* Dropdown for selecting the budget range */}
        <DropDown
          selectedOption={selectedBudgetRange?.range || ""}
          setOption={handleBudgetRangeSelection}
          options={budgetRangeOptionsData.budgetRanges.map(
            (br: any) => br.range
          )}
        />

        {/* Dropdown for selecting subcategories and items */}
        {selectedBudgetRange && (
          <MultiSelectDropDown
            selectedOptions={selectedSubcategories}
            setOptions={handleSubcategorySelection}
            options={subcategoryOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
