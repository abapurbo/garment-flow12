import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";

export default function ThemeChangeIcon() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(e) => handleTheme(e.target.checked)}
      />

      {/* Light icon */}
      <span className="swap-off text-3xl text-blue-500 dark:text-purple-500">
        <IoSunnyOutline />
      </span>

      {/* Dark icon */}
      <span className="swap-on text-3xl text-purple-500">
        <LuMoon />
      </span>
    </label>
  );
}
