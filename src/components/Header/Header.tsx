import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  activeTab: "all" | "favourites";
  onTabChange: (tab: "all" | "favourites") => void;
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
          className={`${styles.button} ${activeTab === "favourites" ? styles.buttonActive : ""}`}
          onClick={() => onTabChange("favourites")}
        >
          Любимые котики
        </button>
      </div>
    </header>
  );
};

export default Header;
