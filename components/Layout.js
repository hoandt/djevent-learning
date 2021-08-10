import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Showcase from "./Showcase";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ siteName, title, description, children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {title}::{siteName}
        </title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
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
