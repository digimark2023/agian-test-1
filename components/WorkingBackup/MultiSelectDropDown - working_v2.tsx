import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]): string {
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

  return (
    <Menu as="div" className="relative block text-left w-full border-red-300">
      {/* ... other component parts ... */}
      <div className="max-h-60 overflow-y-auto">
        {filteredOptions.map((option) => (
          <Menu.Item key={option}>
            {({ active }) => (
              <button
                onClick={() => toggleOption(option)}
                className={classNames(
                  active ? "bg-gray-100 text-red-900" : "text-green-700",
                  "block px-4 py-2 text-sm w-full text-left flex items-center"
                )}
              >
                <span
                  className={classNames(
                    "inline-block mr-2",
                    selectedOptions.includes(option)
                      ? "text-green-600"
                      : "text-gray-400"
                  )}
                >
                  {selectedOptions.includes(option) ? "✔️" : "⬜️"}
                </span>
                {option}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu>
  );
}
