# Weather to Stay or Not - Property Weather Filter Application

## Overview

This project is a property search web application built with Next.js and Chakra UI. It integrates live weather data via the Open-Meteo API to enable users to find properties based on location, temperature, humidity, and weather conditions. The app supports server-side filtering with pagination, ensuring accurate and efficient results.

---

## Features

- Full-text search on property name, city, and state.
- Fetches live weather data for each property including temperature, humidity, and weather code.
- Filters properties based on:
  - Temperature range
  - Humidity range
  - Weather condition groups (Clear, Cloudy, Drizzle, Rainy, Snow)
- Client-side debounce for search input.
- Pagination with controlled page size (20 results per page).
- Server-side filtering applies to the entire dataset before paginating results.
- Modular code structure with clear separation of backend and frontend.

---

## Setup Instructions

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Abhi-4793/warden-one-assignment.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:gen
```

4. Copy environment configuration and update:

```bash
cp .env.example .env
```

Set your database credentials and other configs.

5. Run the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend Setup

1. Navigate to frontend directory (if separate):

```bash
cd frontend/warden-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variable:

Create `.env.local` with the following:

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

4. Run frontend:

```bash
npm run dev
```

## How It Works

- **Backend**:

  - Handles search, filters, and pagination.
  - Fetches an initial batch of properties (adjustable size).
  - Retrieves live weather for those properties.
  - Filters properties based on weather criteria.
  - Slices results for current page.
  - Sends total count for UI pagination control.

- **Frontend**:
  - Manages user input for search and filters.
  - Sends current page, search, and filters to backend.
  - Displays properties and pagination controls.
  - Supports navigating pages, updating data accordingly.
