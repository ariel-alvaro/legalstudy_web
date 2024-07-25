#!/bin/bash
port = 8088

echo "_______Activating VirtualEnv_______"

source ../env/bin/activate

echo "____Running server...____"

cd ../sources

python3 manage.py runserver 192.168.0.75:8088
