<%inherit file="local:templates.master"/>

<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" type="text/css" media="all" />
<link rel="stylesheet" href="/css/bots.css" type="text/css" media="all" />
<script src="/javascript/jCanvas.js" type="text/javascript"></script>
<script src="/javascript/drawWorld.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js" type="text/javascript"></script>

<script>
    $(document).ready(function(){
        interval = setInterval("read_json('${game_id}')", 100)
    });
</script>

<div id='canvas_box'>
  <canvas height=500 width=600/>
</div>
<div id='bots_box'>
  <h1>WebBotWar</h1>
  %for index, robot in enumerate(robot_infos['robots']):
    <div id='robo_info_${index}' class='robo_info'>
      <span class='name'>Robot ${index}</span>
      <img src='images/r${'%02d' % (index+1)}.png'></img>
      <div class='progbar' id="pb${index}"></div>
    </div>
  %endfor
  <div>
    <h2>Time Remaining: <span id='timeleft'></span></h2>
  </div>
</div>
<div style="clear:both"/>
