import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, login } = useContext(AuthContext);
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="Login Page">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="btn" type="submit" value="Login" />
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default LoginPage;
