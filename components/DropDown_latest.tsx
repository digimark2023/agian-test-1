import React, { Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export type OptionType = string;

interface DropDownProps {
  selectedOption: OptionType;
  setOption: (option: OptionType) => void;
  categoriesWithOptions: { main: string; sub: string[] }[];
}

export default function DropDown_({
  selectedOption,
  setOption,
  categoriesWithOptions,
}: DropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter main categories based on search term
  const filteredCategories = categoriesWithOptions.filter((category) =>
    category.main.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {selectedOption || "Select Category"}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2">
            <input
              type="text"
              className="w-full text-sm text-gray-700 border-gray-300 focus:ring-black focus:border-black rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="py-1 overflow-y-auto max-h-64">
            {filteredCategories.map((category) => (
              <Fragment key={category.main}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedOption === category.main
                          ? "text-green-600 bg-gray-100 font-bold" // Green text for selected item
                          : "text-gray-700 hover:bg-green-300" // Non-selected item style with hover
                      }`}
                      onClick={() => setOption(category.main)}
                    >
                      {category.main}
                      {selectedOption === category.main && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 inline-block ml-2 text-green-600" // Increased size to w-6 h-6
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </Menu.Item>
                {category.sub.map((subOption) => (
                  <Menu.Item key={subOption}>
                    <div className="w-full px-4 py-2 text-sm text-gray-500 italic">
                      {subOption}
                    </div>
                  </Menu.Item>
                ))}
              </Fragment>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
