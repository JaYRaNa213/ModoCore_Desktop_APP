// src/context/TemplatesContext.jsx
import { createContext, useContext, useState } from "react";

const TemplatesContext = createContext();

export const useTemplates = () => useContext(TemplatesContext);

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([]);

  return (
    <TemplatesContext.Provider value={{ templates, setTemplates }}>
      {children}
    </TemplatesContext.Provider>
  );
}
