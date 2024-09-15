import "./Footer.scss";
import gitIcon from "@/assets/icons/git.png";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <ul className="git__list">
        <li className="git__item">
          <Image src={gitIcon} alt="git_icon" />
          <a href="https://github.com/seenpie" target="blank">
            seenpie
          </a>
        </li>
        <li className="git__item">
          <Image src={gitIcon} alt="git_icon" />
          <a href="https://github.com/xsoularisx" target="blank">
            xsoularisx
          </a>
        </li>
      </ul>
      <ul className="footer__list">
        <li className="footer__item">2024</li>
        <li className="footer__item">
          <a href="https://rs.school" target="blank">
            RS School
          </a>
        </li>
      </ul>
    </footer>
  );
}
