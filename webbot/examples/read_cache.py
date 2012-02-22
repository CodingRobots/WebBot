from time import sleep
import memcache

mc = memcache.Client(['127.0.0.1:11211'])

while True:
    print(mc.get('key'))
    sleep(1)
