/* Lemmings - robot and GUI script.
 *
 * Copyright 2016 Harmen de Weerd
 * Copyright 2017 Johannes Keyser, James Cooke, George Kachergis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Description of robot(s), and attached sensor(s) used by InstantiateRobot()
RobotInfo = [
  {body: null,  // for MatterJS body, added by InstantiateRobot()
   color: [255, 255, 255],  // color of the robot shape
   init: {x: 50, y: 50, angle: 0},  // initial position and orientation
   mode: 'no mode',
   modeSteps: 0,
   sensors: [  // define an array of sensors on the robot
     // define one sensor
     {sense: senseDistanceBlock,  // function handle, determines type of sensor
      minVal: 0,  // minimum detectable distance, in pixels
      maxVal: 15,  // maximum detectable distance, in pixels
      attachAngle: Math.PI/18,  // where the sensor is mounted on robot body
      lookAngle: -Math.PI/100, // direction the sensor is looking (relative to center-out)
      id: 'distBlock',
      color: [150, 0, 0],  // sensor color [in RGB], to distinguish them
      parent: null,  // robot object the sensor is attached to, added by InstantiateRobot
      value: null  // sensor value, i.e. distance in pixels; updated by sense() function
     },
     // define another sensor
     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
      lookAngle: Math.PI/20, id: 'distWallRight', color: [0, 150, 0], parent: null, value: null
     },
     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
      lookAngle: -Math.PI/15, id: 'distWallLeft', color: [0, 150, 0], parent: null, value: null
     },
     {sense: senseColor, minVal: 0, maxVal: 6, attachAngle: Math.PI/2,
    	 lookAngle: Math.PI*1.30, id: 'color', color: [0, 0, 150], parent: null, value: null
     },
     
   ]
  },
  {body: null,  // for MatterJS body, added by InstantiateRobot()
	   color: [255, 255, 255],  // color of the robot shape
	   init: {x: 50, y: 400, angle: 0},  // initial position and orientation
	   mode: 'no mode',
	   modeSteps: 0,
	   sensors: [  // define an array of sensors on the robot
	     // define one sensor
	     {sense: senseDistanceBlock,  // function handle, determines type of sensor
	      minVal: 0,  // minimum detectable distance, in pixels
	      maxVal: 15,  // maximum detectable distance, in pixels
	      attachAngle: Math.PI/18,  // where the sensor is mounted on robot body
	      lookAngle: -Math.PI/100, // direction the sensor is looking (relative to center-out)
	      id: 'distBlock',
	      color: [150, 0, 0],  // sensor color [in RGB], to distinguish them
	      parent: null,  // robot object the sensor is attached to, added by InstantiateRobot
	      value: null  // sensor value, i.e. distance in pixels; updated by sense() function
	     },
	     // define another sensor
	     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
	      lookAngle: Math.PI/20, id: 'distWallRight', color: [0, 150, 0], parent: null, value: null
	     },
	     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
	      lookAngle: -Math.PI/15, id: 'distWallLeft', color: [0, 150, 0], parent: null, value: null
	     },
	     {sense: senseColor, minVal: 0, maxVal: 6, attachAngle: Math.PI/2,
	    	 lookAngle: Math.PI*1.28, id: 'color', color: [0, 0, 150], parent: null, value: null
	     },
	     
	   ]
	  },
	  {body: null,  // for MatterJS body, added by InstantiateRobot()
		   color: [255, 255, 255],  // color of the robot shape
		   init: {x: 420, y: 200, angle: Math.PI},  // initial position and orientation
		   mode: 'no mode',
		   modeSteps: 0,
		   sensors: [  // define an array of sensors on the robot
		     // define one sensor
		     {sense: senseDistanceBlock,  // function handle, determines type of sensor
		      minVal: 0,  // minimum detectable distance, in pixels
		      maxVal: 15,  // maximum detectable distance, in pixels
		      attachAngle: Math.PI/18,  // where the sensor is mounted on robot body
		      lookAngle: -Math.PI/100, // direction the sensor is looking (relative to center-out)
		      id: 'distBlock',
		      color: [150, 0, 0],  // sensor color [in RGB], to distinguish them
		      parent: null,  // robot object the sensor is attached to, added by InstantiateRobot
		      value: null  // sensor value, i.e. distance in pixels; updated by sense() function
		     },
		     // define another sensor
		     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
		      lookAngle: Math.PI/20, id: 'distWallRight', color: [0, 150, 0], parent: null, value: null
		     },
		     {sense: senseDistanceWall, minVal: 0, maxVal: 40, attachAngle: Math.PI/30,
		      lookAngle: -Math.PI/15, id: 'distWallLeft', color: [0, 150, 0], parent: null, value: null
		     },
		     {sense: senseColor, minVal: 0, maxVal: 6, attachAngle: Math.PI/2,
		    	 lookAngle: Math.PI*1.28, id: 'color', color: [0, 0, 150], parent: null, value: null
		     },
		     
		   ]
		  }
];

// Simulation settings; please change anything that you think makes sense.
simInfo = {
  maxSteps: 100000,  // maximal number of simulation steps to run
  airDrag: 0.1,  // "air" friction of environment; 0 is vacuum, 0.9 is molasses
  boxFric: 0, // friction between boxes during collisions
  boxMass: 0.1,  // mass of boxes
  boxSize: 10,  // size of the boxes, in pixels
  robotSize: 18,  // approximate robot radius, in pixels (note the SVG gets scaled down)
  robotMass: 0.4, // robot mass (a.u)
  gravity: 0,  // constant acceleration in Y-direction
  bayRobot: null,  // currently selected robot
  baySensor: null,  // currently selected sensor
  bayScale: 3,  // scale within 2nd, inset canvas showing robot in it's "bay"
  doContinue: true,  // whether to continue simulation, set in HTML
  debugSensors: true,  // plot sensor rays and mark detected objects
  debugMouse: true,  // allow dragging any object with the mouse
  engine: null,  // MatterJS 2D physics engine
  world: null,  // world object (composite of all objects in MatterJS engine)
  runner: null,  // object for running MatterJS engine
  height: null,  // set in HTML file; height of arena (world canvas), in pixels
  width: null,  // set in HTML file; width of arena (world canvas), in pixels
  curSteps: 0  // increased by simStep()
};

robots = new Array();
sensors = new Array();

function init() {  // called once when loading HTML file
  const robotBay = document.getElementById("bayLemming"),
        arena = document.getElementById("arenaLemming"),
        height = arena.height,
        width = arena.width;
  simInfo.height = height;
  simInfo.width = width;

  /* Create a MatterJS engine and world. */
  simInfo.engine = Matter.Engine.create();
  simInfo.world = simInfo.engine.world;
  simInfo.world.gravity.y = simInfo.gravity;
  simInfo.engine.timing.timeScale = 1;

  /* Create walls and boxes, and add them to the world. */
  // note that "roles" are custom properties for rendering (not from MatterJS)
  function getWall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height,
                                   {isStatic: true, role: 'wall',
                                    color:[150, 150, 150]});
  };
  const wall_lo = getWall(width/2, height-5, width-5, 5),
        wall_hi = getWall(width/2, 5, width-5, 5),
        wall_le = getWall(5, height/2, 5, height-15),
        wall_ri = getWall(width-5, height/2, 5, height-15);
  Matter.World.add(simInfo.world, [wall_lo, wall_hi, wall_le, wall_ri]);
  
  var boxIndex = 0;

  /* Add a bunch of boxes in a neat grid. */
  function getBox(x, y) {
	boxIndex++;
    // flip coin for red vs blue and add rgb
    colFlag = boxIndex % 2;
    if (colFlag == 0){
      color = [0, 0, 200];
    }
    else {
      color = [200, 0, 0];
    }
    box = Matter.Bodies.rectangle(x, y, simInfo.boxSize, simInfo.boxSize,
                                  {frictionAir: simInfo.airDrag,
                                   friction: simInfo.boxFric,
                                   mass: simInfo.boxMass,
                                   role: 'box',
                                   color: color});
    return box;
  };

  const startX = 100, startY = 100,
        nBoxX = 7, nBoxY = 7,
        gapX = 30, gapY = 30,
        stack = Matter.Composites.stack(startX, startY,
                                        nBoxX, nBoxY,
                                        gapX, gapY, getBox);
  Matter.World.add(simInfo.world, stack);

  /* Add debugging mouse control for dragging objects. */
  if (simInfo.debugMouse){
    const mouseConstraint = Matter.MouseConstraint.create(simInfo.engine,
                              {mouse: Matter.Mouse.create(arena),
                               // spring stiffness mouse ~ object
                               constraint: {stiffness: 0.5}});
    Matter.World.add(simInfo.world, mouseConstraint);
  }
  // Add the tracker functions from mouse.js
  addMouseTracker(arena);
  addMouseTracker(robotBay);

  /* Running the MatterJS physics engine (without rendering). */
  simInfo.runner = Matter.Runner.create({fps: 60, isFixed: false});
  Matter.Runner.start(simInfo.runner, simInfo.engine);
  // register function simStep() as callback to MatterJS's engine events
  Matter.Events.on(simInfo.engine, 'tick', simStep);

  /* Create robot(s). */
  setRobotNumber(1);
  loadBay(robots[0]);
};

