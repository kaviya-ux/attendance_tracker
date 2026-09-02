# 📋 Attendance Tracker

A simple, single-file attendance tracker built with HTML, CSS, and vanilla JavaScript. Add students, mark them present or absent with a click, and see live totals — all in one page, no backend required.

## Live Demo

Open `index.html` in any browser. That's it — no setup required.

## Features

- Add students by name through a simple form
- Mark each student **Present** or **Absent** with a single click
- Click the same status again to clear it (un-mark a student)
- Remove any student from the list with the **×** button
- Live summary showing total Present and Absent counts, updated instantly
- Friendly empty-state message when no students have been added yet

## Tech Stack

- HTML5
- Plain CSS (embedded in the page)
- Vanilla JavaScript (no frameworks, no libraries)

## How It Works

- Every student is stored as a simple object: `{ name: "John", status: "" }`, where `status` is `""`, `"present"`, or `"absent"`.
- All students live in a single in-memory array (`students`), so the list resets on page refresh — there's no database or storage involved.
- Every add, mark, or remove action calls `renderStudents()`, which clears and rebuilds the list from the current array, then recalculates the Present/Absent totals in `updateSummary()`.
- The form's `submit` event is intercepted with `preventDefault()` so adding a student never reloads the page.

## Project Structure

```
attendance-tracker/
├── index.html   # everything: markup, styling, and JS logic
└── README.md
```

Everything lives in a single `index.html` file, making it easy to open, edit, and deploy anywhere (GitHub Pages, Netlify, or just double-click to open locally).

## Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/kaviya-ux/attendance_tracker.git
   ```
2. Open `index.html` in your browser.

No installation, no npm, no build step required.

## Possible Improvements

- Persist the student list with `localStorage` so it survives a page refresh
- Track attendance by date, with a history view per student
- Export attendance summary as CSV
- Add a search/filter bar for large class lists

## License

Free to use for learning or personal projects.
