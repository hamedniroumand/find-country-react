import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  value,
  onChanged,
  placeHolder = '',
  icon = null,
  onSubmitted = () => {},
  className = '',
}) {
  return (
    <form
      className={`px-8 h-12 flex items-center shadow-border rounded dark:bg-primaryDark w-full ${className}`}
      onSubmit={(e) => onSubmitted(e)}
    >
      {icon && icon}
      <input
        className={`bg-transparent w-full focus-within:outline-0 ${icon && 'ml-3'}`}
        value={value}
        type="text"
        placeholder={placeHolder}
        onChange={onChanged}
      />
    </form>
  );
}

Input.propTypes = {
  onSubmitted: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onChanged: PropTypes.func.isRequired,
  icon: PropTypes.element,
  className: PropTypes.string,
};
