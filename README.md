# Neon Simple Interest Calculator

This is a small, single-file web app that calculates simple interest and shows a neon glass UI.

Files created:

- index.html — UI and markup
- styles.css — modern neon glass styles and responsive layout
- script.js — calculator logic and interactivity
- app.py — Flask server
- requirements.txt — Python dependencies

How to run:

1. Create a virtual environment and activate it (optional but recommended):

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies and run:

```bash
pip install -r requirements.txt
python app.py
```

3. Open http://127.0.0.1:5000 in your browser.

Features:

- Live-sync sliders and numeric inputs
- Animated gradient background and glassy card
- Server-side compute endpoint (`/compute`) with locale-aware formatting
- Annual breakdown list and CSV export
- Copy result button
- Client-side validation with helpful message

Want changes? Tell me if you want different currency, a CLI variant, or packaging as a desktop app.
