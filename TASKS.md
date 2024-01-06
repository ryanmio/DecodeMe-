# DecodeMe! Project Tasks

## App Overview
DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way. Users can choose from multiple game modes including multiple-choice, open-ended questions, and data analysis challenges.

## Instructions for AI Agents
- The user is on MacOS using VS Code IDE
- The user uses macos terminal
- Never generate typescript even if the user provides an example in typescript
- An implementation plan is a step by step, start-to-finish outline of everything required to complete to given task.
- Always check your work by reviewing the conversation up to that point and correcting any previous errors or inconsistencies.

## Tech Stack
- Next.js
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
- [ ] Implement open-ended questions logic (save for future release)
- [ ] Implement daily challenge questions logic (save for future release)

### Scoring and Feedback
- [x] Develop scoring algorithm
- [x] Implement leaderboard functionality
- [x] New Scoring System with 3 strikes and unlimited questions
- [x] Implement Post-Game Review to provide feedback on wrong answers
- [x] Add streaks to UI
- [x] Add strikes to UI
- [x] Implement daily streaks
- [x] Implement high scores
- [ ] Finalize post game review system and user messages

### Core Features
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
- [ ] Implement custom instructions
- [ ] Implement AI commands
  - [ ] /Instruct
  - [ ] /Help
  - [ ] /Remember
- [x] Implement GPT usage cap or rate limits
- [ ] Implement account upgrade option

### Future Release Features
- [ ] Sidebar Mode for Chat
- [ ] Implement sign-in with gmail/github/snapchat
- [ ] Implement challenge mode for friends
- [ ] Implement language selector
- [ ] Implement badges
- [ ] Implement bug reporting
- [ ] Add more stats to the history page like accuracy
- [ ] Implement shareable score previews
- [ ] Implement notification for events like new high score
- [ ] Implement modular context blocks
  - [ ] @convo-[conversationTitle]-[conversationDate]
  - [ ] @question-[questionId]
  - [ ] @memory-[memoryName]
- [ ] Dark Mode
- [ ] leadeboard name generator 

### Bugs and Issues
- [x] Layout shift when loading auth component as logged out user
- [x] Options menu on leaderboard page has no other options other than leaderboard
- [x] Game History needs loading animaton to prevent massive layout shift
- [x] Assistant settings save needs to give user confirmation. Add toast.
- [x] Chatbot and Endgame Custom Instructions should be disabled until functional
- [x] Switch out the heart icon for a react-icon https://react-icons.github.io/react-icons/search/#q=heart
- [x] Scorecard stats should have tool tip with description
- [x] Add 404 Page
- [ ] Game History should have chat with tutor button and enable chat window
- [ ] Game History should have sort by score feature
- [ ] Options menu icon should probably be a down icon or something differnt now that it is a contextual dropdown menu
- [ ] Button colors should be consistent throughout app
- [ ] Prevent layout shift in leaderboard when using filters
 
### Testing
- [ ] Test anonymous user flow
- [ ] UI tests for frontend

### Deployment
- [x] Deploy backend to cloud provider
- [x] Deploy frontend to web hosting service

### Documentation
- [ ] Create user manual
- [ ] Write API documentation

### Final Steps
- [ ] Conduct user testing
- [ ] Full launch