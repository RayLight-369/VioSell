import React, { useState } from "react";
import Styles from "./RequestForm.module.css";
import { motion } from "framer-motion";

const RequestForm = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("Submit");
  const [desc, setDesc] = useState("");

  const handleMsgChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setDesc(e.target.value);
  };

  const handleSubmit = async () => {
    setMsg("Sending...");
    const request = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
      }),
    });
    if (request.ok) {
      setMsg("Sent!");
    }
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
        <p className={Styles.note}>
          Note: If you accidentally close this form , the inputs will reset.
        </p>
      </div>
      <div className={Styles.buttons}>
        <button
          type="button"
          className={Styles.requestBtn}
          onClick={handleSubmit}
          disabled={["Sending...", "Sent!"].includes(msg)}
        >
          {msg}
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
