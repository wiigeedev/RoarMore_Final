// ==========================================
// DEPENDENCIES
// ==========================================
src = "https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"

// ==========================================
// DOM ELEMENTS
// ==========================================

// Map & Panzoom Elements
const mapLayer = document.getElementById('mapLayer');
const mapImg = document.getElementById('mapImg');
const btnZoomIn = document.getElementById('zoomIn');
const btnZoomOut = document.getElementById('zoomOut');
const viewport = document.getElementById('viewport');

// Building Popup Elements
const popupOverlay = document.getElementById('popupOverlay');
const cardTitle = document.getElementById('cardTitle');
const cardPhotoImg = document.getElementById('cardPhotoImg');
const cardDescText = document.getElementById('cardDescText');
const speechText = document.getElementById('speechText');
const enterBtn = document.getElementById('enterBtn');
const cardCloseBtn = document.getElementById('cardCloseBtn');

// NPC Popup Elements
const npcPopup = document.getElementById('npcPopup');
const npcNameText = document.getElementById('npcNameText');
const npcPhotoImg = document.getElementById('npcPhotoImg');
const npcSpeechText = document.getElementById('npcSpeechText');
const npcChoicesContainer = document.getElementById('npcChoices');

// State Variables
let activeBtn = null;
let activeNpcBtn = null;
let isNpcClosing = false;

// ==========================================
// DATA: BUILDINGS & NPCS
// ==========================================

// Buildings data
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

// NPCs data
const npc = {
  NPC_1_Dex: {
    name: "Dex",
    photo: "../img/characters/NPC_1_Dex.gif",
    speech: "Hi there! I'm Dex. What advice or wisdom would you like to receive today?",
    choices: [
      { text: "Why is there no trash can scattered around the campus?", target: "choice1" },
      { text: "📚 Class Attendance", target: "choice2" },
      { text: "🤝 Student Kindness", target: "choice3" },
    ],
    choiceData: {
      choice1: {
        speech: "The reason is to encourage everyone to take responsibility for their own trash and keep the campus clean. It's a way to promote environmental consciousness and community pride. Plus, it gives you a chance to practice being a responsible citizen!"
      },
      choice2: {
        speech: "Don't forget to attend your classes! Education is important, and you don't want to miss out on valuable knowledge. Plus, you might even have fun in class!"
      },
      choice3: {
        speech: "Be kind to your fellow students! A little kindness goes a long way in creating a positive and supportive campus community. Plus, you might make some great friends along the way!"
      }
    }
  }
};

// ==========================================
// MAP INITIALIZATION (PANZOOM)
// ==========================================

function setupPanzoom() {
  const IMG_W = 1280;
  const IMG_H = mapImg.naturalHeight || 681;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const minScale = Math.max(vw / IMG_W, vh / IMG_H);
  const maxScale = minScale * 5;

  const startX = (vw - IMG_W * minScale) / 2;
  const startY = (vh - IMG_H * minScale) / 2;

  // Initial transform directly by CSS 
  mapLayer.style.transform = `matrix(${minScale}, 0, 0, ${minScale}, ${startX}, ${startY})`;

  // Initialize Panzoom
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

  // Event Listeners for Panzoom
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

  // Update disabled state of Zoom Out button based on current scale
  function updateZoomOutBtn() {
    setTimeout(() => {
      btnZoomOut.disabled = pz.getScale() <= minScale + 0.01;
    }, 50);
  }
  mapLayer.addEventListener('panzoomchange', updateZoomOutBtn);
  updateZoomOutBtn();
}

// Setup map zooming once the map image is loaded
if (mapImg.complete && mapImg.naturalWidth > 0) {
  setupPanzoom();
} else {
  mapImg.addEventListener('load', setupPanzoom);
}

// ==========================================
// BUILDING POPUP LOGIC
// ==========================================

/**
 * Opens the information popup for a specific building.
 * @param {string} key - The key of the building in the buildings object.
 */
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

/**
 * Closes the building information popup.
 */
