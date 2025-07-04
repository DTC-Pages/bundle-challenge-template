> **This repository is provided **exclusively** for the technical assessment.**  
> Once the hiring process is complete, all of its contents may be deleted.

---

## Full brief

Find the detailed briefing, evaluation criteria, and mock-ups on Notion:  
🔗 **[Link to the exercise](https://www.notion.so/dtc-pages/Technical-Challenge-Dynamic-Product-Bundle-10-OFF-215075df3d7980809acddb8a95d6db91?source=copy_link)**

---

## How to participate

1. **Create a Shopify Partners account** (free) and set up a development store—this is where you’ll preview your work.  
2. **Fork this repository** to your personal account or organization (**Fork → Create a fork**).  
3. Work in your fork; we recommend a branch named `feature/solution`.  
4. **When you’re done**, open a **Pull Request (PR)** from your branch to `main` in *your own fork*.  
   - Leave the PR **open and unmerged** so we can review commits, diffs, and comments.  
   - In the PR **description**, paste the **theme preview link** (e.g. `https://your-dev-store.myshopify.com/?preview_theme_id=123456789`) so we can test the bundle live.  
5. Invite `@hemnys` as a *reviewer* or *collaborator* so we have access to your PR.

### Shopify Functions & Checkout UI Extensions

| What you must do | Why |
|------------------|-----|
| **Create one additional private repository** under your account (e.g. `bundle-backend`). | Keeps code that may require secrets or CI isolated from the theme fork. |
| In that repo, place **both components**:<br>• `bundle-function` (CartTransform)<br>• `bundle-checkout-extension` (UI Extension) | Centralises backend code while remaining separate from storefront assets. |
| **Open a dedicated PR to `main` for each component** (two PRs total). | Allows us to review Function and Extension independently. |
| Add **direct links** to those PRs in the README of your fork. | Fast navigation for the evaluation team. |

> **Functions or Extensions delivered without their own PRs will not be accepted.**

---

## Minimal best practices

- Small, descriptive commits.  
- A clear README with local setup, Shopify CLI commands, and test steps.  

---

Good luck with the challenge!

---

# README - Shopify Store Setup

This document outlines the essential steps to set up and develop a Shopify store using modern tools and best practices.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Partner Account & Development Store](#create-partner-account--development-store)
3. [Install Shopify CLI](#install-shopify-cli)
4. [Authenticate & Connect to Store](#authenticate--connect-to-store)
5. [Initialize or Clone a Theme](#initialize-or-clone-a-theme)
6. [Local Development](#local-development)
7. [Version Control Workflow](#version-control-workflow)
8. [Deploy to Production](#deploy-to-production)
9. [Useful Commands](#useful-commands)
10. [Additional Resources](#additional-resources)
11. [Pull Requests](#pull-requests)

---

## Prerequisites

- A Shopify Partner account and a development store.
- Node.js ≥ 14.x and npm or yarn.
- Git installed and configured.
- A code editor (VS Code recommended).

---

## Create Partner Account & Development Store

1. Go to [Shopify Partners](https://partners.shopify.com) and sign up.
2. In your Partner dashboard, choose **Stores** → **Add store**.
3. Select **Development store**, then set store name, password, and currency.

---

## Install Shopify CLI

Install the official CLI for theme and app management:

```bash
npm install -g @shopify/cli @shopify/theme
```

Verify installation:

```bash
shopify version
```

---

## Authenticate & Connect to Store

Log in to your development store:

```bash
shopify login --store your-store.myshopify.com
```

This will open your browser to authorize access.

---

## Initialize or Clone a Theme

- **Clone an existing theme**

```bash
git clone git@github.com:your-username/your-theme.git
cd your-theme
```

- **Initialize a new theme**

```bash
shopify theme init
```

Choose a template (e.g., Dawn) and select your development store.

---

## Local Development

Start the live-reload development server:

```bash
shopify theme serve
```

- Edit Liquid, CSS/SCSS, and JS in your editor.
- Preview changes in real time.

---

## Version Control Workflow

1. Create feature or fix branches:

    ```bash
    git checkout -b feature/your-feature
    ```

2. Write clear commit messages, e.g.:

    ```bash
    git commit -m "feat: add hero section"
    ```

3. Push your branch:

    ```bash
    git push origin feature/your-feature
    ```

4. Open a Pull Request on GitHub before merging.

---

## Deploy to Production

1. Ensure you are on `main` and up to date:

    ```bash
    git checkout main
    git pull
    ```

2. Push the theme live:

    ```bash
    shopify theme push --live
    ```

3. Test the live store and perform final QA.

---

## Useful Commands

| Command                                | Description                            |
| -------------------------------------- | -------------------------------------- |
| `shopify login --store <store>`        | Authenticate with a Shopify store      |
| `shopify theme serve`                  | Start local development server         |
| `shopify theme pull`                   | Download remote theme changes          |
| `shopify theme push`                   | Upload theme changes (`--live` to deploy) |
| `shopify theme open`                   | Open the store in browser              |
| `git checkout -b <branch>`             | Create and switch to a new branch      |
| `git merge <branch>`                   | Merge another branch into current      |
| `npm install`                          | Install project dependencies           |

---

## Additional Resources

- [Shopify CLI Documentation](https://shopify.dev/docs/cli)
- [Liquid Language Reference](https://shopify.dev/docs/api/liquid)
- [Dawn Theme on GitHub](https://github.com/Shopify/dawn)
- [Shopify Community Forums](https://community.shopify.com)

---

## Pull Requests

- **Bundle extension**: https://github.com/Juanda1992/bundle-checkout-banner/pull/1
- **Bundle function**: https://github.com/Juanda1992/Bundle_function/pull/1

