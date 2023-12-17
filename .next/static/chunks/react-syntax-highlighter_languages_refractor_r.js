"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_r"],{

/***/ "./node_modules/refractor/lang/r.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/r.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = r\nr.displayName = 'r'\nr.aliases = []\nfunction r(Prism) {\n  Prism.languages.r = {\n    comment: /#.*/,\n    string: {\n      pattern: /(['\"])(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n      greedy: true\n    },\n    'percent-operator': {\n      // Includes user-defined operators\n      // and %%, %*%, %/%, %in%, %o%, %x%\n      pattern: /%[^%\\s]*%/,\n      alias: 'operator'\n    },\n    boolean: /\\b(?:FALSE|TRUE)\\b/,\n    ellipsis: /\\.\\.(?:\\.|\\d+)/,\n    number: [\n      /\\b(?:Inf|NaN)\\b/,\n      /(?:\\b0x[\\dA-Fa-f]+(?:\\.\\d*)?|\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:[EePp][+-]?\\d+)?[iL]?/\n    ],\n    keyword:\n      /\\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\\b/,\n    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\\|\\|?|[+*\\/^$@~]/,\n    punctuation: /[(){}\\[\\],;]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvci5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsTUFBTTtBQUM3QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWZyYWN0b3IvbGFuZy9yLmpzPzRlNWQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gclxuci5kaXNwbGF5TmFtZSA9ICdyJ1xuci5hbGlhc2VzID0gW11cbmZ1bmN0aW9uIHIoUHJpc20pIHtcbiAgUHJpc20ubGFuZ3VhZ2VzLnIgPSB7XG4gICAgY29tbWVudDogLyMuKi8sXG4gICAgc3RyaW5nOiB7XG4gICAgICBwYXR0ZXJuOiAvKFsnXCJdKSg/OlxcXFwufCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgfSxcbiAgICAncGVyY2VudC1vcGVyYXRvcic6IHtcbiAgICAgIC8vIEluY2x1ZGVzIHVzZXItZGVmaW5lZCBvcGVyYXRvcnNcbiAgICAgIC8vIGFuZCAlJSwgJSolLCAlLyUsICVpbiUsICVvJSwgJXglXG4gICAgICBwYXR0ZXJuOiAvJVteJVxcc10qJS8sXG4gICAgICBhbGlhczogJ29wZXJhdG9yJ1xuICAgIH0sXG4gICAgYm9vbGVhbjogL1xcYig/OkZBTFNFfFRSVUUpXFxiLyxcbiAgICBlbGxpcHNpczogL1xcLlxcLig/OlxcLnxcXGQrKS8sXG4gICAgbnVtYmVyOiBbXG4gICAgICAvXFxiKD86SW5mfE5hTilcXGIvLFxuICAgICAgLyg/OlxcYjB4W1xcZEEtRmEtZl0rKD86XFwuXFxkKik/fFxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzpbRWVQcF1bKy1dP1xcZCspP1tpTF0/L1xuICAgIF0sXG4gICAga2V5d29yZDpcbiAgICAgIC9cXGIoPzpOQXxOQV9jaGFyYWN0ZXJffE5BX2NvbXBsZXhffE5BX2ludGVnZXJffE5BX3JlYWxffE5VTEx8YnJlYWt8ZWxzZXxmb3J8ZnVuY3Rpb258aWZ8aW58bmV4dHxyZXBlYXR8d2hpbGUpXFxiLyxcbiAgICBvcGVyYXRvcjogLy0+Pz4/fDwoPzo9fDw/LSk/fFs+PSFdPT98Ojo/fCYmP3xcXHxcXHw/fFsrKlxcL14kQH5dLyxcbiAgICBwdW5jdHVhdGlvbjogL1soKXt9XFxbXFxdLDtdL1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/r.js\n"));

/***/ })

}]);