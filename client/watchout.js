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

var startScore = true;

var createBoardWithEnemies = function(nEnemies, boardHeight, boardWidth) {
  // Create board.
  var svg = d3.select("body").append("svg")
    .attr("class", "board");

  // Add 30 enemies to board at random locations.
  for (var i = 0; i < nEnemies; i++) {
    var enemy = d3.select("svg").append("image")
      .attr("class", "enemies")
      .attr("xlink:href", "asteroid.png")
      .attr("r", 10)
      .attr("height", 20)
      .attr("width", 20)
      /*.attr('class', 'image')*/
      .attr("x", Math.random() * boardHeight)
      .attr("y", Math.random() * boardWidth);
/*      .attr('animation-name', 'spin')
      .attr('animation-duration', 4000)
      .attr('animation-iteration-count', 'infinte')
      .attr('animation-timing-function', 'linear');*/
  }
  createPlayer();


  detectAllEnemies();
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
    // console.log('Collision detected');
    // d3.select("svg").attr('class', 'collision');
    if (gameStats.highScore < gameStats.currentScore) {
      gameStats.highScore = gameStats.currentScore;
      d3.select("#high").text(gameStats.currentScore);
    }
    d3.select('circle').attr('fill', 'green');
    gameStats.collisions++;
    d3.select("#col").text(gameStats.collisions);
    d3.select("#currentscore").text(0);
    gameStats.currentScore = 0;
    d3.select('svg').remove();
    //clearInterval(startScore);
    d3.select('body').append('div')
      .attr('class', 'asteroid');
/*      .attr('xlink:href', 'asteroid-impact.jpg')
      .attr('height', 700)
      .attr('width', 700)*/
      //.text('YOU GOT HIT!');
    setTimeout(function() {
      d3.select('.asteroid').remove();
      d3.select("#currentscore").text(gameStats.currentScore);
      createBoardWithEnemies(gameOptions.nEnemies, gameOptions.height, gameOptions.width);
    }, 1000)

  }

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

var startScore = setInterval(function(){
    gameStats.currentScore++;
    d3.select("#currentscore").text(gameStats.currentScore);
  }, 1000);


setInterval(function(){
  //var enemies = d3.selectAll('image');
  d3.selectAll('image')
    .each(setNewLocation);
}, 2000);

setInterval(detectAllEnemies, 100);
//detectAllEnemies();













