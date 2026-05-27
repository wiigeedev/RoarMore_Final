console.log("program-page.js loaded");
// array nanaghohold ng mga acronym para sa pindutan or yung switcher
const deptNames = ["DIT", "DIET", "DCEEE", "DAFE", "DCEA"];

const deptProgramTabs = [
  ["tab6", "tab7"], // DIT -> BSIT BSCS
  ["tab10", "tab15", "tab16", "tab17"], // DIET -> BSIE, BSINDT-ET, BSINDT-AT, BSINDT-EX
  ["tab8", "tab9", "tab13"], // DCEEE -> BSECE, BSEE, BSCpE
  ["tab11"], // DAFE -> BSABE
  ["tab12", "tab14"], // DCEA -> BSARCH, BSCE
];

const deptDescProgramTabs = [
  ["tab22", "tab23"], // DIT -> IT, CS
  ["tab26", "tab31", "tab32", "tab33"], // DIET -> IndustrialEngi, ElectricalTechnology, AutomotiveTechnology, ElectronicsTechnology
  ["tab24", "tab25", "tab29"], // DCEEE -> ElectronicsEngi, ElectricalEngi, ComputerEngi
  ["tab27"], // DAFE -> AgriBioEngi
  ["tab28", "tab30"], // DCEA -> ARCH, CivilEngineering
];
let current = 0;

const deptTitle = document.getElementById("departmentAcronym");
const nextBtn = document.getElementById("nextDept");
const prevBtn = document.getElementById("prevDept");

function updateDepartment() {

  deptTitle.textContent = deptNames[current];


  const allowedTopTabs = new Set(deptDescProgramTabs[current]);

  for (let i = 22; i <= 33; i++) {

    const id = `tab${i}`;

    const input = document.getElementById(id);

    const label = document.querySelector(
      `#DescProgramTabs label[for="${id}"]`
    );

    const allowed = allowedTopTabs.has(id);

    if (input) {
      input.disabled = !allowed;
    }

    if (label) {
      label.style.display = allowed ? "inline-block" : "none";
    }
  }

  const firstTopTab = deptDescProgramTabs[current][0];

  const firstTopInput = document.getElementById(firstTopTab);

  if (firstTopInput) {
    firstTopInput.checked = true;
  }



  const allowedProgramTabs = new Set(deptProgramTabs[current]);

  for (let i = 6; i <= 17; i++) {

    const id = `tab${i}`;

    const input = document.getElementById(id);

    const label = document.querySelector(
      `#staffProgramTabs label[for="${id}"]`
    );

    const allowed = allowedProgramTabs.has(id);

    if (input) {
      input.disabled = !allowed;
    }

    if (label) {
      label.style.display = allowed ? "inline-block" : "none";
    }
  }

  const firstProgramTab = deptProgramTabs[current][0];
  const firstProgramInput = document.getElementById(firstProgramTab);
  if (firstProgramInput) {
    firstProgramInput.checked = true;
  }
}


nextBtn.addEventListener("click", () => {

  current++;

  if (current >= deptNames.length) {
    current = 0;
  }

  updateDepartment();
});


prevBtn.addEventListener("click", () => {

  current--;

  if (current < 0) {
    current = deptNames.length - 1;
  }

  updateDepartment();
});


updateDepartment();