import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  activeTab: "all" | "favorites";
  onTabChange: (tab: "all" | "favorites") => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={`${styles.button} ${activeTab === "all" ? styles.buttonActive : ""}`}
          onClick={() => onTabChange("all")}
        >
          Все котики
        </button>
        <button
          className={`${styles.button} ${activeTab === "favorites" ? styles.buttonActive : ""}`}
          onClick={() => onTabChange("favorites")}
        >
          Любимые котики
        </button>
      </div>
    </header>
  );
};

export default Header;
