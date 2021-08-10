import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

function Home({ events }) {
  return (
    <Layout title="DJ Events | Homepage">
      {events.length === 0 && <h2>No event found.</h2>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">All Events</a>
        </Link>
      )}
    </Layout>
  );
}
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
  const data = await fetch(`${API_URL}/events?_sort=id:DESC&_limit=3`);
  const events = await data.json();

  return {
    props: {
      events,
    },
  };
};

export default Home;
