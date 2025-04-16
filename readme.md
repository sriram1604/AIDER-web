use this berfore setup the virtual env:
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

python -m venv .venv

.venv\Scripts\activate

python model.py

pkl file formed....then python app.py runs as api link in 127.0.0.1:3000

frontend : npm run dev