function closePopup() {
  popupOverlay.classList.remove('visible');
  if (activeBtn) { 
    activeBtn.classList.remove('active'); 
    activeBtn = null; 
  }
}

// Event Listeners for Building Popup
cardCloseBtn.addEventListener('click', closePopup);
enterBtn.addEventListener('click', closePopup);

// Attach click listeners to all building buttons on the map
document.querySelectorAll('.building-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');
    activeBtn = btn;
    openPopup(btn.getAttribute('data-building'));
  });
});


// ==========================================
// NPC POPUP LOGIC
// ==========================================

/**
 * Opens the dialogue popup for an NPC. Handles choice generation if the NPC has dialogue branches.
 * @param {string} key - The key of the NPC in the npc object.
 */
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

  // Clear any existing choices
  if (npcChoicesContainer) {
    npcChoicesContainer.innerHTML = '';
  }

  // Handle choices if they exist for this NPC
  if (npcCard) {
    if (b.choices && b.choices.length > 0) {
      npcCard.classList.add('has-choices');
      
      // Render available choices
      b.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'npc-choice-btn';
        btn.textContent = choice.text;
        
        btn.addEventListener('click', e => {
          e.stopPropagation(); // Don't close dialogue when clicking a choice button
          
          const chosen = b.choiceData[choice.target];
          if (chosen) {
            npcSpeechText.textContent = chosen.speech;
          }
          
          // Clear choice buttons and show only a "Goodbye!" button to close the conversation
          if (npcChoicesContainer) {
            npcChoicesContainer.innerHTML = '';
            
            const goodbyeBtn = document.createElement('button');
            goodbyeBtn.className = 'npc-choice-btn npc-goodbye-btn';
            goodbyeBtn.textContent = '👋 Goodbye!';
            goodbyeBtn.addEventListener('click', ev => {
              ev.stopPropagation();
              closeNpcPopup();
            });
            npcChoicesContainer.appendChild(goodbyeBtn);
          }
          npcCard.classList.remove('has-choices');
        });
        
        if (npcChoicesContainer) {
          npcChoicesContainer.appendChild(btn);
        }
      });

      // Add a "Goodbye!" button to the initial choices list
      const initialGoodbyeBtn = document.createElement('button');
      initialGoodbyeBtn.className = 'npc-choice-btn npc-goodbye-btn';
      initialGoodbyeBtn.textContent = '👋 Goodbye!';
      initialGoodbyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        npcCard.classList.remove('has-choices'); // Remove block to allow closing
        closeNpcPopup();
      });
      if (npcChoicesContainer) {
        npcChoicesContainer.appendChild(initialGoodbyeBtn);
      }
      
    } else {
      npcCard.classList.remove('has-choices');
      
      // For standard NPCs without choices (like Kalbo), append a "Goodbye!" button directly
      const goodbyeBtn = document.createElement('button');
      goodbyeBtn.className = 'npc-choice-btn npc-goodbye-btn';
      goodbyeBtn.textContent = '👋 Goodbye!';
      goodbyeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeNpcPopup();
      });
      
      if (npcChoicesContainer) {
        npcChoicesContainer.appendChild(goodbyeBtn);
      }
    }
  }

  npcPopup.classList.add('visible');
}

/**
 * Closes the NPC dialogue popup with an animation. Prevents closing if choices are active.
 */
function closeNpcPopup() {
  const npcCard = document.getElementById('npc-card');
  
  // Prevent closing when dialogue options are on screen to force a choice
  if (npcCard && npcCard.classList.contains('has-choices')) {
    return;
  }

  if (isNpcClosing) return;
  isNpcClosing = true;
  
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

// Event Listeners for NPC Popup
npcPopup.addEventListener('click', closeNpcPopup);

// Attach click listeners to all NPC buttons on the map
document.querySelectorAll('.npc-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (activeNpcBtn) activeNpcBtn.classList.remove('active');
    btn.classList.add('active');
    activeNpcBtn = btn;
    openNpcPopup(btn.getAttribute('data-npc'));
  });
});
