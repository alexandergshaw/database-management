# Database Management

Welcome to Database Management! This guide walks you through the three-step workflow for completing and submitting assignments using GitHub and GitHub Codespaces.

---

## Step 1 — Create a Branch and Open a Codespace

Keeping your work on its own branch lets you make changes safely without affecting the shared `main` branch.

1. Go to the repository on **GitHub.com**.
2. Click the **branch selector dropdown** near the top-left of the page (it shows `main` by default).
3. Type a name for your new branch in the text box (for example, `module-01-yourname`).
4. Click **"Create branch: module-01-yourname from 'main'"**.
5. GitHub switches you to the new branch automatically — confirm by checking the branch dropdown.
6. Click the green **`<> Code`** button, select the **Codespaces** tab, and click **"Create codespace on \<your-branch-name\>"**.
7. A new browser tab opens with Visual Studio Code in the browser. Wait for the environment to finish loading (this usually takes about a minute).

---

## Step 2 — Make Your Change

1. In the Codespace, open the **Explorer panel** on the left (the icon that looks like two stacked pages, or press `Ctrl+Shift+E` / `Cmd+Shift+E`).
2. Navigate into the assignment folder for your current module (for example, `assignments/module_01`).
3. Open the `README.md` inside that folder and read the assignment instructions carefully.
4. Right-click the module folder and select **"New File"** to create the file described in the assignment instructions.
5. Write your SQL (or other required content) in the new file and save it (`Ctrl+S` / `Cmd+S`).

---

## Step 3 — Stage, Commit, Push, Open a PR, and Merge

1. Click the **Source Control icon** in the left sidebar (the branching-tree icon, or press `Ctrl+Shift+G` / `Cmd+Shift+G`).
2. Review the list of **Changed Files** to confirm your work appears.
3. Click the **`+`** next to each file you want to include (or the **`+`** next to "Changes" to stage everything at once). Staging marks files to be included in your commit.
4. In the **"Message"** box at the top of the panel, type a short description (for example, `Add week 1 SQL queries`).
5. Click **✓ Commit** (or press `Ctrl+Enter` / `Cmd+Enter`) to save the commit locally.
6. Click **"Sync Changes"** (the cloud/upload icon) to **push** your commit to GitHub.
7. Go back to the repository on **GitHub.com**. A banner will appear offering to open a pull request — click **"Compare & pull request"**.
8. Give the pull request a clear title and description, then click **"Create pull request"**.
9. Once the pull request is reviewed and approved, click **"Merge pull request"** → **"Confirm merge"** to merge your work into `main`.
10. After merging, click **"Delete branch"** to keep the repository tidy.
