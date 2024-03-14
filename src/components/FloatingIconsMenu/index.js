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
  window.open("https://line.me/ti/p/Vc4Eveaf60");
}

function handlePhoneClick(device) {
  return () => {
    if (device === "phone") {
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
      <div
        className={styles.icon}
        style={{ backgroundColor: "#6458b7" }}
        onClick={handlePhoneClick("housePhone")}
      >
        <FontAwesomeIcon icon={faPhone} />
        <span className={styles.iconDirections}>報修專線</span>
      </div>
      <div
        className={styles.icon}
        style={{ backgroundColor: "#ed5578" }}
        onClick={handlePhoneClick("phone")}
      >
        <FontAwesomeIcon icon={faMobileScreenButton} />
        <span className={styles.iconDirections}> 專線服務</span>
      </div>
      <div
        className={styles.roundIcon}
        style={{ backgroundColor: "#02c755" }}
        onClick={handleLineClick}
      >
        <FontAwesomeIcon icon={faLine} />
      </div>
      <div className={styles.roundIcon} onClick={handleScrollTopClick}>
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
};

export default FloatingIconsMenu;
