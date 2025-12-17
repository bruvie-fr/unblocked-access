# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Scramjet proxy integration 🔧

This project can open links via a Scramjet proxy instance. By default the app assumes a local Scramjet dev server at `http://localhost:1337`.

To change the Scramjet host, set the environment variable `VITE_SCRAMJET_BASE` (for example: `https://my-scramjet.example`). The app will open proxied sites using `?url=` by default.

Example (Windows PowerShell):

```powershell
$Env:VITE_SCRAMJET_BASE = "https://my-scramjet.example"
npm run dev
```

Note: Depending on how your Scramjet host is configured, you may need to adapt the proxy path. The frontend uses `?url=` by default for compatibility.

### Quick setup: run a local Scramjet (Scramjet-App)

The project is compatible with [Scramjet-App](https://github.com/MercuryWorkshop/Scramjet-App), an easy-to-deploy demo server.

On a Linux/macOS VPS or local machine:

```sh
git clone https://github.com/MercuryWorkshop/Scramjet-App
cd Scramjet-App
pnpm install
pnpm start
# Scramjet will serve on http://localhost:1337 by default
```

On Windows, use WSL or follow the project's instructions.

Once Scramjet is running locally, open the app and click **Detect Scramjet** in the header — the app will probe `http://localhost:1337`, and if available it will be used automatically (stored in localStorage). You can also set `VITE_SCRAMJET_BASE` in `.env` or set `SCRAMJET_BASE_RUNTIME` in DevTools localStorage.

If your Scramjet instance listens on port **8080** (Scramjet-App commonly uses 8080), the Detect button now probes that port as well. If detection fails, set the runtime value manually in DevTools:

```js
localStorage.setItem('SCRAMJET_BASE_RUNTIME','http://SERVER_IP:8080');
location.reload();
```
