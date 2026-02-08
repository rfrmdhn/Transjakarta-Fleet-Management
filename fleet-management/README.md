# Transjakarta Fleet Management

A comprehensive fleet management dashboard for monitoring and tracking Transjakarta vehicles in real-time. Built with modern web technologies for performance and scalability.

## 🚀 Features

- **Real-time Vehicle Tracking**: Interactive map visualization using Leaflet.
- **Fleet Monitoring**: Detailed vehicle information and status updates.
- **Advanced Filtering**: Filter vehicles by various criteria (route, status, type).
- **Responsive Design**: Fully responsive interface optimized for desktop and tablet users.
- **Modern UI/UX**: Clean and intuitive interface built with Tailwind CSS.

## 🛠 Tech Stack

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management & Data Fetching**: React Hooks + Axios
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library
- **Linting & Formatting**: ESLint + Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **pnpm** / **yarn**

## 🏁 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/rfrmdhn/Transjakarta-Fleet-Management.git
cd Transjakarta-Fleet-Management/fleet-management
```

> **Note**: If you cloned the root repository, navigate into the `fleet-management` directory where the frontend application resides.

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Environment Configuration

The application requires environment variables to function correctly (e.g., API URLs).

1. Create a `.env` file in the root of the `fleet-management` directory based on the example file:

```bash
cp .env.example .env
```

2. Open `.env` and configure your variables:

```env
VITE_API_URL=https://api-v3.mbta.com
```

### 4. Run the Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

The built files will be generated in the `dist` directory. You can preview the production build locally using:

```bash
npm run preview
```

## 🧪 Running Tests

Run the test suite to ensure everything is working as expected:

```bash
npm run test
```

## 🔍 Code Quality

Run the linter to check for code quality issues:

```bash
npm run lint
```

## 📂 Project Structure

```
fleet-management/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components (Atomic Design)
│   ├── features/        # Feature-based modules (Vehicles, Map, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services and data fetching
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions and utilities
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env.example         # Environment variables template
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
