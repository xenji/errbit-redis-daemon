var redis = require('redis'),
    http = require('http'),
    argv = require('optimist')
        .demand(['channel','errbitHost', 'errbitPort'])
        .default('channel', 'errbit')
        .default('redisPort', 6379)
        .default('redisHost', '127.0.0.1')
        .argv;

var redisChannel = argv.channel,
    redisHost    = argv.redisHost || 6379,
    redisPort    = argv.redisPort || '127.0.0.1',
    errbitHost   = argv.errbitHost,
    errbitPort   = argv.errbitPort,
    client = redis.createClient(redisPort, redisHost);

client.on("error", function (err) {
    console.log("Error " + err.message);
    console.log( e.stack );
});

client.on("message", function (channel, message) {
    var d = message.trim();
    var req = http.request({
        hostname: errbitHost,
        port: errbitPort,
        path: '/notifier_api/v2/notices',
        headers: {
            'Accept': 'text/xml, application/xml',
            'Content-Type': 'text/xml',
            'Content-Length': d.length
        },
        method: 'POST'
    }, function(res){});
    req.write(d);
    req.end();
});
client.subscribe(redisChannel);