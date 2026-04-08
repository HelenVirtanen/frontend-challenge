import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  activeTab: "all" | "favourites";
  onTabChange: (tab: "all" | "favourites") => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  
  const getButtonClass = (tab: "all" | "favourites") => {
  return `${styles.button} ${activeTab === tab ? styles.buttonActive : ""}`;
};

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={getButtonClass("all")}
          onClick={() => onTabChange("all")}
        >
          Все котики
        </button>
        <button
          className={getButtonClass("favourites")}
          onClick={() => onTabChange("favourites")}
        >
          Любимые котики
        </button>
      </div>
    </header>
  );
};

export default Header;
