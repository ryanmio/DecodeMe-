// IncorrectReview.js
import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Accordion, AccordionItem, Tooltip } from "@nextui-org/react";
import ReviewMenu from './ReviewMenu';

const LANGUAGE = "python";

const IncorrectReview = ({ incorrectAnswers, onChatWithTutor, onPlaySimilar, resetGame }) => {
  const formatCodeSnippet = (code) => code.replace(new RegExp(`\`\`\`${LANGUAGE}\n|\`\`\`${LANGUAGE}|\`\`\``, 'g'), '').trim();

  return (
    <div className="incorrect-review text-left">
      <Accordion defaultExpandedKeys={["incorrect-results"]} motionProps={{
        variants: {
          enter: { y: 0, opacity: 1, height: "auto", transition: { height: { type: "spring", stiffness: 500, damping: 30, duration: 1 }, opacity: { easings: "ease", duration: 1 } } },
          exit: { y: -10, opacity: 0, height: 0, transition: { height: { easings: "ease", duration: 0.25 }, opacity: { easings: "ease", duration: 0.3 } } },
        },
      }}>
        <AccordionItem key="incorrect-results" aria-label="Incorrect Results" title="Review Incorrect Responses">
          <div>
            {incorrectAnswers.map((item, index) => {
              const formattedQuestion = formatCodeSnippet(item.question);
              return (
                <div key={index} className="incorrect-review-entry bg-gray-50 rounded-lg shadow mb-6 p-2">
                  <div className="incorrect-question text-gray-800">
                    <CodeBlock
                      text={formattedQuestion}
                      language={LANGUAGE}
                      showLineNumbers={true}
                      theme={dracula}
                      wrapLines
                    />
                  </div>
                  <div className="incorrect-answer text-gray-800 p-2">
                    <Tooltip
                      content={"Incorrect!"}
                      delay={0}
                      closeDelay={0}
                      motionProps={{
                        variants: {
                          exit: { opacity: 0, transition: { duration: 0.1, ease: "easeIn" } },
                          enter: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
                        },
                      }}
                    >
                      <span className="incorrect font-semibold text-red-500">
                        <span>&#10060; </span>
                      </span>
                    </Tooltip>
                    Your Answer: {item.answer}
                  </div>
                  <div className="correct-answer text-gray-800 p-2">
                    Correct Answer: {item.correctAnswer}
                  </div>
                  <ReviewMenu selectedScript={item} onChatWithTutor={onChatWithTutor} onPlaySimilar={onPlaySimilar} resetGame={resetGame} />
                </div>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default IncorrectReview;