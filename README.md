# 📺 Live TV

A modern, responsive Live TV streaming web application built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Browse thousands of publicly available TV channels from around the world, search by country or category, and enjoy a smooth streaming experience powered by HLS.

> **Disclaimer:** This project uses publicly available IPTV stream information provided by the IPTV-org project. It does not host, own, or redistribute any video content.

---

## ✨ Features

* 🎥 Live TV streaming with HLS support
* 🔍 Instant channel search
* 🌍 Browse channels by country
* 📂 Filter by category and language
* ⭐ Favorite channels
* 🕒 Watch history
* 📱 Fully responsive design
* 🌙 Dark mode
* ⚡ Fast and optimized with Next.js App Router
* 🎨 Modern UI with Tailwind CSS and shadcn/ui
* 🔄 Automatic stream retry and loading states
* 🖼️ Lazy-loaded channel logos
* 🎬 Picture-in-Picture support (where supported)
* 📺 Fullscreen playback
* ♿ Accessible and keyboard-friendly interface

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15
* **Language:** TypeScript
* **UI:** React 19
* **Styling:** Tailwind CSS v4
* **Components:** shadcn/ui
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **Video Playback:** HLS.js
* **State Management:** Zustand
* **Data Fetching:** TanStack Query

---

## 📡 Data Source

This application uses the free IPTV-org API.

* Channels
* Streams
* Countries
* Categories
* Languages
* Logos

All stream metadata is provided by the IPTV-org community.

---

## 📁 Project Structure

```text
app/
components/
features/
hooks/
lib/
services/
store/
types/
utils/
constants/
public/
styles/
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/live-tv.git
cd live-tv
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Build the application for production.

```bash
npm run start
```

Run the production build.

```bash
npm run lint
```

Run ESLint.

---

## 🎯 Roadmap

* [ ] Favorites
* [ ] Watch history
* [ ] Trending channels
* [ ] Continue watching
* [ ] PWA support
* [ ] Chromecast support
* [ ] Multi-language interface
* [ ] User authentication
* [ ] Cloud sync
* [ ] Custom playlists
* [ ] Stream health monitoring

---

## 📸 Screenshots

Add screenshots here once the UI is complete.

---

## ⚠️ Disclaimer

This project **does not host or stream any media**.

All channel metadata and stream URLs come from publicly available sources maintained by the IPTV-org community. Stream availability, quality, and legality may vary by region.

Users are responsible for complying with local laws and the terms of use of any content they access.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

Please follow the existing coding style and submit clear, well-documented changes.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgements

* IPTV-org for maintaining the public IPTV database.
* The Next.js, React, Tailwind CSS, and open-source communities for the tools that power this project.
