import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/Modal.module.css";

function Modal({ show, title, children, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = () => {};
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={onClose}>
            X
          </a>
        </div>
        {title && <h3>{title}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
