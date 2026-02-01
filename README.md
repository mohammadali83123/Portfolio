# Mohammad Ali Portfolio

A modern, high-performance personal portfolio website designed to showcase skills, experience, and projects. Built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Overview

This project is a fully responsive web application that serves as a digital resume and portfolio. It leverages the latest web technologies to provide a fast, accessible, and visually appealing user experience.

### Key Features

*   **⚡ Modern Stack**: Built on Next.js 16 (App Router) for server-side rendering and static site generation.
*   **🎨 Responsive Design**: Styled with Tailwind CSS v4 for a mobile-first, adaptive layout.
*   **🧩 UI Components**: Utilizes [Radix UI](https://www.radix-ui.com/) primitives (via Shadcn UI) for accessible and robust interactive components.
*   **🌙 Dark Mode**: Integrated theme support with `next-themes`.
*   **✅ Type Safety**: Comprehensive TypeScript support for reliable code.
*   **📊 Data Visualization**: Includes charts and graphs using `recharts`.
*   **📝 Form Handling**: Robust form validation using `react-hook-form` and `zod`.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), `tailwindcss-animate`
*   **UI Library**: [Radix UI](https://www.radix-ui.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Forms**: React Hook Form + Zod
*   **Analytics**: Vercel Analytics

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

*   **Node.js**: (Version 18 or higher recommended)
*   **pnpm**: This project uses pnpm as the package manager.
    ```bash
    npm install -g pnpm
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohammadali83123/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### 🏃‍♂️ Running Locally

Start the development server:

```bash
pnpm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001).

> **Note:** The server is configured to run on port **3001** by default.

### 🏗️ Building for Production

To create an optimized production build:

```bash
pnpm run build
```

After building, you can start the production server:

```bash
pnpm run start
```

## 📂 Project Structure

```bash
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components (buttons, dialogs, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── public/             # Static assets (images, fonts)
├── styles/             # Global styles
├── ...configuration files
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).