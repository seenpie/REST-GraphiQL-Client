"use client";

import { QueryUrl } from "@/components/playgrounds/graphiql/requestPanel";
import { Button } from "@/components/playgrounds/graphiql/shared/Button/Button";
import { useGraphQlSchema } from "@/hooks/useGraphQlSchema";
import classes from "./RequestSchemaBox.module.scss";

export function RequestSchemaBox() {
  const { getSchema, isSchemaLoading, url } = useGraphQlSchema();

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
