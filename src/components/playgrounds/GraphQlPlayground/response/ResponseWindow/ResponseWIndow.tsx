"use client";

import { useState } from "react";
import { Docs, Result } from "./tabs";

export function ResponseWindow() {
  const [isDocsVisible, setDocsVisible] = useState<boolean>(false);

  const content = isDocsVisible ? <Docs /> : <Result />;

  return (
    <div>
      <header>
        <button type="button" onClick={() => setDocsVisible(false)}>
          result
        </button>
        <button type="button" onClick={() => setDocsVisible(true)}>
          docs
        </button>
      </header>
      <section>{content}</section>
    </div>
  );
}
