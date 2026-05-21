src = "https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"

// panzoom 
const mapLayer = document.getElementById('mapLayer');
const mapImg = document.getElementById('mapImg');
const btnZoomIn = document.getElementById('zoomIn');
const btnZoomOut = document.getElementById('zoomOut');
const viewport = document.getElementById('viewport');

function setupPanzoom() {
  const IMG_W = 1280;
  const IMG_H = mapImg.naturalHeight || 681;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const minScale = Math.max(vw / IMG_W, vh / IMG_H);
  const maxScale = minScale * 5;

  const startX = (vw - IMG_W * minScale) / 2;
  const startY = (vh - IMG_H * minScale) / 2;

  // initial transform directly by CSS 
  mapLayer.style.transform = `matrix(${minScale}, 0, 0, ${minScale}, ${startX}, ${startY})`;

  const pz = Panzoom(mapLayer, {
    minScale,
    maxScale,
    contain: 'outside',
    canvas: true,
    excludeClass: 'label-btn',
    startScale: minScale,
    startX: startX,
    startY: startY,
  });

  viewport.addEventListener('wheel', pz.zoomWithWheel, { passive: false });

  mapLayer.addEventListener('panzoomstart', () => viewport.classList.add('dragging'));
  mapLayer.addEventListener('panzoomend', () => viewport.classList.remove('dragging'));

  btnZoomIn.addEventListener('click', () => {
    pz.zoomIn();
    updateZoomOutBtn();
  });
  btnZoomOut.addEventListener('click', () => {
    pz.zoomOut();
    updateZoomOutBtn();
  });

  function updateZoomOutBtn() {
    setTimeout(() => {
      btnZoomOut.disabled = pz.getScale() <= minScale + 0.01;
    }, 50);
  }
  mapLayer.addEventListener('panzoomchange', updateZoomOutBtn);
  updateZoomOutBtn();
}

if (mapImg.complete && mapImg.naturalWidth > 0) {
  setupPanzoom();
} else {
  mapImg.addEventListener('load', setupPanzoom);
}

const buildings = {
  dceee: {
    name: "DCEEE",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "../img/DCEE.JPG",
    speech: "dceee to ya",
    enter: "Enter DCEEE"
  },
  diet: {
    name: "Department of Industrial & Engineering Technology (DIET)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "../img/diet.jpg",
    speech: "diet to ya",
    enter: "Enter DIET"
  },
  dit: {
    name: "Department of Information Technology (DIT)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "../img/dit.jpg",
    speech: "dit to ya",
    enter: "Enter DIT"
  },
  ceit: {
    name: "College of Engineering & Information Technology (CEIT)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "../img/CEIT.JPG",
    speech: "ceit to ya",
    enter: "Enter CEIT"
  }
};

const popupOverlay = document.getElementById('popupOverlay');
const cardTitle = document.getElementById('cardTitle');
const cardPhotoImg = document.getElementById('cardPhotoImg');
const cardDescText = document.getElementById('cardDescText');
const speechText = document.getElementById('speechText');
const enterBtn = document.getElementById('enterBtn');
const cardCloseBtn = document.getElementById('cardCloseBtn');

let activeBtn = null;

function openPopup(key) {
  const b = buildings[key];
  if (!b) return;
  cardTitle.textContent = b.name;
  cardDescText.textContent = b.desc;
  speechText.textContent = b.speech;
  enterBtn.textContent = b.enter;
  cardPhotoImg.src = b.photo;
  cardPhotoImg.alt = b.name;
  popupOverlay.classList.add('visible');
}

function closePopup() {
  popupOverlay.classList.remove('visible');
  if (activeBtn) { activeBtn.classList.remove('active'); activeBtn = null; }
}

cardCloseBtn.addEventListener('click', closePopup);
enterBtn.addEventListener('click', closePopup);

document.querySelectorAll('.building-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');
    activeBtn = btn;
    openPopup(btn.getAttribute('data-building'));
  });
});


//NPCs

const npc = {
  NPC_1_Kalbo: {
    name: "Kalbo Masamang Tao",
    photo: "../img/characters/NPC_1_Kalbo.gif",
    speech: "Did you know that Cavite State University was established in 1906 as the Indang Intermediate School. Its first teachers were the Thomasites—a group of American educators brought to the Philippines to establish the public school system.",
  }
};

const npcPopup = document.getElementById('npcPopup');
const npcNameText = document.getElementById('npcNameText');
const npcPhotoImg = document.getElementById('npcPhotoImg');
const npcSpeechText = document.getElementById('npcSpeechText');

let activeNpcBtn = null;
let isNpcClosing = false;

function openNpcPopup(key) {
  const b = npc[key];
  if (!b) return;
  isNpcClosing = false;
  const npcCard = document.getElementById('npc-card');
  if (npcCard) npcCard.classList.remove('closing');

  npcNameText.textContent = b.name;
  npcSpeechText.textContent = b.speech;
  npcPhotoImg.src = b.photo;
  npcPhotoImg.alt = b.name;
  npcPopup.classList.add('visible');
}

function closeNpcPopup() {
  if (isNpcClosing) return;
  isNpcClosing = true;
  const npcCard = document.getElementById('npc-card');
  if (npcCard) {
    npcCard.classList.add('closing');
    setTimeout(() => {
      npcPopup.classList.remove('visible');
      npcCard.classList.remove('closing');
      if (activeNpcBtn) {
        activeNpcBtn.classList.remove('active');
        activeNpcBtn = null;
      }
      isNpcClosing = false;
    }, 200);
  } else {
    npcPopup.classList.remove('visible');
    if (activeNpcBtn) {
      activeNpcBtn.classList.remove('active');
      activeNpcBtn = null;
    }
    isNpcClosing = false;
  }
}

npcPopup.addEventListener('click', closeNpcPopup);

document.querySelectorAll('.npc-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (activeNpcBtn) activeNpcBtn.classList.remove('active');
    btn.classList.add('active');
    activeNpcBtn = btn;
    openNpcPopup(btn.getAttribute('data-npc'));
  });
});
