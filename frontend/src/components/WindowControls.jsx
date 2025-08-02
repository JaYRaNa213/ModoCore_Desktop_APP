export default function WindowControls() {
  return (
    <div className="flex gap-2 absolute top-2 right-2">
      <button onClick={() => window.electronAPI.minimizeWindow()}>–</button>
      <button onClick={() => window.electronAPI.maximizeWindow()}>□</button>
      <button onClick={() => window.electronAPI.closeWindow()}>×</button>
    </div>
  );
}
