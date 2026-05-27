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

// Help Elements
const helpBtn = document.getElementById('helpBtn');
const helpLegend = document.getElementById('helpLegend');
const legendCloseBtn = document.getElementById('legendCloseBtn');

// Building Popup Elements
const popupOverlay = document.getElementById('popupOverlay');
const cardTitle = document.getElementById('cardTitle');
const speechText = document.getElementById('speechText');
const cardCloseBtn = document.getElementById('cardCloseBtn');
const floorImages = document.getElementById('floorImages');

// NPC Popup Elements
const npcPopup = document.getElementById('npcPopup');
const npcNameText = document.getElementById('npcNameText');
const npcPhotoImg = document.getElementById('npcPhotoImg');
const npcSpeechText = document.getElementById('npcSpeechText');
const npcSpeechImage = document.getElementById('npcSpeechImage');
const npcSpeechGrid = document.getElementById('npcSpeechGrid');
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
    name: "DCEEE (Department of Computer, Electronics, and Electrical Engineering)",
    speech: "Welcome to DCEEE! This is where the magic happens for all things tech. From coding to circuits, DCEEE is the heart of innovation on campus. Explore the labs, meet the brilliant minds, and see how we power the future!"
  },
  diet: {
    name: "DIET (Department of Industrial Engineering and Technology)",
    speech: "Welcome to DIET! DIET is where we optimize the future. From manufacturing to systems design, this is the hub for innovation in industrial engineering. Explore the workshops, meet the students, and see how we shape the world of technology and industry!"
  },
  dit: {
    name: "DIT (Department of Information Technology)",
    speech: "Welcome to DIT! DIT is the place where information meets technology. Discover the latest in IT trends, explore our state-of-the-art labs, and connect with students who are shaping the digital landscape!"
  },
  ceit: {
    name: "CEIT (College of Engineering and Information Technology)",
     speech: "Welcome to CEIT! CEIT is the college for innovation in engineering and information technology. Explore our cutting-edge facilities, meet our passionate faculty, and see how we're shaping the future of technology and engineering!"
  }
};

