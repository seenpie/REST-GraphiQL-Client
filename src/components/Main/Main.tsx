"use client";

import "./Main.scss";
import { useRouter } from "next/navigation";

export function Main() {
  const router = useRouter();

  function goGraphiQLPage() {
    router.push("/graphiql");
  }

  function goRestfullPage() {
    router.push("/restfull");
  }

  return (
    <div className="main">
      <div className="main__list">
        <section className="section">
          <button
            type="button"
            className="main__item main__button"
            onClick={goGraphiQLPage}
          >
            go GraphiQL
          </button>
        </section>

        <section className="section">
          <button
            type="button"
            className="main__item main__button"
            onClick={goRestfullPage}
            disabled={Boolean(true)}
          >
            go RESTFull
          </button>
        </section>
      </div>
    </div>
  );
}
