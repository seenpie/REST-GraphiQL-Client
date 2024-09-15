import { RequestBox } from "@/components/playgrounds/graphiql/requestPanel";
import { ResponseBox } from "@/components/playgrounds/graphiql/responsePanel";
import { RequestSchemaBox } from "@/components/playgrounds/graphiql/requestPanel/RequestSchemaBox/RequestSchemaBox";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import classes from "./GraphiQl.module.scss";

export function GraphiQl() {
  return (
    <div className={classes.graphiql}>
      <Header />
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
      <Footer />
    </div>
  );
}
