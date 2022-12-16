import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectBoxArrow from '@heroicons/react/24/solid/ChevronDownIcon';
import useOutsideClick from '../../hooks/useOutsideClick';

export default function SelectBox({
  items = [],
  className = '',
  onChanged = () => {},
  placeholder = '',
  value = null,
}) {
  const [isOpen, toggleOpen] = useState(false);
  const [activeItem, selectItem] = useState(null);

  const selectBoxRef = useOutsideClick(() => toggleOpen(false));

  useEffect(() => {
    selectItem(items.find((item) => item.value === value));
  }, [value]);

  const handleSelectItem = (item) => {
    selectItem(item);
    onChanged(item);
    toggleOpen(false);
  };

  const isItemActive = (item) => value && value === item.value;

  return (
    <div className="flex flex-col relative">
      <button
        ref={selectBoxRef}
        type="button"
        className={`px-4 h-12 flex rounded items-center justify-between bg-white shadow-border dark:bg-primaryDark ${className}`}
        onClick={() => toggleOpen((prevState) => !prevState)}
      >
        { activeItem?.title || placeholder }
        <SelectBoxArrow className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          className="absolute bg-white dark:bg-primaryDark shadow-border rounded p-4 space-y-3 w-full top-14"
        >
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`block w-full text-left ${isItemActive(item) && 'font-bold'}`}
                onClick={() => handleSelectItem(item)}
              >
                {item.title}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

SelectBox.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};
