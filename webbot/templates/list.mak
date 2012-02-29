<%inherit file="local:templates.master"/>

<script>
  function countCheck() {
    if ($(':checked').length > 5) {
      $('#error').text('Only 5 robots may be chosen at once.');
      $('#submit').attr('disabled', 'disabled');
    } else {
      $('#error').text('');
      $('#submit').removeAttr('disabled');
    }
  }
</script>

<p>Here are all the robots you can play with:</p>

<form action='start_game'>
  <span id='error'></span>
  %for robot in robots:
    <div>
	  <span>${robot} Robot</span>
	  <input onclick='countCheck()' type='checkbox' name='${robot}'/>
    </div>
  %endfor
  <input id='submit' type='submit'/>
</form>
