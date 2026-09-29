# ✈️ Remix GlobalFlights — Next-Gen AI-Powered Flight Booking & Travel Assistant Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_AI-API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Ringkasan Eksekutif

**Remix GlobalFlights** adalah platform pemesanan tiket pesawat dan perencanaan penerbangan generasi baru berbasis arsitektur *Single Page Application* (SPA). Dikembangkan menggunakan **React**, **TypeScript**, dan **Vite**, aplikasi ini dirancang khusus untuk merevolusi pengalaman pengguna (*user experience*) dalam mencari, membandingkan, dan memesan tiket rute penerbangan domestik maupun internasional.

Sistem ini mengintegrasikan kecerdasan buatan cerdas **Google Gemini API** (`@google/genai`) yang bertindak sebagai *real-time travel assistant*. Algoritma AI ini mampu mengolah kueri bahasa alami, memberikan rekomendasi rute teroptimasi, estimasi akumulasi biaya, hingga panduan kebijakan tiket secara dinamis dan personal sesuai preferensi pengguna.

---

## ✨ Fitur Utama & Arsitektur Sistem

- 🤖 **Engine AI Conversational (Google Gemini Integration):** Fitur pemrosesan bahasa alami (NLP) yang mampu menjawab pertanyaan kompleks terkait jadwal, kebijakan bagasi, aturan pembatalan, dan saran paket liburan.
- 🎯 **Algoritma Pencarian & Filter Penerbangan:** Sistem filter multi-variabel berbasis *state management* React yang presisi untuk memilah maskapai, rentang harga, transit, dan waktu keberangkatan.
- ⚡ **Desain Antarmuka Ultra-Responsif:** Ditingkatkan dengan **Tailwind CSS** dan sistem animasi **Framer Motion**, memastikan konsistensi *rendering* 60fps baik di perangkat *mobile*, tablet, maupun *desktop*.
- 🔒 **Tipe Data Aman (*Strict Type Safety*):** Memanfaatkan arsitektur **TypeScript** secara menyeluruh untuk memastikan struktur *payload* API, tipe data penerbangan, dan *props* komponen terbebas dari *runtime error*.
- 📄 **Modul Komponen Terisolasi & Reusable:** Komponen UI seperti `BookingFlow`, `Header`, `Hero`, `CTA`, dan `FAQ` dibangun modular sehingga memudahkan skala pengembangannya (*scalability*).

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)

| Kategori | Teknologi / Library | Deskripsi / Peran |
| :--- | :--- | :--- |
| **Core Framework** | React + Vite | *Frontend library* & *build tool* secepat kilat |
| **Language** | TypeScript | Sistem pengetikan statis untuk keandalan kode |
| **Styling & UI** | Tailwind CSS | Framework CSS *utility-first* untuk *responsive design* |
| **Icons & Motion** | Lucide React & Framer Motion | Library ikon modern & animasi UI yang halus |
| **Artificial Intelligence** | Google Gemini API | Model AI cerdas untuk pemrosesan teks & rekomendasi |
| **State & Interactivity** | React Hooks (`useState`, `useEffect`) | Pengelolaan *state* aplikasi internal secara efisien |

---

## 🚀 Panduan Instalasi & Pengoperasian Lokal

### 1. Prasyarat Sistem
- **Node.js** v18.0.0 atau yang lebih baru
- **npm** (Node Package Manager) v9.0.0 atau yang lebih baru

### 2. Langkah-Langkah Instalasi

1. **Clone Repositori:**
   ```bash
   git clone [https://github.com/almerhadyan/Global_flight.git](https://github.com/almerhadyan/Global_flight.git)
   cd Global_flight


Install Seluruh Dependensi:

Bash
npm install
Konfigurasi Environment Variables:
Buat file .env.local pada root directory proyek kamu, lalu tambahkan API Key Gemini kamu:

Code snippet
VITE_GEMINI_API_KEY=masukkan_api_key_gemini_kamu_di_sini
Jalankan Development Server:

Bash
npm run dev
Buka di Browser:
Akses http://localhost:5173 di browser utama kamu.

👨‍💻 Developed By
Proyek ini dirancang, dikembangkan, dan dikelola sepenuhnya oleh:
Developer: Almer Hadyan
GitHub: @almerhadyan
Project Repository: Global_flight