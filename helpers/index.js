import cookie from "cookie";

function parseCookie(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export default parseCookie;
