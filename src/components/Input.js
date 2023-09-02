import React from "react";
const Input = ({ type, className, placeholder, min, max, label, name }) => {
  return (
    <>
      <label>{label}</label>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        name={name}
      ></input>
    </>
  );
};

export default Input;
