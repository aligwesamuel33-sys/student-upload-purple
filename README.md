# Student Registration and Admission Portal

A responsive front-end coursework project built with HTML, CSS, and vanilla JavaScript.

## Features
- Validates full name, email, phone number, age, department, matriculation number, and password.
- Rejects duplicate email addresses and matriculation numbers.
- Displays registered students in a table.
- Updates the total student count.
- Shows field-specific error messages.
- Stores student records in browser local storage.
- Does not display or store passwords.

## Run locally
Open `index.html` in a modern browser. No build tools or dependencies are required.

## Publish with GitHub Pages
1. Create a GitHub repository named `student-registration-portal`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under the build/deployment section, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for the deployment to finish and open the Pages URL shown in Settings → Pages.

## Important limitation
This is a front-end demonstration, not a secure production admissions system. Local storage is limited to the current browser/device and can be edited or cleared by the user. A real admissions system should use a backend API, database, server-side validation, authentication, and securely hashed passwords. Never collect real applicants' passwords using this demo.
