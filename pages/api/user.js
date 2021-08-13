import { API_URL } from "@/config/index";
import cookie from "cookie";
const userFetching = async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return;
    } else {
      const { token } = cookie.parse(req.headers.cookie);
      const strapiRes = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await strapiRes.json();
      if (strapiRes.ok) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: `User forbidden.` });
      }
    }
  } else {
    res.setHeader("allow", "GET");
    res.status(405).json({ message: `${req.method} is not allowed` });
  }
};
export default userFetching;
//http://localhost:1337/users/me
