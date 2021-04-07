// import React from "react";
import { useState } from "react";

const useForm = (initialState) => {
  const [state, setstate] = useState(initialState);
  const onChangeHandler = ({ target }) => {
    setstate({
      ...state,
      [target.name]: target.value,
    });
  };

  return {
    state,
    onChangeHandler,
  };
};

export default useForm;
