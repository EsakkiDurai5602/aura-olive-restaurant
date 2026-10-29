# Aura & Olive — Deployment & Supabase Guide

This full-stack restaurant seat booking application is built with clean **`index.html`**, **`style.css`**, and **`script.js`** (with optional **`index.js`** Node/Express backend) and is fully ready to connect with **Supabase** and deploy on **Vercel**.

---

## Part 1: How to Set Up & Connect Supabase

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in or sign up.
2. In the dashboard, click **"New Project"**.
3. Choose a name (e.g. `aura-olive-restaurant`), select a region close to your target audience, choose a database password, and click **"Create New Project"**.

### Step 2: Run the Database Schema & Seed Data
1. In your Supabase project dashboard, navigate to the **SQL Editor** tab from the left sidebar.
2. Click **"New Query"**.
3. Open the file `supabase_schema.sql` located in this project root directory.
4. Copy the entire contents of `supabase_schema.sql`, paste it into the Supabase SQL editor, and click **"Run"**.
   - This creates all necessary tables:
     - `public.profiles` (User auth profiles)
     - `public.restaurant_tables` (Seating chart with coordinates, zones, capacity, and statuses)
     - `public.menu_items` (Seasonal culinary dishes and dietary categories)
     - `public.reservations` (Seat bookings, guest details, reference codes, add-ons)
     - `public.reviews` (Patron testimonials and ratings)
   - Enables Row Level Security (RLS) policies.
   - Populates initial realistic tables, dishes, and verified reviews.

### Step 3: Get Your Supabase API Credentials
1. In your Supabase dashboard, click the gear icon (⚙️) on the bottom left to open **Project Settings**.
2. Select the **API** menu.
3. Under **Project URL**, copy the URL (e.g. `https://xyzabcdefg.supabase.co`).
4. Under **Project API keys**, copy the **`anon` `public`** key (starts with `eyJ...`).

### Step 4: Connect to the Website
You have two simple ways to connect:

- **Method A: Directly in the Browser (Easiest)**
  1. Open the website.
  2. Click the **"Supabase & Vercel Guide"** pill at the top of the page.
  3. Paste your **Supabase Project URL** and **Anon Public Key** into the input fields.
  4. Click **"Save & Connect to Supabase"**. The top status indicator turns green, and your live reservations will sync with Supabase immediately!

- **Method B: Via Environment Variables (`.env`)**
  Create a `.env` file in the root directory:
  ```env
  SUPABASE_URL=https://your-project-id.supabase.co
  SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

---

## Part 2: How to Deploy to Vercel

Vercel provides instant zero-configuration deployment for this project.

### Step 1: Push Project to GitHub
Initialize git and push the project to your GitHub repository:
```bash
git init
git add .
git commit -m "feat: full-stack restaurant reservation website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to [https://vercel.com](https://vercel.com).
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository from the list and click **"Import"**.

### Step 3: Add Supabase Environment Variables in Vercel
Under the **Environment Variables** section on Vercel:
- **Key**: `SUPABASE_URL` | **Value**: `https://your-project-id.supabase.co`
- **Key**: `SUPABASE_ANON_KEY` | **Value**: `<your-supabase-anon-key>`

### Step 4: Click Deploy!
Click **"Deploy"**. Vercel will build and deploy your application in under 60 seconds.
- You will receive a live URL: `https://your-project.vercel.app`.
- The included `vercel.json` ensures that both the static website and serverless API endpoints work seamlessly out of the box.

---

## Features Included
1. **Interactive Visual Floor Plan**: Real-time table selection with color indicators across 4 zones:
   - Main Dining Hall
   - Garden Terrace (Al-Fresco)
   - Skyline Rooftop Lounge
   - The Sommelier VIP Cellar
2. **Instant Digital Dining Pass**: Boarding-pass confirmation ticket with reference code (e.g. `AO-74192`), SVG QR verification, and print/save options.
3. **Menu Explorer**: Search dishes, category tabs, and dietary filters (Chef's Signature, Gluten-Free, Vegetarian, Vegan).
4. **My Bookings Manager**: Search by reference code or guest email, view digital pass, and cancel reservation.
5. **Customer Reviews & Ratings**: Submit testimonials with food, ambiance, and service ratings.
6. **Staff & Manager Portal**: Live table status controller (Available / Reserved / Occupied) and reservation status manager.
7. **Demo 1-Click Fast Login**: Test instantly as a Customer or Staff Administrator.
8. **100% Emoji-Free**: Built strictly with modern vector SVG icons and luxury typography.