function convrgb(values) {
  return 'rgb(' + values.join(', ') + ')';
};


function rotate(robot, torque=0) {
   /*
   * Parameters
   *   torque - rotational force to apply to the body.
   *            Try values around +/- 0.005.
   */
  robot.body.torque = torque;
 };

function drive(robot, force=0) {
  /* Apply a force to the robot to move it.
   *
   * Parameters
   *   force - force to apply to the body.
   *           Try values around +/- 0.0005.
   */
  const orientation = robot.body.angle,
        force_vec = Matter.Vector.create(force, 0),
        move_vec = Matter.Vector.rotate(force_vec, orientation);
  Matter.Body.applyForce(robot.body, robot.body.position , move_vec);
};


function senseDistanceBlock() {
  /* Distance sensor simulation based on ray casting. Called from sensor
   * object, returns nothing, updates a new reading into this.value.
   *
   * Idea: Cast a ray with a certain length from the sensor, and check
   *       via collision detection if objects intersect with the ray.
   *       To determine distance, run a Binary search on ray length.
   * Note: Sensor ray needs to ignore robot (parts), or start outside of it.
   *       The latter is easy with the current circular shape of the robots.
   * Note: Order of tests are optimized by starting with max ray length, and
   *       then only testing the maximal number of initially resulting objects.
   * Note: The sensor's "ray" could have any other (convex) shape;
   *       currently it's just a very thin rectangle.
   */

  const context = document.getElementById('arenaLemming').getContext('2d');
  var bodies = Matter.Composite.allBodies(simInfo.engine.world);

  const robotAngle = this.parent.body.angle,
        attachAngle = this.attachAngle,
        rayAngle = robotAngle + attachAngle + this.lookAngle;

  const rPos = this.parent.body.position,
        rSize = simInfo.robotSize,
        startPoint = {x: rPos.x + (rSize+1) * Math.cos(robotAngle + attachAngle),
                      y: rPos.y + (rSize+1) * Math.sin(robotAngle + attachAngle)};

  function getEndpoint(rayLength) {
    return {x: rPos.x + (rSize + rayLength) * Math.cos(rayAngle),
            y: rPos.y + (rSize + rayLength) * Math.sin(rayAngle)};
  };

  function sensorRay(bodies, rayLength) {
    // Cast ray of supplied length and return the bodies that collide with it.
    const rayWidth = 1e-100,
          endPoint = getEndpoint(rayLength);
    rayX = (endPoint.x + startPoint.x) / 2,
    rayY = (endPoint.y + startPoint.y) / 2,
    rayRect = Matter.Bodies.rectangle(rayX, rayY, rayLength, rayWidth,
                                      {isSensor: true, isStatic: true,
                                       angle: rayAngle, role: 'sensor'});

    var collidedBodies = [];
    for (var bb = 0; bb < bodies.length; bb++) {
      var body = bodies[bb];
      // only blocks:
      if (body.role === 'box') {
      	// coarse check on body boundaries, to increase performance:
      	if (Matter.Bounds.overlaps(body.bounds, rayRect.bounds)) {
      		for (var pp = body.parts.length === 1 ? 0 : 1; pp < body.parts.length; pp++) {
      			var part = body.parts[pp];
      			// finer, more costly check on actual geometry:
      			if (Matter.Bounds.overlaps(part.bounds, rayRect.bounds)) {
      				const collision = Matter.SAT.collides(part, rayRect);
      				if (collision.collided) {
      					collidedBodies.push(body);
      					break;
      				}
      			}
      		}
      	}
      }
    }
    return collidedBodies;
  };

  // call 1x with full length, and check all bodies in the world;
  // in subsequent calls, only check the bodies resulting here
  var rayLength = this.maxVal;
  bodies = sensorRay(bodies, rayLength);
  // if some collided, search for maximal ray length without collisions
  if (bodies.length > 0) {
    var lo = 0,
        hi = rayLength;
    while (lo < rayLength) {
      if (sensorRay(bodies, rayLength).length > 0) {
        hi = rayLength;
      }
      else {
        lo = rayLength;
      }
      rayLength = Math.floor(lo + (hi-lo)/2);
    }
  }
  // increase length to (barely) touch closest body (if any)
  rayLength += 1;
  bodies = sensorRay(bodies, rayLength);

  if (simInfo.debugSensors) {  // if invisible, check order of object drawing
    // draw the resulting ray
    endPoint = getEndpoint(rayLength);
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.strokeStyle = this.parent.info.color;
    context.lineWidth = 0.5;
    context.stroke();
    // mark all objects's lines intersecting with the ray
    for (var bb = 0; bb < bodies.length; bb++) {
      var vertices = bodies[bb].vertices;
      context.moveTo(vertices[0].x, vertices[0].y);
      for (var vv = 1; vv < vertices.length; vv += 1) {
        context.lineTo(vertices[vv].x, vertices[vv].y);
      }
      context.closePath();
    }
    context.stroke();
  }

  // indicate if the sensor exceeded its maximum length by returning infinity
  if (rayLength > this.maxVal) {
    rayLength = Infinity;
  }
  else {
    // apply mild noise on the sensor reading, and clamp between valid values
    function gaussNoise(sigma=1) {
      const x0 = 1.0 - Math.random();
      const x1 = 1.0 - Math.random();
      return sigma * Math.sqrt(-2 * Math.log(x0)) * Math.cos(2 * Math.PI * x1);
    };
    rayLength = Math.floor(rayLength + gaussNoise(3));
    rayLength = Matter.Common.clamp(rayLength, this.minVal, this.maxVal);
  }

  this.value = rayLength;
};

