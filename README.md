# Voices of Vehari

A full-stack React web application for the Voices of Vehari project, designed to enhance English proficiency through multilingual podcasting and cultural storytelling.

## Tech Stack
- **Frontend:** React, Vite, React Router, Tailwind CSS (Custom CSS integration)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repository-url>
cd Voices_of_Vehari_Standalone
npm install
```

### 2. Supabase Setup
1. Create a new project in [Supabase](https://supabase.com/).
2. Go to the SQL Editor and paste the contents of `supabase/schema.sql` to create all tables and policies.
3. Enable Email/Password authentication in the Authentication settings.
4. Create an admin user via the Authentication > Users tab.
5. Create a storage bucket named `images` and set it to public.

### 3. Environment Variables
Copy the example environment file and fill in your Supabase details:
```bash
cp .env.example .env.local
```
Add your Supabase URL and Anon Key.

### 4. Run Locally
```bash
npm run dev
```

### 5. Deployment (Vercel)
1. Push the code to a GitHub repository.
2. Import the project in Vercel.
3. Add the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel settings.
4. Deploy! The `vercel.json` file is already configured for single-page app routing.