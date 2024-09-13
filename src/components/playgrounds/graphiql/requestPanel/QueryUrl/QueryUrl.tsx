"use client";

import { ChangeEvent, useState } from "react";
import { setUrl } from "@/store";
import { useAppDispatch } from "@/hooks/storeHooks";

export function QueryUrl() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch(setUrl(value));
  };

  return <input value={inputValue} onChange={handleChange} />;
}
