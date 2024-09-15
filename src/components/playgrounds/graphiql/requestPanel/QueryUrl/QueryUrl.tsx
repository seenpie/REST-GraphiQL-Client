"use client";

import { ChangeEvent, useState } from "react";
import { setUrl } from "@/store";
import { useAppDispatch } from "@/hooks/storeHooks";

type QueryUrlParams = {
  className: string;
};

export function QueryUrl({ className }: QueryUrlParams) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch(setUrl(value));
  };

  return (
    <input className={className} value={inputValue} onChange={handleChange} />
  );
}
