# Portfolio App

A personal developer portfolio built with Angular (standalone components, signals)
and Firebase (Firestore + Authentication). Public pages (Home, About, Experience,
Projects, Contact) display content stored in Firestore. A password-protected
`/admin` area lets you edit that content without touching code.

## Project structure

```
src/app/
  core/
    firebase.ts          Firebase app/Firestore/Auth initialization
    models.ts            Shared TypeScript interfaces for content
    services/
      content.ts          Firestore reads/writes for all site content
      auth.ts              Firebase Auth (email/password) wrapper
    guards/
      auth-guard.ts        Protects /admin routes
  shared/
    navbar/, footer/        Site chrome shown on public pages
  pages/
    home/, about/, experience/, projects/, contact/
                            One folder per public page (ts/html/css/spec)
  admin/
    login/, dashboard/
    home-editor/, about-editor/, experience-editor/,
    projects-editor/, contact-editor/
                            One folder per admin editor (ts/html/css/spec)
```

## 1. Set up your own Firebase project

The app ships with placeholder Firebase config, so it will build and run, but
content won't persist and `/admin` login won't work until you connect a real
Firebase project:

1. Go to the [Firebase console](https://console.firebase.google.com/) and create
   a new project.
2. Add a **Web app** to the project (the `</>` icon) and copy the `firebaseConfig`
   object it gives you.
3. Enable **Firestore Database** (Build → Firestore Database → Create database).
   Start in production mode; you can tighten security rules later.
4. Enable **Authentication → Sign-in method → Email/Password**.
5. Under **Authentication → Users**, add one user (your admin email + password) —
   this is the account you'll use to log in to `/admin`.
6. Paste your `firebaseConfig` values into both:
   - `src/environments/environment.ts` (used for production builds)
   - `src/environments/environment.development.ts` (used by `ng serve`)

Until you do this, `environment.firebase.apiKey` stays as `'YOUR_API_KEY'` and the
app intentionally skips connecting to Firestore/Auth (see `isFirebaseConfigured` in
`src/app/core/firebase.ts`) so it doesn't hang or error out with no network to reach.

### Firestore data shape

The app reads/writes these documents/collections (created automatically the first
time you save from an admin editor):

- `content/home` — `{ name, title, tagline, intro }`
- `content/about` — `{ bio, skills: string[] }`
- `content/contactInfo` — `{ email, location, socialLinks: { label, url }[] }`
- `experience` collection — docs with `{ role, company, period, description, order }`
- `projects` collection — docs with `{ title, demo, problem, approach, solution, link, order }`
- `messages` collection — contact form submissions, `{ name, email, message, createdAt }`

## 2. Run locally

Install dependencies once:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

Open `http://localhost:4200/`. The app reloads automatically on file changes.
Visit `/admin/login` to sign in with the admin user you created in Firebase.

## 3. Run tests

```bash
npm test
```

Runs the Jasmine/Karma unit test suite in headless Chrome.

## 4. Build for production

```bash
ng build
```

Output goes to `dist/portfolio-app/`.

## 5. Deploy to GitHub Pages

1. Build with the correct base href for your repository name (skip `--base-href`
   if deploying to a `username.github.io` root site):

   ```bash
   ng build --base-href /your-repo-name/
   ```

2. Publish the contents of `dist/portfolio-app/browser` to your `gh-pages` branch
   (e.g. using the `angular-cli-ghpages` package, or manually copying the folder).
3. GitHub Pages has no server-side rewrites, so direct links to routes like
   `/about` would 404. This is already handled: `public/404.html` redirects
   unknown paths back to `index.html` with the original path encoded in the query
   string, and an inline script in `src/index.html` decodes it back into the URL
   before Angular's router boots ([spa-github-pages pattern](https://github.com/rafgraph/spa-github-pages)).
   If you deploy to a project page (not the root), set `pathSegmentsToKeep = 1` in
   `public/404.html`.

## Notes

- All state is managed with Angular signals — no NgRx or other state library.
- Forms use `FormsModule` with `[ngModel]`/`(ngModelChange)` bound to signals
  (not `ReactiveFormsModule`).
- The generated Angular CLI class names drop the "Component"/"Service" suffix
  (e.g. `export class Home`, `export class Content`) — this is Angular 21's
  default schematic naming and is kept as-is throughout the project.

