# 🚀 IdeaVault — Startup Idea Sharing Platform

**IdeaVault** is a full-stack web platform where innovators can share startup ideas, explore trending concepts, and engage with the community through comments and discussions.

🌐 **Live Site:** [https://idea-vault-client-kohl.vercel.app](https://idea-vault-client-kohl.vercel.app)

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password and Google OAuth via BetterAuth with JWT-based session verification
- 💡 **Idea Management** — Submit, browse, update, and delete startup ideas with full CRUD functionality
- 🔍 **Search & Filter** — Search ideas by title (case-insensitive regex) and filter by category in real time
- 💬 **Comment System** — Add, edit, and delete comments on any idea with live interaction tracking
- 🔖 **Bookmark System** — Save ideas you love and manage them from your personal bookmarks page
- 🌗 **Dark / Light Theme** — Fully responsive dark and light mode toggle that applies globally

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js (App Router) | React framework with SSR & routing |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Accessible UI components |
| Framer Motion | Animations and transitions |
| BetterAuth | Authentication (Email + Google OAuth) |
| Axios | HTTP client with interceptors |
| React Hot Toast | Toast notifications |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB Atlas | Cloud database (native driver) |
| BetterAuth | Session verification middleware |
| CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
ideavault-client/               ideavault-server/
├── src/                        ├── controllers/
│   ├── app/                    │   ├── ideaController.js
│   │   ├── page.js             │   ├── commentController.js
│   │   ├── ideas/              │   └── bookmarkController.js
│   │   ├── add-idea/           ├── middleware/
│   │   ├── my-ideas/           │   └── verifyToken.js
│   │   ├── my-interactions/    ├── routes/
│   │   ├── my-bookmarks/       │   ├── ideaRoutes.js
│   │   ├── login/              │   └── bookmarkRoutes.js
│   │   ├── register/           ├── lib/
│   │   └── update-profile/     │   └── db.js
│   ├── components/             └── index.js
│   └── lib/
```

---

## 🔗 API Endpoints

### Ideas
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/ideas` | Public |
| GET | `/api/ideas/:id` | Public |
| GET | `/api/ideas/my-ideas` | Private |
| GET | `/api/ideas/categories/stats` | Public |
| POST | `/api/ideas` | Private |
| PATCH | `/api/ideas/:id` | Private |
| DELETE | `/api/ideas/:id` | Private |

### Comments
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/ideas/:id/comments` | Public |
| POST | `/api/ideas/:id/comments` | Private |
| PATCH | `/api/ideas/:id/comments/:commentId` | Private |
| DELETE | `/api/ideas/:id/comments/:commentId` | Private |
| GET | `/api/ideas/user/my-comments` | Private |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Cloud Console OAuth credentials

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Tariqul-stack/IdeaVault-client.git
cd IdeaVault-client

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
# Fill in your environment variables

# Start development server
npm run dev
```

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Tariqul-stack/IdeaVault-server.git
cd IdeaVault-server

# Install dependencies
npm install

# Create .env
cp .env.example .env
# Fill in your environment variables

# Start development server
npm run dev
```

### Environment Variables

**Frontend (.env.local)**
```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
```

**Backend (.env)**
```env
PORT=8000
MONGODB_URI=
CLIENT_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## 📸 Pages Overview

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| All Ideas | `/ideas` | Public |
| Idea Detail | `/ideas/:id` | Private |
| Add Idea | `/add-idea` | Private |
| My Ideas | `/my-ideas` | Private |
| My Interactions | `/my-interactions` | Private |
| My Bookmarks | `/my-bookmarks` | Private |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Update Profile | `/update-profile` | Private |

---

## 🔑 Authentication Flow

1. User registers or logs in via Email/Password or Google OAuth
2. BetterAuth issues a session token stored in cookies
3. Frontend attaches token as `Bearer` in every API request via Axios interceptor
4. Backend middleware verifies the token against BetterAuth session endpoint
5. Protected routes redirect unauthenticated users to `/login`

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB Atlas |

---

## 👤 Author

**Tariqul Islam**

- GitHub Client: [IdeaVault-client](https://github.com/Tariqul-stack/IdeaVault-client)
- GitHub Server: [IdeaVault-server](https://github.com/Tariqul-stack/IdeaVault-server)
- Live Site: [idea-vault-client-kohl.vercel.app](https://idea-vault-client-kohl.vercel.app)