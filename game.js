var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var spaceship =
{
    color: "white",
    width: 8,
    height: 22,
    thrust: 0.1,
    position:
    {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    angle: 0,
  velocity: {
    x: 0,
    y: 0
  },
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
}


function drawSpaceship()
{
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();
    
    if(spaceship.engineOn)
    {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}

var gravity = 0.01;

function updateSpaceship()
{
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y += spaceship.velocity.y;
    
    if(spaceship.rotatingRight)
    {
        spaceship.angle += Math.PI / 90;
    }
    else if(spaceship.rotatingLeft)
    {
        spaceship.angle -= Math.PI / 90;
    }

    if(spaceship.engineOn)
    {
        spaceship.velocity.x -= spaceship.thrust * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= spaceship.thrust * Math.cos(spaceship.angle);
    }
    
    spaceship.velocity.y += gravity;
}

function keyPressed(event)
{
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = true;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = true;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = true;
            break;
    }
}

function keyLetGo(event)
{
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);
document.addEventListener('keydown', keyPressed);

var stars = [];
for (var i = 0; i < 500; i++) {
    stars[i] = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random()*0.05
    };
  }

  function drawStars() 
{
  context.save();
  context.fillStyle = "#111"
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    if (star.decreasing == true)
    {
      star.alpha -=star.dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += star.dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }
    context.fill();
  }
  context.restore();
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateSpaceship();
    drawStars();
    drawSpaceship();
    //console.log(spaceship.velocity, spaceship.position);
    
    requestAnimationFrame(draw);
    
}

draw();