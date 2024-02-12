// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import MultiSelectDropDown from "../../components/MultiSelectDropDown";
import DropDown, { OptionType } from "../../components/DropDown";
import TargetUsersOptionsData from "../../app/TargetMarketUsers.json";
import jobOptionsData from "../../app/jobOptions.json";
import qualificationsData from "../../app/qualifications.json"; // Adjust the import path as needed

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
  const [selectedQualification, setSelectedQualification] =
    useState<OptionType>("");
  const [q_experience, setQ_experience] = useState(""); // State variable for qualitative experience details

  // Map qualifications data to dropdown options
  const qualificationOptions = qualificationsData.map((q) => q.Qualification);

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

  return (
    <div className="font-thin mb-4 items-start space-y-3 p-5 rounded-lg text-[#237040] border-2 border-blue-100 shadow-blue-500/30 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div>
        {/* Dropdown for selecting a qualification */}
        <DropDown
          selectedOption={selectedQualification}
          setOption={setSelectedQualification}
          options={qualificationOptions}
        />

        {/* Dropdown for selecting the industry */}
        <DropDown
          selectedOption={selectedIndustry}
          setOption={setSelectedIndustry}
          options={jobOptionsData.jobOptions.map(
            (option) => option.industryCategory
          )}
        />

        {/* Dropdown for selecting a job within the selected industry */}
        {selectedIndustry && (
          <DropDown
            selectedOption={selectedJob}
            setOption={setSelectedJob}
            options={availableJobs}
          />
        )}

        {/* Textarea for qualitative experience details with inline onChange handler */}
        <textarea
          onChange={(e) => setQ_experience(e.target.value)}
          value={q_experience}
          rows={1}
          className="w-full rounded-md text-black border-green-300 shadow-sm focus:border-black focus:ring-black my-5"
          placeholder="ex: 3 years of experience in hotel management"
        />
      </div>
    </div>
  );
};

export default Page;
