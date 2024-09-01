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
        <button
          type="button"
          className="main__item main__button"
          onClick={goGraphiQLPage}
        >
          go GraphiQL
        </button>
        <button
          type="button"
          className="main__item header__button"
          onClick={goRestfullPage}
        >
          go RESTFull
        </button>
      </div>
    </div>
  );
}
