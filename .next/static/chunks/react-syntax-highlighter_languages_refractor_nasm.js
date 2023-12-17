"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_nasm"],{

/***/ "./node_modules/refractor/lang/nasm.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/nasm.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = nasm\nnasm.displayName = 'nasm'\nnasm.aliases = []\nfunction nasm(Prism) {\n  Prism.languages.nasm = {\n    comment: /;.*$/m,\n    string: /([\"'`])(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n    label: {\n      pattern: /(^\\s*)[A-Za-z._?$][\\w.?$@~#]*:/m,\n      lookbehind: true,\n      alias: 'function'\n    },\n    keyword: [\n      /\\[?BITS (?:16|32|64)\\]?/,\n      {\n        pattern: /(^\\s*)section\\s*[a-z.]+:?/im,\n        lookbehind: true\n      },\n      /(?:extern|global)[^;\\r\\n]*/i,\n      /(?:CPU|DEFAULT|FLOAT).*$/m\n    ],\n    register: {\n      pattern:\n        /\\b(?:st\\d|[xyz]mm\\d\\d?|[cdt]r\\d|r\\d\\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\\b/i,\n      alias: 'variable'\n    },\n    number:\n      /(?:\\b|(?=\\$))(?:0[hx](?:\\.[\\da-f]+|[\\da-f]+(?:\\.[\\da-f]+)?)(?:p[+-]?\\d+)?|\\d[\\da-f]+[hx]|\\$\\d[\\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\\d+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:\\.?e[+-]?\\d+)?[dt]?)\\b/i,\n    operator: /[\\[\\]*+\\-\\/%<>=&|$!]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvbmFzbS5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL25hc20uanM/YTk3MCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBuYXNtXG5uYXNtLmRpc3BsYXlOYW1lID0gJ25hc20nXG5uYXNtLmFsaWFzZXMgPSBbXVxuZnVuY3Rpb24gbmFzbShQcmlzbSkge1xuICBQcmlzbS5sYW5ndWFnZXMubmFzbSA9IHtcbiAgICBjb21tZW50OiAvOy4qJC9tLFxuICAgIHN0cmluZzogLyhbXCInYF0pKD86XFxcXC58KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG4gICAgbGFiZWw6IHtcbiAgICAgIHBhdHRlcm46IC8oXlxccyopW0EtWmEtei5fPyRdW1xcdy4/JEB+I10qOi9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnZnVuY3Rpb24nXG4gICAgfSxcbiAgICBrZXl3b3JkOiBbXG4gICAgICAvXFxbP0JJVFMgKD86MTZ8MzJ8NjQpXFxdPy8sXG4gICAgICB7XG4gICAgICAgIHBhdHRlcm46IC8oXlxccyopc2VjdGlvblxccypbYS16Ll0rOj8vaW0sXG4gICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgIH0sXG4gICAgICAvKD86ZXh0ZXJufGdsb2JhbClbXjtcXHJcXG5dKi9pLFxuICAgICAgLyg/OkNQVXxERUZBVUxUfEZMT0FUKS4qJC9tXG4gICAgXSxcbiAgICByZWdpc3Rlcjoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgL1xcYig/OnN0XFxkfFt4eXpdbW1cXGRcXGQ/fFtjZHRdclxcZHxyXFxkXFxkP1tid2RdP3xbZXJdP1thYmNkXXh8W2FiY2RdW2hsXXxbZXJdPyg/OmJwfGRpfHNpfHNwKXxbY2RlZmdzXXMpXFxiL2ksXG4gICAgICBhbGlhczogJ3ZhcmlhYmxlJ1xuICAgIH0sXG4gICAgbnVtYmVyOlxuICAgICAgLyg/OlxcYnwoPz1cXCQpKSg/OjBbaHhdKD86XFwuW1xcZGEtZl0rfFtcXGRhLWZdKyg/OlxcLltcXGRhLWZdKyk/KSg/OnBbKy1dP1xcZCspP3xcXGRbXFxkYS1mXStbaHhdfFxcJFxcZFtcXGRhLWZdKnwwW29xXVswLTddK3xbMC03XStbb3FdfDBbYnldWzAxXSt8WzAxXStbYnldfDBbZHRdXFxkK3woPzpcXGQrKD86XFwuXFxkKyk/fFxcLlxcZCspKD86XFwuP2VbKy1dP1xcZCspP1tkdF0/KVxcYi9pLFxuICAgIG9wZXJhdG9yOiAvW1xcW1xcXSorXFwtXFwvJTw+PSZ8JCFdL1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/nasm.js\n"));

/***/ })

}]);