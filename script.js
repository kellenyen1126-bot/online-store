let total = 0;

function addPencil() {
  total += 10;

  document.getElementById("total").innerText = total;
}

function addEraser() {
  total += 15;

  document.getElementById("total").innerText = total;
}
