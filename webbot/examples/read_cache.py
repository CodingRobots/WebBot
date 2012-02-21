from time import sleep
from shove import Shove

shove = Shove('memcache://127.0.0.1:11211', 'memory')
while True:
    print(shove.get('key'))
    sleep(1)