function senseDistanceWall() {
  /* Distance sensor simulation based on ray casting. Called from sensor
   * object, returns nothing, updates a new reading into this.value.
   *
   * Idea: Cast a ray with a certain length from the sensor, and check
   *       via collision detection if objects intersect with the ray.
   *       To determine distance, run a Binary search on ray length.
   * Note: Sensor ray needs to ignore robot (parts), or start outside of it.
   *       The latter is easy with the current circular shape of the robots.
   * Note: Order of tests are optimized by starting with max ray length, and
   *       then only testing the maximal number of initially resulting objects.
   * Note: The sensor's "ray" could have any other (convex) shape;
   *       currently it's just a very thin rectangle.
   */

  const context = document.getElementById('arenaLemming').getContext('2d');
  var bodies = Matter.Composite.allBodies(simInfo.engine.world);

  const robotAngle = this.parent.body.angle,
        attachAngle = this.attachAngle,
        rayAngle = robotAngle + attachAngle + this.lookAngle;

  const rPos = this.parent.body.position,
        rSize = simInfo.robotSize,
        startPoint = {x: rPos.x + (rSize+1) * Math.cos(robotAngle + attachAngle),
                      y: rPos.y + (rSize+1) * Math.sin(robotAngle + attachAngle)};

  function getEndpoint(rayLength) {
    return {x: rPos.x + (rSize + rayLength) * Math.cos(rayAngle),
            y: rPos.y + (rSize + rayLength) * Math.sin(rayAngle)};
  };

  function sensorRay(bodies, rayLength) {
    // Cast ray of supplied length and return the bodies that collide with it.
    const rayWidth = 1e-100,
          endPoint = getEndpoint(rayLength);
    rayX = (endPoint.x + startPoint.x) / 2,
    rayY = (endPoint.y + startPoint.y) / 2,
    rayRect = Matter.Bodies.rectangle(rayX, rayY, rayLength, rayWidth,
                                      {isSensor: true, isStatic: true,
                                       angle: rayAngle, role: 'sensor'});

    var collidedBodies = [];
    for (var bb = 0; bb < bodies.length; bb++) {
      var body = bodies[bb];
      // only walls:
      if (body.role === 'wall' || body.role === 'robot') {
      	// coarse check on body boundaries, to increase performance:
      	if (Matter.Bounds.overlaps(body.bounds, rayRect.bounds)) {
      		for (var pp = body.parts.length === 1 ? 0 : 1; pp < body.parts.length; pp++) {
      			var part = body.parts[pp];
      			// finer, more costly check on actual geometry:
      			if (Matter.Bounds.overlaps(part.bounds, rayRect.bounds)) {
      				const collision = Matter.SAT.collides(part, rayRect);
      				if (collision.collided) {
      					collidedBodies.push(body);
      					break;
      				}
      			}
      		}
      	}
      }
    }
    return collidedBodies;
  };

  // call 1x with full length, and check all bodies in the world;
  // in subsequent calls, only check the bodies resulting here
  var rayLength = this.maxVal;
  bodies = sensorRay(bodies, rayLength);
  // if some collided, search for maximal ray length without collisions
  if (bodies.length > 0) {
    var lo = 0,
        hi = rayLength;
    while (lo < rayLength) {
      if (sensorRay(bodies, rayLength).length > 0) {
        hi = rayLength;
      }
      else {
        lo = rayLength;
      }
      rayLength = Math.floor(lo + (hi-lo)/2);
    }
  }
  // increase length to (barely) touch closest body (if any)
  rayLength += 1;
  bodies = sensorRay(bodies, rayLength);

  if (simInfo.debugSensors) {  // if invisible, check order of object drawing
    // draw the resulting ray
    endPoint = getEndpoint(rayLength);
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.strokeStyle = this.parent.info.color;
    context.lineWidth = 0.5;
    context.stroke();
    // mark all objects's lines intersecting with the ray
    for (var bb = 0; bb < bodies.length; bb++) {
      var vertices = bodies[bb].vertices;
      context.moveTo(vertices[0].x, vertices[0].y);
      for (var vv = 1; vv < vertices.length; vv += 1) {
        context.lineTo(vertices[vv].x, vertices[vv].y);
      }
      context.closePath();
    }
    context.stroke();
  }

  // indicate if the sensor exceeded its maximum length by returning infinity
  if (rayLength > this.maxVal) {
    rayLength = Infinity;
  }
  else {
    // apply mild noise on the sensor reading, and clamp between valid values
    function gaussNoise(sigma=1) {
      const x0 = 1.0 - Math.random();
      const x1 = 1.0 - Math.random();
      return sigma * Math.sqrt(-2 * Math.log(x0)) * Math.cos(2 * Math.PI * x1);
    };
    rayLength = Math.floor(rayLength + gaussNoise(3));
    rayLength = Matter.Common.clamp(rayLength, this.minVal, this.maxVal);
  }

  this.value = rayLength;
};

