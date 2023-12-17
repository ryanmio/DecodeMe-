"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_bnf"],{

/***/ "./node_modules/refractor/lang/bnf.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/bnf.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = bnf\nbnf.displayName = 'bnf'\nbnf.aliases = ['rbnf']\nfunction bnf(Prism) {\n  Prism.languages.bnf = {\n    string: {\n      pattern: /\"[^\\r\\n\"]*\"|'[^\\r\\n']*'/\n    },\n    definition: {\n      pattern: /<[^<>\\r\\n\\t]+>(?=\\s*::=)/,\n      alias: ['rule', 'keyword'],\n      inside: {\n        punctuation: /^<|>$/\n      }\n    },\n    rule: {\n      pattern: /<[^<>\\r\\n\\t]+>/,\n      inside: {\n        punctuation: /^<|>$/\n      }\n    },\n    operator: /::=|[|()[\\]{}*+?]|\\.{3}/\n  }\n  Prism.languages.rbnf = Prism.languages.bnf\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvYm5mLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDRCQUE0QixRQUFRLEVBQUU7QUFDdEM7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9ibmYuanM/ODQyZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBibmZcbmJuZi5kaXNwbGF5TmFtZSA9ICdibmYnXG5ibmYuYWxpYXNlcyA9IFsncmJuZiddXG5mdW5jdGlvbiBibmYoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLmJuZiA9IHtcbiAgICBzdHJpbmc6IHtcbiAgICAgIHBhdHRlcm46IC9cIlteXFxyXFxuXCJdKlwifCdbXlxcclxcbiddKicvXG4gICAgfSxcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICBwYXR0ZXJuOiAvPFtePD5cXHJcXG5cXHRdKz4oPz1cXHMqOjo9KS8sXG4gICAgICBhbGlhczogWydydWxlJywgJ2tleXdvcmQnXSxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogL148fD4kL1xuICAgICAgfVxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgcGF0dGVybjogLzxbXjw+XFxyXFxuXFx0XSs+LyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogL148fD4kL1xuICAgICAgfVxuICAgIH0sXG4gICAgb3BlcmF0b3I6IC86Oj18W3woKVtcXF17fSorP118XFwuezN9L1xuICB9XG4gIFByaXNtLmxhbmd1YWdlcy5yYm5mID0gUHJpc20ubGFuZ3VhZ2VzLmJuZlxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/bnf.js\n"));

/***/ })

}]);