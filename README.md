# WeatherApp 🌤️

A cross-platform desktop weather application built with **Electron** and **React (Vite)**.  
The app displays real-time and multi-day weather data using the **Open-Meteo API**.

---

## 🚀 Features

- Live current temperature and conditions
- Multi-day forecast display
- Clean, minimal React UI
- Desktop experience powered by Electron
- Asynchronous data fetching with `fetch` / `async/await`

---

## 🧰 Tech Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Desktop Shell:** Electron (main + preload scripts)
- **API:** Open-Meteo weather API (no key required)
- **Tooling:** npm, Git, VS Code

---

## 📁 Project Structure

```bash
WeatherApp/
├─ electron/
│  ├─ main.js        # Electron main process (creates window, loads React)
│  └─ preload.js     # Safe bridge between renderer and main
├─ src/
│  ├─ App.jsx        # Main React UI
│  ├─ main.jsx       # React entry point
│  └─ index.css      # App styling
├─ index.html        # Vite HTML template
├─ package.json      # Scripts + dependencies
├─ vite.config.js    # Vite configuration
└─ .gitignore        # node_modules, dist, env, etc.
