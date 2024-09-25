"use client";

import { QueryUrl } from "@/components/playgrounds/graphiql/requestPanel";
import { Button } from "@/components/playgrounds/graphiql/shared/Button/Button";
import { useRequestSchema } from "@/components/playgrounds/graphiql/requestPanel/RequestSchemaBox/RequestSchemaBox.hooks";
import classes from "./RequestSchemaBox.module.scss";

export function RequestSchemaBox() {
  const { getSchema, isSchemaLoading, url } = useRequestSchema();

  return (
    <div className={classes.wrapper}>
      <QueryUrl className={classes.input} />
      <Button
        callback={getSchema}
        isLoading={isSchemaLoading}
        isAvailable={!!url}
        label="get schema"
      />
    </div>
  );
}
