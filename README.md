# DecodeMe!

## Project Overview
DecodeMe! is a coding game with integrated language model.

## Tech Stack
- Next.js
- Firebase (Firestore, Authentication, Functions)
- OpenAI
- Framer Motion

## GPT Game Engine

## Assistant Behavior

## Agent Overview

### Agent Roles and Settings
#### FetchCodeSnippet
#### FetchPostGameMessage
#### ChatWithScript
#### CheckCustomInstructions
#### GenerateLeaderboardName

## Agent Commands

## Reusable GPT Chat Component

## Modular context elements (future build)

## Custom Instructions

## Safety Guardrails

## GPT Usage caps

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
https://pagespeed.web.dev/analysis/https-decodeme-app/t8rp5vvta9?form_factor=desktop

### Dynamic SEO
Server side rendering allows DecodeMe! to generate dynamic metadata tags such as title, description, and Open Graph (OG) tags. This means that when a user shares their game results, the SEO and sharing metadata can be customized to the user's game results instead of being generic for the app.

Example from results/[shareId].js:
```javacript
const metadata = {
  title: `Game Results for ${gameData?.leaderboardName}`,
  description: `Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`,
  image: 'https://decodeme.app/images/shareimage.png',
  url: `https://decodeme.app/results/${gameData?.id}`,
};
```

One drawback to server side rendering is the painfully slow time-to-first-byte. To make this more palatable I added a route-loading icon in the bottom right that animates during the server rendering wait time. The animation randomly switches between one of several visualized sorting algorithms including my favorites, heap, insert, and merge (examples below). I am really happy with how this turned out. I could watch sorting algorithms all day – I don't mind the route loading at all now. I almost wish it took longer sometimes!

## Learning Levels
There are three difficulty settings built-in to the game to give users a quick way to control their experience. The difficult setting, which I'm calling 'learning levels', affect all aspects of the game, from the assistant messages to the code challenges. Importantly, the 'learning level' is implemented directly in the GPT functions. Put another way, the learning levels are implemented as custom instructions with corresponding prompting to adapt the gameplay difficulty, voice, and tone. An example of how the user's selected learning level effects the game play can be seen in the API calls below:

## Adaptive Learning based on User Performance
The are two main ways the game adjusts itself autonomously based on the user's progress: in-game adjustments and between-game adjustments.

In-game adjustments are more straightforward. When a user decodes a snippet correctly, the code generation agent is instructed to increase the difficult level for the following snippet. When a user answers a question incorrectly, the code generation agent is instructed to generate a similar question.

Between-game difficulty adjusments include both system and user-directed adjustments. Starting with the latter, the user can set gameplay and assistant custom instructions to completely customize their gameplay. The end-game screen lists all the code snippets the user answered incorrectly and features 'play similar' and 'chat with assistant' functionalities. The history page shows all of the user's answered questions, including a module to review incorrect reponses and the same 'play more' and 'chat with assistant' functionality.

There are also several between-game learning path features that are implemented server-side with cloud functions. After each game ends, cloud functions recalculate the user's lifetime stats including average accuracy, high score, total games played, and the distribution of games across different learning levels (beginner, intermediate, expert). These recalculated statistics are then updated in the user's profile to reflect their most recent gaming activity, ensuring that the learning experience is tailored to their progress and performance. Another cloud function calculates daily streaks and updates the game leaderboard.

## Minimalism

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.