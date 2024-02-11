# DecodeMe!

## Project Overview
DecodeMe! is a coding game with integrated language model. This is a work in progress.

## Tech Stack
- Next.js
- Firebase (Firestore, Authentication, Functions)
- OpenAI
- Framer Motion

## GPT Game Engine
DecodeMe! operates as a multi-agent system with specialized agents for different aspects of gameplay. All of the core game logic that would normally be written in code is instead written as natural language instructions. The instructions are parsed and distributed to the relevant agents in the system. Users can add their own custom instructions, which are first passed to a vetting-agent before being implemented. All this makes for a really unique and customizable gameplay that has never been possible before now.

## Agent Overview
An agent is anything that can perceive its environment through sensors and acts upon that environment through actuators. DecodeMe! employs a variety of specialized agents, each designed to handle different aspects of the game environment and user interactions.

### Types of Agents in DecodeMe!

<p align="center">
  <a href="https://www.geeksforgeeks.org/agents-artificial-intelligence/" target="_blank" rel="noopener noreferrer">
    <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/ai3-1.png" alt="Simple Reflex Agents" width="45%"/>
  </a>
  <a href="https://www.geeksforgeeks.org/agents-artificial-intelligence/" target="_blank" rel="noopener noreferrer">
    <img src="https://media.geeksforgeeks.org/wp-content/uploads/art1.png" alt="Model-Based Reflex Agents" width="45%"/>
  </a>
</p>
<p align="center">
  <em>Diagram 1: Simple Reflex Agents</em> &nbsp;&nbsp; | &nbsp;&nbsp; <em>Diagram 2: Model-Based Reflex Agents</em>
</p>

#### Simple Reflex Agents
These agents operate on a direct condition-action rule, meaning they choose actions based on the current percept, ignoring the rest of the percept history. The `CheckCustomInstructions` agent is a good example, as it reacts to user-submitted instructions without considering past interactions.

#### Model-Based Reflex Agents
These agents maintain an internal state of the world based on the current and previous percepts. The `getCodeSnippet.js` function is an example of one model-based reflex agent within the DecodeMe! multi-agent system, tasked with generating coding challenges tailored to the user's current game mode, learning level, and interaction history. This agent perceives its environment through HTTP requests which convey user data such as the preferred game mode, learning level, and any custom instructions provided by the user. It then queries the OpenAI API to generate a code snippet that aligns with the percieved game enviornment.

The `recalculateUserStats.js` function serves as a sensor within the system, recalculating the user's statistics upon the completion of a game. This recalibration includes the user's average score, high score, and counts of games played at each learning level. The sensor information is logged in a database to perceive the user's past game performance and update their statistics accordingly. This function maintains an internal state of the user's performance that evolves with each game played, enabling it to handle the partially observable environment of user interactions and performance metrics.

Together, these functions form a cohesive multi-agent system that enhances the user experience through personalized feedback and adaptive challenge generation. They operate with a degree of autonomy, perceiving their environment through various inputs and acting upon it through external APIs and database modifications.

By leveraging the capabilities of these specialized agents, DecodeMe! is creating a highly interactive and adaptive learning environment. This environment not only responds to the immediate inputs of the user but also evolves based on the user's progress and preferences.

## Agent Commands
Agent commands in DecodeMe! will introduce a new way for users to interact directly with the game's AI, enabling a more dynamic and responsive gameplay experience. These commands are designed to be intuitive and easy to use, allowing players to modify their game environment, seek help, or add personal notes through simple text commands.
- **/Instruct**: Allows users to modify the game's behavior or settings. For example, `/instruct make the game harder` would signal the game's backend to increase the difficulty level for the user's next challenge.
- **/Help**: Provides users with assistance on various aspects of the game. Typing `/help how do I change the difficulty level?` would trigger a search through the game's documentation to provide the user with a relevant answer.
- **/Remember**: Enables users to save personal notes or reminders within the game. For instance, `/remember review variable declaration` would save a note for the user to revisit the concept of variable declaration.

The implementation of agent commands will leverage function calling to interact with the OpenAI API and the game's database. When a user invokes a command, the app will parse the input to determine the action required. It will then execute a function call to either fetch information from the game's documentation, modify user settings in the database, or save user-specific notes.

## Chat Interface Module
The `ChatWithScript.js` component and related cloud function `chatWithScript` operates by receiving user inputs and environmental contexts via HTTP requests, which it processes to understand the user's current state, needs, and progression within the game.
The architecture of this module facilitates a continuous perception-action cycle, wherein the AI agent assimilates inputs from the user—ranging from queries to commands—and responds with customized feedback tailored to enhance the user's comprehension and proficiency. By implementing as a reusable React component, the game can simulate a persistent agent that interacts with the user across different stages of the game, despite the underlying mechanism being a constellation of cloud functions that process and act on environmental data. This reusable component design also allows for contextually relevant conversation starters to be dynamically passed to the chat module.


