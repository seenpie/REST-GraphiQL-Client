import "./Header.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const [isRussian, setIsRussian] = useState(false);

  function goSignInPage() {
    router.push("/signin");
  }

  function goSignUpPage() {
    router.push("/signup");
  }

  function toggleLanguage() {
    setIsRussian(!isRussian);
  }
  return (
    <header className="header">
      <div className="header__list">
        <p className="header__item header__title">client</p>
        <button
          type="button"
          className="header__item header__button"
          onClick={toggleLanguage}
        >
          {isRussian ? "en" : "ru"}
        </button>
      </div>
      <div className="header__list">
        <button
          type="button"
          className="header__item header__button"
          onClick={goSignInPage}
        >
          {isRussian ? "войти" : "sign in"}
        </button>
        <button
          type="button"
          className="header__item header__button header__button-registration"
          onClick={goSignUpPage}
        >
          {isRussian ? "зарегистрироваться" : "registration"}
        </button>
      </div>
    </header>
  );
}
