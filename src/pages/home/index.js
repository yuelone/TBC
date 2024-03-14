import React from "react";
import Navbar from "Components/Navbar";
import FloatingIconsMenu from "Components/FloatingIconsMenu";
import Card from "Components/Card";
import newsImg from "Assets/newsImg.svg";
import newsImg2 from "Assets/newsImg2.svg";
import styles from "./styles.scss";

const Home = () => {
  const cardData = [
    {
      color: styles.cardBlueLight,
      title: "方案一",
      content:
        "雙頻 wifi 數據機提供飆網環境，居家生活又便利，可支援各項聯網設備，詳情請洽專員為您服務。",
    },
    {
      color: styles.cardYellow,
      title: "方案二",
      content:
        "全新 4K 聯網機上盒搭配雙頻WIFI數據機，收視影音節目及 YouTube，提供飆網環境加上可連線智能 3C 家電。",
    },
    {
      color: styles.cardBlueDark,
      title: "方案三",
      content:
        "雙頻 wifi 數據機提供飆網環境，居家生活又便利，可支援各項聯網設備，詳情請洽專員為您服務。",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main>
        <section id="home" className={styles.titleBackgroud}>
          <h1 className={styles.title}>TBC 群健 - 大大寬頻讚讚快來安裝</h1>
        </section>
        <section id="news" className={styles.news}>
          <img className={styles.newImg} src={newsImg} alt="DM" />
          <img className={styles.newImg} src={newsImg2} alt="DM" />
        </section>
        <section
          id="preferentialPlan"
          className={styles.preferentialPlanContainer}
        >
          <div className={styles.preferentialPlanContent}>
            {cardData.map((item, index) => (
              <Card
                key={index}
                color={item.color}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </section>
        <section id="contact" className={styles.contact}>
          <p>
            請洽群健服務專員-黃先生
            <br />
            聯絡電話： 0931109084
            <br />
            部門速撥: 04-35099808 轉分機 4727 或 4728
            <br />
            專員速撥電話平日早上 10 點到晚上 8 點: 04-35099808
            <br />
            聯絡地址： 五權五街 151 號 12F
          </p>
        </section>
      </main>
      <FloatingIconsMenu />
      <footer>
        <p>Copyright © 2024 TBC 群健 All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
