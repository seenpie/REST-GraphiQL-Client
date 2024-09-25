import gitIcon from "@/assets/icons/git.png";
import Image from "next/image";
import classes from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <ul className={classes.list}>
        <li className={classes.item}>2024</li>
        <li className={classes.item}>
          <a href="https://github.com/seenpie" target="blank">
            <Image src={gitIcon} alt="git_icon" width={16} height={16} />
            seenpie
          </a>
        </li>
      </ul>
    </footer>
  );
}
