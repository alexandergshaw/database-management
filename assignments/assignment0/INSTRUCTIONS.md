# Assignment 0 — Onboarding and Setup (GUI-Only)

Welcome to **The Design and Maintenance of Databases** project repository.

This onboarding assignment uses only GitHub web UI, GitHub Codespaces, VS Code panels, Vercel UI, and Supabase UI. Do not use terminal commands for this assignment.

## Goal
Set up your personal copy of the Enterprise Database Management Portal and verify you can edit, test, and submit work through pull requests.

## 11-Step Onboarding Checklist

1. **Fork this repository in GitHub**
   - Open the repository page in your browser.
   - Select **Fork** and create a copy in your account.

2. **Import the fork into Vercel**
   - In Vercel, choose **Add New Project**.
   - Select your fork and complete the import wizard.

3. **Create a Supabase project**
   - In Supabase, create a new project.
   - Open the SQL editor and run the root `schema.sql` content.

4. **Add Vercel environment variables**
   - In Vercel project settings, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Redeploy from the Vercel UI.

5. **Create a feature branch in GitHub UI**
   - In your fork, open the branch selector.
   - Create a branch named `student/onboarding-check`.

6. **Open the branch in GitHub Codespaces**
   - Click **Code** → **Codespaces** → **Create codespace on student/onboarding-check**.

7. **Edit assignment files in the editor**
   - Open `/assignments/assignment0/solution.ts`.
   - Update the `result.isComplete` flag when your setup is verified.

8. **Run tests using the Testing panel**
   - Open the **Testing** panel in Codespaces.
   - Run tests for `assignments/assignment0/test.ts` and confirm pass status.

9. **Commit with the Source Control panel**
   - Open **Source Control**.
   - Stage your file changes.
   - Write a commit message and commit from the UI.

10. **Push and open a Pull Request in GitHub UI**
    - Push your branch using the Source Control panel.
    - Open GitHub and create a pull request to your default branch.

11. **Verify deployment and merge**
    - Confirm Vercel preview is healthy.
    - Confirm assignment tests pass in the PR.
    - Merge the pull request using GitHub UI.

## Completion Criteria
- Your fork deploys successfully in Vercel.
- Supabase is connected and environment variables are set.
- `result.isComplete` is `true` in `assignment0/solution.ts`.
- Your pull request is merged.
