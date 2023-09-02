import React from "react";

const Title = ({ className, children }) => {
  return <h4 className={`title-center ${className}`}>{children}</h4>;
};

export default Title;