function senseColor() {
  /* Distance sensor simulation based on ray casting. Called from sensor
   * object, returns nothing, updates a new reading into this.value.
   *
   * Idea: Cast a ray with a certain length from the sensor, and check
   *       via collision detection if objects intersect with the ray.
   *       To determine distance, run a Binary search on ray length.
   * Note: Sensor ray needs to ignore robot (parts), or start outside of it.
   *       The latter is easy with the current circular shape of the robots.
   * Note: Order of tests are optimized by starting with max ray length, and
   *       then only testing the maximal number of initially resulting objects.
   * Note: The sensor's "ray" could have any other (convex) shape;
   *       currently it's just a very thin rectangle.
   */

  const context = document.getElementById('arenaLemming').getContext('2d');
  var bodies = Matter.Composite.allBodies(simInfo.engine.world);

  const robotAngle = this.parent.body.angle,
        attachAngle = this.attachAngle,
        rayAngle = robotAngle + attachAngle + this.lookAngle;

  const rPos = this.parent.body.position,
        rSize = simInfo.robotSize,
        startPoint = {x: rPos.x + (rSize+1) * Math.cos(robotAngle + attachAngle),
                      y: rPos.y + (rSize+1) * Math.sin(robotAngle + attachAngle)};

  function getEndpoint(rayLength) {
    return {x: rPos.x + (rSize + rayLength) * Math.cos(rayAngle),
            y: rPos.y + (rSize + rayLength) * Math.sin(rayAngle)};
  };

  function sensorRay(bodies, rayLength) {
    // Cast ray of supplied length and return the bodies that collide with it.
    const rayWidth = 1e-100,
          endPoint = getEndpoint(rayLength);
    rayX = (endPoint.x + startPoint.x) / 2,
    rayY = (endPoint.y + startPoint.y) / 2,
    rayRect = Matter.Bodies.rectangle(rayX, rayY, rayLength, rayWidth,
                                      {isSensor: true, isStatic: true,
                                       angle: rayAngle, role: 'sensor'});

    var collidedBodies = [];
    for (var bb = 0; bb < bodies.length; bb++) {
      var body = bodies[bb];
      // only blocks:
      if (body.role == 'box') {
      	// coarse check on body boundaries, to increase performance:
      	if (Matter.Bounds.overlaps(body.bounds, rayRect.bounds)) {
      		for (var pp = body.parts.length === 1 ? 0 : 1; pp < body.parts.length; pp++) {
      			var part = body.parts[pp];
      			// finer, more costly check on actual geometry:
      			if (Matter.Bounds.overlaps(part.bounds, rayRect.bounds)) {
      				const collision = Matter.SAT.collides(part, rayRect);
      				if (collision.collided) {
      					collidedBodies.push(body);
      					break;
      				}
      			}
      		}
      	}
      }
    }
    return collidedBodies;
  };

  // call 1x with full length, and check all bodies in the world;
  // in subsequent calls, only check the bodies resulting here
  var rayLength = this.maxVal;
  bodies = sensorRay(bodies, rayLength);
  // if some collided, search for maximal ray length without collisions
  if (bodies.length > 0) {
    var lo = 0,
        hi = rayLength;
    while (lo < rayLength) {
      if (sensorRay(bodies, rayLength).length > 0) {
        hi = rayLength;
      }
      else {
        lo = rayLength;
      }
      rayLength = Math.floor(lo + (hi-lo)/2);
    }
  }
  // increase length to (barely) touch closest body (if any)
  rayLength += 1;
  bodies = sensorRay(bodies, rayLength);
  
  var colorValue = [1, 2, 3];
  for (var bb = 0; bb < bodies.length; bb++) {
	  if (bodies[bb].role == 'box') {
		  for (c = 0; c < colorValue.length; c++) {
			  colorValue[c] = bodies[bb].color[c];  
		  }
		  break;
	  }	  
  }

  if (simInfo.debugSensors) {  // if invisible, check order of object drawing
    // draw the resulting ray
    endPoint = getEndpoint(rayLength);
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.strokeStyle = this.parent.info.color;
    context.lineWidth = 0.5;
    context.stroke();
    // mark all objects's lines intersecting with the ray
    for (var bb = 0; bb < bodies.length; bb++) {
      var vertices = bodies[bb].vertices;
      context.moveTo(vertices[0].x, vertices[0].y);
      for (var vv = 1; vv < vertices.length; vv += 1) {
        context.lineTo(vertices[vv].x, vertices[vv].y);
      }
      context.closePath();
    }
    context.stroke();
  }

  // indicate if the sensor exceeded its maximum length by returning infinity
  if (colorValue[0] == 1) {
    colorValue = Infinity;
  } else {
	  function gaussNoise(sigma=1) {
	      const x0 = 1.0 - Math.random();
	      const x1 = 1.0 - Math.random();
	      return sigma * Math.sqrt(-2 * Math.log(x0)) * Math.cos(2 * Math.PI * x1);
	  };
	  for (var c = 0; c < colorValue.length; c++) {
		  colorValue[c] = colorValue[c] + gaussNoise(6);
		  colorValue[c] = Math.round(colorValue[c], 2);
	  }	  
  }
  this.value = colorValue;
};

