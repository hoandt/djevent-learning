import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
function EditPage({ evt }) {
  const {
    id,
    name,
    venue,
    performers,
    description,
    address,
    date,
    time,
    image,
  } = evt[0];
  const [imagePreview, setImagePreview] = useState(
    image ? image.formats.thumbnail.url : null
  );
  const [values, setValues] = useState({
    name,
    venue,
    performers,
    description,
    address,
    date: date.substring(0, 10),
    time,
    id,
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const notify = () => toast.error("Please fill all fields");
  const submitEventHandler = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((el) => el === "");

    {
      if (hasEmptyFields) return notify();
    }

    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const imageUploaded = async () => {
    console.log("Uploaded");
    const res = await fetch(`${API_URL}/events/${values.id}`);
    const data = await res.json();

    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };
  return (
    <Layout>
      <ToastContainer />
      <Link href="/events">
        <a>Go back</a>
      </Link>
      <h1>Edit event</h1>

      <form onSubmit={submitEventHandler} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              id="performers"
              type="text"
              name="performers"
              value={values.performers}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              id="venue"
              type="text"
              name="venue"
              value={values.venue}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={values.address}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={values.date}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              id="time"
              type="text"
              name="time"
              value={values.time}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div>
          <label htmlFor="venue">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={values.description}
            onChange={inputChangeHandler}
          />
          <button className="btn" type="submit">
            Update Event
          </button>
        </div>
      </form>
      <h2>Preview</h2>
      {imagePreview ? (
        <Image width={170} height={100} src={imagePreview} alt={values.name} />
      ) : (
        <p>No image</p>
      )}
      <div>
        <button
          onClick={() => setShowModal(true)}
          type="submit"
          className="btn-secondary"
        >
          Upload Image
        </button>
      </div>
      <Modal
        title="Upload Image"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ImageUpload eventId={values.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ query: { id } }) => {
  const data = await fetch(`${API_URL}/events/?id=${id}`);
  const evt = await data.json();

  return {
    props: { evt },
  };
};
export default EditPage;
