"use client";

import CodeMirror from "@uiw/react-codemirror";
// import { graphql } from "cm6-graphql";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export function Editor() {
  return (
    <div>
      <section>
        <CodeMirror placeholder="something" extensions={[]} height="300px" />
      </section>
      <section>
        <div>
          <button type="button">fix</button>
        </div>
      </section>
    </div>
  );
}
