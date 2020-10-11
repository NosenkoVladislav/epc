import React from "react";
import { Button } from "react-bootstrap";

const Btn = ({ handler, handleValue, type, child }) => {
  return (
    <Button variant={type} onClick={() => handler(handleValue)}>
      {child}
    </Button>
  );
};

export default Btn;
