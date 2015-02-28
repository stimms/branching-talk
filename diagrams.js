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

        var xScale = d3.scale.linear().domain([0, d3.max(data.commits, function (x) {
          return x.time;
        })]).range([100, width - 100]);

        var branchColourScale = d3.scale.category10().domain(data.branches);

        this.createBranches(chart, yScale, data);
        this.createCommits(chart, yScale, xScale, branchColourScale, data);
      },
      writable: true,
      configurable: true
    },
    createBranches: {
      value: function createBranches(chart, yScale, data) {
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
    },
    createCommits: {
      value: function createCommits(chart, yScale, xScale, branchColourScale, data) {
        var commits = chart.selectAll(".commit").data(data.commits);
        commits.exit().remove();
        commits.enter().append("circle").attr("class", "commit").attr("cy", function (commit) {
          return yScale(commit.branch);
        }).attr("cx", function (commit) {
          return xScale(commit.time);
        }).attr("r", 25).attr("fill", function (commit) {
          return branchColourScale(commit.branch);
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
    branch: "master",
    time: 0,
    comment: "some comment"
  }, {
    branch: "master",
    time: 4,
    comment: "some comment"

  }, {
    branch: "develop",
    time: 1,
    comment: "some comment"
  }, {
    branch: "develop",
    time: 2,
    comment: "some comment",
    mergeTo: "master"
  }, {
    branch: "develop",
    time: 3,
    comment: "some comment",
    mergeTo: "master"
  }]
});