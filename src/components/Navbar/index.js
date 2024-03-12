import React from "react";
import { NavLink } from "react-router-dom";
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

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="tbcLogo" />
      <div className={styles.nav_elements}>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeClassName={styles.active}
              onClick={() => scrollToSection("home")}
            >
              首頁
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              activeClassName={styles.active}
              onClick={() => scrollToSection("news")}
            >
              最新消息
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/preferential-plan"
              activeClassName={styles.active}
              onClick={() => scrollToSection("preferentialPlan")}
            >
              優惠方案
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              activeClassName={styles.active}
              onClick={() => scrollToSection("contact")}
            >
              聯絡我們
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
