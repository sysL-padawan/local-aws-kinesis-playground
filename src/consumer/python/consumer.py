import time
import boto3
STREAM_NAME = "poc-stream"

try:
    print(f"starting up")
    client = boto3.client("kinesis", region_name="us-east-1", endpoint_url="http://127.0.0.1:4566")
    stream = client.describe_stream(StreamName=STREAM_NAME)
    shard_id = stream["StreamDescription"]["Shards"][0]["ShardId"]
    print(f"Got {shard_id=}")
    iterator = client.get_shard_iterator(
        StreamName=STREAM_NAME,
        ShardId=shard_id,
        ShardIteratorType="LATEST"
    )["ShardIterator"]
    print(f"Reading data...")
    response = client.get_records(ShardIterator=iterator, Limit=1)
    while "NextShardIterator" in response:
        time.sleep(1)
        data = response["Records"]
        if len(data) < 1:
            print("No data received")
        else:
            data = data[0]["Data"].decode()
            print(f"Received {data=}")
        response = client.get_records(ShardIterator=response["NextShardIterator"], Limit=1)
except KeyboardInterrupt:
    print("Finishing due to keyboard interrupt")