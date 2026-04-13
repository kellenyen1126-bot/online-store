let pencil = 0;
let eraser = 0;
let total = 0;

function addPencil() {
  pencil++;
  total += 10;
  update();
}

function addEraser() {
  eraser++;
  total += 15;
  update();
}

function resetAll() {
  pencil = 0;
  eraser = 0;
  total = 0;
  update();
}

function update() {
  document.getElementById("pencilCount").innerText = pencil;
  document.getElementById("eraserCount").innerText = eraser;
  document.getElementById("total").innerText = total;
}
