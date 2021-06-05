import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isChanging, setIsChanging] = useState(false);
  const [prevTerm, setPrevTerm] = useState("");
  const [displayTerm, setDisplayTerm] = useState("");
  const [allDrinks, setAllDrinks] = useState("All Drinks");
  const [lock, setLock] = useState(true);

  return (
    <Context.Provider
      value={{
        search: [searchTerm, setSearchTerm],
        changing: [isChanging, setIsChanging],
        prev: [prevTerm, setPrevTerm],
        all: [allDrinks, setAllDrinks],
        display: [displayTerm, setDisplayTerm],
        isLocked: [lock, setLock],
      }}
    >
      {children}
    </Context.Provider>
  );
};
