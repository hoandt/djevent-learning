import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { API_URL } from "../config/index";

function DashboardItem({ evt, onDelete }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          width={170}
          height={100}
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          alt={evt.name}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("vi")} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div>
        <Link href={`/events/edit/${evt.id}`}>
          <a className="btn-secondary">Edit</a>
        </Link>
        <a href="#" onClick={() => onDelete(evt.id)} className="btn">
          delete
        </a>
      </div>
    </div>
  );
}

export default DashboardItem;
