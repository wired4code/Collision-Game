var gameStats = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var gameOptions = {
  height: 700,
  width: 700,
  nEnemies: 10
};

var createBoardWithEnemies = function(nEnemies, boardHeight, boardWidth) {
  // Create board.
  var svg = d3.select("body").append("svg")
    .attr("class", "board");

  // Add 30 enemies to board at random locations.
  for (var i = 0; i < nEnemies; i++) {
    var enemy = d3.select("svg").append("image")
      .attr("xlink:href", "asteroid.png")
      .attr("r", 10)
      .attr("height", 20)
      .attr("width", 20)
      .attr("x", Math.random() * boardHeight)
      .attr("y", Math.random() * boardWidth);
  }
  createPlayer();
  //detectAllEnemies();
}

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

              d3.select('circle').attr('cx', setX)
             .attr('cy', setY);
});
             //.on('dragend', function() { player.style('fill', 'black'); });
var detectAllEnemies = function(){
  d3.selectAll('image')
    .each(collisionCheck);
};

var collisionCheck = function(){

  var enemyX = d3.select(this).attr('x');
  var enemyY = d3.select(this).attr('y');
  var playerX = d3.select('circle').attr('cx');
  var playerY = d3.select('circle').attr('cy');

  if ( ( Math.abs(enemyX - playerX) <= 20) && ( Math.abs(enemyY - playerY) <= 20) ) {
    console.log('Collision detected');
    d3.select("svg").attr('class', 'collision');
  }

  // var xDiff = enemyX - d3.select("circle").attr("cx");
  // var yDiff = enemyY - d3.select("circle").attr("cy");
  // var radiusSum = d3.select(this).attr('r') + d3.select('circle').attr('r');

  // var seperation = Math.sqrt( (xDiff * xDiff) + (yDiff * yDiff) );

  // if (seperation <= radiusSum) {
  //   console.log('collision!')
  //   d3.select('svg')
  //     .attr('class', 'collision');
    //d3.selectAll("svg").remove();
    /*createBoardWithEnemies(gameOptions.nEnemies, gameOptions.height, gameOptions.width);*/
    //createPlayer();
  //}

};

var createPlayer = function() {
  d3.select("svg").append("circle")
    .attr("cx", gameOptions.width/2)
    .attr("cy", gameOptions.height/2)
    .attr("r", 10)
    .attr("fill", "red")
    .call(drag);
}

var setNewLocation = function(){
  d3.select(this)
    .transition()
    .attr("x", Math.random() * gameOptions.width)
    .attr("y", Math.random() * gameOptions.height)
    .duration(2000);
};

createBoardWithEnemies(gameOptions.nEnemies, gameOptions.height, gameOptions.width);
//detectAllEnemies();
setInterval(function(){
  //var enemies = d3.selectAll('image');
  d3.selectAll('image')
    .each(setNewLocation);
}, 2000);

setInterval(detectAllEnemies, 100);
//detectAllEnemies();