// NPCs data
const npc = {
  NPC_1_Dex: {
    name: "Dex",
    photo: "../img/characters/NPC_1_Dex.gif",
    speech: "Hi there! I'm Dex, a College Student from Cavite State University!. What do you want to know from me?",
    choices: [
      { text: "Why are there no trash cans scattered around the campus?", target: "choice1" },
      { text: "Who is the current University President of Cavite State University - Main Campus?", target: "choice2" },
    ],
    choiceData: {
      choice1: { 
        photo: "../img/characters/NPC_1_Dex_Happy.gif",
        speech: "The reason is to encourage everyone to take responsibility for their own trash and keep the campus clean. It's a way to promote environmental consciousness and community pride. Plus, it gives you a chance to practice being a responsible citizen!"
      },
      choice2: {
        photo: "../img/characters/NPC_1_Dex_Happy.gif",
        speech: "The current University President of Cavite State University - Main Campus is Dr. Ma. Agnes P. Nuestro."
      }
    }
  },
  NPC_2_Kent: {
    name: "Kent",
    photo: "../img/characters/NPC_2_Kent.gif",
    speech: "Hi there! I'm Kent, a College Student from Cavite State University!. What do you want to know from me?",
    choices: [
      { text: "Has this department always been called DCEEE?", target: "choice1" },
      { text: "What did this place look like when it first started?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_2_Kent.gif",
        speech: "Nope! It only got this extra 'E' in 2023. Before that, it was just DCEE, but they changed the name to welcome the Electrical Engineering unit into the family!"
      },
      choice2: {
        photo: "../img/characters/NPC_2_Kent.gif",
        speech: "Oh, back in 1995, it was tiny! They started with just Computer Engineering and a simple Computer Technician Certificate. Look how much it has grown since then!."
      }
    }
  },
  NPC_3_Lhian: {
    name: "Lhian",
    photo: "../img/characters/NPC_3_Lhian.gif",
    speech: "Hi there! I'm Lhian, a College Student from Cavite State University!. What do you want to know from me?",
    choices: [
      { text: "Who is the mascot of CEIT?", target: "choice1" },
      { text: "Any juicy secrets about out proffesors?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_3_Lhian.gif",
        speech: "A tiger named Rawrie is the mascot of CEIT!"
      },
      choice2: {
        photo: "../img/characters/NPC_3_Lhian.gif",
        speech: "Get this-almost half of them (46%) are actively studying for MS/MT units right now! They are literally working on advanced degrees while grading our exams."
      }
    }
  },
  NPC_4_Spenzer: {
    name: "Spenzer",
    photo: "../img/characters/NPC_4_Spenzer.gif",
    speech: "Hi there! I'm Spenzer, a College Student from Cavite State University!. What do you want to know about the campus?",
    choices: [
      { text: "Is it just me, or does the campus feel less crowded sometimes?", target: "choice1" },
      { text: "Are they building anything cool in the labs?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_4_Spenzer.gif",
        speech: "You're not imagining it! Enrollment always spikes in the First Semester and drops in the Second Semester. Every single year. I guess the second-semester slump is real"
      },
      choice2: {
        photo: "../img/characters/NPC_4_Spenzer.gif",
        speech: "Oh, absolutely! They aren't just doing the basic coding-they're actively researching Robotics, Nanotechnology, and the Internet of Things right now!"
      }
    }
  },
  NPC_5_Charls: {
    name: "Charls",
    photo: "../img/characters/NPC_5_Charls.gif",
    speech: "Hi there! I'm Charls, a College Student from Cavite State University!. What do you want to know about the campus?",
    choices: [
      { text: "What is the DCEEE's Department's ultimate goal?", target: "choice1" },
      { text: "How did CEIT started?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_5_Charls.gif",
        speech: "To build with a conscience! Their official goals specifically focus on creating environment firndly technology and preserving nature while innovating"
      },
      choice2: {
        photo: "../img/characters/NPC_5_Charls.gif",
        speech: "It started as the department of Agricultural Engineering that offers basic agricultural engineering courses"
      },
    }
  },
    NPC_6_Brent: {
    name: "Brent",
    photo: "../img/characters/NPC_6_Brent.gif",
    speech: "Hey, welcome! Name's Brent, a college student here at Cavite State University. Anything you wanna know about our campus?",
    choices: [
      { text: "Is there a washday in Cavite State University - Main Campus?", target: "choice1" },
      { text: "What is it called before they named it CEIT?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_6_Brent.gif",
        speech: "Actually there is, during wednesday and saturday. Students are allowed to wear anything comfortable as long as it is appropriate"
      },
      choice2: {
        photo: "../img/characters/NPC_6_Brent.gif",
        speech: "At the year 1998, The College of Engineering (CEng) is finally elevated to the current College of Engineering and Information Technology (CEIT)"
      }
    }
  },
    NPC_7_Dustin: {
    name: "Dustin",
    photo: "../img/characters/NPC_7_Dustin.gif",
    speech: "Yo, what's up? I'm Dustin, a student here at CvSU. Feel free to ask me anything about the campus.",
    choices: [
      { text: "What on earth is 'Antropometric Design'?", target: "choice1" },
      { text: "Are we allowed to bring outside foods and drinks inside the campus?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_7_Dustin.gif",
        speech: "It sounds complicated, but it's a fancy way of saying 'shaping machines to fit the human body perfectly'. The engineers here study us to build better tech"
      },
      choice2: {
        photo: "../img/characters/NPC_7_Dustin.gif",
        speech: "Normally u can't bring food and drinks inside the campus, but it is allowed if the water is in a tumbler and the food is inside your lunchboxes. This is all to preserve the cleanliness outside the campus"
      }
    }
  }, 
    NPC_8_Christian: {
    name: "Christian",
    photo: "../img/characters/NPC_8_Christian.gif",
    speech: "Hello! I'm Christian, a student at CvSU. How can I help you today?",
    choices: [
      { text: "What is Cavite State University - Campus Mascot?", target: "choice1" },
      { text: "What is the intrams situation here?", target: "choice2" },
    ], 
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_8_Christian.gif",
        speech: "Cavite State University Mascot - Main Campus is The Hornet with the color them of yellow and green"
      },
      choice2: {
        photo: "../img/characters/NPC_8_Christian.gif",
        speech: "Intrams in CVSU - Main Campus includes all the colleges and sattelite campuses competing for medals and honor."
      }
    }
  }, 
    NPC_9_Kath: {
    name: "Kath",
    photo: "../img/characters/NPC_9_Kath.gif",
    speech: "Hi there! I'm Kath, a student at CvSU. How can I help you today?",
    choices: [
      { text: "How many gates does Cavite State University - Main Campus have?", target: "choice1" },
      { text: "What options are there in Cavite State University - Main Campus NSTP (National Service Training Program)?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_9_Kath.gif",
        speech: "There are currently 3 Gates. The nearest gate from CEIT is Gate 2"
      },
      choice2: {
        photo: "../img/characters/NPC_9_Kath.gif",
        speech: "Right now, Cavite State University - Main Campus offers 2 option for their NSTP - CWTS or ROTC "
      }
    }
  },NPC_10_Carlo: {
    name: "Carlo",
    photo: "../img/characters/NPC_10_Carlo.gif",
    speech: "Hi there! I'm Carlo, a student at CvSU. How can I help you today?",
    choices: [
      { text: "How many years does the CvSU free tuition covers?", target: "choice1" },
      { text: "Is engineering actually bad for the planet?", target: "choice2" },
    ],
    choiceData: {
      choice1: {
        photo: "../img/characters/NPC_10_Carlo.gif",
        speech: "You may benefit up to 5 years, but exceeding that you will need to pay for the tuition."
      },
      choice2: {
        photo: "../img/characters/NPC_10_Carlo.gif",
        speech: "Not if we can help it! A huge chunk of the department's research actually goes directly into Cleaner Production and Waste Management Systems"
      }
    }
  },
  NPC_11_Nestor: {
    name: "Nestor",
    photo: "../img/characters/NPC_11_Nestor.gif",
    speech: "If you are taking Computer Science, study hard for Discrete Structures because it is a difficult subject for 1st year Computer Science Students"  ,
  },
    NPC_12_Kurt: {
    name: "Kurt",
    photo: "../img/characters/NPC_12_Kurt.gif",
    speech: "If you are tired you can use an elevator to go up DIT Building since it has 5 floors."  ,
  },
    NPC_13_Cielo: {
    name: "Cielo",
    photo: "../img/characters/NPC_13_Cielo.gif",
    speech: "Hi there! Thirsty? There is a water dispenser present near the entrance of DIT Building"  ,
  },
    NPC_14_Charles: {
    name: "Charles",
    photo: "../img/characters/NPC_14_Charles.gif",
    speech: "Hello there! There are 4 Kiosk around CEIT, you may sit down and past time while you wait for your next class."  ,
  },
  NPC_15_Abram: {
    name: "Abram",
    photo: "../img/characters/NPC_15_Abram.gif",
    speech: "Hi there! I do not know why i am here to be honest. But hey, at least I look cool, right?"  ,
  },
  NPC_16_MaamJas: {
    name: "Maam Jas",
    photo: "../img/characters/NPC_16_Ma'amJas.gif",
    speech: "Hi there! I'm Maam Jas, a faculty member at CvSU. Ready to take on the challenge of knowledge?",
    hideGoodbye: false,
    choices: [
      { text: "Yes", target: "choice1" }
    ],
    choiceData: {
      choice1: {
        image1: "../img/mini_game_1/q1_1.png",
        image2: "../img/mini_game_1/q1_2.png",
        image3: "../img/mini_game_1/q1_3.png",
        image4: "../img/mini_game_1/q1_4.png",
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Think you can guess what this is?",
        hideGoodbye: true,
        choices: [
          { text: "A. Tiger", target: "correctAnswer1" },
          { text: "B. Lion", target: "wrongAnswer1" },
          { text: "C. Cheetah", target: "wrongAnswer1" },
          { text: "D. Regine Velasquez", target: "wrongAnswer1" },
        ]
      },
      wrongAnswer1: {
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Incorrect! Try again later.",
        hideGoodbye: false,
      },
      correctAnswer1: {
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Correct! That is Rawrie, the CEIT mascot!",
        hideGoodbye: true,
        choices: [
          { text: "Next Question", target: "question2" }
        ]
      },
      question2: {
        image1: "../img/mini_game_1/q2_1.png",
        image2: "../img/mini_game_1/q2_2.png",
        image3: "../img/mini_game_1/q2_3.png",
        image4: "../img/mini_game_1/q2_4.png",
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Chamba! Can you guess this second one?",
        hideGoodbye: true,
        choices: [
          { text: "A. Comedian", target: "wrongAnswer2" },
          { text: "B. Pilot", target: "wrongAnswer2" },
          { text: "C. Engineer",target: "correctAnswer2" },
          { text: "D. Doctor", target: "wrongAnswer2" }
        ]
      },
      wrongAnswer2: {
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Incorrect! Try again later.",
        hideGoodbye: false,
      },
      correctAnswer2: {
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Correct Again! That is the word Engineer, which is the course that CvSU CEIT offers!",
        hideGoodbye: true,
        choices: [
          { text: "Next Question", target: "question3" }
        ]
      },
      question3: {
        image1: "../img/mini_game_1/q3_1.png",
        image2: "../img/mini_game_1/q3_2.png",
        image3: "../img/mini_game_1/q3_3.png",
        image4: "../img/mini_game_1/q3_4.png",
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Last thing to guess! I hope you get this one right!",
        hideGoodbye: true,
        choices: [
          { text: "A. RoarMore", target: "wrongAnswer3" },
          { text: "B. Error", target: "finalCorrect" },
          { text: "C. Mirror", target: "wrongAnswer3" },
          { text: "D. Terror", target: "wrongAnswer3" }
        ]
      },
      wrongAnswer3: {
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Incorrect! Try again later.",
        hideGoodbye: false,
      },
      finalCorrect: {
        image: "../img/info_img/token_1.png",
        photo: "../img/characters/NPC_16_Ma'amJas.gif",
        speech: "Correct! You got them all right! You really know your stuff about CvSU CEIT! Here's a prize for your knowledge!",
        reward1: true,
        hideGoodbye: false,
      }
    }
  },
  get NPC_17_SirJed() {
    if (reward1 == false) {
      return {
        name: "Sir Jed",
        photo: "../img/characters/NPC_17_SirJed.gif",
        speech: "Come back when you have the prize from Ma'am Jas!",
        hideGoodbye: false
      };
    } else {
      return {
        name: "Sir Jed",
        photo: "../img/characters/NPC_17_SirJed.gif",
        speech: "Hi there! I'm Sir Jed, a faculty member at CvSU. Welcome to GeoGuessr CEIT Edition! Ready to take on the challenge of knowledge?",
        hideGoodbye: false,
        choices: [
          { text: "Yes", target: "choice1" }
        ],
          choiceData: {
          choice1: {
            image: "../img/mini_game_2/q1_1.png",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Where is this located?",
            hideGoodbye: true,
            choices: [
              { text: "A. In front of DIET Building", target: "wrongAnswer1" },
              { text: "B. In front of CEIT Building", target: "correctAnswer1" },
              { text: "C. In front of DIT Building", target: "wrongAnswer1" },
              { text: "D. In front of DCEEE Building", target: "wrongAnswer1" },
            ]
          },
          wrongAnswer1: {
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer1: {
            image: "../img/mini_game_2/q1_2.JPG",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Correct! That is infront of the CEIT building!",
            hideGoodbye: true,
            choices: [
              { text: "Next Question", target: "question2" }
            ]
          },
          question2: {
            image: "../img/mini_game_2/q2_1.png",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Let's see if you can get this one right! Guess where this is located!",
            hideGoodbye: true,
            choices: [
              { text: "A. Inside DIET Building", target: "wrongAnswer2" },
              { text: "B. Behind CEIT Building", target: "wrongAnswer2" },
              { text: "C. In front of DCEEE Building", target: "wrongAnswer2" },
              { text: "D. Don't Fool Me! Its taken outside the Campus!", target: "correctAnswer2" }
            ]
          },
          wrongAnswer2: {
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer2: {
            image: "../img/mini_game_2/q2_2.JPG",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Correct Again! That is taken outside the Campus! (may daliri pangkasama sa picture)",
            hideGoodbye: true,
            choices: [
              { text: "Next Question", target: "question3" }
            ]
          },
      
          question3: {
            image: "../img/mini_game_2/q3_1.png",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Last thing to guess! I hope you get this one right!",
            hideGoodbye: true,
            choices: [
              { text: "A. Inside DCEEE Building", target: "finalCorrect" },
              { text: "B. Behind DIT Building", target: "wrongAnswer3" },
              { text: "C. Inside DIET Building", target: "wrongAnswer3" },
              { text: "D. In front of DIT Building", target: "wrongAnswer3" }
            ]
          },
          wrongAnswer3: {
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          finalCorrect: {
            image: "../img/info_img/token_2.png",
            photo: "../img/characters/NPC_17_SirJed.gif",
            speech: "Correct! You got them all right! You really know your stuff about CvSU CEIT! Here's a prize for your knowledge!",
            reward2: true,
            hideGoodbye: false,
          }
        }
      };
    }
  },
  get NPC_18_SirRey() {
    if (reward2 == false) {
      return {
        name: "Sir Rey",
        photo: "../img/characters/NPC_18_SirRey.gif",
        speech: "Come back when you have the prize from Sir Jed!",
        hideGoodbye: false
      };
    } else {
      return {
        name: "Sir Rey",
        photo: "../img/characters/NPC_18_SirRey.gif",
        speech: "Hi there! I'm Sir Rey, a faculty member at CvSU. Ready to take the final challenge?",
        hideGoodbye: false,
        choices: [
          { text: "Yes", target: "choice1" }
        ],
        choiceData: {
        choice1: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Who is the current University President of Cavite State University - Main Campus?",
            hideGoodbye: true,
            choices: [
              { text: "A. Dr. Ma. Angela P. Nuestro", target: "wrongAnswer1" },
              { text: "B. Dr. Ma. Anna P. Nuestro", target: "wrongAnswer1" },
              { text: "C. Dr. Ma. Agnes P. Nuestro", target: "correctAnswer1" },
              { text: "D. Dr. Ma. Anthony P. Nuestro", target: "wrongAnswer1" },
            ]
          },
          wrongAnswer1: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer1: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Correct! The current University President of Cavite State University - Main Campus is Dr. Ma. Agnes P. Nuestro!",
            hideGoodbye: true,
            choices: [
              { text: "Next Question", target: "question2" }
            ]
          },
          question2: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Who is the mascot of College of Engineering and Information Technology!",
            hideGoodbye: true,
            choices: [
              { text: "A. Barnie", target: "wrongAnswer2" },
              { text: "B. Rawrie", target: "correctAnswer2" },
              { text: "C. Tigerry", target: "wrongAnswer2" },
              { text: "D. Water Girl", target: "wrongAnswer2" }
            ]
          },
          wrongAnswer2: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer2: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Correct Again! The mascot of College of Engineering and Information Technology is Rawrie",
            hideGoodbye: true,
            choices: [ 
              { text: "Next Question", target: "question3" }
            ]
          },

          question3: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Back in 1995, What program does CEIT offer?",
            hideGoodbye: true,
            choices: [
              { text: "A. Computer Science", target: "wrongAnswer3" },
              { text: "B. Computer Engineering", target: "correctAnswer3" },
              { text: "C. Architecture", target: "wrongAnswer3" },
              { text: "D. Information Technology", target: "wrongAnswer3" }
            ]
          },
          wrongAnswer3: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer3: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Correct Again! In 1995, CEIT started with just Computer Engineering and a simple Computer Technician rCertificate.",
            hideGoodbye: true,
            choices: [ 
              { text: "Next Question", target: "question4" }
            ]
          },

          question4: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "What is one of DCEEE Department Ultimate Goal?",
            hideGoodbye: true,
            choices: [
              { text: "A. Creating Environment-Friendly Technology", target: "correctAnswer4" },
              { text: "B. Competing with Apple.", target: "wrongAnswer4" },
              { text: "C. Creating New Technology while disregarding the Environment.", target: "wrongAnswer4" },
              { text: "D. Creating destructive technology that will help the Philippines if theres a war.", target: "wrongAnswer4" }
            ]
          }, 
          wrongAnswer4: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          correctAnswer4: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Correct Again! One of the Ultimate Goal of DCEEE is Creating Environment-Friendly Technology",
            hideGoodbye: true,
            choices: [ 
              { text: "Next Question", target: "question5" }
            ]
          },

          question5: {
            photo: "../img/characters/NPC_18_SirRey.gif", 
            speech: "Last thing to guess! I hope you get this one right! Based on the recent data, How many percentage of proffesors are actively studying for MS/MT units right now?",
            hideGoodbye: true,
            choices: [
              { text: "A. 46%", target: "finalCorrect" },
              { text: "B. 67%", target: "wrongAnswer5" },
              { text: "C. 101%", target: "wrongAnswer5" },
              { text: "D. 0%", target: "wrongAnswer5" }
            ]
          },
          wrongAnswer5: {
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Incorrect! Try again later.",
            hideGoodbye: false,
          },
          finalCorrect: {
            image: "../img/info_img/trophy.png",
            photo: "../img/characters/NPC_18_SirRey.gif",
            speech: "Correct! You got them all right! You really know your stuff about CvSU CEIT! Congratulations! You have finished the mini-games.",
            reward2: true,
            hideGoodbye: false,
          }
        }
      }
    };
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

  mapLayer.addEventListener('panzoomstart', () => {viewport.classList.add('dragging');
  mapLayer.style.willChange = 'transform';});
  mapLayer.addEventListener('panzoomend', () => {
  viewport.classList.remove('dragging');
  mapLayer.style.willChange = 'auto';});

  btnZoomIn.addEventListener('click', () => {
    pz.zoomIn();
    updateZoomOutBtn();
  });
  
  btnZoomOut.addEventListener('click', () => {
    pz.zoomOut();
    updateZoomOutBtn();
  });

  // Update disabled state of Zoom Out button and toggle zoom classes based on current scale
  function updateZoomState() {
    setTimeout(() => {
      const currentScale = pz.getScale();
      btnZoomOut.disabled = currentScale <= minScale + 0.01;
      
      const midScale = minScale + (maxScale - minScale) * 0.25;
      if (currentScale >= midScale) {
        viewport.classList.add('zoomed-in');
      } else {
        viewport.classList.remove('zoomed-in');
      }
    }, 50);
  }
  mapLayer.addEventListener('panzoomchange', updateZoomState);
  updateZoomState();
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

