FROM python:3.12.4

WORKDIR /home/web

COPY requirements.txt .

COPY sources/ ./sources/

RUN pip install -r requirements.txt

WORKDIR /home/web/sources

CMD ["python", "manage.py", "runserver", "0.0.0.0:8088"]
