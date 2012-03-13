<%inherit file="local:templates.master"/>
<%def name="title()">
	${page_title}
</%def>

<div id="info">
<p>
${form_title}
</p>
${form.display() | n}

</div>
<%def name="sidebar_bottom()"></%def>

