# -*- coding: utf-8 -*-
"""My Login Modules stuff."""

from sqlalchemy import *
from sqlalchemy.orm import mapper, relation
from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Integer, Unicode, DateTime
#from sqlalchemy.orm import relation, backref

from datetime import datetime

from tg2app.model import DeclarativeBase, metadata, DBSession


#robots and games classes ave reference to login class

class Games(DeclarativeBase):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    #reference to Login
    place = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)

class Robots(DeclarativeBase):
    __tablename__ = 'robots'

    id = Column(Integer, primary_key=True)
    bot_name = Column(Unicode(255), nullable=False)
    #owner =      reference to Login
    bot_file = Column(Unicode(255), nullable=False)

class Login(DeclarativeBase):
    __tablename__ = 'logins'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(255), nullable=False)
    access_token = Column(Unicode(255), nullable=False)
    last_seen = Column(DateTime, nullable=False)

    def __json__(self):
        return {
            'name': self.name,
	    'Last Seen': self.last_seen,
        }

class Message(DeclarativeBase):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    msg = Column(Unicode(255), nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.now)

    def __json__(self):
        return {
            'msg': self.msg,
        }

# (you also have to edit tg2app/model/__init__.py, do you know what to add there?)
