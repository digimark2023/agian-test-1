import React from "react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// Assuming Subcategory type is already defined as provided in your JSON
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
  return (
    <div className="dropdown-list">
      {subcategories.map((subcategory) => (
        <div key={subcategory.name} className="subcategory">
          <div className="subcategory-name">{subcategory.name}</div>
          {subcategory.items.map((item) => (
            <div key={item} className="item">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoriesDropDown1;
