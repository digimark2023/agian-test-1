import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { XCircleIcon } from "@heroicons/react/20/solid";
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export type OptionType = string;

interface MultiSelectDropDownProps {
  selectedOptions: OptionType[]; // Array of selected options
  setOptions: (options: OptionType[]) => void; // Function to update the selected options
  options: OptionType[];
}

export default function MultiSelectDropDown({
  selectedOptions,
  setOptions,
  options,
}: MultiSelectDropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions: OptionType[] = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: OptionType) => {
    if (selectedOptions.includes(option)) {
      setOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setOptions([...selectedOptions, option]);
    }
  };
  const removeOption = (
    option: OptionType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setOptions(selectedOptions.filter((o) => o !== option));
  };

  // const removeOption = (option, e) => {
  //   e.stopPropagation(); // Prevent the dropdown from closing
  //   setOptions(selectedOptions.filter((o) => o !== option));
  // };
  return (
    <Menu as="div" className="relative block text-left w-full border-red-300 ">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border-2 border-green-200 bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
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
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        {/* <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border-2 border-green-200 bg-white px-4 py-2 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select Options"}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button> */}
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
          <div className="relative">
            {/* ... Your search input remains the same ... */}
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
                  className="h-5 w-5 absolute inset-y-0 right-0 my-auto flex items-center text-green-500 cursor-pointer mr-3"
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
          </div>
          <div className="max-h-60 overflow-y-auto">
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
                      checked={selectedOptions.includes(option)}
                      onChange={() => toggleOption(option)}
                      onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
                    />
                    <span className="flex-1">{option}</span>
                    {selectedOptions.includes(option) && (
                      <button
                        onClick={(e) => removeOption(option, e)}
                        className="ml-2"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </Menu.Item>
              // <Menu.Item key={option}>
              //   {({ active }) => (
              //     <div
              //       className={classNames(
              //         active ? "bg-gray-100" : "",
              //         "flex items-center px-4 py-2 w-full text-left"
              //       )}
              //       onClick={() => toggleOption(option)}
              //     >
              //       <div className="relative flex items-center">
              //         <input
              //           id={`custom-checkbox-${option}`}
              //           type="checkbox"
              //           className="sr-only" // hides the default checkbox
              //           checked={selectedOptions.includes(option)}
              //           onChange={() => toggleOption(option)}
              //         />
              //         <div
              //           className="w-4 h-4 inline-block mr-2 rounded-sm border border-gray-300 bg-white cursor-pointer"
              //           onClick={(e) => e.stopPropagation()}
              //         >
              //           {/* This SVG will be shown when the item is checked. Adjust the path as needed. */}
              //           {selectedOptions.includes(option) && (
              //             <svg
              //               className="fill-current text-green-500 w-full h-full"
              //               viewBox="0 0 20 20"
              //             >
              //               <path d="M7.629 14.571L3.357 10.3a1 1 0 111.414-1.414L7.629 12.743l7.3-7.3a1 1 0 111.414 1.414l-8.714 8.714z" />
              //             </svg>
              //           )}
              //         </div>
              //         <label
              //           htmlFor={`custom-checkbox-${option}`}
              //           className="flex-1 block text-sm cursor-pointer"
              //         >
              //           {option}
              //         </label>
              //       </div>
              //     </div>
              //   )}
              // </Menu.Item>
              // <Menu.Item key={option}>
              //   {({ active }) => (
              //     <div
              //       className={classNames(
              //         active ? "bg-gray-100" : "",
              //         "flex items-center px-4 py-2 w-full text-left"
              //       )}
              //       onClick={(e) => {
              //         e.stopPropagation(); // Prevents the menu from closing
              //         toggleOption(option);
              //       }}
              //     >
              //       <div className="relative flex items-center">
              //         <div
              //           className={`w-4 h-4 inline-block mr-2 rounded border ${
              //             selectedOptions.includes(option)
              //               ? "bg-green-500"
              //               : "bg-blue-200"
              //           } cursor-pointer`}
              //           onClick={(e) => {
              //             e.stopPropagation(); // Prevents the menu from closing
              //             toggleOption(option);
              //           }}
              //         >
              //           {selectedOptions.includes(option) && (
              //             <svg
              //               className="fill-current text-white w-full h-full"
              //               viewBox="0 0 20 20"
              //             >
              //               <path
              //                 d="M16.7,5.3c-0.4-0.4-1-0.4-1.4,0L7,13.6l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3,3c0.4,0.4,1,0.4,1.4,0l9-9
              //     C17.1,6.3,17.1,5.7,16.7,5.3z"
              //               />
              //             </svg>
              //           )}
              //         </div>
              //         <label
              //           className="flex-1 block text-sm cursor-pointer"
              //           onClick={(e) => {
              //             e.stopPropagation(); // Prevents the menu from closing
              //             toggleOption(option);
              //           }}
              //         >
              //           {option}
              //         </label>
              //       </div>
              //     </div>
              //   )}
              // </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
