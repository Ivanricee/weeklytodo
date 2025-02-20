<div align="center">
  <h1>
    📝 Weekly Todo - Weekly Task Manager ✅
  </h1>
<p>
  A weekly to-do list app that shows tasks for the current week, regardless of the year. You can log in or enter as a guest. The accordion opens to the current day when you access the app. You can add, delete, and check off tasks. Repeated tasks are highlighted for easy identification. 
</p>

[Live Demo](https://weeklytodo-list.vercel.app)
</div>

---

## Table of Contents
- [Features](#features)
- [Preview](#preview)
- [Technologies](#technologies)
- [Installation](#installation)
  
## Features
- 📅 **Weekly Focus:** Displays tasks for the current week, helping you stay on track.
- 👤 **Guest Mode & Login:** Use the app with or without an account.
- 🔄 **Auto-Expand Current Day:** The accordion opens to today’s tasks when you access the app.
- ✏️ **Task Management:** Add, delete, and check off tasks with ease.
- 🔍 **Repeated Tasks Highlighted:** Easily identify recurring tasks for better planning.
---

## Preview
![image](https://github.com/user-attachments/assets/dd4e304d-d4ad-4e12-93b4-afb33a3ba7fc)


---

## Technologies

### Frameworks and Tools
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN-%23636363.svg?style=for-the-badge&logo=shadcn&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-%23FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)

---

## Installation

1. **Clone the repository:**
- **HTTPS**:
```bash
git clone https://github.com/Ivanricee/weeklytodo.git
```

- **SSH (requires SSH key setup):**:
```bash
git clone git@github.com:Ivanricee/weeklytodo.git
```

2. **Install dependencies:**
   ```
   pnpm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. **Run the development server:**
   ```
   pnpm dev
   ```


## License
This project is licensed under the [MIT License](LICENSE).

