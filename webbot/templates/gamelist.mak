<%inherit file="local:templates.master"/>

<p>Here are all the currently running games.</p>

<div>
  <h2>
  %if your_games:
      Your Games</h2>
      %for game in your_games:
        <div>
          <a href='/game?game_id=${game.id}'>Watch ${game.name}</a>
        </div>
      %endfor
      </div>

      <div>
        <h2>Other
  %endif

  Recent Games</h2>
  %for game in games:
    <div>
      <a href='/game?game_id=${game.id}'>Watch ${game.name}</a>
    </div>
  %endfor
</div>
