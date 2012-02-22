<%inherit file="local:templates.master"/>

<p>Here are all the robots you can play with:</p>

<div>
  %for robot in robots:
    <div>
	  <span>${robot} Robot</span>
	  <input type='button' value='Pick Me!'/>
    </div>
  %endfor
</div>
