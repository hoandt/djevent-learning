import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

function Search() {
  const router = useRouter();

  const [input, setInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?term=${input}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={searchHandler}>
        <input
          placeholder="Search events..."
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default Search;
