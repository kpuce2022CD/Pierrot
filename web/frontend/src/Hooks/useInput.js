import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    const { value } = { ...e.target };
    setValue(value);
  };
  return { value, onChange };
};

export default useInput;
