"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_editorconfig"],{

/***/ "./node_modules/refractor/lang/editorconfig.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/editorconfig.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = editorconfig\neditorconfig.displayName = 'editorconfig'\neditorconfig.aliases = []\nfunction editorconfig(Prism) {\n  Prism.languages.editorconfig = {\n    // https://editorconfig-specification.readthedocs.io\n    comment: /[;#].*/,\n    section: {\n      pattern: /(^[ \\t]*)\\[.+\\]/m,\n      lookbehind: true,\n      alias: 'selector',\n      inside: {\n        regex: /\\\\\\\\[\\[\\]{},!?.*]/,\n        // Escape special characters with '\\\\'\n        operator: /[!?]|\\.\\.|\\*{1,2}/,\n        punctuation: /[\\[\\]{},]/\n      }\n    },\n    key: {\n      pattern: /(^[ \\t]*)[^\\s=]+(?=[ \\t]*=)/m,\n      lookbehind: true,\n      alias: 'attr-name'\n    },\n    value: {\n      pattern: /=.*/,\n      alias: 'attr-value',\n      inside: {\n        punctuation: /^=/\n      }\n    }\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvZWRpdG9yY29uZmlnLmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsZ0NBQWdDLElBQUk7QUFDcEMsNkJBQTZCO0FBQzdCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvZWRpdG9yY29uZmlnLmpzPzVkNzYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZWRpdG9yY29uZmlnXG5lZGl0b3Jjb25maWcuZGlzcGxheU5hbWUgPSAnZWRpdG9yY29uZmlnJ1xuZWRpdG9yY29uZmlnLmFsaWFzZXMgPSBbXVxuZnVuY3Rpb24gZWRpdG9yY29uZmlnKFByaXNtKSB7XG4gIFByaXNtLmxhbmd1YWdlcy5lZGl0b3Jjb25maWcgPSB7XG4gICAgLy8gaHR0cHM6Ly9lZGl0b3Jjb25maWctc3BlY2lmaWNhdGlvbi5yZWFkdGhlZG9jcy5pb1xuICAgIGNvbW1lbnQ6IC9bOyNdLiovLFxuICAgIHNlY3Rpb246IHtcbiAgICAgIHBhdHRlcm46IC8oXlsgXFx0XSopXFxbLitcXF0vbSxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ3NlbGVjdG9yJyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICByZWdleDogL1xcXFxcXFxcW1xcW1xcXXt9LCE/LipdLyxcbiAgICAgICAgLy8gRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB3aXRoICdcXFxcJ1xuICAgICAgICBvcGVyYXRvcjogL1shP118XFwuXFwufFxcKnsxLDJ9LyxcbiAgICAgICAgcHVuY3R1YXRpb246IC9bXFxbXFxde30sXS9cbiAgICAgIH1cbiAgICB9LFxuICAgIGtleToge1xuICAgICAgcGF0dGVybjogLyheWyBcXHRdKilbXlxccz1dKyg/PVsgXFx0XSo9KS9tLFxuICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgIGFsaWFzOiAnYXR0ci1uYW1lJ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHBhdHRlcm46IC89LiovLFxuICAgICAgYWxpYXM6ICdhdHRyLXZhbHVlJyxcbiAgICAgIGluc2lkZToge1xuICAgICAgICBwdW5jdHVhdGlvbjogL149L1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/editorconfig.js\n"));

/***/ })

}]);