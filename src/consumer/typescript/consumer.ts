import {
    DescribeStreamCommand,
    GetRecordsCommand,
    GetShardIteratorCommand,
    KinesisClient
} from "@aws-sdk/client-kinesis";

const streamName = 'poc-stream'
const iteratorType = 'LATEST'
const client = new KinesisClient({ region: "us-east-1", endpoint:"http://127.0.0.1:4566"})


// 1. first we get the shardId of the stream
const getShardId = (): Promise<string| undefined> => {
    const describeStreamCommand = new DescribeStreamCommand({
        StreamName: streamName
    })
    return client.send(describeStreamCommand).then((response) => {
        if (response.StreamDescription?.Shards) {
            return response.StreamDescription?.Shards[0].ShardId
        }
    }).catch((error) => {
        console.error('Something went wrong when getting shardID')
        throw error
    })
}

// 2. now getting the shard iterator to step through the stream
const getShardIter = (shardId: string): Promise<string| undefined> => {
    const iteratorCommand = new GetShardIteratorCommand({
        StreamName: streamName,
        ShardId: shardId,
        ShardIteratorType: iteratorType
    })
    return client.send(iteratorCommand).then(response => {
        if (response.ShardIterator !== undefined) {
            return response.ShardIterator
        }
    }).catch((error) => {
        console.error('was not able to get ShardIterator')
        throw error
    })

}
// 3. everything ready, so we are able to get the records with the ShardIterators
const getRecord = (shardIterator:string) => {
    const recordCommand = new GetRecordsCommand({
        Limit: 1,
        ShardIterator: shardIterator,
    })
    return client.send(recordCommand).then((response) => {
        return response
    })
}

const processRecords = async() => {
    const textEncoder = new TextDecoder()
    const shardId = await getShardId()

    if (shardId === undefined) {
        throw new Error('no shardId no Iterator!!!')
    }

    const firstIterator = await getShardIter(shardId)

    if (firstIterator === undefined) {
        throw new Error('no iterator no records!!!')
    }

    let streamResponse = await getRecord(firstIterator)

    // 4. until the stream ends we are consuming next record
    while (streamResponse.NextShardIterator) {
        let data = streamResponse.Records
        if (data !== undefined && data.length > 0) {
            data.forEach((record) => {
                console.log("Data received: " + textEncoder.decode(record.Data))
            })
        }
        //something to play around, had the feeling without might be not as stable, for sure there are better ways I guess
        await new Promise(f => setTimeout(f, 1000));
        streamResponse = await getRecord(streamResponse.NextShardIterator)
    }
}

processRecords().then(() => {
        console.log('all record processed')
    }
).catch((error) => {
    console.error('ALL BROKE')
    throw error
})