function dragSensor(sensor, event) {
  const robotBay = document.getElementById('bayLemming'),
        bCenter = {x: robotBay.width/2,
                   y: robotBay.height/2},
        rSize = simInfo.robotSize,
        bScale = simInfo.bayScale,
        sSize = sensor.getWidth(),
        mAngle = Math.atan2(  event.mouse.x - bCenter.x,
                            -(event.mouse.y - bCenter.y));
  sensor.info.attachAngle = mAngle;
  sensor.x = bCenter.x - sSize - bScale * rSize * Math.sin(-mAngle);
  sensor.y = bCenter.y - sSize - bScale * rSize * Math.cos( mAngle);
  repaintBay();
}

function loadSensor(sensor, event) {
  loadSensorInfo(sensor.sensor);
}

function loadSensorInfo(sensorInfo) {
  simInfo.baySensor = sensorInfo;
}

function loadBay(robot) {
  simInfo.bayRobot = robot;
  sensors = new Array();
  const robotBay = document.getElementById("bayLemming");
  const bCenter = {x: robotBay.width/2,
                   y: robotBay.height/2},
        rSize = simInfo.robotSize,
        bScale = simInfo.bayScale;

  for (var ss = 0; ss < robot.info.sensors.length; ++ss) {
    const curSensor = robot.sensors[ss],
          attachAngle = curSensor.attachAngle;
    // put current sensor into global variable, make mouse-interactive
    sensors[ss] = makeInteractiveElement(new SensorGraphics(curSensor),
                                         document.getElementById("bayLemming"));
    const sSize = sensors[ss].getWidth();
    sensors[ss].x = bCenter.x - sSize - bScale * rSize * Math.sin(-attachAngle);
    sensors[ss].y = bCenter.y - sSize - bScale * rSize * Math.cos( attachAngle);
    sensors[ss].onDragging = dragSensor;
    sensors[ss].onDrag = loadSensor;
  }
  repaintBay();
}

