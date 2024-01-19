# DecodeMe! Project Tasks

## App Overview
DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way. Users can choose from multiple game modes including multiple-choice, open-ended questions, and a daily challenge.

## Instructions for AI Agent (YOUR INSTRUCTIONS)
- The user is on MacOS using Visual Studio Code
- The user prefers MacOS terminal
- Never generate typescript even if the user provides an example in typescript
- An implementation plan is a step by step, start-to-finish outline of everything required to complete to given task.
- Always check your work by reviewing the conversation up to that point and correcting any previous errors or inconsistencies.

## Tech Stack
- Next.js using pages router
- Firebase (Firestore, Authentication, Functions)
- OpenAI GPT-4 API
- Framer Motion
- React Code Blocks
- NextUI


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

### Scoring and Feedback
- [x] Develop scoring algorithm
- [x] Implement leaderboard functionality
- [x] New Scoring System with 3 strikes and unlimited questions
- [x] Implement Post-Game Review to provide feedback on wrong answers
- [x] Add streaks to UI
- [x] Add strikes to UI
- [x] Implement daily streaks
- [x] Implement high scores

### Core Tasks
- [x] Add "Log out" button in options menu
- [x] Implement history of past questions in options menu
- [x] Style the game history
- [x] Add "Skip this/Refresh" button in options menu
- [x] Add daily, weekly, lifetime scores in leaderboards
- [x] Implement daily streaks
- [x] Finalize the system message
- [x] Finalize the initial user message
- [x] Implement 'Chat with Code' feature
- [x] Implement learning levels in chat
- [x] Implement learning levels in scripts
- [x] Create share game component with copy to clipboard link
- [x] Implement Dynamic SEO
- [x] Implement User Stats page
- [x] Implement GPT usage cap or rate limits
- [x] Implement custom instructions
- [x] Sound effects
- [x] Custom instruction guardrails
- [x] Leadeboard name generator
- [ ] "Play more like this" functionality
- [ ] Integrate Google Analytics
- [ ] Implement AI commands
  - [ ] /Instruct
  - [ ] /Help
  - [ ] /Remember

### Future Release Features
- [ ] Sidebar Mode for Chat
- [ ] Open-ended mode
- [ ] Daily challenge mode
- [ ] sign-in with google/github
- [ ] Support for other lanaguages aside from python
- [ ] Profile badges
- [ ] Bug reporting
- [ ] Shareable score previews
- [ ] Notification for events like new high score
- [ ] Dark Mode
- [ ] Whisper api
- [ ] Implement modular context blocks
  - [ ] @convo-[conversationTitle]-[conversationDate]
  - [ ] @question-[questionId]
  - [ ] @memory-[memoryName]

### Bugs and Issues
- [x] Layout shift when loading auth component as logged out user
- [x] Options menu on leaderboard page has no other options other than leaderboard
- [x] Game History needs loading animaton to prevent massive layout shift
- [x] Assistant settings save needs to give user confirmation. Add toast.
- [x] Chatbot and Endgame Custom Instructions should be disabled until functional
- [x] Switch out the heart icon for a react-icon
- [x] Scorecard stats should have tool tip with description
- [x] Add 404 Page
- [x] add wrong password toast
- [x] prevent create account until email + password are entered
- [x] error handling on auth component
- [x] ask for leaderboard name after account create
- [x] Improve New user flow
- [x] add forgot password link
- [x] Game History should have sort by score feature
- [x] Enter should send chat message
- [x] Needs mobile styles
- [x] Update background
- [x] Fix results page
- [x] Default sound should be quieter
- [x] Add mute option
- [ ] Game History should have chat with tutor button and enable chat window
- [ ] Button colors should be consistent throughout app
- [ ] Prevent layout shift in leaderboard when using filters
- [ ] Implement account upgrade option
- [ ] accessibility audit
- [ ] Finalize post game review system and user messages
 
### Testing
- [ ] Test anonymous user flow
- [ ] UI tests for frontend
- [ ] Test sign up flow

### Deployment
- [x] Deploy backend to cloud provider
- [x] Deploy frontend to web hosting service

### Documentation
- [ ] Create user manual
- [ ] Write API documentation

### Final Steps
- [ ] Conduct user testing
- [ ] Full launch