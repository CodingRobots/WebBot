function read_json(){
    $.getJSON('/robo_data?game_id=1', function(data) {
        //clear the canvas
        $("canvas").clearCanvas();
        
        $("#timeleft").text(data.time);
        
        // Handle the robots
        $.each(data.robot_infos, function(index,value){
            var location = value.loc;
            $("canvas")
            .drawImage({
                source: '/images/r0' + (index + 1) + '.png',
                x: location[0], y: location[1],
                width: 32,
                height: 32,
                fromCenter: false,
                angle: location[2],
            })
            .drawImage({
                source: '/images/turret.png',
                x: location[0], y: location[1],
                width: 32,
                height: 32,
                fromCenter: false,
                angle: location[3],
            });
            $( "#pb" + index ).progressbar({
                value: value.health
            });
            
        });
        $.each(data.bullets, function(index,value){
            var location = value.loc;
            $("canvas")
            .drawArc({
                fillStyle: "#000",
                x: location[0], y: location[1],
                radius: 1
            });
        });
        $.each(data.walls, function(index,value){
            var location = value.loc;
            var w = h = 0;
            if (value.direction = 'v'){
                h = value.length;
                w = 10;
            }else{
                w = value.length;
                h = 10;
            }
            $("canvas")
            .drawRect({
                fillStyle: "#000",
                x: location[0], y: location[1],
                width: w,
                height: h,
                fromCenter: false
            });
        });
        $.each(data.explosions, function(index,value){
            var location = value.loc;
            var size = value.size;
            $("canvas")
            .drawArc({
                fillStyle: "#ff0000",
                x: location[0], y: location[1],
                radius: 10
            });
        });
    });
};


$(document).ready(setInterval("read_json()", 100));
