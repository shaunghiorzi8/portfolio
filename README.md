# Morningstar Enterprises Website

Marketing website and contact lead API for Morningstar Enterprises.

## Stack

- Frontend: React.js with Vite
- Backend: PHP with PDO
- Database: MySQL

## Project Structure

```text
frontend/   React website and static brand assets
backend/    PHP contact API
database/   MySQL schema
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The development site runs at `http://localhost:5173`.

To point the contact form at a different API URL, create `frontend/.env`:

```bash
VITE_API_URL=http://localhost:8000/api/contact
```

## Database Setup

Create the MySQL database and contact submissions table:

```bash
mysql -u root -p < database/schema.sql
```

## Backend Setup

Copy the environment example and update credentials:

```bash
cd backend
cp .env.example .env
```

Expected values:

```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=morningstar_enterprises
DB_USERNAME=root
DB_PASSWORD=
FRONTEND_ORIGIN=http://localhost:5173
CONTACT_TO=hr@withmorningstar.com
MAIL_ENABLED=false
```

Run the PHP development server from the `backend` directory:

```bash
php -S localhost:8000 -t public
```

The contact endpoint is:

```text
POST http://localhost:8000/api/contact
```

## Production Notes

- Configure the web server document root to `backend/public` for the API.
- Set `FRONTEND_ORIGIN` to the deployed frontend URL.
- Use real SMTP infrastructure or a hosting email service before enabling `MAIL_ENABLED`.
- Keep `.env` files private and outside version control.
