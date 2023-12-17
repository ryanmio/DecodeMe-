"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_processing"],{

/***/ "./node_modules/refractor/lang/processing.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/processing.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = processing\nprocessing.displayName = 'processing'\nprocessing.aliases = []\nfunction processing(Prism) {\n  Prism.languages.processing = Prism.languages.extend('clike', {\n    keyword:\n      /\\b(?:break|case|catch|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\\b/,\n    // Spaces are allowed between function name and parenthesis\n    function: /\\b\\w+(?=\\s*\\()/,\n    operator: /<[<=]?|>[>=]?|&&?|\\|\\|?|[%?]|[!=+\\-*\\/]=?/\n  })\n  Prism.languages.insertBefore('processing', 'number', {\n    // Special case: XML is a type\n    constant: /\\b(?!XML\\b)[A-Z][A-Z\\d_]+\\b/,\n    type: {\n      pattern: /\\b(?:boolean|byte|char|color|double|float|int|[A-Z]\\w*)\\b/,\n      alias: 'class-name'\n    }\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvcHJvY2Vzc2luZy5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvcHJvY2Vzc2luZy5qcz8xZGQ5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2Nlc3NpbmdcbnByb2Nlc3NpbmcuZGlzcGxheU5hbWUgPSAncHJvY2Vzc2luZydcbnByb2Nlc3NpbmcuYWxpYXNlcyA9IFtdXG5mdW5jdGlvbiBwcm9jZXNzaW5nKFByaXNtKSB7XG4gIFByaXNtLmxhbmd1YWdlcy5wcm9jZXNzaW5nID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG4gICAga2V5d29yZDpcbiAgICAgIC9cXGIoPzpicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnRpbnVlfGRlZmF1bHR8ZWxzZXxleHRlbmRzfGZpbmFsfGZvcnxpZnxpbXBsZW1lbnRzfGltcG9ydHxuZXd8bnVsbHxwcml2YXRlfHB1YmxpY3xyZXR1cm58c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRyeXx2b2lkfHdoaWxlKVxcYi8sXG4gICAgLy8gU3BhY2VzIGFyZSBhbGxvd2VkIGJldHdlZW4gZnVuY3Rpb24gbmFtZSBhbmQgcGFyZW50aGVzaXNcbiAgICBmdW5jdGlvbjogL1xcYlxcdysoPz1cXHMqXFwoKS8sXG4gICAgb3BlcmF0b3I6IC88Wzw9XT98Pls+PV0/fCYmP3xcXHxcXHw/fFslP118WyE9K1xcLSpcXC9dPT8vXG4gIH0pXG4gIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Byb2Nlc3NpbmcnLCAnbnVtYmVyJywge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogWE1MIGlzIGEgdHlwZVxuICAgIGNvbnN0YW50OiAvXFxiKD8hWE1MXFxiKVtBLVpdW0EtWlxcZF9dK1xcYi8sXG4gICAgdHlwZToge1xuICAgICAgcGF0dGVybjogL1xcYig/OmJvb2xlYW58Ynl0ZXxjaGFyfGNvbG9yfGRvdWJsZXxmbG9hdHxpbnR8W0EtWl1cXHcqKVxcYi8sXG4gICAgICBhbGlhczogJ2NsYXNzLW5hbWUnXG4gICAgfVxuICB9KVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/processing.js\n"));

/***/ })

}]);