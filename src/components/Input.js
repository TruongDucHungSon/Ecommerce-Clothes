const Input = ({ type, className, placeholder, min, max, label, name, value, onChange, onBlur, onFocus }) => {
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
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      ></input>
    </>
  );
};

export default Input;
