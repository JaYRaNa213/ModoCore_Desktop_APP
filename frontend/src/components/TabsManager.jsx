// src/components/TabsManager.jsx
import { useState } from "react";
import { X, RotateCcw, Plus } from "lucide-react";

export default function TabsManager() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);

  const addTab = (url) => {
    window.electronAPI.createTab(url);
    setTabs([...tabs, { url }]);
    setActiveTab(tabs.length);
  };

  const switchTab = (index) => {
    window.electronAPI.switchTab(index);
    setActiveTab(index);
  };

  const closeTab = (index) => {
    window.electronAPI.closeTab(index);
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    setActiveTab(Math.max(0, index - 1));
  };

  const reloadTab = () => {
    if (activeTab >= 0) window.electronAPI.reloadTab(activeTab);
  };

  return (
    <div className="flex items-center bg-gray-900 text-white border-b border-gray-700 overflow-x-auto no-scrollbar">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => switchTab(i)}
          className={`flex items-center px-4 py-2 cursor-pointer whitespace-nowrap ${
            activeTab === i ? "bg-gray-800 text-purple-400" : "hover:bg-gray-800"
          }`}
        >
          <span className="mr-2 truncate w-32">{tab.url.replace("https://", "")}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(i);
            }}
            className="hover:text-red-400"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addTab("https://google.com")}
        className="flex items-center px-4 py-2 hover:bg-gray-800 text-green-400"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={reloadTab}
        className="flex items-center px-4 py-2 hover:bg-gray-800 text-yellow-400"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
