import styles from "../styles/Footer.module.css";
import Link from "next/link";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright 2021 :: Party Events</p>
      <p>
        <Link href="/about">
          <a>About us</a>
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
