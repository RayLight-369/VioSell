import React, { useState } from "react";
import Styles from "./RequestForm.module.css";
import { motion } from "framer-motion";

const RequestForm = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleMsgChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setDesc(e.target.value);
  };

  const handleSubmit = async () => {
    const request = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
      }),
    });
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.inputs}>
        <div className={Styles["shows-request"]}>
          <label htmlFor={Styles["shows-request-label"]}>
            <input
              placeholder=" "
              type="text"
              id={Styles["shows-request-input"]}
              name={Styles["shows-request-input"]}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>Title</span>
          </label>
        </div>
        <div className={Styles["shows-message"]}>
          <label htmlFor={Styles["shows-message-label"]}>
            <textarea
              placeholder=" "
              id={Styles["shows-message-input"]}
              onChange={handleMsgChange}
              name={Styles["shows-message-input"]}
            />
            <span>Description</span>
          </label>
        </div>
      </div>
      <div className={Styles.buttons}>
        <button
          type="button"
          className={Styles.requestBtn}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className={Styles.cancelBtn}
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RequestForm;
