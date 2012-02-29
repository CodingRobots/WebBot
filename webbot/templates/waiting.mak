<%inherit file="local:templates.master"/>
<script type="text/javascript" src="/js/waiting.js"></script>

<div id="users" class="running_list">
<h2>Logged in users</h2>
<ul>
% for user in users:
	<li>${user['name']}</li>
% endfor
</ul>
</div>

<div id="messages" class="running_list">
<h2>Messages</h2>
<ul>
% for msg in messages:
	<li>${msg['msg']}</li>
% endfor
</ul>
</div>
