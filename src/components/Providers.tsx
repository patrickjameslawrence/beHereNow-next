"use client";
import React from "react";
import { CurrentPageContext } from "@/contexts/CurrentPage";

export default function Providers({ children }) {
  const [currentPage, setCurrentPage] = React.useState("Explore");

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
}