## Modular Context Elements
The chat interface is designed to allow users to add various context elements to enhance the conversation with the AI agent. Initially, the system supports adding code snippets as context elements, which in turn, the chat agent utilizes to generate responses that consider all added context elements. Other context elements will include past game questions, past chat logs, and personalized user notes called 'memories'.

## Custom Instructions
DecodeMe! utilizes both user-generated and system-generated custom instructions to customize the experience. Users can add their own custom instructions on the assistant settings page, which are vetted using an agent trained to detect misuse and abuse, then implemented throughout the app. This is a very powerful feature that allows the user to make very significant alterations to the game experience. There are also system-generated custom instructions that translate user actions into gameplay adjustments, such as when a user clicks the 'Play similar' button and the game generates custom instructions for the code generation agent.

## Safety Guardrails
The `checkCustomInstructions.js` function is a critical component of the DecodeMe! application, designed to safeguard the system against abuse and misuse by scrutinizing user-generated custom instructions. This function operates within the Firebase Functions environment, leveraging cloud-based triggers to automatically evaluate changes to the `customInstructions` field in the Firestore database.

Upon detection of an update to a user's custom instructions, the function executes a series of steps to assess the safety of the new instructions. It first identifies the specific instruction that has been altered by comparing the new and previous states of the `customInstructions` field. This comparison allows the function to isolate the instruction in question for further analysis.

The core of the safety assessment involves an API call to OpenAI, where the instruction is submitted for evaluation by a pre-trained model. This model is tasked with determining whether the instruction poses any risk of prompt injection, token smuggling, prompt leaking, or attempts to override established safety guardrails. The evaluation criteria are based on predefined safety protocols aimed at identifying patterns or content that could manipulate the AI's behavior or extract sensitive information.

If the AI model deems the instruction "unsafe," the function proceeds to clear the problematic instruction from the user's custom instructions field. Additionally, it logs a warning in a dedicated Firestore collection, providing an audit trail of detected misuse attempts. The user is also notified that their instruction was found to be unsafe and has been removed, reinforcing the importance of adhering to the platform's safety guidelines.

<p align="center">
  <img src="/public/images/safety.png" alt="Safety Message" width="50%"/>
</p>


## GPT Token Caps
To ensure fair usage and protect against potential abuse and misuse of our system, DecodeMe! has implemented a GPT token cap mechanism. This mechanism is supported by four key functions: `initializeUserCaps.js`, `checkUsageData.js`, `resetUsageData.js`, and the token tracking within `chatWithScript.js`, which collectively set, monitor, and manage the number of tokens each user can consume.

### Token Tracking
After generating a response using the OpenAI API, the function calculates the number of tokens consumed by the interaction. This is achieved by examining the `usage.total_tokens` property in the response from the OpenAI API. The function then updates the user's document in the Firestore database, incrementing the `gptCalls` and `gptTokens` fields by 1 and the number of tokens used, respectively.

### checkUsageData.js
The `checkUsageData.js` function monitors user activity in real-time, specifically looking for changes in the `gptCalls` and `gptTokens` fields within a user's document in the Firestore database. This function determines whether a user has exceeded their allocated token cap, which is set according to the user's account type.

The `initializeUserCaps.js` function sets initial GPT call and token caps (e.g., 100 calls or 100,000 tokens for standard accounts) when a user account is created. This setup allows for the dynamic adjustment of caps based on the account typeand provides admins with the flexibility to manually modify caps for specific users in the database with ease. Should a user's activity surpass their cap, their document is updated to mark the `capExceeded` field as `true`, thereby halting further GPT calls.

### resetUsageData.js
To accommodate legitimate usage that may reach the token cap, the `resetUsageData.js` function is designed to automatically reset the `gptCalls` and `gptTokens` fields to 0 for all users with signed-up accounts at midnight every day. This reset mechanism ensures that users can continue to engage with our system without facing permanent access disruption.

## SSR/SSG/ISR
The DecodeMe! app utilizes the full suite of rendering strategies provided by Next.js to optimize for performance, SEO, and user experience.

Server-Side Rendering (SSR)
- Used For: Pages that display user-specific data or need to fetch real-time data. This includes user settings, game results, and user stats pages.
- Why: SSR ensures that the content is personalized and up-to-date for each user visit. It also aids in SEO by serving fully rendered pages to search engines, making the content more indexable.

### Static Site Generation (SSG)
SSG is used to pre-render pages at build time. This approach generates static HTML files for pages that do not require real-time data, resulting in faster load times and improved SEO.

