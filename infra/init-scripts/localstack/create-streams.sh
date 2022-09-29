#!bin/bash

echo "######### CREATE KINESIS STREAM #########"
awslocal kinesis create-stream --stream-name poc-stream --shard-count 1
echo "######### STREAMS CREATED #########"