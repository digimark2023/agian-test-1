// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import MultiSelectDropDown from "../../components/MultiSelectDropDown";
import DropDown from "../../components/DropDown";
import categoryData from "../../app/TargetMarketUsers.json";
type OptionType = string;
const [selectedCategoryName, setSelectedCategoryName] =
  useState<OptionType>("");

const Page: React.FC = () => {
  return (
    <div
      className=" font-thin    mb-4 items-start space-y-3 p-5 rounded-lg  text-[#237040] border-2
     border-blue-100  shadow-blue-500/30 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
    >
      <div>
        {/* Dropdown for selecting the budget range */}

        <DropDown
          selectedOption={selectedCategoryName}
          setOption={setSelectedCategoryName}
          options={categoryData.MarketUsers.map(
            (user) => user.MainUserCategory
          )}
        />

        {/* Dropdown for selecting subcategories and items */}
        {selectedBudgetRange && (
          <MultiSelectDropDown selectedOptions={} setOptions={} options={} />
        )}
      </div>
    </div>
  );
};

export default Page;
