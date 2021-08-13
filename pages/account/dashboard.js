import Layout from "@/components/Layout";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import parseCookie from "@/helpers/index.js";
import { API_URL } from "@/config/index.js";
import DashboardItem from "@/components/DashboardItem";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteHandler = async (id) => {
    if (confirm(`Are you sure to delete #${id}?`)) {
      const data = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await data.json();
      if (!data.ok) {
        data.status === 403
          ? toast.error("Unauthorized!")
          : console.log("Something went wrong!:" + json.message);
      } else {
        router.push("/events/");
      }
    }
  };
  return (
    <Layout title="Dasboard">
      <h2>Dashboard</h2>

      <div>
        <ToastContainer />
        <h3>My events</h3>
        {events.length > 0 &&
          events.map((evt) => (
            <DashboardItem onDelete={deleteHandler} key={evt.id} evt={evt} />
          ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();

  return {
    props: { events, token },
  };
};
export default DashboardPage;
