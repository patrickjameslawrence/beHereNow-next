import React from "react";

export const CurrentPageContext = React.createContext({
  currentPage: "Explore",
  setCurrentPage: (updatedPage) => {},
});
