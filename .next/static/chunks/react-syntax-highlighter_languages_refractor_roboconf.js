"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["react-syntax-highlighter_languages_refractor_roboconf"],{

/***/ "./node_modules/refractor/lang/roboconf.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/roboconf.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n\nmodule.exports = roboconf\nroboconf.displayName = 'roboconf'\nroboconf.aliases = []\nfunction roboconf(Prism) {\n  Prism.languages.roboconf = {\n    comment: /#.*/,\n    keyword: {\n      pattern:\n        /(^|\\s)(?:(?:external|import)\\b|(?:facet|instance of)(?=[ \\t]+[\\w-]+[ \\t]*\\{))/,\n      lookbehind: true\n    },\n    component: {\n      pattern: /[\\w-]+(?=[ \\t]*\\{)/,\n      alias: 'variable'\n    },\n    property: /[\\w.-]+(?=[ \\t]*:)/,\n    value: {\n      pattern: /(=[ \\t]*(?![ \\t]))[^,;]+/,\n      lookbehind: true,\n      alias: 'attr-value'\n    },\n    optional: {\n      pattern: /\\(optional\\)/,\n      alias: 'builtin'\n    },\n    wildcard: {\n      pattern: /(\\.)\\*/,\n      lookbehind: true,\n      alias: 'operator'\n    },\n    punctuation: /[{},.;:=]/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcmVmcmFjdG9yL2xhbmcvcm9ib2NvbmYuanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjtBQUNwRjtBQUNBLEtBQUs7QUFDTDtBQUNBLGlDQUFpQztBQUNqQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHFCQUFxQixHQUFHO0FBQ3hCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZnJhY3Rvci9sYW5nL3JvYm9jb25mLmpzP2ZhMjkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcm9ib2NvbmZcbnJvYm9jb25mLmRpc3BsYXlOYW1lID0gJ3JvYm9jb25mJ1xucm9ib2NvbmYuYWxpYXNlcyA9IFtdXG5mdW5jdGlvbiByb2JvY29uZihQcmlzbSkge1xuICBQcmlzbS5sYW5ndWFnZXMucm9ib2NvbmYgPSB7XG4gICAgY29tbWVudDogLyMuKi8sXG4gICAga2V5d29yZDoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgLyhefFxccykoPzooPzpleHRlcm5hbHxpbXBvcnQpXFxifCg/OmZhY2V0fGluc3RhbmNlIG9mKSg/PVsgXFx0XStbXFx3LV0rWyBcXHRdKlxceykpLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICB9LFxuICAgIGNvbXBvbmVudDoge1xuICAgICAgcGF0dGVybjogL1tcXHctXSsoPz1bIFxcdF0qXFx7KS8sXG4gICAgICBhbGlhczogJ3ZhcmlhYmxlJ1xuICAgIH0sXG4gICAgcHJvcGVydHk6IC9bXFx3Li1dKyg/PVsgXFx0XSo6KS8sXG4gICAgdmFsdWU6IHtcbiAgICAgIHBhdHRlcm46IC8oPVsgXFx0XSooPyFbIFxcdF0pKVteLDtdKy8sXG4gICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgYWxpYXM6ICdhdHRyLXZhbHVlJ1xuICAgIH0sXG4gICAgb3B0aW9uYWw6IHtcbiAgICAgIHBhdHRlcm46IC9cXChvcHRpb25hbFxcKS8sXG4gICAgICBhbGlhczogJ2J1aWx0aW4nXG4gICAgfSxcbiAgICB3aWxkY2FyZDoge1xuICAgICAgcGF0dGVybjogLyhcXC4pXFwqLyxcbiAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICBhbGlhczogJ29wZXJhdG9yJ1xuICAgIH0sXG4gICAgcHVuY3R1YXRpb246IC9be30sLjs6PV0vXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/refractor/lang/roboconf.js\n"));

/***/ })

}]);