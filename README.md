
# 🖥️ ContextSwap Desktop App 
<div align="center">

****ContextSwap** is a productivity-focused desktop application built with **Electron**, **React**, and **TailwindCSS**. It’s designed to help users switch between different work contexts—like Coding, Studying, Meetings, etc.—with ease and efficiency. The app supports extensibility, templating, and will soon be integrated with a powerful backend.**

 [Live Demo : ContextSwap Desktop App Download](https://contextswap-8lun.onrender.com/)     

</div>
---

<img src="./img/swap.png" alt="contextSwap" width="900" />


## 🔧 Tech Stack

| Layer         | Technologies Used                     |
|---------------|----------------------------------------|
| Frontend      | React, Vite, Tailwind CSS              |
| Desktop Shell | Electron                               |
| Backend       | Node.js (Express / Fastify – Coming Soon) |
| State Mgmt    | React Context API                      |
| Charts        | Recharts                               |
| Authentication| Custom Hooks + Protected Routes        |

---

## 📁 Project Structure
```
├── .env
├── .gitignore
├── dist
│   ├── assets
│   │   ├── index-B4gH2CKm.js
│   │   └── index-CQMXqsQP.css
│   ├── icon.ico
│   ├── index.html
│   ├── preload.js
│   └── vite.svg
├── electron.cjs
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── preload.js
├── public
│   ├── icon.ico
│   └── vite.svg
├── README.md
├── release
│   ├── builder-debug.yml
│   ├── builder-effective-config.yaml
│   ├── ContextSwap Setup 1.0.2.exe
│   ├── ContextSwap Setup 1.0.2.exe.blockmap
│   ├── latest.yml
│   └── win-unpacked
│       ├── chrome_100_percent.pak
│       ├── chrome_200_percent.pak
│       ├── ContextSwap.exe
│       ├── d3dcompiler_47.dll
│       ├── ffmpeg.dll
│       ├── icudtl.dat
│       ├── libEGL.dll
│       ├── libGLESv2.dll
│       ├── LICENSE.electron.txt
│       ├── LICENSES.chromium.html
│       ├── locales
│       │   ├── af.pak
│       │   ├── am.pak
│       │   ├── ar.pak
│       │   ├── bg.pak
│       │   ├── bn.pak
│       │   ├── ca.pak
│       │   ├── cs.pak
│       │   ├── da.pak
│       │   ├── de.pak
│       │   ├── el.pak
│       │   ├── en-GB.pak
│       │   ├── en-US.pak
│       │   ├── es-419.pak
│       │   ├── es.pak
│       │   ├── et.pak
│       │   ├── fa.pak
│       │   ├── fi.pak
│       │   ├── fil.pak
│       │   ├── fr.pak
│       │   ├── gu.pak
│       │   ├── he.pak
│       │   ├── hi.pak
│       │   ├── hr.pak
│       │   ├── hu.pak
│       │   ├── id.pak
│       │   ├── it.pak
│       │   ├── ja.pak
│       │   ├── kn.pak
│       │   ├── ko.pak
│       │   ├── lt.pak
│       │   ├── lv.pak
│       │   ├── ml.pak
│       │   ├── mr.pak
│       │   ├── ms.pak
│       │   ├── nb.pak
│       │   ├── nl.pak
│       │   ├── pl.pak
│       │   ├── pt-BR.pak
│       │   ├── pt-PT.pak
│       │   ├── ro.pak
│       │   ├── ru.pak
│       │   ├── sk.pak
│       │   ├── sl.pak
│       │   ├── sr.pak
│       │   ├── sv.pak
│       │   ├── sw.pak
│       │   ├── ta.pak
│       │   ├── te.pak
│       │   ├── th.pak
│       │   ├── tr.pak
│       │   ├── uk.pak
│       │   ├── ur.pak
│       │   ├── vi.pak
│       │   ├── zh-CN.pak
│       │   └── zh-TW.pak
│       ├── resources
│       │   ├── app-update.yml
│       │   ├── app.asar
│       │   └── elevate.exe
│       ├── resources.pak
│       ├── snapshot_blob.bin
│       ├── v8_context_snapshot.bin
│       ├── vk_swiftshader.dll
│       ├── vk_swiftshader_icd.json
│       └── vulkan-1.dll
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   ├── app-icon.ico
│   │   └── react.svg
│   ├── auth
│   │   ├── Login.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Register.jsx
│   ├── components
│   │   ├── AutomationForm.jsx
│   │   ├── CronHelperModal.jsx
│   │   ├── Header.jsx
│   │   ├── LogTable.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ui
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Textarea.jsx
│   │   │   └── ToggleSwitch.jsx
│   │   └── WindowControls.jsx
│   ├── context
│   │   ├── AppContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── TemplateContext.jsx
│   ├── hooks
│   │   ├── useFetchLogs.js
│   │   ├── useLocalStorage.js
│   │   └── usePreviousAppWebsites.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AddTemplate.jsx
│   │   ├── admin
│   │   │   └── AdminPanel.jsx
│   │   ├── Analytics.jsx
│   │   ├── AutomationLogs.jsx
│   │   ├── Automations.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTemplate.jsx
│   │   ├── LaunchHistory.jsx
│   │   ├── Logs.jsx
│   │   ├── NotFound.jsx
│   │   ├── Notifications.jsx
│   │   ├── Profile.jsx
│   │   ├── ScheduledTemplates.jsx
│   │   ├── Settings.jsx
│   │   ├── StatCard.jsx
│   │   ├── TemplateCard.jsx
│   │   ├── TemplateDetail.jsx
│   │   └── Templates.jsx
│   ├── services
│   │   ├── analyticsService.js
│   │   ├── api.js
│   │   ├── automationService.js
│   │   └── TemplateService.js
│   └── utils
│       ├── guestTemplates.js
│       └── validators.js
├── tailwind.config.js
├── tree.cjs
├── tree.txt
└── vite.config.js
```

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JaYRaNa213/OneClickOnly_Desktop_APP.git
cd OneClickOnly_Desktop_APP
2. Setup Frontend (Electron + React)
bash
Copy
Edit
cd frontend
npm install

# Start in development mode
npm run dev

# Build for production
npm run build

# Launch the Electron app
npm run start

# Create the Windows installer (.exe)
npm run dist
3. Setup Backend (Coming Soon)
bash
Copy
Edit
cd backend
npm install
npm run dev
📦 Building for Windows
To generate a distributable .exe installer:

bash
Copy
Edit
cd frontend
npm run build
npm run dist
Output:

Production files in: frontend/dist/

Unpacked app in: frontend/dist/win-unpacked/

Installer in: frontend/dist/*.exe

✨ Features
🔐 Secure Authentication with Protected Routes

🧠 Smart Work Templates

💡 AI-Based Context Suggestions (Planned)

🗂️ Workspace Management

🔔 Notification Center

📊 Analytics Dashboard

⚙️ User Settings & Profile

👨‍💻 Author
Jay Rana
GitHub • LinkedIn

📄 License
Licensed under the MIT License © 2025 — Jay Rana

yaml
Copy
Edit

---

Let me know if you'd like:
- A live preview badge
- GitHub Actions CI status badges
- Screenshots or GIFs added
- Auto-update section for users

Would you like me to include `.exe` download links or usage instructions too?








