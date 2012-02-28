<%inherit file="local:templates.master"/>

<%def name="title()">
  Welcome to TurboGears 2.1, standing on the shoulders of giants, since 2007
</%def>

<div id="info">
  <p>WebBotWar is a social HTML 5 frontend to
  <a href="http://code.google.com/p/pybotwar/">pybotwar</a>, a python
  implementation of <a href="http://robocode.sourceforge.net/">Robocode</a>.</p>
  <ol id="getting_started_steps">
    <li class="getting_started">
      <h3>Code your data model</h3>
      <p> Design your data model, Create the database, and Add some bootstrap data.</p>
    </li>
    <li class="getting_started">
      <h3>Design your URL architecture</h3>
      <p> Decide your URLs, Program your controller methods, Design your
          templates, and place some static files (CSS and/or JavaScript). </p>
    </li>
    <li class="getting_started">
      <h3>Distribute your app</h3>
      <p> Test your source, Generate project documents, Build a distribution.</p>
    </li>
  </ol>
</div>

<%def name="sidebar_bottom()"></%def>
