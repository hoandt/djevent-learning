import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);
  useEffect(() => {
    {
      error && toast.error(error);
    }
  });
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Password not matched!");
      return;
    }
    // console.log(`${username}:${email}:${password}`);
    register({ username, email, password });
  };
  return (
    <Layout title="Registration Page">
      <ToastContainer position="top-center" />
      <div className={styles.auth}>
        <h1>Registration</h1>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
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
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Re-type Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input className="btn" type="submit" value="Register" />
        </form>
      </div>
    </Layout>
  );
}

export default RegisterPage;
