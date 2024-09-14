import { RequestBox } from "@/components/playgrounds/graphiql/requestPanel";
import { ResponseBox } from "@/components/playgrounds/graphiql/responsePanel";
import { RequestSchemaBox } from "@/components/playgrounds/graphiql/requestPanel/RequestSchemaBox/RequestSchemaBox";
import classes from "./GraphQl.module.scss";

export function GraphiQl() {
  return (
    <div className={classes.graphiql}>
      <h1>this graphiQl editor</h1>
      <div className={classes.editor}>
        <header>
          <RequestSchemaBox />
        </header>
        <div className={classes.playground}>
          <section className={classes.wrapper}>
            <RequestBox />
          </section>
          <section className={classes.wrapper}>
            <ResponseBox />
          </section>
        </div>
      </div>
    </div>
  );
}
