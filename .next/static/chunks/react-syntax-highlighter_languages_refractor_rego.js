"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_rego"],{

/***/ "./node_modules/refractor/lang/rego.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/rego.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = rego\nrego.displayName = 'rego'\nrego.aliases = []\nfunction rego(Prism) {\n  // https://www.openpolicyagent.org/docs/latest/policy-reference/\n  Prism.languages.rego = {\n    comment: /#.*/,\n    property: {\n      pattern:\n        /(^|[^\\\\.])(?:\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|`[^`]*`|\\b[a-z_]\\w*\\b)(?=\\s*:(?!=))/i,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|`[^`]*`/,\n      lookbehind: true,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:as|default|else|import|not|null|package|set(?=\\s*\\()|some|with)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    function: {\n      pattern: /\\b[a-z_]\\w*\\b(?:\\s*\\.\\s*\\b[a-z_]\\w*\\b)*(?=\\s*\\()/i,\n      inside: {\n        namespace: /\\b\\w+\\b(?=\\s*\\.)/,\n        punctuation: /\\./\n      }\n    },\n    number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n    operator: /[-+*/%|&]|[<>:=]=?|!=|\\b_\\b/,\n    punctuation: /[,;.\\[\\]{}()]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvcmVnby5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9yZWdvLmpzP2RiMmEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcmVnb1xucmVnby5kaXNwbGF5TmFtZSA9ICdyZWdvJ1xucmVnby5hbGlhc2VzID0gW11cbmZ1bmN0aW9uIHJlZ28oUHJpc20pIHtcbiAgLy8gaHR0cHM6Ly93d3cub3BlbnBvbGljeWFnZW50Lm9yZy9kb2NzL2xhdGVzdC9wb2xpY3ktcmVmZXJlbmNlL1xuICBQcmlzbS5sYW5ndWFnZXMucmVnbyA9IHtcbiAgICBjb21tZW50OiAvIy4qLyxcbiAgICBwcm9wZXJ0eToge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgLyhefFteXFxcXC5dKSg/OlwiKD86XFxcXC58W15cXFxcXCJcXHJcXG5dKSpcInxgW15gXSpgfFxcYlthLXpfXVxcdypcXGIpKD89XFxzKjooPyE9KSkvaSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgIHN0cmluZzoge1xuICAgICAgcGF0dGVybjogLyhefFteXFxcXF0pXCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwifGBbXmBdKmAvLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAga2V5d29yZDpcbiAgICAgIC9cXGIoPzphc3xkZWZhdWx0fGVsc2V8aW1wb3J0fG5vdHxudWxsfHBhY2thZ2V8c2V0KD89XFxzKlxcKCl8c29tZXx3aXRoKVxcYi8sXG4gICAgYm9vbGVhbjogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcbiAgICBmdW5jdGlvbjoge1xuICAgICAgcGF0dGVybjogL1xcYlthLXpfXVxcdypcXGIoPzpcXHMqXFwuXFxzKlxcYlthLXpfXVxcdypcXGIpKig/PVxccypcXCgpL2ksXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgbmFtZXNwYWNlOiAvXFxiXFx3K1xcYig/PVxccypcXC4pLyxcbiAgICAgICAgcHVuY3R1YXRpb246IC9cXC4vXG4gICAgICB9XG4gICAgfSxcbiAgICBudW1iZXI6IC8tP1xcYlxcZCsoPzpcXC5cXGQrKT8oPzplWystXT9cXGQrKT9cXGIvaSxcbiAgICBvcGVyYXRvcjogL1stKyovJXwmXXxbPD46PV09P3whPXxcXGJfXFxiLyxcbiAgICBwdW5jdHVhdGlvbjogL1ssOy5cXFtcXF17fSgpXS9cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/rego.js\n"));

/***/ })

}]);