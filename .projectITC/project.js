src="https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"

// panzoom 
const mapLayer  = document.getElementById('mapLayer');
const mapImg    = document.getElementById('mapImg');
const btnZoomIn  = document.getElementById('zoomIn');
const btnZoomOut = document.getElementById('zoomOut');
const viewport   = document.getElementById('viewport');

function setupPanzoom() {
  const IMG_W  = 1280;
  const IMG_H  = mapImg.offsetHeight || 681;
  const vw     = window.innerWidth;
  const vh     = window.innerHeight;


  const minScale   = Math.max(vw / IMG_W, vh / IMG_H);
  const maxScale   = minScale * 5;
  const startX     = (vw - IMG_W * minScale) / 2;
  const startY     = (vh - IMG_H * minScale) / 2;

  const pz = Panzoom(mapLayer, {
    minScale,
    maxScale,
    startScale : minScale,
    startX,
    startY,
    contain    : 'outside',   
    canvas     : true,        
    excludeClass: 'label-btn', 
  });

  
  pz.pan(startX, startY, { animate: false });

  
  viewport.addEventListener('wheel', pz.zoomWithWheel, { passive: false });

 
  mapLayer.addEventListener('panzoomstart', () => viewport.classList.add('dragging'));
  mapLayer.addEventListener('panzoomend',   () => viewport.classList.remove('dragging'));

  // Zoom buttons
  btnZoomIn.addEventListener('click', () => {
    pz.zoomIn();
    dateZoomOutBtn();
  });
  btnZoomOut.addEventListener('click', () => {
    pz.zoomOut();
    dateZoomOutBtn();
  });

  //zoom out disabler
  function dateZoomOutBtn() {
    setTimeout(() => {
      btnZoomOut.disabled = pz.getScale() <= minScale + 0.01;
    }, 50);
  }
  mapLayer.addEventListener('panzoomchange', dateZoomOutBtn);
  dateZoomOutBtn();
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
    photo: "DCEE.JPG",   
    speech: "dceee to ya",
    enter: "Enter DCEEE"
  },
  diet: {
    name: "Department of Industrial & Engineering Technology (DIET)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "diet.jpg",
    speech: "diet to ya",
    enter: "Enter DIET"
  },
  dit: {
    name: "Department of Information Technology (DIT)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "dit.jpg",
    speech: "dit to ya",
    enter: "Enter DIT"
  },
  ceit: {
    name: "College of Engineering & Information Technology (CEIT)",
    desc: "nyenyeneyeeneyeneyenyeyeyneyeyenyeye",
    photo: "CEIT.JPG",
    speech: "ceit to ya",
    enter: "Enter CEIT"
  }
};

const popupOverlay = document.getElementById('popupOverlay');
const cardTitle    = document.getElementById('cardTitle');
const cardPhotoImg = document.getElementById('cardPhotoImg');
const cardDescText = document.getElementById('cardDescText');
const speechText   = document.getElementById('speechText');
const enterBtn     = document.getElementById('enterBtn');
const cardCloseBtn = document.getElementById('cardCloseBtn');

let activeBtn = null;

function openPopup(key) {
  const b = buildings[key];
  if (!b) return;
  cardTitle.textContent    = b.name;
  cardDescText.textContent = b.desc;
  speechText.textContent   = b.speech;
  enterBtn.textContent     = b.enter;
  cardPhotoImg.src         = b.photo;
  cardPhotoImg.alt         = b.name;
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