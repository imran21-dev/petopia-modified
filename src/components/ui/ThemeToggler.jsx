import React, { useState } from 'react';


const ThemeToggler = () => {

    const [theme,setTheme] = useState('light')

    const handleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }
 

    return (
        <div>
            <button onClick={handleTheme}>Theme</button>
        </div>
    );
};

export default ThemeToggler;