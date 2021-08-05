import Layout from "../components/Layout";
import styles from "../styles/404.module.css";
import Link from "next/link";

function NotFound() {
  return (
    <Layout>
      <div className={styles.error}>
        <h2>Page not found</h2>
        <p>The page is not existed</p>
        <p>
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
