# Fleet Management UI

A modern React + TypeScript + Tailwind CSS application for monitoring Transjakarta fleet vehicles, integrated with the MBTA API.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Theme)
- **Networking**: Axios
- **Routing**: React Router DOM

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

- `src/api`: API client and service functions.
- `src/components`: Reusable UI components.
  - `common`: Generic components (Loading, Error, Empty).
  - `layout`: Layout components (Header, Sidebar).
  - `vehicle`: Vehicle-specific components.
- `src/hooks`: Custom React hooks for data fetching.
- `src/pages`: Page components.
- `src/types`: TypeScript definitions.

## Features (Scaffolded)

- **Vehicle Monitoring**: Grid view of vehicles.
- **Filtering**: Placeholder filter section.
- **Details**: Vehicle detail modal (mocked map).
- **Pagination**: Basic pagination controls.
- **Theming**: Dark mode ready (via system preference or class).

## Note

This is an initial scaffold. The API is connected to the public MBTA V3 API (as a proxy for fleet data). 
Filter logic is currently a placeholder.
