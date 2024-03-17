import React from "react";
import styles from "./styles.scss";

const LoadingPage = () => (
  <div className={styles.loadingPageContainer}>
    <div className={`${styles.spinner} ${styles.spinnerAnimation}`}></div>
  </div>
);

export default LoadingPage;
