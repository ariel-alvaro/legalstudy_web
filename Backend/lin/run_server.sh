#!/bin/bash
port = 8088

echo "_______Activating VirtualEnv_______"

source ../env/bin/activate

echo "____Running server...____"

cd ../sources

python3 manage.py runserver 0.0.0.0:8088
