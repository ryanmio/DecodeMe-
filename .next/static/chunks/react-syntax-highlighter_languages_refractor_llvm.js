"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_llvm"],{

/***/ "./node_modules/refractor/lang/llvm.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/llvm.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = llvm\nllvm.displayName = 'llvm'\nllvm.aliases = []\nfunction llvm(Prism) {\n  ;(function (Prism) {\n    Prism.languages.llvm = {\n      comment: /;.*/,\n      string: {\n        pattern: /\"[^\"]*\"/,\n        greedy: true\n      },\n      boolean: /\\b(?:false|true)\\b/,\n      variable: /[%@!#](?:(?!\\d)(?:[-$.\\w]|\\\\[a-f\\d]{2})+|\\d+)/i,\n      label: /(?!\\d)(?:[-$.\\w]|\\\\[a-f\\d]{2})+:/i,\n      type: {\n        pattern:\n          /\\b(?:double|float|fp128|half|i[1-9]\\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\\b/,\n        alias: 'class-name'\n      },\n      keyword: /\\b[a-z_][a-z_0-9]*\\b/,\n      number:\n        /[+-]?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b|\\b0x[\\dA-Fa-f]+\\b|\\b0xK[\\dA-Fa-f]{20}\\b|\\b0x[ML][\\dA-Fa-f]{32}\\b|\\b0xH[\\dA-Fa-f]{4}\\b/,\n      punctuation: /[{}[\\];(),.!*=<>]/\n    }\n  })(Prism)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvbGx2bS5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxxREFBcUQsRUFBRTtBQUN2RCx5Q0FBeUMsRUFBRTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsbUZBQW1GLEdBQUcsc0JBQXNCLEdBQUcsbUJBQW1CLEVBQUU7QUFDcEksdUJBQXVCLElBQUk7QUFDM0I7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL2xsdm0uanM/YWI0MiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBsbHZtXG5sbHZtLmRpc3BsYXlOYW1lID0gJ2xsdm0nXG5sbHZtLmFsaWFzZXMgPSBbXVxuZnVuY3Rpb24gbGx2bShQcmlzbSkge1xuICA7KGZ1bmN0aW9uIChQcmlzbSkge1xuICAgIFByaXNtLmxhbmd1YWdlcy5sbHZtID0ge1xuICAgICAgY29tbWVudDogLzsuKi8sXG4gICAgICBzdHJpbmc6IHtcbiAgICAgICAgcGF0dGVybjogL1wiW15cIl0qXCIvLFxuICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgIH0sXG4gICAgICBib29sZWFuOiAvXFxiKD86ZmFsc2V8dHJ1ZSlcXGIvLFxuICAgICAgdmFyaWFibGU6IC9bJUAhI10oPzooPyFcXGQpKD86Wy0kLlxcd118XFxcXFthLWZcXGRdezJ9KSt8XFxkKykvaSxcbiAgICAgIGxhYmVsOiAvKD8hXFxkKSg/OlstJC5cXHddfFxcXFxbYS1mXFxkXXsyfSkrOi9pLFxuICAgICAgdHlwZToge1xuICAgICAgICBwYXR0ZXJuOlxuICAgICAgICAgIC9cXGIoPzpkb3VibGV8ZmxvYXR8ZnAxMjh8aGFsZnxpWzEtOV1cXGQqfGxhYmVsfG1ldGFkYXRhfHBwY19mcDEyOHx0b2tlbnx2b2lkfHg4Nl9mcDgwfHg4Nl9tbXgpXFxiLyxcbiAgICAgICAgYWxpYXM6ICdjbGFzcy1uYW1lJ1xuICAgICAgfSxcbiAgICAgIGtleXdvcmQ6IC9cXGJbYS16X11bYS16XzAtOV0qXFxiLyxcbiAgICAgIG51bWJlcjpcbiAgICAgICAgL1srLV0/XFxiXFxkKyg/OlxcLlxcZCspPyg/OltlRV1bKy1dP1xcZCspP1xcYnxcXGIweFtcXGRBLUZhLWZdK1xcYnxcXGIweEtbXFxkQS1GYS1mXXsyMH1cXGJ8XFxiMHhbTUxdW1xcZEEtRmEtZl17MzJ9XFxifFxcYjB4SFtcXGRBLUZhLWZdezR9XFxiLyxcbiAgICAgIHB1bmN0dWF0aW9uOiAvW3t9W1xcXTsoKSwuISo9PD5dL1xuICAgIH1cbiAgfSkoUHJpc20pXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/llvm.js\n"));

/***/ })

}]);