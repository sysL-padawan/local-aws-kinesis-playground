import time
import random
import boto3

client = boto3.client("kinesis",
                      region_name="us-east-1",
                      endpoint_url="http://aws-kinesis:4566",
                      aws_access_key_id="foo",
                      aws_secret_access_key="foo"
                      )
STREAM_NAME = "poc-stream"

try:
    while True:
        time.sleep(1)
        data = bytes(str(random.randint(1, 100)).encode("utf-8"))
        print(f"Sending {data=}")
        response = client.put_record(StreamName=STREAM_NAME, Data=data, PartitionKey="A")
except KeyboardInterrupt:
    print("Finishing due to keyboard interrupt")