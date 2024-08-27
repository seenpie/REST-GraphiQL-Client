"use client";

import { useState } from "react";
import { getIntrospectionQuery } from "graphql/utilities";

export function UrlInput() {
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    console.log(inputValue);
    const response = await fetch(inputValue, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: getIntrospectionQuery() })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="button" onClick={handleSend}>
        send
      </button>
    </>
  );
}
