import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// Explicit type for the classNames function
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
export type OptionType = string;

interface CategoriesDropDownProps {
  selectedOption: OptionType;
  setOption: (option: OptionType) => void;
  options: { category: string; options: OptionType[] }[];
}

export default function DropDown({
  selectedOption,
  setOption,
  options,
}: CategoriesDropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on search term
  const filteredOptions = options.map((category) => ({
    ...category,
    options: category.options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

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
          <div>
            {filteredOptions.map((category) => (
              <Fragment key={category.category}>
                <div className="px-4 py-2 text-xs font-bold text-blue-500 uppercase">
                  {category.category}
                </div>

                {category.options.map((option) => (
                  <Menu.Item key={option}>
                    {({ active }) => (
                      <button
                        onClick={() => setOption(option)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          selectedOption === option ? "bg-gray-200" : "",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        {option}
                        {selectedOption === option && (
                          <CheckIcon className="w-4 h-4 inline-block ml-2" />
                        )}
                      </button>
                    )}
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
