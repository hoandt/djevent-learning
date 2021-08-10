import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

function Events({ events, totalPages, current_page }) {
  return (
    <Layout title="DJ Events | Homepage">
      <div>
        {events.length === 0 && <h2>No event found.</h2>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </div>
      <Pagination totalPages={totalPages} current_page={current_page} />
    </Layout>
  );
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ query: { page } }) => {
  const current_page = page ? page : 1;
  const start = +current_page === 1 ? 0 : (+current_page - 1) * PER_PAGE;

  const data = await fetch(
    `${API_URL}/events?_sort=id:DESC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await data.json();

  const totalEventsJSON = await fetch(`${API_URL}/events/count`);
  const totalEvents = await totalEventsJSON.json();
  const totalPages = Math.ceil(totalEvents / PER_PAGE);
  return {
    props: {
      events,
      current_page,
      totalPages,
    },
  };
};

export default Events;
