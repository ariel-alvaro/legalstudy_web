

echo "____Creating Virtual Enviroment____"

python3 -m venv ../env

echo "_______Activating VirtualEnv_______"

source ../env/bin/activate.fish

echo "___________Upgrading PIP___________"

python3 -m pip install --upgrade pip

echo "_______________DONE________________"
