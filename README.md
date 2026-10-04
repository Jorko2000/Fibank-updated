# Fibank Front-end Development Task

Responsive React implementation of the supplied Fibank task: a login form followed by a Star Wars data table.

## Requirements implemented

- Responsive login form with username and password inputs.
- Basic validation: both fields must contain non-whitespace characters.
- Login button disabled until validation succeeds.
- `react-router-dom` navigation from `/login` to `/table`.
- Star Wars API integration using `https://swapi.py4e.com/api/people`.
- Table columns: Name, Mass, Height, Hair Color, Skin Color.
- Responsive table that becomes stacked records on small screens.
- Loading state while the API request is pending.
- Error handling for failed or malformed API responses.
- React Hooks (`useState`, `useEffect`) used for state and side effects.
- AbortController used to cancel the API request when the page unmounts.
- Automated tests for the core login and table behaviour.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## Test and production build

```bash
npm run test
npm run build
```

## Routes

- `/login` - login form
- `/table` - Star Wars people table
- `/` - redirects to `/login`

## Login behaviour

This task does not define real authentication credentials. The form therefore treats any non-empty username and password as a successful login and navigates to `/table`, exactly matching the supplied requirement for basic validation and navigation.

## GitHub submission

After creating the repository on GitHub:

```bash
git init
git add .
git commit -m "Implement Fibank responsive login and Star Wars table task"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```
"# Fibank-updated" 
