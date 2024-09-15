"use client";

import { ChangeEvent, useState } from "react";
import { setUrl } from "@/store";
import { useAppDispatch } from "@/hooks/storeHooks";

type QueryUrlParams = {
  style: string;
};

export function QueryUrl({ style }: QueryUrlParams) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    dispatch(setUrl(value));
  };

  return <input className={style} value={inputValue} onChange={handleChange} />;
}
