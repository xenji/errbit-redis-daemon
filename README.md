This daemon works in conjuction with any errbit instance and tries to tackle the problem 
of blocking communication when an error occurs. You need to rewrite your Airbrake client
on the server side to publish it's XML message into the corresponding redis pubsub channel.

If you do so, this little daemon will take care of the rest.

This daemon has been developed at my time at trivago and has been tested with pm2 as keepalive service.

Have fun.