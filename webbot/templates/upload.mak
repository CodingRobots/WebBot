<%inherit file="local:templates.master"/>
<%def name="title()">
	Upload your robot code here
</%def>

<div id="info">
<p>
Upload your robots code here
</p>
<form action="upload_code" enctype="multipart/form-data" method="POST">
<input type="file" name="code">
<br />
<input type="submit" name="submit">
</form>

</div>
<%def name="sidebar_bottom()"></%def>

