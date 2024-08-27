FROM python:3.12.4

WORKDIR /home/web

COPY requirements.txt .

COPY sources/ ./sources/

RUN pip install -r requirements.txt

WORKDIR /home/web/sources

CMD ["uvicorn", "project.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