In leaderboard.js, we use SSG to pre-render the leaderboard page at build time. This approach allows us to serve a static version of the leaderboard to users, ensuring fast load times and a better user experience. We achieve this by using the getStaticProps function provided by Next.js.

```javascript
export const getStaticProps = async () => {
  try {
    const leaderboardData = await fetchLeaderboardData('lifetime');
    const props = {
      leaderboardData: JSON.parse(JSON.stringify(leaderboardData)),
    };
    return {
      props,
      revalidate: 7200, // Regenerate the page every 2 hours
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    const props = {
      leaderboardData: [],
      error: error.message,
    };
    return {
      props,
      revalidate: 7200,
    };
  }
};
```
In the code snippet above, getStaticProps fetches leaderboard data at build time. The revalidate option enables Incremental Static Regeneration (ISR), allowing the page to be regenerated at most every 7200 seconds (2 hours) upon request. This means the leaderboard will be up-to-date while still benefiting from the performance of static generation.

### Incremental Static Regeneration (ISR)
ISR allows us to update static content after the site has been built without needing to rebuild the entire site. This method combines the benefits of SSG with the flexibility of server-side rendering, enabling content to be updated periodically while still being served as static files. ISR is particularly useful for pages like the leaderboard, where static content benefits from periodic updates to reflect the latest data.

By leveraging SSR, SSG, and ISR, the DecodeMe! app achieves a balance between dynamic content delivery, performance, and search engine optimization.

### PageSpeed Insights 
The home page is highly-optimized and consistently maxes out Lighthouse Performance Report. (<a href="https://pagespeed.web.dev/analysis/https-decodeme-app/t8rp5vvta9?form_factor=desktop">Link</a>)
<p align="center">
  <a href="https://pagespeed.web.dev/analysis/https-decodeme-app/t8rp5vvta9?form_factor=desktop">
    <img src="/public/images/lighthouse.png" alt="Lighthouse report showing all 100s" />
  </a>
</p>

### Dynamic SEO
Server side rendering allows DecodeMe! to generate dynamic metadata tags such as title, description, and Open Graph (OG) tags. This means that when a user shares their game results, the SEO and sharing metadata can be customized to the user's game results instead of being generic for the app.

Example from results/[shareId].js:
```javascript
const metadata = {
  title: `Game Results for ${gameData?.leaderboardName}`,
  description: `Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`,
  image: 'https://decodeme.app/images/shareimage.png',
  url: `https://decodeme.app/results/${gameData?.id}`,
};
```
### Route Loading Animations
One drawback to server side rendering is the painfully slow time-to-first-byte. To make this more palatable I added a route-loading icon in the bottom right that animates during the server rendering wait time. The animation randomly switches between one of several visualized sorting algorithms including my favorites, heap, insert, and merge (examples below). I am really happy with how this turned out. I could watch sorting algorithms all day – I don't mind the route loading at all now. I almost wish it took longer sometimes!

<p align="center">
  <img src="/public/images/merge-sort.gif" alt="Merge Sort Visualization" />
  <img src="/public/images/heap-sort.gif" alt="Heap Sort Visualization" />
  <img src="/public/images/insert-sort.gif" alt="Insert Sort Visualization" />
</p>

## Learning Levels
There are three difficulty settings built-in to the game to give users a quick way to control their experience. The difficult setting, which I'm calling 'learning levels', affect all aspects of the game, from the assistant messages to the code challenges. Importantly, the 'learning level' is implemented directly in the GPT functions. Put another way, the learning levels are implemented as custom instructions with corresponding prompting to adapt the gameplay difficulty, voice, and tone. An example of how the user's selected learning level effects the game play can be seen in the API calls below:

## Adaptive Learning based on User Performance
The are two main ways the game adjusts itself autonomously based on the user's progress: in-game adjustments and between-game adjustments.

In-game adjustments are more straightforward. When a user decodes a snippet correctly, the code generation agent is instructed to increase the difficult level for the following snippet. When a user answers a question incorrectly, the code generation agent is instructed to generate a similar question.

Between-game difficulty adjusments include both system and user-directed adjustments. Starting with the latter, the user can set gameplay and assistant custom instructions to completely customize their gameplay. The end-game screen lists all the code snippets the user answered incorrectly and features 'play similar' and 'chat with assistant' functionalities. The history page shows all of the user's answered questions, including a module to review incorrect reponses and the same 'play more' and 'chat with assistant' functionality.

There are also several between-game learning path features that are implemented server-side with cloud functions. After each game ends, cloud functions recalculate the user's lifetime stats including average accuracy, high score, total games played, and the distribution of games across different learning levels (beginner, intermediate, expert). These recalculated statistics are then updated in the user's profile to reflect their most recent gaming activity, ensuring that the learning experience is tailored to their progress and performance. Another cloud function calculates daily streaks and updates the game leaderboard.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.