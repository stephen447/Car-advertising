#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install
pip install dj-database-url==0.5.0
python manage.py collectstatic --no-input
python manage.py migrate