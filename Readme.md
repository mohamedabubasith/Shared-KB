# Shared Knowledgebase

A sleek, modern web application for building a searchable knowledge base from your PDF documents. This project simulates a production-ready frontend for an intelligent document management system, featuring document parsing, indexing, querying, and API key management.

The entire UI is built with a dark theme, accented with **NVIDIA Green**, providing a professional and focused user experience.

## ✨ Features

The application is divided into four main sections:

### 1. 📄 Parser Screen
- **Upload PDFs**: Easily upload multiple PDF documents.
- **Track Status**: Monitor the status of each document as it moves from `Pending` -> `Processing` -> `Completed`.
- **Preview Content**: Click the eye icon to view a simulated text preview of any parsed document in a clean modal window.
- **Manage Documents**: Delete documents you no longer need.

### 2. 🧠 Indexing Screen
- **Create Indexes**: Group completed documents into named indexes.
- **Selective Indexing**: A user-friendly modal allows you to select which `Completed` documents to include in a new index.
- **Sync Status**: Track the index syncing process from `Created` -> `Syncing` -> `Completed`.
- **Manage Indexes**: View attached documents and delete indexes.

### 3. 🔍 Query Screen
- **Select Index**: Choose from a dropdown of `Completed` indexes to query against.
- **Natural Language Queries**: Ask questions in a simple text area.
- **Simulated Vector Search**: Get mock AI-powered answers based on your query, displayed in a clear and readable card format.

### 4. 🔑 API Key Screen
- **Generate API Key**: Create a unique API key for programmatic access to your knowledge base.
- **Easy Copying**: A "Copy" button makes it simple to use the key in other projects.
- **Secure Regeneration**: Regenerate your key at any time, which will invalidate the old one.

## 🎨 UI & Theme

The application's design is heavily inspired by modern tech aesthetics, focusing on clarity and usability.

-   **Color Palette**: A striking combination of a dark background (`#121212`), white text, and **NVIDIA Green** (`#76B900`) for primary actions and highlights.
-   **Typography**: Uses the "Inter" font for its clean and readable characteristics.
-   **Layout**: A fixed sidebar for easy navigation and a spacious main panel for content. The layout is fully responsive.
-   **Components**: Custom-built, reusable components for buttons, cards, and modals ensure a consistent look and feel. Cards have a subtle hover effect, lifting them and casting a green shadow.
-   **Animations**: Page transitions and modal pop-ups are animated using **Framer Motion** for a smooth and fluid user experience.

## 🛠️ Tech Stack

This project is built using a modern frontend stack:

-   **Framework**: [React](https://reactjs.org/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Styling**: [TailwindCSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State Management**: React Context API
-   **Local Persistence**: Data is saved in the browser's `localStorage` to persist across sessions.

## 🚀 How It Works (User Flow)

1.  **Upload**: Start on the **Parser** screen by uploading your PDF documents.
2.  **Wait**: Watch as the documents are automatically "processed" and their status changes to `Completed`.
3.  **Index**: Navigate to the **Indexing** screen. Click "Create Index", give it a name, and select the completed documents you want to include.
4.  **Sync**: After creating an index, click the "Sync" button and wait for its status to become `Completed`.
5.  **Query**: Go to the **Query** screen. Select your newly synced index from the dropdown, type your question, and receive a simulated answer.
6.  **Integrate**: Visit the **API Key** screen to get your key for external integrations.
