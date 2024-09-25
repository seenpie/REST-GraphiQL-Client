"use client";

import { useRouter } from "next/navigation";
import classes from "./Header.module.scss";

export function Header() {
  const router = useRouter();

  function redirect(path: "signin" | "signup") {
    switch (path) {
      case "signin":
        router.push("/signin");
        break;
      default:
        router.push("/signup");
    }
  }

  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <p className={classes.title}>seenGraphQl</p>
        </li>
      </ul>
      <ul className={classes.list}>
        <li className={classes.item}>
          <button
            type="button"
            className={classes.button}
            onClick={() => redirect("signin")}
          >
            sign in
          </button>
        </li>
        <li className={classes.item}>
          <button
            type="button"
            className={classes.button}
            onClick={() => redirect("signup")}
          >
            sign up
          </button>
        </li>
      </ul>
    </header>
  );
}
