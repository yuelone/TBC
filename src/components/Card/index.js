import React from "react";
import styles from "./styles.scss";

const Card = ({ key, color, title, content }) => {
  return (
    <div className={`${styles.card} ${color}`} key={key}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
