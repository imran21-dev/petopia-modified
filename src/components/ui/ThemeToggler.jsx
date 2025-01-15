import React, { useState } from "react";


const ThemeToggler = () => {
  const [theme, setTheme] = useState("light");
  const [isChecked, setIsChecked] = useState(true)

  const handleTheme = () => {

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        
      </div>
    </div>
  );
};

export default ThemeToggler;
