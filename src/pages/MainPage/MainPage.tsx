import { Main } from "@/components/Main/Main";
import { Header } from "@/components/Header/Header";
import "./MainPage.scss";
import { Footer } from "@/components/Footer/Footer";

export default function MainPage() {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
