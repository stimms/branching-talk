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

        this.createEdges(chart, xScale, yScale, data);
        this.createBranches(chart, yScale, data);
        this.createCommits(chart, yScale, xScale, branchColourScale, data);
      },
      writable: true,
      configurable: true
    },
    createEdges: {
      value: function createEdges(chart, xScale, yScale, data) {
        var edges = chart.selectAll(".edge").data(data.commits);
        edges.enter().append("line").attr("class", "edge").attr("y1", function (commit) {
          return yScale(commit.branch);
        }).attr("x1", function (commit) {
          return xScale(commit.time);
        }).attr("x2", function (commit) {
          if (commit.time == d3.max(data.commits.filter(function (c) {
            return c.branch == commit.branch;
          }), function (c) {
            return c.time;
          })) return xScale(commit.time);
          return xScale(d3.min(data.commits.filter(function (c) {
            return c.branch == commit.branch && c.time > commit.time;
          }), function (c) {
            return c.time;
          }));
        }).attr("y2", function (commit) {
          return yScale(commit.branch);
        });
        var mergeEdges = chart.selectAll(".merge-edge").data(data.commits.filter(function (c) {
          return c.mergeTo !== undefined;
        }));
        mergeEdges.enter().append("line").attr("class", "edge merge-edge").attr("y1", function (commit) {
          return yScale(commit.branch);
        }).attr("x1", function (commit) {
          return xScale(commit.time);
        }).attr("x2", function (commit) {
          return xScale(d3.min(data.commits.filter(function (c) {
            return c.time > commit.time;
          }), function (c) {
            return c.time;
          }));
        }).attr("y2", function (commit) {
          return yScale(commit.mergeTo);
        });
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
    comment: "some comment",
    mergeTo: "develop"
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
    comment: "some comment"
  }, {
    branch: "develop",
    time: 3,
    comment: "some comment",
    mergeTo: "master"
  }]
});