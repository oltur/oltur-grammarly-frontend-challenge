import {
  solve
} from "./solver";
import {
  times
} from "./data";

window.go = () => {

  drawBuilding();

  // reverse the times matrix bottom-to-top
  times.reverse();

  const res = solve(
    times, {
      floor: window.currentFloor.value,
      room: window.currentRoom.value
    }, {
      floor: window.nextFloor.value,
      room: window.nextRoom.value
    }
  )

  console.log(JSON.stringify(res));

  // reverse the times matrix bottom-to-top
  //times.reverse();
  drawBuilding(res);

  window.currentFloor.value = window.nextFloor.value
  window.currentRoom.value = window.nextRoom.value

  function drawBuilding(path) {
    const margin = 20;
    const building = document.getElementById("building");
    var ctx = building.getContext("2d");
    const floors = times.length;
    const rooms = times[0].length;
    const floorSize = building.height / floors;
    const roomSize = building.width / rooms;

    ctx.clearRect(0, 0, building.width, building.height);

    // draw background
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    for (let i = 0; i < floors; i++) {
      for (let j = 0; j < rooms; j++) {
        const value = times[i][j];
        if (value) {
          const x1 = (roomSize * j) + margin;
          const y1 = (floorSize * i) + margin;
          const x2 = (roomSize * (j + 1)) - margin;
          const y2 = (floorSize * (i + 1)) - margin;
          const cx = (x1 + (roomSize - 2 * margin) / 2);
          const cy = (y1 + (floorSize - 2 * margin) / 2);

          ctx.rect(x1, y1, x2 - x1, y2 - y1);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx, y1);
          ctx.lineTo(cx, y2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x1, cy);
          ctx.lineTo(x2, cy);
          ctx.stroke();

          ctx.font = "16px Arial";
          ctx.fillText(value, cx + 10, cy - 10);
        }
      }
    }

    // draw path
    if (path && path.length) {
      let app = path[0];

      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 5;

      ctx.beginPath();
      const x1 = (roomSize * app.room) + margin;
      const y1 = (floorSize * app.floor) + margin;
      const x2 = (roomSize * (app.room + 1)) - margin;
      const y2 = (floorSize * (app.floor + 1)) - margin;
      const cx = (x1 + (roomSize - 2 * margin) / 2);
      const cy = (y1 + (floorSize - 2 * margin) / 2);
      ctx.moveTo(cx, cy);

      for (let i = 1; i < path.length; i++) {
        app = path[i];
        const x1 = (roomSize * app.room) + margin;
        const y1 = (floorSize * app.floor) + margin;
        const x2 = (roomSize * (app.room + 1)) - margin;
        const y2 = (floorSize * (app.floor + 1)) - margin;
        const cx = (x1 + (roomSize - 2 * margin) / 2);
        const cy = (y1 + (floorSize - 2 * margin) / 2);
        ctx.lineTo(cx, cy);

      }
      ctx.stroke();
    }
  }
};