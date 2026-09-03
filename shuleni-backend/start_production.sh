#!/usr/bin/env bash
set -e
cd /home/jj/Shuleni-School-Managment-System/shuleni-backend
source .venv/bin/activate
export PORT=4000
export CORS_ORIGINS=http://localhost:4173
exec gunicorn --config gunicorn.conf.py wsgi:app
