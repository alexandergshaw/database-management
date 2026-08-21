# Computer-Science-Principles-Summer-26

Welcome to Computer Science Principles – Summer 2026! This guide walks you through the complete workflow for completing and submitting assignments using the GitHub website and GitHub Codespaces.

---

## Workflow Guide

### Step 1: Create a Branch and Switch to It

Creating your own branch keeps your work separate from the main codebase until it's ready to be reviewed.

1. Go to the repository on **GitHub.com** (e.g., `https://github.com/alexandergshaw/Computer-Science-Principles-Summer-26`).
2. Click the **branch selector dropdown** near the top-left of the page (it usually shows `main`).
3. In the text box that appears, type a name for your new branch (e.g., `module-01-yourname`).
4. Click **"Create branch: module-01-yourname from 'main'"** that appears below the text box.
5. GitHub will automatically switch you to your new branch. You can confirm this by checking the branch dropdown — it should now show your new branch name.

---

### Step 2: Open a Codespace on Your Branch

GitHub Codespaces gives you a full development environment in your browser — no installation needed.

1. Make sure you are on your new branch (confirmed by the branch dropdown showing your branch name).
2. Click the green **`<> Code`** button near the top-right of the repository page.
3. In the dropdown that appears, select the **`Codespaces`** tab.
4. Click **"Create codespace on \<your-branch-name\>"**.
5. A new browser tab will open and load Visual Studio Code in the browser. Wait for the environment to finish setting up (this may take a minute or two).

---

### Step 3: Find Your Assignment Folder and Create a File

The repository is organized into module folders (`module_01`, `module_02`, etc.). Each assignment will tell you which module folder to work in.

1. In the Codespace, look at the **Explorer panel** on the left side (the icon that looks like two stacked pages). If it is not visible, click it or press `Ctrl+Shift+E` (Windows/Linux) / `Cmd+Shift+E` (Mac).
2. Expand the folder that matches your assignment (e.g., `module_01`).
3. Right-click on that folder and select **"New File"**.
4. Type the filename specified by your assignment (e.g., `hello_world.py`) and press **Enter**.
5. The new file will open in the editor. Write your code or content in this file.

---

### Step 4: Commit and Push Your Changes

After completing your work, you need to save it back to GitHub using a commit and a push.

1. Click the **Source Control icon** in the left sidebar (it looks like a branching tree, or press `Ctrl+Shift+G` / `Cmd+Shift+G`).
2. You will see a list of **Changed Files**. Review the list to confirm your new or edited files appear.
3. Hover over each file you want to save and click the **`+`** (Stage Changes) button next to it. Staging a file marks it to be included in your commit.
   - Alternatively, click the **`+`** next to "Changes" to stage all changed files at once.
4. In the **"Message"** text box at the top of the Source Control panel, type a short description of what you did (e.g., `Add hello_world.py for module 01`).
5. Click the **✓ Commit** button (or press `Ctrl+Enter` / `Cmd+Enter`) to commit your staged changes.
6. After committing, click the **"Sync Changes"** button (or the cloud/upload icon) that appears to **push** your commit to GitHub. This sends your changes from the Codespace to your branch on GitHub.com.

---

### Step 5: Verify Your Changes Were Pushed to GitHub

1. Go back to the repository on **GitHub.com** in your browser.
2. Make sure you are viewing your branch by selecting it from the branch dropdown.
3. Navigate into the module folder you worked in (e.g., `module_01`).
4. Confirm that your new file appears in the folder and that its contents look correct.
5. You can also click on **"Commits"** (near the top of the file list) to see a history of commits on your branch and confirm your latest commit message is listed there.

---

## Repository Structure

```
Computer-Science-Principles-Summer-26/
├── module_01/    # Module 1 assignments
├── module_02/    # Module 2 assignments
├── module_03/    # Module 3 assignments
├── module_04/    # Module 4 assignments
├── module_05/    # Module 5 assignments
├── module_06/    # Module 6 assignments
├── module_07/    # Module 7 assignments
├── module_08/    # Module 8 assignments
├── module_09/    # Module 9 assignments
└── module_10/    # Module 10 assignments
```

Each assignment will specify which module folder to use and what to name your file.
