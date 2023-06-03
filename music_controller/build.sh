#!/usr/bin/env bash
# exit on error
set -o errexit
pip install poetry==1.2.0
poetry lock
#rm poetry.lock


poetry install
python manage.py collectstatic --no-input
python manage.py migrate