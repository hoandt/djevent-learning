import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/index";
function ImageUpload({ eventId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    //strapi to connect with the collection
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      ID: {eventId}
      <div>
        <h4>Upload Event Image</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.file}>
            <input type="file" onChange={handleFileChange} />
          </div>
          <input type="submit" value="Upload" className="btn" />
        </form>
      </div>
    </div>
  );
}

export default ImageUpload;
