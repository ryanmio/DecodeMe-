# DecodeMe!

## Overview
DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way. Users can choose from multiple game modes including multiple-choice, open-ended questions, and data analysis challenges.

## Work in Progress
This project is currently under development. Please check back for updates.

## Tech Stack
- Next.js
- Firebase (Firestore, Authentication, Functions)
- OpenAI GPT-4 API
- Framer Motion
- NextUI

## Setup
- Create Next.js app using `create-next-app`
- Set up Firebase project and enable Firestore and Authentication
- Install Firebase CLI and initialize Firebase Functions in project
- Get API key from OpenAI and integrate GPT-4 API for game logic
- Install necessary npm packages: `framer-motion`, `react-code-blocks`, `@nextui-org/react`

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

## OpenAI Integration

The game logic of DecodeMe! is powered by OpenAI's GPT-4 API. We use the API to generate code snippets and questions for the game. The API key is required to make requests to the OpenAI API. Please replace the placeholder in the project with your own API key.

## Firebase Interaction

Firebase is used for user authentication, storing game data, and user history. Firestore is used as the NoSQL database to store user data and game history. Firebase Authentication is used for user sign-in and sign-up. Firebase Functions are used for serverless backend functions such as fetching code snippets from the OpenAI API.

To interact with Firebase, initialize your Firebase project and replace the Firebase config in the project with your own. Install the Firebase CLI and initialize Firebase Functions in your project.

## Game Flow

1. Users sign in or sign up using Firebase Authentication.
2. Users choose a game mode.
3. The game fetches a code snippet and question from the OpenAI API.
4. Users answer the question based on the code snippet.
5. The game stores the user's answer and the correct answer in Firestore.
6. Users can view their game history on the history page.


## GPT Game Engine

## GPT Usage caps


## Dynamic SEO


## SSR/SSG/ISR


## Reusable GPT Chat Component


## Assistant Behavior


## Custom Instructions


## Learning Levels


## User Stats


## Modular context elements


## Commands (future build)