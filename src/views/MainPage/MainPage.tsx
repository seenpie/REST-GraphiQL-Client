import { Main } from "@/components/Main/Main";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import classes from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
