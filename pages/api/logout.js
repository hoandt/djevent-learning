import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );
    res.status(200).json({ message: `Success!` });
  } else {
    res.setHeader("allow", "POST");
    res.status(405).json({ message: `${req.method} is not allowed` });
  }
};
