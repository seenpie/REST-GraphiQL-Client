import { useDocsSchema } from "@/hooks/useDocsSchema";
import { DocsFields } from "@/components/playgrounds/graphiql/responsePanel/docs/DocsFields/DocsFields";
import { GraphQlStartTypes } from "@/models/enums";
import classes from "./DocsSchema.module.scss";

export function DocsSchema() {
  const { query, mutation, subscription, push, pop, title, data, history } =
    useDocsSchema();

  if (history.length < 1) {
    return (
      <div className={classes.wrapper}>
        <span>{title}</span>
        {query && (
          <span onClick={() => push(query)}>{GraphQlStartTypes.QUERY}</span>
        )}
        {mutation && (
          <span onClick={() => push(mutation)}>
            {GraphQlStartTypes.MUTATION}
          </span>
        )}
        {subscription && (
          <span onClick={() => push(subscription)}>
            {GraphQlStartTypes.SUBSCRIPTION}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <span onClick={pop}>back</span>
      <section className={classes.fieldsWrapper}>
        <DocsFields typeData={data} push={push} />
      </section>
    </div>
  );
}
