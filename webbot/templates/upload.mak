<%inherit file="local:templates.master"/>
<%def name="title()">
	Upload your robot code here
</%def>

<div id="info">
<p>
Upload your robots code here
</p>
<form action="upload_code" enctype="multipart/form-data" method="POST">
File to upload: <input type="file" name="code"/><br />
Name of robot: <input type="text" name="name"/><br />
<input type="hidden" name="userid"/>
<input type="submit" name="submit" value="Upload!"/>
</form>

</div>
<%def name="sidebar_bottom()"></%def>