function SensorGraphics(sensorInfo) {
  this.info = sensorInfo;
  this.plotSensor = plotSensor;
  // add functions getWidth/getHeight for graphics.js & mouse.js,
  // to enable dragging the sensor in the robot bay
  this.getWidth = function() { return 6; };
  this.getHeight = function() { return 6; };
}

function loadFromSVG() {
  var vertexSets = [];
  const svg = document.getElementById('robotbodySVG'),
        data = svg.contentDocument;

  jQuery(data).find('path').each(function(_, path) {
    var points = Matter.Svg.pathToVertices(path, 30);
    vertexSets.push(Matter.Vertices.scale(points, 0.2, 0.2));
  });

  return vertexSets;
};

function InstantiateRobot(robotInfo) {
  // load robot's body shape from SVG file
  const bodySVGpoints = loadFromSVG();
  this.body = Matter.Bodies.fromVertices(robotInfo.init.x,
                                         robotInfo.init.y,
                                         bodySVGpoints,
                                         {frictionAir: simInfo.airDrag,
                                          mass: simInfo.robotMass,
                                          color: [255, 255, 255],
                                          role: 'robot'}, true);

  Matter.World.add(simInfo.world, this.body);
  Matter.Body.setAngle(this.body, robotInfo.init.angle);

  // instantiate its sensors
  this.sensors = robotInfo.sensors;
  for (var ss = 0; ss < this.sensors.length; ++ss) {
    this.sensors[ss].parent = this;
  }

  // attach its helper functions
  this.rotate = rotate;
  this.drive = drive;
  this.info = robotInfo;
  this.plotRobot = plotRobot;

  // add functions getWidth/getHeight for graphics.js & mouse.js,
  // to enable selection by clicking the robot in the arena
  this.getWidth = function() { return 2 * simInfo.robotSize; };
  this.getHeight = function() { return 2 * simInfo.robotSize; };
}

function robotUpdateSensors(robot) {
  // update all sensors of robot; puts new values into sensor.value
  for (var ss = 0; ss < robot.sensors.length; ss++) {
    robot.sensors[ss].sense();
  }
};

function getSensorValById(robot, id) {
  for (var ss = 0; ss < robot.sensors.length; ss++) {
    if (robot.sensors[ss].id == id) {
      return robot.sensors[ss].value;
    }
  }
  return undefined;  // if not returned yet, id doesn't exist
};

