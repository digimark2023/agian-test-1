import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Subcategory = {
  name: string;
  items: string[];
};

interface CategoriesDropDownProps {
  subcategories: Subcategory[];
}

const CategoriesDropDown1: React.FC<CategoriesDropDownProps> = ({
  subcategories,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
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
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

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
          <div className="px-4 py-2">
            <input
              type="text"
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-black"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredSubcategories.map((subcategory) => (
            <div key={subcategory.name} className="py-1">
              <div className="px-4 py-2 text-sm font-semibold text-blue-600">
                {subcategory.name}
              </div>
              {subcategory.items.map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex items-center px-4 py-2 text-sm w-full text-left`}
                      onClick={() => toggleItem(item)}
                    >
                      {item}
                    </button>
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
