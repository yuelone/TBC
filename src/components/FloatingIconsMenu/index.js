import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLine } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faMobileScreenButton,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.scss";

function handleLineClick() {
  window.location.href = "https://line.me/ti/p/Vc4Eveaf60";
}

function handlePhoneClick(device) {
  return () => {
    if (device === "phone") {
      0;
      window.location.href = "tel:+886-931109084";
    } else {
      window.location.href = "tel:+886-4-40505858";
    }
  };
}

function handleScrollTopClick() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const FloatingIconsMenu = () => {
  return (
    <div className={styles.floatingIcons}>
      <div className={styles.icon} onClick={handleLineClick}>
        <FontAwesomeIcon icon={faLine} />
      </div>
      <div className={styles.icon} onClick={handlePhoneClick("housePhone")}>
        <FontAwesomeIcon icon={faPhone} />
      </div>
      <div className={styles.icon} onClick={handlePhoneClick("phone")}>
        <FontAwesomeIcon icon={faMobileScreenButton} />
      </div>
      <div className={styles.icon} onClick={handleScrollTopClick}>
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
};

export default FloatingIconsMenu;
