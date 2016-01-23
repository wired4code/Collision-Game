var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var gameOptions = {
  height: 700,
  width: 700,
  nEnemies: 30
};

var createBoardWithEnemies = function(nEnemies, boardHeight, boardWidth) {
  // Create board.
  var svg = d3.select("body").append("svg")
    .attr("class", "board");

  // Add 30 enemies to board at random locations.
  for (var i = 0; i < nEnemies; i++) {
    var enemy = d3.select("svg").append("image")
      .attr("xlink:href", "asteroid.png")
      .attr("height", 20)
      .attr("width", 20)
      .attr("x", Math.random() * boardHeight)
      .attr("y", Math.random() * boardWidth);
  }
}

// Create a player.


var drag = d3.behavior.drag()
             //.on('dragstart', function() { player.style('fill', 'red'); })
             .on('drag', function() {

                var setX = d3.event.x;
                var setY = d3.event.y;

                if(d3.event.x > 700){
                  setX = 700;
                } else if(d3.event.x < 0){
                  setX = 0;
                }

                if(d3.event.y > 700){
                  setY = 700;
                } else if(d3.event.y < 0){
                  setY = 0;
                }


              player.attr('cx', setX)
             .attr('cy', setY);
});
             //.on('dragend', function() { player.style('fill', 'black'); });



createBoardWithEnemies(gameOptions.nEnemies, gameOptions.height, gameOptions.width);

var player = d3.select("svg").append("circle")
  .attr("cx", gameOptions.width/2)
  .attr("cy", gameOptions.height/2)
  .attr("r", 10)
  .attr("fill", "red")
  .call(drag);









