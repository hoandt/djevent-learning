import { createContext, useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "../config/index";
import user from "pages/api/user";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  //check user Login
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  //Register
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      console.log(data.message);
      setError(data.message);
      setError(null);
    }
  };

  //Logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      setUser(null);
      router.push("/");
    } else {
      console.log(data);
    }
  };

  //Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Check user logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const user = await res.json();

    if (res.ok) {
      setUser(user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
