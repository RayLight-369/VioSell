"use client";

import { useState } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";
import RequestForm from "../RequestForm/RequestForm";

const Footer = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleClose = () => setOpenForm(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {openForm && (
          <Modal handleClose={handleClose}>
            <RequestForm
              handleClose={handleClose}
              // handleSubmit={handleSubmit}
            />
          </Modal>
        )}
      </AnimatePresence>
      <footer className={styles["footer"]}>
        <div className={styles["body"]}>
          <div className={styles["title"]}>
            <Image
              src={"/Images/footer-icon.svg"}
              width={250}
              height={75}
              alt="footer"
            />
            <a
              className={styles["email"]}
              href="mailto:abdulrafay.designs@gmail.com"
            >
              abdulrafay.designs@gmail.com
            </a>
          </div>
          <div className={styles["update"]}>
            <p className={styles["title"]}>
              Stay up to date from VioSell on Internet
            </p>
            <div className={styles["inputs"]}>
              <input
                type="button"
                className={styles["sign-up"]}
                defaultValue={"FeedBack"}
                onClick={() => setOpenForm(true)}
              />
            </div>
          </div>
        </div>
        <p className={styles["copyright"]}>Copyright © 2024 VioSell</p>
      </footer>
    </>
  );
};

export default Footer;
