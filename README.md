#  CRM

![ CRM Dashboard Screenshot - Placeholder](https://via.placeholder.com/800x400?text=+CRM+Dashboard)
*Replace this with an actual screenshot of your dashboard once available.*

## Table of Contents

-   [About the Project](#about-the-project)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Usage](#usage)
-   [Future Enhancements](#future-enhancements)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## About the Project

 CRM is a simple client management application built with Next.js (App Router), React, and TypeScript. It provides basic functionalities to view, add, and manage client information. The project focuses on demonstrating client-side state management using React Context, interacting with Next.js API Routes for data persistence, and building a responsive UI with Tailwind CSS.

**Note:** This project uses a flat JSON file (`clients.json`) for data storage and does not include a full-fledged database or authentication system. It's designed for educational purposes or as a starting point for a more complex application.

## Features

* **Dashboard:** A landing page (redirects to login).
* **Client List:**
    * View a list of all clients.
    * Search clients by name, email, or company.
    * Sort clients alphabetically by full name.
    * Displays client status with visual indicators.
* **Client Details Page:**
    * View detailed information for an individual client.
    * Displays recent activities associated with the client.
* **Add Client:**
    * Form to add new clients with basic validation.
* **Client Data Management:**
    * Data is stored in a `clients.json` file.
    * Uses Next.js API Routes (`/api/clients`) for fetching and adding client data.
* **Global State Management:** Leverages React Context (`ClientContext`) to manage client data across the application.
* **Responsive UI:** Styled with Tailwind CSS for a modern and adaptable user experience.

## Technologies Used

* **Next.js 14+** (App Router) - React framework for building full-stack web applications.
* **React 18+** - JavaScript library for building user interfaces.
* **TypeScript** - Strongly typed superset of JavaScript.
* **Tailwind CSS** - A utility-first CSS framework for rapid UI development.
* **Lucide React** - A collection of beautiful and customizable open-source icons.
* **Node.js** - JavaScript runtime (for Next.js development).