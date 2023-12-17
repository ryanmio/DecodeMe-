"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_hoon"],{

/***/ "./node_modules/refractor/lang/hoon.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hoon.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = hoon\nhoon.displayName = 'hoon'\nhoon.aliases = []\nfunction hoon(Prism) {\n  Prism.languages.hoon = {\n    comment: {\n      pattern: /::.*/,\n      greedy: true\n    },\n    string: {\n      pattern: /\"[^\"]*\"|'[^']*'/,\n      greedy: true\n    },\n    constant: /%(?:\\.[ny]|[\\w-]+)/,\n    'class-name': /@(?:[a-z0-9-]*[a-z0-9])?|\\*/i,\n    function: /(?:\\+[-+] {2})?(?:[a-z](?:[a-z0-9-]*[a-z0-9])?)/,\n    keyword:\n      /\\.[\\^\\+\\*=\\?]|![><:\\.=\\?!]|=[>|:,\\.\\-\\^<+;/~\\*\\?]|\\?[>|:\\.\\-\\^<\\+&~=@!]|\\|[\\$_%:\\.\\-\\^~\\*=@\\?]|\\+[|\\$\\+\\*]|:[_\\-\\^\\+~\\*]|%[_:\\.\\-\\^\\+~\\*=]|\\^[|:\\.\\-\\+&~\\*=\\?]|\\$[|_%:<>\\-\\^&~@=\\?]|;[:<\\+;\\/~\\*=]|~[>|\\$_%<\\+\\/&=\\?!]|--|==/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvaG9vbi5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUI7QUFDQSxpREFBaUQsMklBQTJJLE1BQU07QUFDbE07QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvaG9vbi5qcz9lOGU2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhvb25cbmhvb24uZGlzcGxheU5hbWUgPSAnaG9vbidcbmhvb24uYWxpYXNlcyA9IFtdXG5mdW5jdGlvbiBob29uKFByaXNtKSB7XG4gIFByaXNtLmxhbmd1YWdlcy5ob29uID0ge1xuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHBhdHRlcm46IC86Oi4qLyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgc3RyaW5nOiB7XG4gICAgICBwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcbiAgICAgIGdyZWVkeTogdHJ1ZVxuICAgIH0sXG4gICAgY29uc3RhbnQ6IC8lKD86XFwuW255XXxbXFx3LV0rKS8sXG4gICAgJ2NsYXNzLW5hbWUnOiAvQCg/OlthLXowLTktXSpbYS16MC05XSk/fFxcKi9pLFxuICAgIGZ1bmN0aW9uOiAvKD86XFwrWy0rXSB7Mn0pPyg/OlthLXpdKD86W2EtejAtOS1dKlthLXowLTldKT8pLyxcbiAgICBrZXl3b3JkOlxuICAgICAgL1xcLltcXF5cXCtcXCo9XFw/XXwhWz48OlxcLj1cXD8hXXw9Wz58OixcXC5cXC1cXF48KzsvflxcKlxcP118XFw/Wz58OlxcLlxcLVxcXjxcXCsmfj1AIV18XFx8W1xcJF8lOlxcLlxcLVxcXn5cXCo9QFxcP118XFwrW3xcXCRcXCtcXCpdfDpbX1xcLVxcXlxcK35cXCpdfCVbXzpcXC5cXC1cXF5cXCt+XFwqPV18XFxeW3w6XFwuXFwtXFwrJn5cXCo9XFw/XXxcXCRbfF8lOjw+XFwtXFxeJn5APVxcP118O1s6PFxcKztcXC9+XFwqPV18fls+fFxcJF8lPFxcK1xcLyY9XFw/IV18LS18PT0vXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/hoon.js\n"));

/***/ })

}]);