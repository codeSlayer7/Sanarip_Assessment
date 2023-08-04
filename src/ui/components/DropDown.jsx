import { useState } from "react";
import { CaretDown, CaretUp } from "phosphor-react";

const DropDown = ({ options, onOptionClick, label }) => {
  const [isExpended, setIsExpended] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const showCaretDown = isExpended;
  const showCaretUp = !isExpended;

  return (
    <div className="relative">
      <div onClick={() => setIsExpended(!isExpended)}>{label}</div>
      
      {isExpended && (
        <div className="absolute top-12 z-10 right-[3%] divide-gray-100 rounded-lg bg-white  shadow ">
          <ul>
            {options.map((option) => (
              <li
                onClick={() => {
                  setIsExpended(false);
                  onOptionClick(option);
                  setSelectedValue(option);
                }}
                className=" cursor-pointer p-[5px] rounded-md  hover:bg-blue-400 hover:text-white text-base"
                key={option}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
