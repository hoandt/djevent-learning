import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";

function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="DJ Events | Homepage">
      <div>
        <h3>
          Search results for: <em>{router.query.term}</em>
        </h3>
        {events.length === 0 && <h2>No event found.</h2>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </div>
    </Layout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { venue_contains: term },
        { performers_contains: term },
        { description_contains: term },
      ],
    },
  });
  const data = await fetch(`${API_URL}/events/?${query}`); // your fetch function here
  const events = await data.json();
  return {
    props: { events },
  };
};

// export const getServerSideProps = async ({ query: { term } }) => {
//   const query = qs.stringify({
//     _where: {
//       _or: [
//         { name_contains: term },
//         { venue_contains: term },
//         { address_contains: term },
//         { performers_contains: term },
//         { description_contains: term },
//       ],
//     },
//   });
//   const data = await fetch(`${API_URL}/events?${query}`);
//   const events = await data.json();

//   return {
//     props: {
//       events,
//     },
//   };
// };

export default SearchPage;