function robotMove(robot) {
  const distBlock = getSensorValById(robot, 'distBlock'),
        distWallLeft = getSensorValById(robot, 'distWallLeft'),
        distWallRight = getSensorValById(robot, 'distWallRight');
        color = getSensorValById(robot, 'color');
  
  const	seeWall = distWallLeft != Infinity || distWallRight != Infinity,
  		seeBlock = distBlock != Infinity,
  		haveBlueBlock = color[2] > color[0],
  		haveRedBlock = color[0] > color[2];
  
  
  if (robot.info.mode === 'no mode') {
	  if (seeWall) {
		  if (haveBlueBlock) {
			  robot.info.mode = 'turn left';
		  } else if (haveRedBlock) {
			  robot.info.mode = 'turn right';
		  } else {
			  robot.info.mode = 'turn right';
		  }
	  } else if (seeBlock) {
		  if (haveBlueBlock) {
			  robot.info.mode = 'wander';
		  } else if (haveRedBlock) {
			  robot.info.mode = 'turn left';
		  } else {
			  robot.info.mode = 'move forward';
		  }
	  } else {
		  robot.info.mode = 'wander';
	  }
	  
	  robot.info.modeSteps = simInfo.curSteps;
  } 
  
  var noiseForce = (Math.random() * (0.00002 + 0.00002)) - 0.00002;
  var noiseTorque = (Math.random() * (0.000008 + 0.000008)) - 0.000008;
  
  console.log(noiseForce, noiseTorque);
  
  if (robot.info.mode === 'wander') {
	  wander(robot, noiseForce, noiseTorque);
  } else if (robot.info.mode === 'turn left') {
	  turnLeft(robot, simInfo.curSteps, robot.info.modeSteps, noiseForce, noiseTorque);
  } else if (robot.info.mode === 'turn right') {
	  turnRight(robot, simInfo.curSteps, robot.info.modeSteps, noiseForce, noiseTorque);
  } else if (robot.info.mode === 'move forward') {
	  moveForward(robot, simInfo.curSteps, robot.info.modeSteps, noiseForce);
  }
};

function wander(robot, noiseForce, noiseTorque) {
	robot.drive(robot, 0.0002 + noiseForce);
	robot.rotate(robot, +0.00003 + noiseTorque);
	
	robot.info.mode = 'no mode';
}

function turnLeft(robot, currentSteps, modeSteps, noiseForce, noiseTorque) {
	if (currentSteps < (modeSteps + 19)) {
		robot.drive(robot, -0.0001 + noiseForce);
		robot.rotate(robot, -0.001 + noiseTorque);
	} else {
		robot.info.mode = 'no mode';
	}
}

function turnRight(robot, currentSteps, modeSteps, noiseForce, noiseTorque) {
	if (currentSteps < (modeSteps + 19)) {
		robot.drive(robot, 0.00006 + noiseForce);
		robot.rotate(robot, +0.001 + noiseTorque);
	} else {
		robot.info.mode = 'no mode';
	}
}

function moveForward(robot, currentSteps, modeSteps, noiseForce) {
	if (currentSteps < (modeSteps + 10 + RobotInfo.length * 2)) {
		robot.drive(robot, 0.0003 + noiseForce);
	} else {
		robot.info.mode = 'no mode';
	}
}

function plotSensor(context, x = this.x, y = this.y) {
  context.beginPath();
  context.arc(x + this.getWidth()/2,
              y + this.getHeight()/2,
              this.getWidth()/2, 0, 2*Math.PI);
  context.closePath();
  context.fillStyle = 'black';
  context.strokeStyle = 'black';
  context.fill();
  context.stroke();
}

function plotRobot(context,
                   xTopLeft = this.body.position.x,
                   yTopLeft = this.body.position.y) {
  var x, y, scale, angle, i, half, full,
      rSize = simInfo.robotSize;
  const showInternalEdges = false;

  if (context.canvas.id == "bayLemming") {
    scale = simInfo.bayScale;
    half = Math.floor(rSize/2*scale);
    full = half * 2;
    x = xTopLeft + full;
    y = yTopLeft + full;
    angle = -Math.PI / 2;
  } else {
    scale = 1;
    half = Math.floor(rSize/2*scale);
    full = half * 2;
    x = xTopLeft;
    y = yTopLeft;
    angle = this.body.angle;
  }
  context.save();
  context.translate(x, y);
  context.rotate(angle);

  if (context.canvas.id == "arenaLemming") {
    // draw into world canvas without transformations,
    // because MatterJS thinks in world coords...
    context.restore();

    const body = this.body;
    // handle compound parts

    context.beginPath();
    for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
      part = body.parts[k];
      context.moveTo(part.vertices[0].x,
                     part.vertices[0].y);
      for (j = 1; j < part.vertices.length; j++) {
        if (!part.vertices[j - 1].isInternal || showInternalEdges) {
          context.lineTo(part.vertices[j].x,
                         part.vertices[j].y);
        } else {
          context.moveTo(part.vertices[j].x,
                         part.vertices[j].y);
        }

        if (part.vertices[j].isInternal && !showInternalEdges) {
          context.moveTo(part.vertices[(j + 1) % part.vertices.length].x,
                         part.vertices[(j + 1) % part.vertices.length].y);
        }
      }
      context.lineTo(part.vertices[0].x,
                     part.vertices[0].y);
    }
    context.strokeStyle = convrgb(body.color);
    context.lineWidth = 1.5;
    context.stroke();

    // to draw the rest, rotate & translate again
    context.save();
    context.translate(x, y);
    context.rotate(angle);
  }

  // Plot sensor positions into world canvas.
  if (context.canvas.id == "arenaLemming") {
    for (ss = 0; ss < this.info.sensors.length; ++ss) {
      context.beginPath();
      context.arc(full * Math.cos(this.info.sensors[ss].attachAngle),
                  full * Math.sin(this.info.sensors[ss].attachAngle),
                  scale, 0, 2*Math.PI);
      context.closePath();
      context.fillStyle = 'black';
      context.strokeStyle = 'black';
      context.fill();
      context.stroke();
    }
  }
  context.restore();
}