let currentBuilding = "";

function openPopup(key) {
  currentBuilding = key;

  const b = buildings[key];
  if (!b) return;
  cardTitle.textContent = b.name;
  speechText.textContent = b.speech;

  const floorButtons = document.getElementById("floorButtons");

  if (key === "ceit") {
    floorButtons.innerHTML = `
      <button onclick="showFloor('ground')">Ground Floor</button>
    `;
  }

  else if (key === "diet") {
    floorButtons.innerHTML = `
      <button onclick="showFloor('ground')">Ground Floor</button>
      <button onclick="showFloor('second')">2nd Floor</button>
      <button onclick="showFloor('third')">3rd Floor</button>
    `;
  }

  else if (key === "dit") {
    floorButtons.innerHTML = `
      <button onclick="showFloor('ground')">Ground Floor</button>
      <button onclick="showFloor('second')">2nd Floor</button>
      <button onclick="showFloor('third')">3rd Floor</button>
      <button onclick="showFloor('fourth')">4th Floor</button>
      <button onclick="showFloor('fifth')">5th Floor</button>
    `;
  }

  else {
    floorButtons.innerHTML = `
      <button onclick="showFloor('ground')">Ground Floor</button>
      <button onclick="showFloor('second')">2nd Floor</button>
      <button onclick="showFloor('third')">3rd Floor</button>
      <button onclick="showFloor('fourth')">4th Floor</button>
    `;
  }

  popupOverlay.classList.add("visible");
  showFloor("ground");
}

