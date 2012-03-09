# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, request, redirect
from tg.i18n import ugettext as _, lazy_ugettext as l_
from webbot import model
from repoze.what import predicates
from webbot.model import DBSession, metadata

from webbot.lib.base import BaseController
from webbot.controllers.error import ErrorController
import subprocess
import uuid
from time import clock, sleep
from pymongo import Connection
import os

from sqlalchemy import desc
from datetime import datetime

__all__ = ['RootController']

class RootController(BaseController):
    """
    The root controller for the webbot application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    error = ErrorController()

    @expose('webbot.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict()

    @expose('webbot.templates.bots')
    def game(self, game_id=''):
        """Handle displaying the game."""
        return dict(game_id=game_id, robot_infos=self.robo_data(game_id))

    @expose('webbot.templates.list')
    def robots(self):
        """List all the available robots."""
        robo_list = [u'Ninja', u'Pirate', u'Robot', u'Wizard', u'Velociraptor',
                     u'Zombie', u'robot07', u'robot08']
        return dict(robots=robo_list)

    @expose('webbot.templates.gamelist')
    def games(self):
        """List all the available games."""
        game_list = DBSession.query(model.Game).all()
        return dict(games=game_list)

    @expose('json')
    def robo_data(self, game_id):
        """Returns the current state of the game as JSON."""
        # loc is the current location of the robot in
        #   (x, y, robot_orientation, turret_orientation)
        # format

        if os.environ.get('OPENSHIFT_NOSQL_DB_TYPE') == 'mongodb':
            conn = Connection(os.environ.get('OPENSHIFT_NOSQL_DB_HOST'))
        else:
            conn = Connection()
        db = conn.pybot

        return db[game_id].find_one()

    @expose()
    def start_game(self, **kwargs):
        robots = ''
        for key in kwargs.keys(): robots += key + ' '
        robots = robots[:-1]
        game_id = str(uuid.uuid3(uuid.NAMESPACE_DNS, robots + str(clock())))

        # Try to detect OpenShiftiness
        base = os.environ.get('OPENSHIFT_REPO_DIR')
        if not base:
            base = '../../'

        subprocess.Popen(['python', 'main.py', '-g', '-I', game_id, '-R', robots],
                         cwd=base+'pybotwar')

        new_game = model.Game(id=game_id, name=robots)
        DBSession.add(new_game)
        sleep(1)
        redirect('/game?game_id=%s' % (game_id))

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ['repoze.who.logins'] + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)
        redirect(came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        redirect(came_from)
