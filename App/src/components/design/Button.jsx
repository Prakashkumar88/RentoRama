import React from "react";

const Button = ({ className, href, onClick, children, px, white }) => {

  const classes = `button relative inline-flex items-center justify-center h-11 border-2 border-emerald-500 rounded-md transition-colors hover:text-color-8 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-8"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
