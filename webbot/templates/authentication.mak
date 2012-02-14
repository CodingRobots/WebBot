<%inherit file="local:templates.master"/>
<%def name="title()">Learning TurboGears 2.1: Quick guide to authentication.</%def>

${parent.sidebar_top()}
${parent.sidebar_bottom()}
  <div id="getting_started">
    <h2>Authentication &amp; Authorization in a TG2 site.</h2>
    <p>If you have access to this page, this means you have enabled authentication and authorization
    in the quickstart to create your project.</p>
    <p>
    The paster command will have created a few specific controllers for you. But before you
    go to play with those controllers you'll need to make sure your application has been
    properly bootstapped.
    This is dead easy, here is how to do this:
    </p>

    <span class="code">
    paster setup-app development.ini
    </span>

    <p>
    inside your application's folder and you'll get a database setup (using the preferences you have
    set in your development.ini file). This database will also have been prepopulated with some
    default logins/passwords so that you can test the secured controllers and methods.
    </p>
    <p>
    To change the comportement of this setup-app command you just need to edit the <span class="code">websetup.py</span> file.
    </p>
    <p>
    Now try to visiting the <a href="${tg.url('/manage_permission_only')}">manage_permission_only</a> URL. You will be challenged with a login/password form.
    </p>
    <p>
    Only managers are authorized to visit this method. You will need to log-in using:
        <p>
        <span class="code">
        login: manager
        </span>
        </p>
        <p>
        <span class="code">
        password: managepass
        </span>
        </p>
    </p>
    <p>
    Another protected resource is <a href="${tg.url('/editor_user_only')}">editor_user_only</a>. This one is protected by a different set of permissions.
    You will need to be <span class="code">editor</span> with a password of <span class="code">editpass</span> to be able to access it.
    </p>
    <p>
    The last kind of protected resource in this quickstarted app is a full so called <a href="${tg.url('/secc')}">secure controller</a>. This controller is protected globally.
    Instead of having a @require decorator on each method, we have set an allow_only attribute at the class level. All the methods in this controller will
    require the same level of access. You need to be manager to access <a href="${tg.url('/secc')}">secc</a> or <a href="${tg.url('/secc/some_where')}">secc/some_where</a>.
    </p>
  </div>
