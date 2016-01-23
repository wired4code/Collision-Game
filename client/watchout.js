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

  // Create a player.
  var player = d3.select("svg").append("circle")
    .attr("cx", 350)
    .attr("cy", 350)
    .attr("r", 10)
    .attr("fill", "red");

};

createBoardWithEnemies(gameOptions.nEnemies, gameOptions.height, gameOptions.width);