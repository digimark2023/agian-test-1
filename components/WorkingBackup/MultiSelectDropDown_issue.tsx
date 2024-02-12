import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/20/solid";

// interface MultiSelectDropDownProps {
//   subcategories: {
//     subRange: string;
//     items: string[];
//   }[];
//   selectedOptions: string[];
//   setOptions: (options: string[]) => void;
// }

export interface MultiSelectDropDownProps {
  selectedOptions: OptionType[];
  setOptions: (options: OptionType[]) => void;
  subcategories: Subcategory[];
}

export type OptionType = string;

export interface Subcategory {
  subRange: string;
  items: string[];
}

// export default function MultiSelectDropDown({
//   subcategories,
//   selectedOptions,
//   setOptions,
// }: MultiSelectDropDownProps) {
export default function MultiSelectDropDown({
  selectedOptions,
  setOptions,
  subcategories,
}: MultiSelectDropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleOption = (option: string) => {
    setOptions(
      selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
    );
  };

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-between items-center rounded-md border-2 bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOptions.length > 0 ? "Selected Options" : "Select Options"}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {isDropdownOpen && (
          <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white border border-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2">
              <input
                type="text"
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-md pl-3 pr-10"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <XCircleIcon
                  className="h-5 w-5 absolute inset-y-0 right-0 my-auto flex items-center text-gray-500 cursor-pointer mr-3"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
            <div className="max-h-60 overflow-y-auto">
              {subcategories.map((subcategory) => (
                <div key={subcategory.subRange} className="px-4 py-2">
                  <div className="font-bold text-blue-600">
                    {subcategory.subRange}
                  </div>
                  {subcategory.items.map((item) => (
                    <div key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedOptions.includes(
                          `${subcategory.subRange}-${item}`
                        )}
                        onChange={() =>
                          toggleOption(`${subcategory.subRange}-${item}`)
                        }
                      />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-end p-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded text-black px-4 py-2 mr-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                Apply
              </button>
            </div>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  );
}
