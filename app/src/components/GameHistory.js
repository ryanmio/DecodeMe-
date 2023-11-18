import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

const GameHistory = ({ gameHistory }) => {
  const formatCodeSnippet = (code) => code.replace(/```python\n|```python|```/g, '').trim();

  return (
    <div className="game-history text-left">
      <Accordion motionProps={{
        variants: {
          enter: { y: 0, opacity: 1, height: "auto", transition: { height: { type: "spring", stiffness: 500, damping: 30, duration: 1 }, opacity: { easings: "ease", duration: 1 } } },
          exit: { y: -10, opacity: 0, height: 0, transition: { height: { easings: "ease", duration: 0.25 }, opacity: { easings: "ease", duration: 0.3 } } },
        },
      }}>
        <AccordionItem key="full-results" aria-label="Full Results" title="Show Responses">
          <div>
            {gameHistory.map((entry, index) => {
              const formattedQuestion = formatCodeSnippet(entry.question);
              return (
                <div key={entry.id} className="game-history-entry bg-gray-50 rounded-lg shadow mb-6 p-2">
                  <div className="game-question text-gray-800">
                    <h3>Code Snippet {index + 1}</h3>
                    <CodeBlock
                      text={formattedQuestion}
                      language={"python"}
                      showLineNumbers={true}
                      theme={dracula}
                      wrapLines
                    />
                  </div>
                  <div className="game-answer text-gray-800 p-2">
                    <Tooltip
                      content={entry.isCorrect ? "Correct!" : "Incorrect!"}
                      delay={0}
                      closeDelay={0}
                      motionProps={{
                        variants: {
                          exit: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } },
                          enter: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
                        },
                      }}
                    >
                      <span className={`game-correct font-semibold ${entry.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {entry.isCorrect ? <span>&#10004; </span> : <span>&#10060; </span>}
                      </span>
                    </Tooltip>
                    My Answer: {entry.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameHistory;