"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_bbcode"],{

/***/ "./node_modules/refractor/lang/bbcode.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/bbcode.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = bbcode\nbbcode.displayName = 'bbcode'\nbbcode.aliases = ['shortcode']\nfunction bbcode(Prism) {\n  Prism.languages.bbcode = {\n    tag: {\n      pattern:\n        /\\[\\/?[^\\s=\\]]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\"\\]=]+))?(?:\\s+[^\\s=\\]]+\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\"\\]=]+))*\\s*\\]/,\n      inside: {\n        tag: {\n          pattern: /^\\[\\/?[^\\s=\\]]+/,\n          inside: {\n            punctuation: /^\\[\\/?/\n          }\n        },\n        'attr-value': {\n          pattern: /=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\"\\]=]+)/,\n          inside: {\n            punctuation: [\n              /^=/,\n              {\n                pattern: /^(\\s*)[\"']|[\"']$/,\n                lookbehind: true\n              }\n            ]\n          }\n        },\n        punctuation: /\\]/,\n        'attr-name': /[^\\s=\\]]+/\n      }\n    }\n  }\n  Prism.languages.shortcode = Prism.languages.bbcode\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvYmJjb2RlLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvYmJjb2RlLmpzP2E0NzkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYmJjb2RlXG5iYmNvZGUuZGlzcGxheU5hbWUgPSAnYmJjb2RlJ1xuYmJjb2RlLmFsaWFzZXMgPSBbJ3Nob3J0Y29kZSddXG5mdW5jdGlvbiBiYmNvZGUoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLmJiY29kZSA9IHtcbiAgICB0YWc6IHtcbiAgICAgIHBhdHRlcm46XG4gICAgICAgIC9cXFtcXC8/W15cXHM9XFxdXSsoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCJcXF09XSspKT8oPzpcXHMrW15cXHM9XFxdXStcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCJcXF09XSspKSpcXHMqXFxdLyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICB0YWc6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAvXlxcW1xcLz9bXlxccz1cXF1dKy8sXG4gICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICBwdW5jdHVhdGlvbjogL15cXFtcXC8/L1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2F0dHItdmFsdWUnOiB7XG4gICAgICAgICAgcGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiXFxdPV0rKS8sXG4gICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICBwdW5jdHVhdGlvbjogW1xuICAgICAgICAgICAgICAvXj0vLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0dGVybjogL14oXFxzKilbXCInXXxbXCInXSQvLFxuICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHVuY3R1YXRpb246IC9cXF0vLFxuICAgICAgICAnYXR0ci1uYW1lJzogL1teXFxzPVxcXV0rL1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBQcmlzbS5sYW5ndWFnZXMuc2hvcnRjb2RlID0gUHJpc20ubGFuZ3VhZ2VzLmJiY29kZVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/bbcode.js\n"));

/***/ })

}]);