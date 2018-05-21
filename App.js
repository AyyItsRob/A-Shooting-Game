import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/4e6f13f254c3349da3545c0301b74b1806afea50/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        //Robert Leonick
//Variables
var p1B = 0;
var spacew = (getWidth() / 3) - 50;
var spaceTop = 50;
var spaceBot = getHeight() - 100;
var bang = new Rectangle(2.5, 2.5);
var cover1 = new Rectangle(50, 40);
var cover2 = new Rectangle(50, 40);
var cover3 = new Rectangle(50, 40);
var runnman = new Rectangle(20, 30);
var shoottman = new Rectangle(20, 30);
var shoottmanssgun = new Rectangle(5,10);
//cooldown prevents more than one bullet from being fired at once
var cooldown = 0;
//guywentran keeps track of which side the runnman arrived at last
var guywentran = false;
function create(){
    runnman.setPosition(spacew, 10);
    shoottman.setPosition(getWidth() / 2 - 10, spaceBot);
    shoottmanssgun.setPosition(getWidth() / 2 + 3, spaceBot - 9.5);
    cover1.setPosition(spacew, spaceTop);
    spacew *= 2;
    cover2.setPosition(spacew, spaceTop);
    spacew *= 1.5;
    cover3.setPosition(spacew, spaceTop);
    add(shoottman);
    add(shoottmanssgun);
    add(runnman);
    add(cover1);
    add(cover2);
    add(cover3);
    spacew = (getWidth() / 3) - 50;
}
// The animation of the bullet flying upscreen
function gunbullet(){
    bang.move(0, -10);
    if(bang.getY() < 1){
        stopTimer(gunbullet);
        cooldown -= 1;
    }
}
// the runnman moves left and right across the cover
function guygorun(){
    if(runnman.getX() <= spacew + 10){
        guywentran = false;
    }
    if(runnman.getX() >= (spacew * 3 + 20)){
        guywentran = true;
    }
    if((runnman.getX() >= spacew) && (runnman.getX() <= (spacew * 3 + 25)) && (!guywentran)){
        runnman.move(2.5, 0);
    }else{
        runnman.move(-2.5, 0);
    }
}
// moves the player and the start position of the bullet when 1 or 2 are pressed
function bangbang(e){
    if(cooldown == 0){
        if(e.keyCode == Keyboard.letter('1')){
            remove(bang);
            p1B = 1;
            shoottman.setPosition(spacew + 60, spaceBot);
            shoottmanssgun.setPosition(spacew + 72, spaceBot - 9.5);
            bang.setPosition(spacew + 73.25, spaceBot - 9.5);
            add(bang);
            setTimer(gunbullet, 1);
            cooldown += 1;
        
        }
        else if(e.keyCode == Keyboard.letter('2')){
            remove(bang);
            p1B = 2;
            shoottman.setPosition((2 * spacew) + 60, spaceBot);
            shoottmanssgun.setPosition((2 * spacew) + 72, spaceBot - 9.5);
            bang.setPosition((2 * spacew) + 73.25, spaceBot - 9.5);
            add(bang);
            setTimer(gunbullet, 1);
            cooldown += 1;
        }
    }
}
// Checks to see if the bullet hits the runnman
function checkForBangg(){
    if((runnman.getX() <= (bang.getX() + 2.5)) && ((runnman.getX() + 20) >= bang.getX()) && (((spaceTop + 30) >= bang.getY()) && (spaceTop <= bang.getY()) )){
            println("HIT!");
            remove(bang);
    }
}
function start(){
    println("Press one to shoot left and two to shoot right!");
    create();
    setTimer(guygorun, 10);
    keyDownMethod(bangbang);
    setTimer(checkForBangg, 0.001);
}




        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
