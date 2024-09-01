import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <ul className="git__list">
        <li className="git__item">
          <a href="https://github.com/seenpie" target="blank">
            seenpie
          </a>
        </li>
        <li className="git__item">
          <a href="https://github.com/xsoularisx" target="blank">
            xsoularisx
          </a>
        </li>
        <li className="git__item">
          <a href="https://github.com/kuzmich84" target="blank">
            kuzmich84
          </a>
        </li>
      </ul>
      <ul className="footer__list">
        <li className="footer__item">2023</li>
        <li className="footer__item">
          <a href="https://rs.school" target="blank">
            RS School
          </a>
        </li>
      </ul>
    </footer>
  );
}
