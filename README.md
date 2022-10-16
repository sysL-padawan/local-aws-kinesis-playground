# AWS KINESIS Playground
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`AWS KINESIS PLayground` was created to have an already set up playground to play around and test implementation in different languages.
Feel free to add other implementations when you like to do so. 

## :tada: Get started
You can get started in just two easy steps.

### Step 1:
#### start docker
You can start the docker container with a simple:

```bash
docker-compose up -d
```

This will start two container. 
1. Containing aws kinesis and creating a stream called "**poc-stream**"
2. Is a simple producer written in python just posting random numbers to the stream 

### Step 2:
Inside the `src` folder you can find two sample consumer, one written in Python and one written in TypeScript. 

#### Typescript Consumer 
1. run the following command to install the packages
``` bash
yarn install
``` 

2. make sure that the docker container are started
3. run  the following command to start consuming the aws kinesis stream
```bash
yarn consume
```

#### Python consumer
1. run the follwing command to install python dependencies
``` bash
poetry install
```
2. make sure that the docker container are started
3. run following command to start consuming aws kinesis messages
```bash
poetry run python ./src/consumer/python/consumer.py 
```

## :information_source: Required Tools 

#### Yarn
install yarn: https://classic.yarnpkg.com/lang/en/docs/install/

#### Poetry
install poetry: https://python-poetry.org/docs/

_When you are on Mac you can use Homebrew to install the dependency managers._ 

#### Docker
install docker: https://docs.docker.com/get-docker/

## :clap: Great help from/ with
1. https://blacksheephacks.pl/stream-data-with-python-and-aws-kinesis/
2. https://docs.localstack.cloud/overview/
3. https://docs.aws.amazon.com/kinesis/index.html