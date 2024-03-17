import React, { useState } from "react";
import logo from "Assets/tbcLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.scss";

const Navbar = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
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

  function handleIsBurgerClicked() {
    setIsBurgerClicked(!isBurgerClicked);
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -100;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsBurgerClicked(false);
  }

  return (
    <nav className={styles.navbar}>
      <label>
        <img className={styles.logo} src={logo} alt="tbcLogo" />
      </label>
      <ul style={{ left: isBurgerClicked ? 0 : "-100%" }}>
        {navBarData.map((item) => (
          <li>
            <a href="javascript:;" onClick={() => scrollToSection(item.id)}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <label className={styles.burger} onClick={handleIsBurgerClicked}>
        {isBurgerClicked ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </label>
    </nav>
  );
};

export default Navbar;
