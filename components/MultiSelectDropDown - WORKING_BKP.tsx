import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
type Subcategory = {
  name: string;
  items: string[];
};

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export type OptionType = string;

interface MultiSelectDropDownProps {
  selectedOptions: OptionType[];
  setOptions: (options: OptionType[]) => void;
  options: OptionType[];
}

export default function MultiSelectDropDown({
  selectedOptions,
  setOptions,
  options,
}: // ... other props
MultiSelectDropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedOptions, setTempSelectedOptions] =
    useState<OptionType[]>(selectedOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: OptionType) => {
    setTempSelectedOptions((currentOptions) =>
      currentOptions.includes(option)
        ? currentOptions.filter((o) => o !== option)
        : [...currentOptions, option]
    );
  };

  const applySelection = () => {
    setOptions(tempSelectedOptions);
    setIsDropdownOpen(false); // Close the dropdown
  };

  // const cancelSelection = () => {
  //   setTempSelectedOptions(selectedOptions);
  //   setIsDropdownOpen(false); // Close the dropdown
  // };
  const cancelSelection = () => {
    // Resets the temporary selection to what was originally selected.
    setTempSelectedOptions(selectedOptions);
    // This line is important. It explicitly sets the dropdown to open,
    // regardless of its current state, to fix the issue where the dropdown wouldn't open.
    setIsDropdownOpen(false);
  };

  const removeOption = (
    option: OptionType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setOptions(selectedOptions.filter((o) => o !== option));
  };
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        {/* <Menu.Button
          className="inline-flex w-full justify-between items-center rounded-md border-2 bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={() => setIsDropdownOpen((open) => !open)}
        > */}
        <Menu.Button
          className="inline-flex w-full justify-between items-center rounded-md border-2 bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={() => setIsDropdownOpen(true)} // This ensures the dropdown opens
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <span
                  key={option}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-sm"
                >
                  {option}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option, e);
                    }}
                    className="rounded-full bg-green-100 text-green-500 hover:bg-blue-300 focus:outline-none"
                  >
                    <XCircleIcon className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            "Select Options"
          )}
          {/* {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select Options"} */}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      {isDropdownOpen && (
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
            <div className="relative p-2">
              <input
                type="text"
                className="w-full text-sm text-gray-700 border border-green-100 focus:ring-black focus:border-black rounded-md pl-3 pr-10"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <XCircleIcon
                  className="h-5 w-5 absolute inset-y-0 right-0 my-auto flex items-center text-green-500 cursor-pointer mr-3"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
            <div className="max-h-60 overflow-y-auto">
              {/* Wrap items in a container div */}
              <div className="flex flex-wrap -mx-2">
                {/* {filteredOptions.map((option) => (
                  <Menu.Item key={option}>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "flex items-center px-4 py-2 text-sm w-full text-left",
                          tempSelectedOptions.includes(option)
                            ? "font-bold"
                            : "font-normal" // This line makes the text bold if the option is selected
                        )}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={tempSelectedOptions.includes(option)}
                          onChange={() => toggleOption(option)}
                          onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                        />
                        <span className="flex-1">{option}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))} */}
                {/* 
                {filteredOptions.map((option, index) => (
                  // Add a div wrapper for each item that should take up 1/3 of the width
                  <div key={option} className="w-1/3 p-2">
                    <Menu.Item>
                      {({ active }) => (
                        // <div
                        //   className={classNames(
                        //     active ? "bg-gray-100" : "",
                        //     "flex items-center px-4 py-2 text-sm w-full text-left"
                        //   )}
                        <div
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "flex items-center px-4 py-2 text-sm w-full text-left",
                            tempSelectedOptions.includes(option)
                              ? "font-bold"
                              : "font-normal" // This line makes the text bold if the option is selected
                          )}
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={tempSelectedOptions.includes(option)}
                            onChange={() => toggleOption(option)}
                            onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                          />
                          <span className="flex-1">{option}</span>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                ))} */}

                {/* {filteredOptions.map((option, index) => {
                  const isSubRange = /^(\d+)-(\d+)$/.test(option); // Regex to check if option is a subRange
                  return (
                    <div key={option} className="w-1/3 p-2">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center px-4 py-2 text-sm w-full text-left",
                              tempSelectedOptions.includes(option) &&
                                !isSubRange
                                ? "font-bold"
                                : "font-normal"
                            )}
                          >
                            {!isSubRange && ( // Only render a checkbox for items, not subranges
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={tempSelectedOptions.includes(option)}
                                onChange={() => toggleOption(option)}
                                onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                              />
                            )}
                            <span
                              className={classNames(
                                "flex-1",
                                isSubRange ? "font-semibold" : ""
                              )}
                            >
                              {option}
                            </span>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  );
                })} */}

                {filteredOptions.map((option, index) => {
                  // Assuming that subcategoryNames are in the format "1000-30000", "30000-50000", etc.
                  // We'll check if the option is in that format to determine if it's a subcategoryName
                  const isSubRange = /^(\d+)-(\d+)$/.test(option);

                  return (
                    <div key={option} className="w-full p-2">
                      {" "}
                      {/* Change w-1/3 to w-full to use full width */}
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex items-center px-4 py-2 text-sm w-full text-left",
                              tempSelectedOptions.includes(option) &&
                                !isSubRange
                                ? "font-bold"
                                : "font-normal"
                            )}
                          >
                            {isSubRange ? ( // If it's a subcategoryName, render without checkbox
                              <span className="flex-1 font-semibold">
                                {option}
                              </span>
                            ) : (
                              // If it's not a subcategoryName, render with a checkbox
                              <>
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  checked={tempSelectedOptions.includes(option)}
                                  onChange={() => toggleOption(option)}
                                  onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                                />
                                <span className="flex-1">{option}</span>
                              </>
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex items-center px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={tempSelectedOptions.includes(option)}
                        onChange={() => toggleOption(option)}
                        onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                      />
                      <span className="flex-1">{option}</span>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div> */}
            {/* <div className="flex justify-end p-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 rounded text-black px-4 py-2 mr-2"
                onClick={cancelSelection}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 rounded text-white px-4 py-2"
                onClick={applySelection}
              >
                Apply
              </button>
            </div> */}
            <div className="flex justify-end space-x-2 p-2">
              <button
                className="text-gray-600 hover:text-gray-800 border border-gray-400 tracking-widest bg-white text-xs hover:bg-gray-100 font-medium py-1 px-4 rounded-3xl"
                onClick={cancelSelection}
                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
              >
                CANCEL
              </button>
              <button
                className="text-white bg-green-500 hover:bg-green-600 font-medium text-xs py-1 px-4  rounded-3xl tracking-widest"
                onClick={applySelection}
                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
              >
                APPLY
              </button>
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
}
