import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const ModalInput = ({ value, name, onInputChange }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        name={name}
        value={value}
        onChange={(e) => {
          onInputChange(name, e);
        }}
      />
    </InputGroup>
  );
};

export default ModalInput;