function simStep() {
  // advance simulation by one step (except MatterJS engine's physics)
  if (simInfo.curSteps < simInfo.maxSteps) {
    repaintBay();
    drawBoard();
    for (var rr = 0; rr < robots.length; ++rr) {
      robotUpdateSensors(robots[rr]);
      robotMove(robots[rr]);
      // To enable selection by clicking (via mouse.js/graphics.js),
      // the position on the canvas needs to be defined in (x, y):
      const rSize = simInfo.robotSize;
      robots[rr].x = robots[rr].body.position.x - rSize;
      robots[rr].y = robots[rr].body.position.y - rSize;
    }
    // count and display number of steps
    simInfo.curSteps += 1;
    document.getElementById("SimStepLabel").innerHTML =
      padnumber(simInfo.curSteps, 5) +
      ' of ' +
      padnumber(simInfo.maxSteps, 5);
  }
  else {
    toggleSimulation();
  }
}

function drawBoard() {
  var context = document.getElementById('arenaLemming').getContext('2d');
  context.fillStyle = "#444444";
  context.fillRect(0, 0, simInfo.width, simInfo.height);

  // draw objects within world
  const Composite = Matter.Composite,
        bodies = Composite.allBodies(simInfo.world);

  for (var bb = 0; bb < bodies.length; bb += 1) {
    var vertices = bodies[bb].vertices,
        vv;

    // draw all non-robot bodies here (walls and boxes)
    // don't draw robot's bodies here; they're drawn in plotRobot()
    if (bodies[bb].role != 'robot') {
      context.beginPath();
      context.moveTo(vertices[0].x, vertices[0].y);
      for (vv = 1; vv < vertices.length; vv += 1) {
        context.lineTo(vertices[vv].x, vertices[vv].y);
      }
      if (bodies[bb].color) {
        context.strokeStyle = convrgb(bodies[bb].color);
        context.closePath();
        context.stroke();
      }
    }
  }
  context.lineWidth = 1;

  // draw all robots
  for (var rr = 0; rr < robots.length; ++rr) {
    robots[rr].plotRobot(context);
  }
}

function repaintBay() {
  // update inset canvas showing information about selected robot
  const robotBay = document.getElementById('bayLemming'),
        context = robotBay.getContext('2d');
  context.clearRect(0, 0, robotBay.width, robotBay.height);
  simInfo.bayRobot.plotRobot(context, 10, 10);
  for (var ss = 0; ss < sensors.length; ss++) {
    sensors[ss].plotSensor(context);
  }

  // print sensor values of selected robot next to canvas
  if (!(simInfo.curSteps % 5)) {  // update slow enough to read
    var sensorString = '';
    const rsensors = simInfo.bayRobot.sensors;
    for (ss = 0; ss < rsensors.length; ss++) {
      sensorString += '<br> id \'' + rsensors[ss].id + '\': ' +
        padnumber(rsensors[ss].value, 2);
    }
    document.getElementById('SensorLabel').innerHTML = sensorString;
  }
}

function setRobotNumber(newValue) {
  var n;
  while (robots.length > newValue) {
    n = robots.length - 1;
    Matter.World.remove(simInfo.world, robots[n].body);
    robots[n] = null;
    robots.length = n;
  }

  while (robots.length < newValue) {
    if (newValue > RobotInfo.length) {
      console.warn('You request '+newValue+' robots, but only ' + RobotInfo.length +
                   ' are defined in RobotInfo!');
      toggleSimulation();
      return;
    }
    n = robots.length;
    robots[n] = makeInteractiveElement(new InstantiateRobot(RobotInfo[n]),
                                       document.getElementById("arenaLemming"));

    robots[n].onDrop = function(robot, event) {
      robot.isDragged = false;
    };

    robots[n].onDrag = function(robot, event) {
      	robot.isDragged = true;
        loadBay(robot);
        return true;
    };
  }
}


function padnumber(number, size) {
  if (number == Infinity) {
    return 'inf';
  }
  const s = "000000" + number;
  return s.substr(s.length - size);
}

function format(number) {
  // prevent HTML elements to jump around at sign flips etc
  return (number >= 0 ? '+' : '−') + Math.abs(number).toFixed(1);
}

function toggleSimulation() {
  simInfo.doContinue = !simInfo.doContinue;
  if (simInfo.doContinue) {
    Matter.Runner.start(simInfo.runner, simInfo.engine);
  }
  else {
    Matter.Runner.stop(simInfo.runner);
  }
}

