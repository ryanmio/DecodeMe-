"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_json"],{

/***/ "./node_modules/refractor/lang/json.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/json.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = json\njson.displayName = 'json'\njson.aliases = ['webmanifest']\nfunction json(Prism) {\n  // https://www.json.org/json-en.html\n  Prism.languages.json = {\n    property: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?=\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?!\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    comment: {\n      pattern: /\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n      greedy: true\n    },\n    number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n    punctuation: /[{}[\\],]/,\n    operator: /:/,\n    boolean: /\\b(?:false|true)\\b/,\n    null: {\n      pattern: /\\bnull\\b/,\n      alias: 'keyword'\n    }\n  }\n  Prism.languages.webmanifest = Prism.languages.json\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvanNvbi5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9qc29uLmpzP2I3MzIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0ganNvblxuanNvbi5kaXNwbGF5TmFtZSA9ICdqc29uJ1xuanNvbi5hbGlhc2VzID0gWyd3ZWJtYW5pZmVzdCddXG5mdW5jdGlvbiBqc29uKFByaXNtKSB7XG4gIC8vIGh0dHBzOi8vd3d3Lmpzb24ub3JnL2pzb24tZW4uaHRtbFxuICBQcmlzbS5sYW5ndWFnZXMuanNvbiA9IHtcbiAgICBwcm9wZXJ0eToge1xuICAgICAgcGF0dGVybjogLyhefFteXFxcXF0pXCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwiKD89XFxzKjopLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgIHN0cmluZzoge1xuICAgICAgcGF0dGVybjogLyhefFteXFxcXF0pXCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwiKD8hXFxzKjopLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBncmVlZHk6IHRydWVcbiAgICB9LFxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHBhdHRlcm46IC9cXC9cXC8uKnxcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgbnVtYmVyOiAvLT9cXGJcXGQrKD86XFwuXFxkKyk/KD86ZVsrLV0/XFxkKyk/XFxiL2ksXG4gICAgcHVuY3R1YXRpb246IC9be31bXFxdLF0vLFxuICAgIG9wZXJhdG9yOiAvOi8sXG4gICAgYm9vbGVhbjogL1xcYig/OmZhbHNlfHRydWUpXFxiLyxcbiAgICBudWxsOiB7XG4gICAgICBwYXR0ZXJuOiAvXFxibnVsbFxcYi8sXG4gICAgICBhbGlhczogJ2tleXdvcmQnXG4gICAgfVxuICB9XG4gIFByaXNtLmxhbmd1YWdlcy53ZWJtYW5pZmVzdCA9IFByaXNtLmxhbmd1YWdlcy5qc29uXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/json.js\n"));

/***/ })

}]);