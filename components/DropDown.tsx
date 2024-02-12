import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// Explicit type for the classNames function
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// Define the OptionType type
export type OptionType = string;

// Define the DropDownProps interface with types
interface DropDownProps {
  selectedOption: OptionType;
  setOption: (option: OptionType) => void;
  options: OptionType[];
}

export default function DropDown({
  selectedOption,
  setOption,
  options,
}: DropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on search term
  const filteredOptions: OptionType[] = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu as="div" className="relative block text-left w-full border-red-300 ">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border-2 border-green-200 bg-white px-4 py-2 text-black  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
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
          {/* <div className="px-4 py-2">
            <input
              type="text"
              className="w-full text-sm text-gray-700 border-green-300 focus:ring-black focus:border-black rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          {/* <div className="relative">
            <input
              type="text"
              className="w-full text-sm text-gray-700 border-green-300 focus:ring-black focus:border-black rounded-md pl-3 pr-8"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 bg-red-500" // Added bg-red-500 for visibility
              >
                X 
              </button>
            )}
          </div> */}
          <div className="relative">
            <input
              type="text"
              className="w-full text-sm text-gray-700 border border-green-100 focus:ring-black focus:border-black rounded-md pl-3"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <svg
                onClick={() => setSearchTerm("")}
                className="h-5 w-5 absolute inset-y-0 right-0 my-auto flex items-center text-green-500 cursor-pointer mr-3" // Adjusted classes for alignment
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 00-1.414 0L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <Menu.Item key={option}>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      // e.preventDefault();
                      setOption(option);
                    }}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-red-900 font-bold"
                        : "text-green-700 text-lg font-semibold",
                      selectedOption === option ? "bg-gray-200" : "",
                      "block px-4 py-2 text-sm w-full text-left"
                    )}
                  >
                    {option}
                    {selectedOption === option && (
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
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
