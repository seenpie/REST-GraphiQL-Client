"use client";

import { useRouter } from "next/navigation";
import classes from "./Main.module.scss";

export function Main() {
  const router = useRouter();

  function goGraphiQLPage() {
    router.push("/graphiql");
  }

  return (
    <div className={classes.main}>
      <div className={classes.list}>
        <section className={classes.section}>
          <button
            type="button"
            className="main__item main__button"
            onClick={goGraphiQLPage}
          >
            go GraphiQL
          </button>
        </section>
      </div>
    </div>
  );
}
