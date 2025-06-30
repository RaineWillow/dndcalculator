let baseStats = [8, 8, 8, 8, 8, 8];

let setStats = [0, 0, 0, 0, 0, 0];

let stats = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

let maxPoints = 40;
let usedPoints = 0;

let maxPointsBox = document.getElementById("MaxPoints");
let maxPointsDisplay = document.getElementById("MaxPointsDisplay");
let remainingPointsDisplay = document.getElementById("pointsRemaining");

maxPointsBox.value=maxPoints;
maxPointsDisplay.innerText=maxPoints.toString();
remainingPointsDisplay.innerText = (maxPoints-usedPoints).toString();

let set17 = -1;



for (let i = 0; i < stats.length; i++) {
  let currentStat = document.getElementById(stats[i] + "Value");
  currentStat.innerText = (baseStats[i]+setStats[i]).toString().padStart(2, "\u00A0");
}

function updateMax() {
  maxPoints = maxPointsBox.value;

  maxPointsDisplay.innerText=maxPoints.toString();

  usedPoints = 0;

  for (let i = 0; i < setStats.length; i++) {
    setStats[i] = 0;
  }

  remainingPointsDisplay.innerText = (maxPoints-usedPoints).toString();
  for (let i = 0; i < stats.length; i++) {
    let currentStat = document.getElementById(stats[i] + "Value");
    currentStat.innerText = (baseStats[i]+setStats[i]).toString().padStart(2, "\u00A0");
  }

  set17 = -1;
}

function reset() {
  maxPointsDisplay.innerText=maxPoints.toString();

  usedPoints = 0;

  for (let i = 0; i < setStats.length; i++) {
    setStats[i] = 0;
  }

  remainingPointsDisplay.innerText = (maxPoints-usedPoints).toString();
  for (let i = 0; i < stats.length; i++) {
    let currentStat = document.getElementById(stats[i] + "Value");
    currentStat.innerText = (baseStats[i]+setStats[i]).toString().padStart(2, "\u00A0");
  }

  set17=-1;
}


function inc(i) {
  const cur = baseStats[i] + setStats[i];

  if (cur >= 15) return;
  if (set17===i) return;
  const stepCost = (cur + 1) - 8;

  if (usedPoints + stepCost > maxPoints) return;

  setStats[i] += 1;
  usedPoints   += stepCost;

  document.getElementById(stats[i] + "Value").innerText = (cur + 1).toString().padStart(2, "\u00A0");
  remainingPointsDisplay.innerText = (maxPoints-usedPoints).toString();
}


function dec(i) {
  const cur = baseStats[i] + setStats[i];
  if (cur <= baseStats[i]) return;
  if (set17===i) return;

  const refund = cur - 8;
  setStats[i] -= 1;
  usedPoints  -= refund;

  if (usedPoints < 0) usedPoints = 0;
  document.getElementById(stats[i] + "Value").innerText = (cur - 1).toString().padStart(2, "\u00A0");
  remainingPointsDisplay.innerText = (maxPoints-usedPoints).toString();
}

function setSeventeen(i) {
  const cur = baseStats[i] + setStats[i];

  const refund = (setStats[i]*(setStats[i]+1))/2;
  setStats[i] = 0;
  usedPoints-=refund;

  if (usedPoints < 0) usedPoints = 0;

  if (set17 != i && set17 != -1) {
    const resetCur = baseStats[set17] + setStats[set17];

    const refund = (setStats[set17]*(setStats[set17]+1))/2;
    setStats[set17] = 0;
    usedPoints -= refund;
    if (usedPoints < 0) usedPoints = 0;

    document.getElementById(stats[set17] + "Value").innerText = (resetCur).toString().padStart(2, "\u00A0");
  }

  set17 = i;

  document.getElementById(stats[i] + "Value").innerText = (17).toString().padStart(2, "\u00A0");
  remainingPointsDisplay.innerText = (maxPoints - usedPoints).toString();
}