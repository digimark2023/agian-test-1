// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import MultiSelectDropDown from "../../components/MultiSelectDropDown";
//import DropDown from "../../components/DropDown";
import TargetUsersOptionsData from "../../app/TargetMarketUsers.json";
import jobOptionsData from "../../app/jobOptions.json";
import DropDown, { OptionType } from "../../components/DropDown";
// Define the types for your data
type TargetUsersSubCategory = {
  subcategoryName: string;
  Subcategories: string[];
};

type TargetUsers = {
  MainUserCategory: string;
  description: string;
  UserSubCategories: TargetUsersSubCategory[];
};

type JobOption = {
  job: string;
  description: string;
};

type IndustryCategory = {
  industryCategory: string;
  description: string;
  jobs: JobOption[];
};
const Page: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<OptionType>("");
  const [selectedJob, setSelectedJob] = useState<OptionType>("");
  const [availableJobs, setAvailableJobs] = useState<OptionType[]>([]);

  useEffect(() => {
    // Find the selected industry category in the job options data
    const industry = jobOptionsData.jobOptions.find(
      (industry) => industry.industryCategory === selectedIndustry
    );
    // Set available jobs based on the selected industry
    const jobs = industry?.jobs.map((job) => job.job) || [];
    setAvailableJobs(jobs);
    // Reset selected job when changing industries
    setSelectedJob("");
  }, [selectedIndustry]);

  // State for the selected budget users
  const [selectedTargetMainCat, setSelectedTargetUsers] =
    useState<TargetUsers | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  // When the selected budget users changes, update the selectedTargetUsers state
  useEffect(() => {
    const TargetUsers = TargetUsersOptionsData.MarketUsers.find(
      (br) => br.MainUserCategory === selectedTargetMainCat?.MainUserCategory
    );
    setSelectedTargetUsers(TargetUsers || null);
  }, [selectedTargetMainCat?.MainUserCategory]);

  const handleTargetUsersSelection = (users: string) => {
    // Find the budget users object and set it
    const TargetUsers = TargetUsersOptionsData.MarketUsers.find(
      (br) => br.MainUserCategory === users
    );
    setSelectedTargetUsers(TargetUsers || null);
  };

  const handleSubcategorySelection = (selectedItems: string[]) => {
    setSelectedSubcategories(selectedItems);
  };

  // Extract subcategories and their items into a flattened array for the dropdown
  const subcategoryOptions = selectedTargetMainCat
    ? selectedTargetMainCat.UserSubCategories.flatMap((sub) => [
        sub.subcategoryName,
        ...sub.Subcategories,
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
        <DropDown
          selectedOption={selectedIndustry}
          setOption={setSelectedIndustry}
          options={jobOptionsData.jobOptions.map(
            (option) => option.industryCategory
          )}
        />
        {selectedIndustry && (
          <DropDown
            selectedOption={selectedJob}
            setOption={setSelectedJob}
            options={availableJobs}
          />
        )}

        {/* Dropdown for selecting the budget users */}
        <DropDown
          selectedOption={selectedTargetMainCat?.MainUserCategory || ""}
          setOption={handleTargetUsersSelection}
          options={TargetUsersOptionsData.MarketUsers.map(
            (br) => br.MainUserCategory
          )}
        />

        {/* Dropdown for selecting subcategories and items */}
        {selectedTargetMainCat && (
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
