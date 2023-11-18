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
- [x] Implement input forms for user answers

### Game Logic
- [x] Develop function for fetching code snippets
- [x] Implement multiple-choice questions logic
- [ ] Implement open-ended questions logic (save for future release)
- [ ] Implement data analysis questions logic (save for future release)

### Scoring and Feedback
- [x] Develop scoring algorithm
- [ ] Implement leaderboard functionality

### Core Features
- [x] Add "Log out" button in options menu
- [ ] Implement history of past questions in options menu
- [ ] Add "Give me a hint" button in options menu
- [ ] Add "Skip this/Refresh" button in options menu
- [ ] Add daily, weekly, lifetime scores in leaderboards
- [ ] Implement shareable score previews
- [ ] Implement challenge mode for friends
- [ ] Implement daily streaks
- [ ] Implement language selector

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

### Progress Updates
#### 10/18/2023
Today, we made significant progress in debugging and enhancing the functionality of the DecodeMe! project.

##### Debugging

We encountered a TypeError in the CodeSnippetDisplay.js component, which was caused by an undefined data object. This was due to a failed fetch request to the server, which returned a 500 error. We updated the fetchCodeSnippet function to return an error object when there's an error, preventing the "Cannot read properties of undefined" error from occurring when there's an error with the fetch request.

We also handled a SyntaxError that occurred when the server returned a response that couldn't be parsed as JSON. We updated the fetchCodeSnippet function to handle non-JSON responses gracefully.

##### Code Enhancements

We updated the fetchCodeSnippet function in CodeSnippetDisplay.js to directly use the codeSnippet from the response data, eliminating the need for splitting the response text.

We also updated the useEffect hook in CodeSnippetDisplay.js to use the codeSnippet from the response data.

```javascript
useEffect(() => {
  fetchCodeSnippet(gameMode, conversationHistory).then(data => {
    setCodeSnippet(data.codeSnippet);
    setConversationHistory(data.conversationHistory);
    onCodeSnippetFetch(data);
  });
}, [gameMode, onCodeSnippetFetch, conversationHistory]);
```

#####  Next Steps

Moving forward, we need to:

1. Test the updated fetchCodeSnippet function and useEffect hook in CodeSnippetDisplay.js to ensure they work as expected.
2. Continue developing the game logic in the index.js file.
3. Implement the scoring and leaderboard features.
4. Conduct end-to-end testing to ensure all components work together seamlessly.
5. Deploy the application and conduct user testing to gather feedback for further improvements.


## DecodeMe Project Summary

### Game Basics
- Multiple-choice Python code questions.
- Question difficulty adjusts based on user performance.

### Options Menu
- "Give me a hint" button.
- "Log out" button.
- "Skip this/Refresh" button.
- History of past questions.
- Adjustable text size.

### User Onboarding
- Prompt for a display name upon first play.
- Account creation for saving progress, prompted at game end.
- Optional email for updates.

### Leaderboards
- Daily, weekly, lifetime scores.
- Multilanguage support.

### Social Features
- Shareable score previews.
- Challenge mode for friends.

### User Engagement
- Daily streaks using last incorrect question as baseline.
  
### Scoring
- Opted for a simple, flat point system due to constraints with dynamically generated questions.
