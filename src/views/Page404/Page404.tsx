"use client";

import { useRouter } from "next/navigation";
import "./Page404.scss";

export function Page404() {
  const router = useRouter();

  function returnMainPage() {
    router.push("/");
  }

  return (
    <div className="page404">
      <h1 className="page404__title">404</h1>
      <p className="page404__text">page not found</p>
      <button
        type="submit"
        className="page404__button"
        onClick={returnMainPage}
      >
        return main page
      </button>
    </div>
  );
}
