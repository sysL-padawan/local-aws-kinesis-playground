# base image
FROM python:3.8-alpine as python-base
WORKDIR /app

# dependencies installation
FROM python-base as poetry
ARG POETRY_VERSION=1.2.1

RUN apk update && \
  apk add \
  build-base \
  gcc \
  musl-dev \
  python3-dev \
  libffi-dev \
  openssl-dev \
  cargo

RUN pip install poetry==$POETRY_VERSION
COPY ../../../pyproject.toml /app

ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV POETRY_VIRTUALENVS_CREATE=true
RUN poetry install --no-interaction

# actual code container with code execution
FROM python-base as runtime
ENV PATH="/app/.venv/bin:$PATH"
COPY --from=poetry /app /app
COPY ../../../src/producer/python/producer.py /app