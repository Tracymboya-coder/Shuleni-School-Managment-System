#!/usr/bin/env bash
set -e
cd /home/jj/Shuleni-School-Managment-System/shuleni-backend
source .venv/bin/activate
python -m pip install -r requirements.txt
python - <<'PY'
from app import create_app
app = create_app()
print('IMPORT_OK')
print(len(list(app.url_map.iter_rules())))
PY
