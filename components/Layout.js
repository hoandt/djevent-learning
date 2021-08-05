import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ siteName, title, description, children }) {
  return (
    <>
      <Head>
        <title>
          {title}::{siteName}
        </title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
}
Layout.defaultProps = {
  siteName: "DJ Events",
  title: "DJ Events | Parties and Music",
  description: "Come and enjoy the parties with top DJs",
};
export default Layout;
