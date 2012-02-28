<%inherit file="local:templates.master"/>

<p>Here are all the currently running games.</p>

<div>
  %for game in games:
    <div>
	  <a href='/game?game_id=${game['id']}'>Watch ${game['name']}</a>
    </div>
  %endfor
</div>
