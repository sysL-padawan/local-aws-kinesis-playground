# AWS KINESIS Playground

## Get started
### Starting producer
In order to get started start the localstack container and the producer container with 

`docker-compose up -d`

This will start two container. 
1. Containing aws kinesis and creating a stream called "**poc-stream**"
2. Is a simple producer written in python just posting random numbers to the stream 

### Starting consumer
Inside the `src` folder you can find two sample consumer. One is written in Python as well
and the is written in Typescript.

#### Typescript Consumer 
1. run `yarn install` to install the packages
2. make sure that the docker container are started
3. run `yarn consume` to start consuming the aws kinesis stream

#### Python consumer
1. run `poetry install` to install python dependencies
2. make sure that the docker container are started
3. run `poetry run python ./src/consumer/python/consumer.py` to start consuming aws kinesis messages 

#### Great help from/ with
1. https://blacksheephacks.pl/stream-data-with-python-and-aws-kinesis/
2. https://docs.localstack.cloud/overview/
3. https://docs.aws.amazon.com/kinesis/index.html

## Required Tools 

### yarn
install yarn: https://classic.yarnpkg.com/lang/en/docs/install/

### poetry
install poetry: https://python-poetry.org/docs/

When you are on Mac you can use Homebrew to install the dependency managers. 

### docker
install docker: https://docs.docker.com/get-docker/