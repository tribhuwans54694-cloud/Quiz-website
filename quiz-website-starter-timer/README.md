# Quick Quiz (GitHub Pages Starter)

A beginner‑friendly multiple‑choice quiz you can deploy for free with GitHub Pages.

## How to use

1. **Create a new repository** on GitHub (e.g., `quiz-website`). Keep it **Public**.
2. Click **Add file → Upload files** and upload these three files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Commit the changes.
4. Go to **Settings → Pages**.
   - In **Source**, pick the `main` branch and **/ (root)** folder, then **Save**.
5. Wait ~1 minute, then visit: `https://YOUR-USERNAME.github.io/REPO-NAME/`

## Customize questions

Open `script.js` and edit the `QUESTIONS` array. Each question looks like:

```js
{
  question: "Your question?",
  choices: ["Option A", "Option B", "Option C", "Option D"],
  answer: 1 // index of the correct answer (0-based)
}
```

Add more objects to the array to include more questions.

## Local preview

Open `index.html` in your browser. No build tools required.

## Optional ideas
- Randomize question order
- Add a per‑question timer
- Add categories (Math, Science, GK) and let users pick
- Save high scores to `localStorage`

---

Built with plain HTML/CSS/JS and designed for accessibility.
