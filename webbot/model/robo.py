# -*- coding: utf-8 -*-
"""My Login Modules stuff."""

from sqlalchemy import *
from sqlalchemy.orm import mapper, relation
from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Integer, Unicode, DateTime
#from sqlalchemy.orm import relation, backref

from datetime import datetime

from webbot.model import DeclarativeBase, metadata, DBSession

class Game(DeclarativeBase):
    __tablename__ = 'game'

    id = Column(Unicode(255), primary_key=True)
    userid = Column(Unicode(255), nullable=False)
    name = Column(Unicode(255), nullable=False)
    date = Column(DateTime, nullable=False)

class Login(DeclarativeBase):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(255), nullable=False)
    access_token = Column(Unicode(255), nullable=False)

class Robot(DeclarativeBase):
    __tablename__ = 'robot'

    id = Column(Integer, primary_key=True)
    name = Column(Unicode(255), nullable=False)
    userid = Column(Unicode(255), nullable=False)
