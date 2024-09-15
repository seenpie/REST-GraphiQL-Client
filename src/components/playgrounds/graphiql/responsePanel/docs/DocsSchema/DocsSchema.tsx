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
          <span className={classes.link} onClick={() => push(query)}>
            {GraphQlStartTypes.QUERY}
          </span>
        )}
        {mutation && (
          <span className={classes.link} onClick={() => push(mutation)}>
            {GraphQlStartTypes.MUTATION}
          </span>
        )}
        {subscription && (
          <span className={classes.link} onClick={() => push(subscription)}>
            {GraphQlStartTypes.SUBSCRIPTION}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <button className={classes.backButton} type="button" onClick={pop}>
        back
      </button>
      <section className={classes.fieldsWrapper}>
        <DocsFields typeData={data} push={push} />
      </section>
    </div>
  );
}
