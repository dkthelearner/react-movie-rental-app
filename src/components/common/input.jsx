import React from "react";

const Input = ({ name, label, value, placeholder, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">Field is required.</div>}
    </div>
  );
};

export default Input;
