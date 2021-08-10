import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
function AddPage() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState({
    name: "",
    venue: "",
    performers: "",
    description: "",
    address: "",
    date: "",
    time: "",
  });
  const router = useRouter();

  const notify = () => toast.error("Please fill all fields");
  const submitEventHandler = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some((el) => el === "");
    setIsSubmit(true);
    console.log(values);
    {
      hasEmptyFields && notify();
    }
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
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
  return (
    <Layout>
      <ToastContainer />
      <Link href="/events">
        <a>Go back</a>
      </Link>
      <h1>Add event</h1>

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
            Send
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default AddPage;
