# DecodeMe!

## Project Overview

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

## PageSpeed Insights 
https://pagespeed.web.dev/analysis/https-decodeme-app/t8rp5vvta9?form_factor=desktop

## Dynamic SEO
For each game result page, we dynamically generate metadata tags such as title, description, and Open Graph (OG) tags. This ensures that each shared result has its own unique metadata, improving its visibility and shareability on social media platforms and search engines.

Example from results/[shareId].js:
```javacript
const metadata = {
  title: `Game Results for ${gameData?.leaderboardName}`,
  description: `Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`,
  image: 'https://decodeme.app/images/shareimage.png',
  url: `https://decodeme.app/results/${gameData?.id}`,
};
```

## Learning Levels

## Adaptive Learning based on User Performance

## Minimalism

## Gamification

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.