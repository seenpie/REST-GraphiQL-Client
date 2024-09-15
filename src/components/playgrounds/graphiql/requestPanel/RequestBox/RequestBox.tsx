"use client";

import { RequestEditor } from "@/components/playgrounds/graphiql/shared/codemirror";
import { Button } from "@/components/playgrounds/graphiql/shared/Button/Button";
import { useRequest } from "@/hooks/useRequest";
import { HeadersTool } from "@/components/playgrounds/graphiql/requestPanel/HeadersTool/HeadersTool";
import { VariablesTool } from "@/components/playgrounds/graphiql/requestPanel/VariablesTool/VariablesTool";
import classes from "./RequestBox.module.scss";

export function RequestBox() {
  const {
    queryValue,
    handleChange,
    sendRequest,
    handleBlur,
    globalLoading,
    isSchemaExists,
    fixQuery
  } = useRequest();

  return (
    <div className={classes.wrapper}>
      <section className={classes.wrapper}>
        <div className={classes.requestHeaders}>
          <HeadersTool />
        </div>
        <div className={classes.requestEditor}>
          <header className={classes.requestTool}>
            <span>tools</span>
            <div className={classes.buttons}>
              <Button
                label="fix"
                isLoading={false}
                isAvailable={!!queryValue}
                callback={fixQuery}
              />
              <Button
                label="run"
                isLoading={globalLoading}
                isAvailable={!!queryValue && isSchemaExists}
                callback={sendRequest}
              />
            </div>
          </header>
          <div className={classes.editor}>
            <RequestEditor
              value={queryValue}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className={classes.requestVariables}>
          <VariablesTool />
        </div>
      </section>
    </div>
  );
}
