# DecodeMe! Project Tasks

## Overview
DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way. Users can choose from multiple game modes including multiple-choice, open-ended questions, and data analysis challenges.

## Core Features
1. User Authentication
2. Game Mode Selection
3. Code Snippet Display
4. User Input for Answers
5. Scoring and Leaderboards

## Tasks

### Initialization
- [x] Create GitHub repo named "DecodeMe"
- [x] Initialize project directory structure

### Backend Development
- [x] Set up serverless functions with Firebase Functions
  - [x] Install Firebase CLI
  - [x] Initialize Firebase Functions in project
- [x] Integrate OpenAI GPT-4 API for game logic
  - [x] Get API key from OpenAI
  - [x] Write function to communicate with GPT-4
- [x] Implement User Authentication
  - [x] Set up Firebase Authentication
  - [x] Implement ID token validation in functions
- [x] Create API routes for game modes
  - [x] Define API structure for different game modes
  - [x] Implement game logic in Firebase Functions

### Frontend Development
- [x] Implement Firebase Authentication in frontend
- [x] Build a working signup page
- [x] Create game mode selection UI
- [x] Design UI for displaying code snippets
- [ ] Implement input forms for user answers

### Game Logic
- [x] Develop function for fetching code snippets
- [ ] Implement multiple-choice questions logic
- [ ] Implement open-ended questions logic (save for future release)
- [ ] Implement data analysis questions logic (save for future release)

### Scoring and Feedback
- [ ] Develop scoring algorithm
- [ ] Implement leaderboard functionality

### Testing
- [ ] Unit tests for backend functions
- [ ] UI tests for frontend
- [ ] End-to-end tests

### Deployment
- [x] Deploy backend to cloud provider
- [ ] Deploy frontend to web hosting service

### Documentation
- [ ] Create user manual
- [ ] Write API documentation

### Final Steps
- [ ] Conduct user testing
- [ ] Make necessary adjustments based on feedback
- [ ] Final review and launch

### Originally Planned Project Directory Structure
.
├── backend
│ ├── firebase_functions
│ │ ├── auth.js
│ │ ├── game_logic.js
│ │ └── api_routes.js
│ └── serverless.js
├── firebase.json
├── frontend
│ ├── game_mode_selection_ui.js
│ ├── code_snippet_display.js
│ ├── user_answer_input.js
│ └── main.js
├── functions
│ ├── index.js
│ ├── gpt4chat.js
│ └── user_auth.js
├── node_modules
├── package-lock.json
├── package.json
├── LICENSE
├── TASKS.md
└── utilities
├── scoring_algorithm.js
├── leaderboard.js
└── tests
├── unit_tests.js
├── ui_tests.js
└── end_to_end_tests.js

### Current Acutal Project Directory
.
|____app
| |____tailwind.config.js
| |____next.config.js
| |____public
| |____postcss.config.js
| |____src
| | |____layout.js
| | |____components
| | | |____Auth.js
| | | |____GameModeSelection.js
| | | |____CodeSnippetDisplay.js
| | | |____UserAnswerInput.js
| | |____pages
| | | |____index.js
| | |____firebase.js
|____functions
| |____index.js
| |____.eslintrc.js
| |____index copy.js

