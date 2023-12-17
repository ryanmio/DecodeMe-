"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_ebnf"],{

/***/ "./node_modules/refractor/lang/ebnf.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/ebnf.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = ebnf\nebnf.displayName = 'ebnf'\nebnf.aliases = []\nfunction ebnf(Prism) {\n  Prism.languages.ebnf = {\n    comment: /\\(\\*[\\s\\S]*?\\*\\)/,\n    string: {\n      pattern: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/,\n      greedy: true\n    },\n    special: {\n      pattern: /\\?[^?\\r\\n]*\\?/,\n      greedy: true,\n      alias: 'class-name'\n    },\n    definition: {\n      pattern: /^([\\t ]*)[a-z]\\w*(?:[ \\t]+[a-z]\\w*)*(?=\\s*=)/im,\n      lookbehind: true,\n      alias: ['rule', 'keyword']\n    },\n    rule: /\\b[a-z]\\w*(?:[ \\t]+[a-z]\\w*)*\\b/i,\n    punctuation: /\\([:/]|[:/]\\)|[.,;()[\\]{}]/,\n    operator: /[-=|*/!]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvZWJuZi5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL2VibmYuanM/ZjI0NyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBlYm5mXG5lYm5mLmRpc3BsYXlOYW1lID0gJ2VibmYnXG5lYm5mLmFsaWFzZXMgPSBbXVxuZnVuY3Rpb24gZWJuZihQcmlzbSkge1xuICBQcmlzbS5sYW5ndWFnZXMuZWJuZiA9IHtcbiAgICBjb21tZW50OiAvXFwoXFwqW1xcc1xcU10qP1xcKlxcKS8sXG4gICAgc3RyaW5nOiB7XG4gICAgICBwYXR0ZXJuOiAvXCJbXlwiXFxyXFxuXSpcInwnW14nXFxyXFxuXSonLyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgc3BlY2lhbDoge1xuICAgICAgcGF0dGVybjogL1xcP1teP1xcclxcbl0qXFw/LyxcbiAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnY2xhc3MtbmFtZSdcbiAgICB9LFxuICAgIGRlZmluaXRpb246IHtcbiAgICAgIHBhdHRlcm46IC9eKFtcXHQgXSopW2Etel1cXHcqKD86WyBcXHRdK1thLXpdXFx3KikqKD89XFxzKj0pL2ltLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiBbJ3J1bGUnLCAna2V5d29yZCddXG4gICAgfSxcbiAgICBydWxlOiAvXFxiW2Etel1cXHcqKD86WyBcXHRdK1thLXpdXFx3KikqXFxiL2ksXG4gICAgcHVuY3R1YXRpb246IC9cXChbOi9dfFs6L11cXCl8Wy4sOygpW1xcXXt9XS8sXG4gICAgb3BlcmF0b3I6IC9bLT18Ki8hXS9cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/ebnf.js\n"));

/***/ })

}]);