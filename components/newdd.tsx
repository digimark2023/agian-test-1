import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid"; // Using TrashIcon
import { XCircleIcon } from "@heroicons/react/20/solid"; // Import XCircleIcon

type Subcategory = {
  name: string;
  items: string[];
};

// interface CategoriesDropDownProps {
//   subcategories: Subcategory[];
//   resetSelection?: boolean;
// }
interface CategoriesDropDownProps {
  subcategories: Subcategory[];
  resetSelection?: boolean;
  onSelectionChange?: (selectedItems: string[]) => void; // new prop
}

const CategoriesDropDown1: React.FC<CategoriesDropDownProps> = ({
  // subcategories,
  // resetSelection = false,
  subcategories,
  resetSelection = false,
  onSelectionChange, // Destructure the prop here
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (resetSelection) {
      setSelectedItems([]);
    }
  }, [resetSelection]);

  // const toggleItem = (item: string) => {
  //   if (selectedItems.includes(item)) {
  //     setSelectedItems(selectedItems.filter((i) => i !== item));
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };

  const toggleItem = (item: string) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(newSelectedItems);

    // Call the onSelectionChange prop with the new selected items
    if (onSelectionChange) {
      onSelectionChange(newSelectedItems);
    }
  };

  const clearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevents the default action of the button
    event.stopPropagation(); // Stops the click event from propagating to parent elements
    setSelectedItems([]); // Clears the selected items
  };

  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Menu as="div" className="relative block text-left w-full">
      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        {selectedItems.length > 0
          ? selectedItems.join(", ")
          : "Select Categories"}
        {selectedItems.length > 0 && (
          <button
            onClick={clearSelection} // Attach the event handler only to the button
            className="outline-none focus:outline-none"
          >
            <XCircleIcon
              className="ml-2 h-5 w-5 cursor-pointer text-green-800"
              aria-hidden="true"
            />
          </button>
        )}

        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      {/* ... rest of the component */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-90 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div className="flex px-4 py-2">
            <input
              type="text"
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-black"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={clearSelection} // Attach the event handler to the button
                className="outline-none focus:outline-none"
              >
                <XCircleIcon
                  className="h-5 w-5 cursor-pointer text-green-800"
                  aria-hidden="true"
                />
              </button>
            )}
            {/* {selectedItems.length > 0 && (
              // <TrashIcon
              //   className="ml-2 h-5 w-5 cursor-pointer"
              //   aria-hidden="true"
              //   onClick={clearSelection}
              // />
              <button className="" onClick={clearSelection}>
                <XCircleIcon
                  className="ml-2 h-5 w-5 cursor-pointer text-green-800"
                  aria-hidden="true"
                  onClick={clearSelection}
                />
              </button>
            )} */}
          </div>
          {filteredSubcategories.map((subcategory) => (
            <div key={subcategory.name} className="py-1">
              <div className="px-4 py-2 text-sm font-semibold text-blue-600">
                {subcategory.name}
              </div>
              {subcategory.items.map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "bg-gray-100" : "bg-white"
                      } group flex items-center px-4 py-2 text-sm`}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                      />
                      <span className="text-black">{item}</span>{" "}
                      {/* Changed text color to black */}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CategoriesDropDown1;
