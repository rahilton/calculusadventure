
var main = new World(document.getElementById("username").innerHTML);

var myCanvas = document.getElementById("mainDisplay");
myCanvas.width = document.documentElement.clientWidth*.8;
myCanvas.height = myCanvas.width * GameEngine.PANEL_HEIGHT / GameEngine.PANEL_WIDTH;

window.addEventListener("resize", resizeCanvas, false);

main.current.setHaveSave(haveSave);
 
function resizeCanvas(e) {
  var myCanvas = document.getElementById("mainDisplay");
  myCanvas.width = document.documentElement.clientWidth*.8;
  myCanvas.height = myCanvas.width * GameEngine.PANEL_HEIGHT / GameEngine.PANEL_WIDTH;
};

var socket = io.connect();
 
  
main.setSocket(socket);

socket.on('found player', function (data) {
    main.loadPlayer(data.player);  
});