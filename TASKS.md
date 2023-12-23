# DecodeMe! Project Tasks

## Overview
DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way. Users can choose from multiple game modes including multiple-choice, open-ended questions, and data analysis challenges.

## Tech Stack
- Next.js
- Firebase (Firestore, Authentication, Functions)
- OpenAI GPT-4 API
- Framer Motion
- React Code Blocks
- NextUI

## Setup
- Create Next.js app using `create-next-app`
- Set up Firebase project and enable Firestore and Authentication
- Install Firebase CLI and initialize Firebase Functions in project
- Get API key from OpenAI and integrate GPT-4 API for game logic
- Install necessary npm packages: `framer-motion`, `react-code-blocks`, `@nextui-org/react`


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
- [x] Implement leaderboard functionality
- [x] New Scoring System with 3 strikes and unlimited questions
- [x] Implement Post-Game Review to provide feedback on wrong answers
- [ ] Finalize post game review system and user messages and model
- [ ] Add streaks to UI
- [x] Add strikes to UI
- [ ] Implement daily streaks
- [ ] Implement high scores

### Core Features
- [x] Add "Log out" button in options menu
- [x] Implement history of past questions in options menu
- [x] Style the game history
- [x] Add "Skip this/Refresh" button in options menu
- [x] Add daily, weekly, lifetime scores in leaderboards
- [ ] Implement shareable score previews
- [ ] Implement daily streaks
- [ ] Add more stats to the history page like accuracy
- [ ] Finalize the system message
- [ ] Finalize the initial user message
- [x] Implement 'Chat with Code' feature
- [x] Implement learning levels in chat
- [x] Implement learning levels in scripts
- [ ] Implement custom instructions
- [ ] Create share game component with copy to clipboard link
- [ ] Implement bug reporting
- [ ] Implement GPT usage cap or rate limits
- [ ] Implement sign-in with gmail/github

### Future Release Features
- [ ] Implement challenge mode for friends
- [ ] Implement language selector
- [ ] Implement badges
 
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
- [ ] Make necessary adjustments based on feedback
- [ ] Final review and launch

