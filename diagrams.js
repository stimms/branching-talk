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
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.radius = 26;
        this.chart = d3.select(this.container).append("svg").attr("height", this.height).attr("width", this.width);

        this.yScale = d3.scale.ordinal().domain(data.branches.map(function (d) {
          return d.title;
        })).rangeBands([20, Math.min(this.height, data.branches.length * 120)], 0.1);

        this.xScale = d3.scale.linear().domain([0, d3.max(data.commits, function (x) {
          return x.time;
        })]).range([100, this.width - 100]);
        this.branchColourScale = d3.scale.category10().domain(data.branches);

        this.addData(data, true);
      },
      writable: true,
      configurable: true
    },
    addData: {
      value: function addData(data) {
        var transitions = arguments[1] === undefined ? false : arguments[1];

        this.yScale.domain(data.branches.map(function (d) {
          return d.title;
        }));
        this.xScale.domain([0, d3.max(data.commits, function (x) {
          return x.time;
        })]);

        this.branchColourScale.domain(data.branches);

        this.createEdges(data);
        this.createBranches(data);
        this.createCommits(data, transitions);
      },
      writable: true,
      configurable: true
    },
    createEdges: {
      value: function createEdges(data) {
        var _this = this;

        var edges = this.chart.selectAll(".edge").data(data.commits, function (d) {
          return d.branch + d.time;
        });
        edges.exit().remove();
        edges.enter().append("line").attr("class", "edge");
        edges.transition().attr("y1", function (commit) {
          return _this.yScale(commit.branch);
        }).attr("x1", function (commit) {
          return _this.xScale(commit.time) - _this.radius;
        }).attr("x2", function (commit) {
          if (commit.time == d3.min(data.commits.filter(function (c) {
            return c.branch == commit.branch;
          }), function (c) {
            return c.time;
          })) return _this.xScale(commit.time) - _this.radius;
          return _this.xScale(d3.max(data.commits.filter(function (c) {
            return c.branch == commit.branch && c.time < commit.time;
          }), function (c) {
            return c.time;
          })) + _this.radius;
        }).attr("y2", function (commit) {
          return _this.yScale(commit.branch);
        });

        var mergeEdges = this.chart.selectAll(".merge-edge").data(data.commits.filter(function (c) {
          return c.mergeTo !== undefined;
        }));
        mergeEdges.exit().remove();
        mergeEdges.enter().append("path").attr("class", "edge merge-edge").attr("fill", "rgba(255,255,255,0)");
        mergeEdges.transition().attr("d", function (commit) {
          var startX = _this.xScale(commit.time) + _this.radius;
          var endX = _this.xScale(d3.min(data.commits.filter(function (c) {
            return c.time > commit.time;
          }), function (c) {
            return c.time;
          })) - _this.radius;
          var startY = _this.yScale(commit.branch);
          var endY = _this.yScale(commit.mergeTo);

          return "M" + startX + "," + startY + " C" + (endX + (startX - endX) / 2) + "," + startY + " " + (endX + (startX - endX) / 2) + "," + endY + " " + endX + "," + endY;
        });
      },
      writable: true,
      configurable: true
    },
    createBranches: {
      value: function createBranches(data) {
        var _this = this;

        var branches = this.chart.selectAll(".branch").data(data.branches);
        branches.exit().remove();
        branches.enter().append("text").attr("class", "branch");
        branches.transition().attr("x", 10).attr("y", function (branch) {
          return _this.yScale(branch.title);
        }).text(function (branch) {
          return branch.title;
        });
      },
      writable: true,
      configurable: true
    },
    createCommits: {
      value: function createCommits(data, transitions) {
        var _this = this;

        var commits = this.chart.selectAll(".commit").data(data.commits);
        commits.exit().remove();
        commits.enter().append("circle").attr("class", "commit").attr("cy", function (commit) {
          return _this.yScale(commit.branch);
        }).attr("cx", function (commit) {
          return _this.xScale(commit.time);
        }).attr("r", 0);
        commits.transition().delay(function (d) {
          return transitions ? d.time * 200 : 0;
        }).duration(500).attr("cy", function (commit) {
          return _this.yScale(commit.branch);
        }).attr("cx", function (commit) {
          return _this.xScale(commit.time);
        }).attr("r", this.radius).attr("fill", function (commit) {
          return _this.branchColourScale(commit.branch);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return BranchChart;
})();