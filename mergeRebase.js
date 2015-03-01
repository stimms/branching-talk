"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MergeRebase = (function () {
  function MergeRebase() {
    _classCallCheck(this, MergeRebase);
  }

  _prototypeProperties(MergeRebase, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("mergeRebase"));
        var data = {
          branches: [{ title: "develop" }, { title: "master" }],
          commits: [{
            branch: "master",
            time: 0,
            mergeTo: "develop"
          }, {
            branch: "master",
            time: 4,
            comment: "merge from develop"
          }, {
            branch: "develop",
            time: 1,
            comment: "add feature"
          }, {
            branch: "develop",
            time: 2,
            comment: "stabilize"
          }, {
            branch: "develop",
            time: 3,
            comment: "stabilize",
            mergeTo: "master"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);

        $("[data-action=rebase]").click(function () {
          data.commits.forEach(function (d) {
            d.branch = "master";delete d.mergeTo;
          });
          chart.addData(data);
        });
        $("[data-action=merge]").click(function () {
          var maxMaster = d3.max(data.commits, function (d) {
            return d.time;
          });
          data.commits.forEach(function (d) {
            delete d.mergeTo;
          });
          data.commits.filter(function (d) {
            return d.branch == "develop";
          }).forEach(function (d) {
            d.branch = "master";d.time = maxMaster + d.time;
          });
          chart.addData(data);
        });
        $("[data-action=reset]").click(function () {
          data = jQuery.extend(true, {}, defaultData);
          chart.addData(data);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return MergeRebase;
})();