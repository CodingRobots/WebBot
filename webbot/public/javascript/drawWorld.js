interval = undefined;

function read_json(game_id){
    $.getJSON('/robo_data?game_id=' + game_id, function(data) {
        //clear the canvas
        $("canvas").clearCanvas();

        if (data.time < 0) {
            clearInterval(interval);
        }else{
            $("#timeleft").text(data.time);
        }

        // Handle the robots
        $.each(data.robots, function(index,value){
            $( "#pb" + index ).progressbar({
                value: value.health
            });

            $('#robo_info_' + index + ' .name').text(value.name);

            if (value.health <= 0){
                return;
            }
            var location = value.position,
                x_coord = location[0] * 6,
                y_coord = location[1] * 5;
            $("canvas")
            .drawImage({
                source: '/images/r0' + (index + 1) + '.png',
                x: x_coord, y: y_coord,
                width: 32,
                height: 32,
                fromCenter: true,
                angle: value.rotation,
            })
            .drawImage({
                source: '/images/turret.png',
                x: x_coord, y: y_coord,
                width: 32,
                height: 32,
                fromCenter: true,
                angle: value.rotation + value.turret_angle,
            });
        });
        $.each(data.bullets, function(index,value){
            var location = value.position,
                x_coord = location[0] * 6,
                y_coord = location[1] * 5;
            $("canvas")
            .drawArc({
                fillStyle: "#000",
                x: x_coord, y: y_coord,
                radius: 1 + (5*value.exploding)
            });
        });
        $.each(data.walls, function(index,value){
            var location = value.position,
                x_coord = location[0] * 6,
                y_coord = location[1] * 5;
            $("canvas")
            .drawRect({
                fillStyle: "#000",
                x: x_coord, y: y_coord,
                width: value.width * 6,
                height: value.height * 5,
                fromCenter: true
            });
        });
    });
};
