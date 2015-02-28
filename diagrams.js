"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var BranchChart = (function () {
  function BranchChart(container) {
    _classCallCheck(this, BranchChart);

    this.container = container;
  }

  _prototypeProperties(BranchChart, null, {
    init: {
      value: function init(data) {

        var width = window.innerWidth;
        var height = window.innerHeight;
        var chart = d3.select(this.container).append("svg").attr("height", height).attr("width", width);

        var yScale = d3.scale.ordinal().domain(data.branches).rangeBands([20, Math.min(height, data.branches.length * 120)], 0.1);
        var branches = chart.selectAll(".branch").data(data.branches);

        branches.exit().remove();

        branches.enter().append("text").attr("x", 10).attr("y", function (branch) {
          return yScale(branch);
        }).text(function (branch) {
          return branch;
        });
      },
      writable: true,
      configurable: true
    }
  });

  return BranchChart;
})();

var chart = new BranchChart(document.getElementById("container"));
chart.init({
  branches: ["develop", "master"],
  commits: [{
    branch: "develop",
    time: 1,
    comment: "some comment",
    mergeTo: "master"
  }]
});