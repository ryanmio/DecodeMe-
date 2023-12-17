"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_prolog"],{

/***/ "./node_modules/refractor/lang/prolog.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/prolog.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = prolog\nprolog.displayName = 'prolog'\nprolog.aliases = []\nfunction prolog(Prism) {\n  Prism.languages.prolog = {\n    // Syntax depends on the implementation\n    comment: {\n      pattern: /\\/\\*[\\s\\S]*?\\*\\/|%.*/,\n      greedy: true\n    },\n    // Depending on the implementation, strings may allow escaped newlines and quote-escape\n    string: {\n      pattern: /([\"'])(?:\\1\\1|\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\\\r\\n])*\\1(?!\\1)/,\n      greedy: true\n    },\n    builtin: /\\b(?:fx|fy|xf[xy]?|yfx?)\\b/,\n    // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?\n    function: /\\b[a-z]\\w*(?:(?=\\()|\\/\\d+)/,\n    number: /\\b\\d+(?:\\.\\d*)?/,\n    // Custom operators are allowed\n    operator: /[:\\\\=><\\-?*@\\/;+^|!$.]+|\\b(?:is|mod|not|xor)\\b/,\n    punctuation: /[(){}\\[\\],]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvcHJvbG9nLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLHVCQUF1QjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9wcm9sb2cuanM/YmVjNSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcm9sb2dcbnByb2xvZy5kaXNwbGF5TmFtZSA9ICdwcm9sb2cnXG5wcm9sb2cuYWxpYXNlcyA9IFtdXG5mdW5jdGlvbiBwcm9sb2coUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLnByb2xvZyA9IHtcbiAgICAvLyBTeW50YXggZGVwZW5kcyBvbiB0aGUgaW1wbGVtZW50YXRpb25cbiAgICBjb21tZW50OiB7XG4gICAgICBwYXR0ZXJuOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3wlLiovLFxuICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgfSxcbiAgICAvLyBEZXBlbmRpbmcgb24gdGhlIGltcGxlbWVudGF0aW9uLCBzdHJpbmdzIG1heSBhbGxvdyBlc2NhcGVkIG5ld2xpbmVzIGFuZCBxdW90ZS1lc2NhcGVcbiAgICBzdHJpbmc6IHtcbiAgICAgIHBhdHRlcm46IC8oW1wiJ10pKD86XFwxXFwxfFxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEoPyFcXDEpLyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgYnVpbHRpbjogL1xcYig/OmZ4fGZ5fHhmW3h5XT98eWZ4PylcXGIvLFxuICAgIC8vIEZJWE1FOiBTaG91bGQgd2UgbGlzdCBhbGwgbnVsbC1hcnkgcHJlZGljYXRlcyAobm90IGZvbGxvd2VkIGJ5IGEgcGFyZW50aGVzaXMpIGxpa2UgaGFsdCwgdHJhY2UsIGV0Yy4/XG4gICAgZnVuY3Rpb246IC9cXGJbYS16XVxcdyooPzooPz1cXCgpfFxcL1xcZCspLyxcbiAgICBudW1iZXI6IC9cXGJcXGQrKD86XFwuXFxkKik/LyxcbiAgICAvLyBDdXN0b20gb3BlcmF0b3JzIGFyZSBhbGxvd2VkXG4gICAgb3BlcmF0b3I6IC9bOlxcXFw9PjxcXC0/KkBcXC87K158ISQuXSt8XFxiKD86aXN8bW9kfG5vdHx4b3IpXFxiLyxcbiAgICBwdW5jdHVhdGlvbjogL1soKXt9XFxbXFxdLF0vXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/prolog.js\n"));

/***/ })

}]);