function closePopup() {
  popupOverlay.classList.remove("visible");

  if (activeBtn) {
    activeBtn.classList.remove("active");
    activeBtn = null;
  }
}

cardCloseBtn.addEventListener("click", closePopup);

document.querySelectorAll(".building-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    if (activeBtn) {
      activeBtn.classList.remove("active");
    }

    btn.classList.add("active");
    activeBtn = btn;

    openPopup(btn.dataset.building || btn.getAttribute('data-building'));
  });
});

function showFloor(floor) {
  let images = "";

  // ===== DCEEE =====
  if (currentBuilding === "dceee") {
    if (floor === "ground") {
      images = `
        <img src="../img/building_card/dceee1pic1.jpg" alt="DCEEE Ground 1">
        <img src="../img/building_card/dceee1pic3.jpg" alt="DCEEE Ground 2">
        <img src="../img/building_card/dceee1pic2.jpg" alt="DCEEE Ground 3">
        <img src="../img/building_card/dceee1pic4.jpg" alt="DCEEE Ground 4">
      `;
    }

    if (floor === "second") {
      images = `
        <img src="../img/building_card/dceee2pic1.jpg" alt="DCEEE 2nd 1">
        <img src="../img/building_card/dceee2pic2.jpg" alt="DCEEE 2nd 2">
        <img src="../img/building_card/dceee2pic3.jpg" alt="DCEEE 2nd 3">
        <img src="../img/building_card/dceeepic4.jpg" alt="DCEEE 2nd 4">
      `;
    }

    if (floor === "third") {
      images = `
        <img src="../img/building_card/dceee3pic4.jpg" alt="DCEEE 3rd 1">
        <img src="../img/building_card/dceee3pic3.jpg" alt="DCEEE 3rd 2">
        <img src="../img/building_card/dceee3pic2.jpg" alt="DCEEE 3rd 3">
        <img src="../img/building_card/dceee3pic1.jpg" alt="DCEEE 3rd 4">
      `;
    }

    if (floor === "fourth") {
      images = `
        <img src="../img/building_card/dceee4flrpic1.jpg" alt="DCEEE 4th 1">
        <img src="../img/building_card/dceee4flrpic2.jpg" alt="DCEEE 4th 2">
        <img src="../img/building_card/dceee4flrpic3.jpg" alt="DCEEE 4th 3">
        <img src="../img/building_card/dceee4flrpic4.jpg" alt="DCEEE 4th 4">
      `;
    }
  }

  // ===== DIET =====
  if (currentBuilding === "diet") {
    if (floor === "ground") {
      images = `
        <img src="../img/building_card/diet1stfloorpic1.jpg" alt="DIET Ground 1">
        <img src="../img/building_card/diet1stfloorsecpic.jpg" alt="DIET Ground 2">
        <img src="../img/building_card/diet1stfloorpic3.jpg" alt="DIET Ground 3">
        <img src="../img/building_card/diet1stfloorpic4.jpg" alt="DIET Ground 4">
      `;
    }

    if (floor === "second") {
      images = `
        <img src="../img/building_card/dietsecflrpic1.jpg" alt="DIET 2nd 1">
        <img src="../img/building_card/dietsecflrpic2.jpg" alt="DIET 2nd 2">
        <img src="../img/building_card/dietsecflrpic3.jpg" alt="DIET 2nd 3">
        <img src="../img/building_card/dietsecflrpic4.jpg" alt="DIET 2nd 4">
      `;
    }

    if (floor === "third") {
      images = `
        <img src="../img/building_card/diet3flrpic1.jpg" alt="DIET third 1">
        <img src="../img/building_card/diet3flrpic2.jpg" alt="DIET third 2">
        <img src="../img/building_card/diet3flrpic3.jpg" alt="DIET third 3">
        <img src="../img/building_card/diet3flrpic4.jpg" alt="DIET third 4">
      `;
    }
  }

  // ===== DIT =====
  if (currentBuilding === "dit") {
    if (floor === "ground") {
      images = `
        <img src="../img/building_card/dit1stflrpic1.jpg" alt="DIT Ground 1">
        <img src="../img/building_card/dit1stflrpic2.jpg" alt="DIT Ground 2">
        <img src="../img/building_card/dit1stflrpic3.jpg" alt="DIT Ground 3">
        <img src="../img/building_card/dit1stflrpic4.jpg" alt="DIT Ground 4">
      `;
    }

    if (floor === "second") {
      images = `
        <img src="../img/building_card/dit2flrpic1.jpg" alt="DIT 2nd 1">
        <img src="../img/building_card/dit2flrpic2.jpg" alt="DIT 2nd 2">
        <img src="../img/building_card/dit2flrpic3.jpg" alt="DIT 2nd 3">
        <img src="../img/building_card/dit2flrpic4.jpg" alt="DIT 2nd 4">
      `;
    }
  }

  if (currentBuilding === "dit" && floor === "third") {
    images = `
      <img src="../img/building_card/dit3flrpic1.jpg" alt="DIT 3rd 1">
      <img src="../img/building_card/dit3flrpic2.jpg" alt="DIT 3rd 2">
      <img src="../img/building_card/dit3flrpic3.jpg" alt="DIT 3rd 3">
      <img src="../img/building_card/dit3flrpic4.jpg" alt="DIT 3rd 4">
    `;
  }

  if (currentBuilding === "dit" && floor === "fourth") {
    images = `
      <img src="../img/building_card/dit4flrpic1.jpg" alt="DIT 4th 1">
      <img src="../img/building_card/dit4flrpic2.jpg" alt="DIT 4th 2">
    `;
  }

  if (currentBuilding === "dit" && floor === "fifth") {
    images = `
      <img src="../img/building_card/dit5flrpic1.jpg" alt="DIT 5th 1">
      <img src="../img/building_card/dit5flrpic2.jpg" alt="DIT 5th 2">
      <img src="../img/building_card/dit5flrpic4.jpg" alt="DIT 5th 3">
      <img src="../img/building_card/dit5flrpic3.jpg" alt="DIT 5th 4">
    `;
  }

  // ===== CEIT =====
  if (currentBuilding === "ceit") {
    if (floor === "ground") {
      images = `
        <img src="../img/building_card/ceitgpic1.jpg" alt="CEIT Ground 1">
        <img src="../img/building_card/ceitgpic3.jpg" alt="CEIT Ground 2">
        <img src="../img/building_card/ceitgpic4.jpg" alt="CEIT Ground 3">
        <img src="../img/building_card/ceitgpic2.jpg" alt="CEIT Ground 4">
      `;
    }
  }

  floorImages.innerHTML = images;
}

