# 🩸 Blood Bank System

A full-stack SERN-based Blood Bank and Donor Management System. Built with React (Vite), Express, Prisma ORM, Sql, and TailwindCSS.

## 📦 Project Structure

```
BloodBankSystem/
├── Backend/        # Express + Prisma backend
│   ├── prisma/     # Prisma schema & migrations
│   ├── src/        # Main API source code
├── Frontend/       # React (Vite) frontend
│   ├── src/        # React components/pages
```

---

## ⚙️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Backend:** Express.js, Prisma ORM,Sql JWT Auth
- **Authentication:** Access & Refresh Token System
- **Deployment:** Render (Frontend + Backend)

---

## 🧠 Features

### 🩸 Donor Features

- Register as a blood donor
- Set availability, blood group, and location
- View blood request

### 💉 Requester Features

- Request blood by filling out a form
- View matching donors by blood group and location
- Contact donors

### 🔐 Auth

- Token-based login with cookies

---

## 🛠️ Getting Started

### 🔽 1. Clone the repo

```bash
git clone https://github.com/dhullubasnkot/BloodBankSystem.git
cd BloodBankSystem
```

---

### 🧩 2. Backend Setup

```bash
cd Backend
cp .env.example .env        # create your .env file with DB & JWT secrets
npm install
npx prisma generate         # generate prisma client
npx prisma db push          # push schema to DB
npm run dev                 # start development server
```

✅ Backend will run on `http://localhost:3000`

---

### 💻 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev                 # start frontend on Vite
```

✅ Frontend will run on `http://localhost:5173`

---

## 📁 Environment Variables

### 🔐 Backend (`Backend/.env`)

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

## 🤝 Contributors

- [@dhullubasnkot](https://github.com/dhullubasnkot)

---
