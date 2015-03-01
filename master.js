"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Master = (function () {
  function Master() {
    _classCallCheck(this, Master);
  }

  _prototypeProperties(Master, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("master"));
        var data = {
          branches: [{ title: "master" }],
          commits: [{
            branch: "master",
            time: 0,
            comment: "Release 1.0"
          }, {
            branch: "master",
            time: 1,
            comment: "Release 1.1"
          }, {
            branch: "master",
            time: 2,
            comment: "Release 1.2"
          }, {
            branch: "master",
            time: 3,
            comment: "Release 2.0"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return Master;
})();

var master = new Master();