# Deployment Guide — BiyerKhoroch

## Prerequisites

- Node.js 20+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)
- A [Vercel](https://vercel.com) account

---

## 1. MongoDB Setup

1. Create a free Atlas cluster.
2. Under **Database Access**, add a user with read/write permissions.
3. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) — Vercel uses dynamic IPs.
4. Copy the connection string from **Connect → Drivers**. It looks like:
   ```
   mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
5. Append the database name: `...mongodb.net/biyerkhoroch?retryWrites=...`

---

## 2. Environment Variables

Set these in Vercel → Project → Settings → Environment Variables:

| Variable                | Required | Description                                              |
|-------------------------|----------|----------------------------------------------------------|
| `MONGODB_URI`           | Yes      | Full MongoDB Atlas connection string (see above)         |
| `ADMIN_PASSWORD`        | Yes      | Password for the `/admin` panel — use a strong password  |
| `NEXT_PUBLIC_BASE_URL`  | No       | Canonical site URL, e.g. `https://biyerkhoroch.com`      |

> Copy `.env.example` to `.env.local` for local development and fill in real values.

---

## 3. Deploy to Vercel

### Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Via GitHub Integration

1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** → import the repo.
3. Vercel auto-detects Next.js — no build settings to change.
4. Add the environment variables from the table above.
5. Click **Deploy**.

---

## 4. Custom Domain

1. In Vercel → Project → **Domains**, add your domain.
2. Follow the DNS instructions (CNAME or A record).
3. Update `NEXT_PUBLIC_BASE_URL` to match the domain.

---

## 5. Post-Deployment Checklist

- [ ] Visit `/sitemap.xml` — should list story URLs
- [ ] Visit `/robots.txt` — should allow crawlers
- [ ] Submit a test story; verify it appears in `/admin/queue`
- [ ] Approve the story; verify it appears on the homepage and `/search`
- [ ] Test `/admin` login with `ADMIN_PASSWORD`
- [ ] Test OG preview with [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Verify HTTPS is active and HTTP redirects to HTTPS

---

## 6. Local Development

```bash
cp .env.example .env.local
# fill in MONGODB_URI and ADMIN_PASSWORD

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 7. Useful Commands

| Command           | Purpose                        |
|-------------------|--------------------------------|
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production           |
| `npm run start`   | Start production server        |
| `npm run lint`    | Run ESLint                     |
