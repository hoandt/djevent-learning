import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function SingleEvent({ evt }) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    if (confirm(`Are you sure to delete ${evt.name} ?`)) {
      const data = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });
      const json = await data.json();
      if (!data.ok) {
        console.log("Something went wrong!:" + json.message);
      } else {
        router.push("/events/");
      }
    }
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>Edit</a>
          </Link>
          <Link href="#">
            <a onClick={deleteEvent} className={styles.delete}>
              Delete
            </a>
          </Link>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString("vi")} at {evt.time}
        </span>
        <h2>{evt.name}</h2>
        <Image
          width={960}
          height={600}
          src={
            evt.image
              ? evt.image.formats.large.url
              : "/images/event-default.png"
          }
          alt={evt.name}
        />
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue</h3>
        <p>{evt.venue}</p>
        <h3>Address</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>Go back</a>
        </Link>
      </div>
    </Layout>
  );
}
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  const data = await fetch(`${API_URL}/events`);
  const events = await data.json();
  const paths = events.map((ev) => {
    return {
      params: {
        slug: ev.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
  const slug = ctx.params.slug;
  const data = await fetch(`${API_URL}/events/?slug=${slug}`);
  const evt = await data.json();

  return {
    props: {
      evt: evt[0],
    },
    revalidate: 1000,
  };
};
export default SingleEvent;
