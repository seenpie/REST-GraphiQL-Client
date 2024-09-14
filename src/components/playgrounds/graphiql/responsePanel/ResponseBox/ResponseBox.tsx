"use client";

import { Button } from "@/components/playgrounds/graphiql/shared/Button/Button";
import { useResponse } from "@/hooks/useResponse";
import { ResponseEditor } from "@/components/playgrounds/graphiql/shared/codemirror";
import { DocsSchema } from "@/components/playgrounds/graphiql/responsePanel/docs/DocsSchema/DocsSchema";
import classes from "./ResponseBox.module.scss";

export function ResponseBox() {
  const {
    setDocsVisibility,
    setResultVisibility,
    isLoading,
    docs,
    isDocsVisible,
    docsError,
    response
  } = useResponse();

  let content = isDocsVisible ? (
    <DocsSchema />
  ) : (
    <>
      <span>status {response.status}</span>
      <div className={classes.editor}>
        <ResponseEditor value={response.data} />
      </div>
    </>
  );
  if (docsError) {
    content = <span>{docsError.message}</span>;
  }

  return (
    <div className={classes.wrapper}>
      <header>
        <Button
          label="result"
          isLoading={false}
          isAvailable={Boolean(true)}
          callback={setResultVisibility}
        />
        <Button
          label="schema"
          isLoading={false}
          isAvailable={!!docs}
          callback={setDocsVisibility}
        />
      </header>
      <section className={classes.wrapper}>
        {isLoading && <span>loading</span>}
        {content}
      </section>
    </div>
  );
}
