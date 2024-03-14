import React from "react";
import logo from "../../assets/tbcLogo.svg";
import styles from "./styles.scss";

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -100;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const Navbar = () => {
  const navBarData = [
    {
      id: "home",
      name: "首頁",
    },
    {
      id: "news",
      name: "最新消息",
    },
    {
      id: "preferentialPlan",
      name: "優惠方案",
    },
    {
      id: "contact",
      name: "聯絡我們",
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="tbcLogo" />
        <div className={styles.nav_elements}>
          <ul>
            {navBarData.map((item) => (
              <li>
                <a onClick={() => scrollToSection(item.id)}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
