import { useEffect, useMemo, useState } from "react";
import { X, RotateCcw, Plus } from "lucide-react";
import Logo from "../assets/app-icon.png";

const DEFAULT_TAB_URL = "https://google.com";

const useElectronAPI = () => {
  if (typeof window === "undefined") return null;
  return window.electronAPI || null;
};

export default function TabsManager() {
  const electronAPI = useElectronAPI();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);

  const isElectron = Boolean(electronAPI);

  useEffect(() => {
    if (!electronAPI?.onTabsUpdate) return undefined;

    const unsubscribe = electronAPI.onTabsUpdate((state) => {
      setTabs(state?.tabs || []);
      const incomingActive = typeof state?.activeTabIndex === "number" ? state.activeTabIndex : -1;
      setActiveTab(incomingActive);
    });

    electronAPI
      .getTabsState?.()
      .then((state) => {
        if (state) {
          setTabs(state.tabs || []);
          setActiveTab(
            typeof state.activeTabIndex === "number" ? state.activeTabIndex : state.tabs?.length ? 0 : -1
          );
        }
      })
      .catch(() => {
        /* ignore */
      });

    return unsubscribe;
  }, [electronAPI]);

  const addTab = (url = DEFAULT_TAB_URL) => {
    if (!isElectron) return;
    electronAPI.createTab?.(url);
  };

  const switchTab = (index) => {
    if (!isElectron) return;
    electronAPI.switchTab?.(index);
  };

  const closeTab = (index) => {
    if (!isElectron) return;
    electronAPI.closeTab?.(index);
  };

  const reloadTab = () => {
    if (!isElectron || activeTab < 0) return;
    electronAPI.reloadTab?.(activeTab);
  };

  const tabItems = useMemo(
    () =>
      tabs.map((tab) => ({
        id: tab.id ?? tab.url,
        title: tab.title || tab.url?.replace(/^https?:\/\//, "") || "New Tab",
        url: tab.url,
      })),
    [tabs]
  );

  if (!isElectron) {
    return (
      <div className="bg-gray-900 text-gray-400 text-center py-2 border-b border-gray-800 text-sm">
        Desktop tabs available inside the installed Templaunch app.
      </div>
    );
  }

  return (
    <div
      className="select-none bg-[#111111] border-b border-gray-800 shadow-lg relative"
      style={{ WebkitAppRegion: "drag" }}
    >
      <div className="flex items-center gap-2 h-11 px-3 overflow-x-auto no-scrollbar">
        <div
          className="flex items-center gap-2 pr-3 border-r border-gray-800/60"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <img src={Logo} alt="Templaunch" className="w-5 h-5 rounded-md" />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 hidden md:block">
            Templaunch Tabs
          </span>
        </div>

        <div className="flex items-center gap-1 flex-1 min-w-0">
          {tabItems.map((tab, index) => {
            const isActiveTab = index === activeTab;
            return (
              <button
                key={tab.id || index}
                onClick={() => switchTab(index)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg min-w-[140px] max-w-[220px] text-left transition-all ${
                  isActiveTab
                    ? "bg-gray-800/80 text-white shadow-inner"
                    : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
                }`}
                style={{ WebkitAppRegion: "no-drag" }}
              >
                <span className="truncate text-sm">{tab.title}</span>
                <span
                  className="p-1 rounded hover:bg-gray-700/60 transition"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeTab(index);
                  }}
                >
                  <X size={14} className="opacity-80 group-hover:opacity-100" />
                </span>
              </button>
            );
          })}

          <button
            onClick={() => addTab()}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/70 transition ml-1"
            title="New Tab"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            <Plus size={16} />
          </button>

          <button
            onClick={reloadTab}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
            title="Reload Tab"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 ml-auto pl-2">
          <button
            onClick={() => electronAPI.minimizeWindow?.()}
            className="w-9 h-7 flex items-center justify-center rounded hover:bg-gray-800/60 text-gray-300 hover:text-white transition"
            title="Minimize"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            &#x2212;
          </button>
          <button
            onClick={() => electronAPI.maximizeWindow?.()}
            className="w-9 h-7 flex items-center justify-center rounded hover:bg-gray-800/60 text-gray-300 hover:text-white transition"
            title="Maximize"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            &#x25a1;
          </button>
          <button
            onClick={() => electronAPI.closeWindow?.()}
            className="w-9 h-7 flex items-center justify-center rounded hover:bg-red-600/80 text-gray-200 hover:text-white transition"
            title="Close"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            &#x2715;
          </button>
        </div>
      </div>
    </div>
  );
}
