from time import sleep
from random import random
import memcache

mc = memcache.Client(['127.0.0.1:11211'])

while True:
    mc.set('key', random())
    sleep(2)