window.showFloor = showFloor;


// ==========================================
// NPC POPUP LOGIC
// ==========================================


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

function openNpcPopup(key) {
  const npc_info = npc[key];
  if (!npc_info) return;
  
  isNpcClosing = false;
  const npcCard = document.getElementById('npc-card');
  if (npcCard) {
    npcCard.className = ''; 
  }


  // getting the npc info and putting it in the popup - dex
  npcNameText.textContent = npc_info.name;
  npcSpeechText.textContent = npc_info.speech;
  npcPhotoImg.src = npc_info.photo;
  npcPhotoImg.alt = npc_info.name;

  if (npcSpeechImage) {
    npcSpeechImage.style.display = 'none';
    npcSpeechImage.src = '';
  }
  if (npcSpeechGrid) {
    npcSpeechGrid.style.display = 'none';
    npcSpeechGrid.querySelectorAll('img').forEach(img => img.src = '');
  }

  if (npcChoicesContainer) npcChoicesContainer.innerHTML = '';

  if (npcCard) {
    const hasChoices = npc_info.choices && npc_info.choices.length > 0;

    function renderChoicesList(choicesArray, dataObj, hideGoodbyeFlag) {
      if (!npcChoicesContainer) return;
      npcChoicesContainer.innerHTML = '';
      
      if (choicesArray && choicesArray.length > 0) {
        npcCard.classList.add('has-choices');
        npcCard.classList.remove('viewing-choice');
        
        choicesArray.forEach(choice => {
          const button = document.createElement('button');
          button.className = 'npc-choice-btn';
          button.textContent = choice.text;
          button.addEventListener('click', e => {
            e.stopPropagation();
            const chosen = dataObj[choice.target];
            if (chosen) {
              if (chosen.reward1 !== undefined) {
                reward1 = chosen.reward1;
                const geoBtn = document.getElementById('npc-geoguessr') || document.getElementById('npc-geoguessr-obtained');
                if (geoBtn) {
                  geoBtn.id = reward1 ? 'npc-geoguessr-obtained' : 'npc-geoguessr';
                }
              }
              if (chosen.reward2 !== undefined) {
                reward2 = chosen.reward2;
                const geoBtn = document.getElementById('npc-quiz') || document.getElementById('npc-quiz-obtained');
                if (geoBtn) {
                  geoBtn.id = reward2 ? 'npc-quiz-obtained' : 'npc-quiz';
                }
              }
              if (chosen.reward2 !== undefined) reward2 = chosen.reward2;
              npcSpeechText.textContent = chosen.speech;
              npcPhotoImg.src = chosen.photo || npcPhotoImg.src;
              if (chosen.image1 && chosen.image2 && chosen.image3 && chosen.image4 && npcSpeechGrid) {
                const gridImgs = npcSpeechGrid.querySelectorAll('img');
                if (gridImgs.length >= 4) {
                  gridImgs[0].src = chosen.image1;
                  gridImgs[1].src = chosen.image2;
                  gridImgs[2].src = chosen.image3;
                  gridImgs[3].src = chosen.image4;
                }
                npcSpeechGrid.style.display = 'grid';
                if (npcSpeechImage) npcSpeechImage.style.display = 'none';
              } else if (chosen.image && npcSpeechImage) {
                npcSpeechImage.src = chosen.image;
                npcSpeechImage.style.display = 'block';
                if (npcSpeechGrid) npcSpeechGrid.style.display = 'none';
              } else {
                if (npcSpeechImage) {
                  npcSpeechImage.style.display = 'none';
                  npcSpeechImage.src = '';
                }
                if (npcSpeechGrid) {
                  npcSpeechGrid.style.display = 'none';
                  npcSpeechGrid.querySelectorAll('img').forEach(img => img.src = '');
                }
              }
              
              const nextHideGoodbye = (chosen.hideGoodbye !== undefined) ? chosen.hideGoodbye : hideGoodbyeFlag;
              
              if (chosen.choices && chosen.choices.length > 0) {
                renderChoicesList(chosen.choices, chosen.choiceData || dataObj, nextHideGoodbye);
              } else {
                npcChoicesContainer.innerHTML = '';
                npcCard.classList.remove('has-choices');
                npcCard.classList.add('viewing-choice');
                
                // End of quiz/dialogue: render goodbye button so they can close the popup
                const goodbyeButton = document.createElement('button');
                goodbyeButton.className = 'npc-choice-btn npc-goodbye-btn';
                goodbyeButton.textContent = '👋 Goodbye!';
                goodbyeButton.addEventListener('click', ne => {
                  ne.stopPropagation();
                  closeNpcPopup();
                });
                npcChoicesContainer.appendChild(goodbyeButton);
              }
            }
          });
          npcChoicesContainer.appendChild(button);
        });
        
        if (!hideGoodbyeFlag) {
          const goodbyeButton = document.createElement('button');
          goodbyeButton.className = 'npc-choice-btn npc-goodbye-btn';
          goodbyeButton.textContent = '👋 Goodbye!';
          goodbyeButton.addEventListener('click', e => {
            e.stopPropagation();
            npcCard.classList.remove('has-choices'); 
            closeNpcPopup();
          });
          npcChoicesContainer.appendChild(goodbyeButton);
        }
      } else {
        npcCard.classList.remove('has-choices');
        npcCard.classList.add('viewing-choice');
        
        const goodbyeButton = document.createElement('button');
        goodbyeButton.className = 'npc-choice-btn npc-goodbye-btn';
        goodbyeButton.textContent = '👋 Goodbye!';
        goodbyeButton.addEventListener('click', e => {
          e.stopPropagation();
          closeNpcPopup();
        });
        npcChoicesContainer.appendChild(goodbyeButton);
      }
    }

    if (hasChoices) {
      renderChoicesList(npc_info.choices, npc_info.choiceData, npc_info.hideGoodbye);
    } else {
      // Append goodbye button for NPCs with no choices (like Nestor)
      const goodbyeButton = document.createElement('button');
      goodbyeButton.className = 'npc-choice-btn npc-goodbye-btn';
      goodbyeButton.textContent = '👋 Goodbye!';
      goodbyeButton.addEventListener('click', e => {
        e.stopPropagation();
        closeNpcPopup();
      });
      if (npcChoicesContainer) npcChoicesContainer.appendChild(goodbyeButton);
    }
  }

  npcPopup.classList.add('visible'); //ito na ung magiging visible ung npc popup
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

  // Intercept close if we are viewing a choice response; go back to choices instead
  if (npcCard && npcCard.classList.contains('viewing-choice')) {
    if (activeNpcBtn) {
      openNpcPopup(activeNpcBtn.getAttribute('data-npc'));
      return;
    }
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

// ==========================================
// MINI GAME LOGIC
// ==========================================


let reward1 = false;
let reward2 = false;

// ==========================================
// HELP LEGEND LOGIC
// ==========================================
if (helpBtn && helpLegend && legendCloseBtn) {
  helpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    helpLegend.classList.add('visible');
  });

  legendCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    helpLegend.classList.remove('visible');
  });

  // Close legend if clicking outside of it
  document.addEventListener('click', (e) => {
    if (helpLegend.classList.contains('visible') && !helpLegend.contains(e.target) && e.target !== helpBtn) {
      helpLegend.classList.remove('visible');
    }
  });
}