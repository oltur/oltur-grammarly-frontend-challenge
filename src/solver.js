/**
 * Find a shortes path appom start to end
 * 
 * @param times number[][] - A matrix specifying the time it takes
 * for the lift to pass through an apartment.
 * times[i][j] equals 0 means that there is no way through that apartment [i,j].
 *
 * @param start {floor: number, room: number}
 * @param end {floor: number, room: number}
 * 
 * @returns {floor: number, room: number}[] - shortest path appom `start` to `end`
 */
export function solve(times, start, end) {

  // console that can be switched off
  var myconsole = console;
  // myconsole = {log:function() {}, table:function() {}}; 
  
  normalizeApp(start);
  normalizeApp(end);

  myconsole.log('Starting from ' + start.floor + ', ' + start.room + '.')
  myconsole.log('To be finished at ' + end.floor + ', ' + end.room + '.')
  myconsole.log('Field:');
  myconsole.table(times);

  //return [{ floor: 0, room: 0 }, { floor: 1, room: 1 }]
  
  var result = [];

  const height = times.length;
  const width = times[0].length;
  const visited = [];
  const path = [];
  path.push(start);
  var minLength = Number.MAX_SAFE_INTEGER;
  var minPath = [];

  for (let i = 0; i < height; i++) {
    var row = new Array(width);
    row.fill(0);
    visited.push(row);
  }

  visited[start.floor][start.room] = 1;

  let currentLength = 0;
  let currentApp = start;

  trySteps();

  myconsole.log("Last Min Length: " + minLength);
  myconsole.log("Min Path: " + JSON.stringify(minPath));

  return minLength === Number.MAX_SAFE_INTEGER ? {} : minPath;


  function trySteps(level) {
    level = level ? level : 0;

    step(getTopApp(), level);
    step(getRightApp(), level);
    step(getBottomApp(), level);
    step(getLeftApp(), level);
  }

  function cloneApp(app) {
    var copy = Object.assign({}, app);
    return copy;
  }

  function cloneArray(array) {
    return array.slice(0);
  };

  function step(nextApp, level) {
    level = level ? level : 0;

    if (!nextApp)
      return;

    var nextAppTime = getAppTime(nextApp);
    myconsole.log(Array(level).join(".") + 'Going to ' + nextApp.floor + ', ' + nextApp.room + '. Value: ' + nextAppTime + '. Field: ');
    myconsole.table(visited);

    if (nextAppTime > 0 && !visited[nextApp.floor][nextApp.room]) {

      var oldLength = currentLength;
      var oldApp = currentApp;

      currentLength = oldLength + nextAppTime;
      visited[nextApp.floor][nextApp.room] = 1;
      currentApp = nextApp;
      path.push(nextApp);

      if (nextApp.floor === end.floor && nextApp.room === end.room) {
        myconsole.log("Reached the end with length " + currentLength);
        if (currentLength < minLength) {
          myconsole.log("Next Min Length: " + currentLength);
          myconsole.log("Min Path: " + JSON.stringify(path));
          minPath = cloneArray(path);
          minLength = currentLength;
        }
      } else {
        trySteps(level + 1);
      }

      visited[nextApp.floor][nextApp.room] = 0;
      currentLength = oldLength;
      currentApp = oldApp;
      path.pop();

    } else {
      return;
    }
  }

  function getAppTime(app) {
    return times[app.floor][app.room];
  }

  function getLeftApp(app) {
    app = app || currentApp;
    return app.room > 0 ? getApp(app.floor, app.room - 1) : null
  }

  function getRightApp(app) {
    app = app || currentApp;
    return app.room < width - 1 ? getApp(app.floor, app.room + 1) : null
  }

  function getBottomApp(app) {
    app = app || currentApp;
    return app.floor > 0 ? getApp(app.floor - 1, app.room) : null
  }

  function getTopApp(app) {
    app = app || currentApp;
    return app.floor < height - 1 ? getApp(app.floor + 1, app.room) : null
  }

  function getApp(floor, room) {
    return {
      floor,
      room
    };
  }

  function getFloor(app) {
    return app.floor;
  }

  function getRoom(app) {
    return app.room;
  }

  function normalizeApp(app) {
    app.room = parseInt(app.room);
    app.floor = parseInt(app.floor);
  }

}

window.solve = solve