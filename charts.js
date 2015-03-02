"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Develop = (function () {
  function Develop() {
    _classCallCheck(this, Develop);
  }

  _prototypeProperties(Develop, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("develop"));
        var data = {
          branches: [{ title: "master" }, { title: "hotfix" }, { title: "release-2.0" }, { title: "develop" }],
          commits: [{
            branch: "master",
            time: 0,
            comment: "Release 1.0"
          }, {
            branch: "master",
            time: 1,
            comment: "Release 1.1",
            mergeTo: "hotfix"
          }, {
            branch: "hotfix",
            time: 2,
            comment: "Fixed security exploit",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 3,
            comment: "Hotfix 1.1.0.1"
          }, {
            branch: "master",
            time: 4,
            comment: "Release 1.2"
          }, {
            branch: "master",
            time: 5,
            comment: "Release 2.0"
          }, {
            branch: "release-2.0",
            time: 3,
            comment: "Cut for release"
          }, {
            branch: "release-2.0",
            time: 4,
            comment: "stabilize",
            mergeTo: "master"
          }, {
            branch: "develop",
            time: 1,
            comment: "Merge password encryption"
          }, {
            branch: "develop",
            time: 2,
            comment: "Merge password reminder",
            mergeTo: "release-2.0"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return Develop;
})();

var develop = new Develop();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DevStabilization = (function () {
  function DevStabilization() {
    _classCallCheck(this, DevStabilization);
  }

  _prototypeProperties(DevStabilization, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("devstabilization"));
        var data = {
          branches: [{ title: "password-encryption" }, { title: "stabilization" }, { title: "password-reset" }, { title: "master" }],
          commits: [{
            branch: "master",
            time: 0
          }, {
            branch: "password-encryption",
            time: 0,
            comment: "Adding password encryption"
          }, {
            branch: "password-encryption",
            time: 1,
            comment: "Applying fixes"
          }, {
            branch: "password-encryption",
            time: 2,
            comment: "Final cleanup",
            mergeTo: "stabilization"
          }, {
            branch: "password-reset",
            time: 1,
            comment: "Adding password reset"
          }, {
            branch: "password-reset",
            time: 2,
            comment: "Jim's suggestions"
          }, {
            branch: "password-reset",
            time: 3,
            comment: "Final cleanup",
            mergeTo: "stabilization"
          }, {
            branch: "master",
            time: 5,
            comment: "Ready for release"
          }, {
            branch: "stabilization",
            time: 5
          }, {
            branch: "stabilization",
            time: 0
          }, {
            branch: "stabilization",
            time: 3
          }, {
            branch: "stabilization",
            time: 4,
            mergeTo: "master"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return DevStabilization;
})();

var devstabilization = new DevStabilization();
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
        })).rangeBands([60, Math.min(this.height, data.branches.length * 130)], 0.1);

        this.xScale = d3.scale.linear().domain([0, d3.max(data.commits, function (x) {
          return x.time;
        })]).range([220, this.width - 150]);
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
        }).attr("r", 0).on("click", function (commit) {
          if (commit.selected) {
            commit.selected = false;
            d3.select(d3.event.srcElement).transition().attr("r", _this.radius);
          } else {
            commit.selected = true;
            d3.select(d3.event.srcElement).transition().attr("r", _this.radius * 1.4);
          }
        });
        commits.transition().delay(function (d) {
          return transitions ? d.time * 200 : 0;
        }).duration(500).attr("cy", function (commit) {
          return _this.yScale(commit.branch);
        }).attr("cx", function (commit) {
          return _this.xScale(commit.time);
        }).attr("r", function (commit) {
          return _this.selected ? _this.radius * 1.4 : _this.radius;
        }).attr("fill", function (commit) {
          return _this.branchColourScale(commit.branch);
        });
        var commitBox = this.chart.selectAll(".commit-box").data(data.commits);
        commitBox.exit().remove();
        commitBox.enter().append("rect").attr("class", "commit-box");
        commitBox.transition().attr("y", function (commit) {
          return _this.yScale(commit.branch) - _this.radius - 43;
        }).attr("x", function (commit) {
          return _this.xScale(commit.time) - 85;
        }).attr("rx", 10).attr("ry", 10).attr("width", function (commit) {
          return commit.comment === undefined ? 0 : 170;
        }).attr("height", 40);

        var commitLabels = this.chart.selectAll(".commit-label").data(data.commits);
        commitLabels.exit().remove();
        commitLabels.enter().append("text").attr("class", "commit-label");
        commitLabels.transition().attr("y", function (commit) {
          return _this.yScale(commit.branch) - _this.radius - 13;
        }).attr("x", function (commit) {
          return _this.xScale(commit.time);
        }).attr("text-anchor", "middle").text(function (commit) {
          return commit.comment;
        });
      },
      writable: true,
      configurable: true
    }
  });

  return BranchChart;
})();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Feature = (function () {
  function Feature() {
    _classCallCheck(this, Feature);
  }

  _prototypeProperties(Feature, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("feature"));
        var data = {
          branches: [{ title: "master" }, { title: "hotfix" }, { title: "release-2.0" }, { title: "password-encryption" }, { title: "develop" }, { title: "password-reminder" }],
          commits: [{
            branch: "master",
            time: 0,
            comment: "Release 1.0"
          }, {
            branch: "master",
            time: 1,
            comment: "Release 1.1",
            mergeTo: "hotfix"
          }, {
            branch: "hotfix",
            time: 2,
            comment: "Fixed security exploit",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 3,
            comment: "Hotfix 1.1.0.1"
          }, {
            branch: "master",
            time: 4,
            comment: "Release 1.2"
          }, {
            branch: "master",
            time: 5,
            comment: "Release 2.0"
          }, {
            branch: "release-2.0",
            time: 3,
            comment: "Cut for release"
          }, {
            branch: "release-2.0",
            time: 4,
            comment: "stabilize",
            mergeTo: "master"
          }, {
            branch: "develop",
            time: 1,
            comment: "Merge password encryption"
          }, {
            branch: "develop",
            time: 2,
            comment: "Merge password reminder",
            mergeTo: "release-2.0"
          }, {
            branch: "password-encryption",
            time: 0,
            comment: "Finish feature",
            mergeTo: "develop"
          }, {
            branch: "password-reminder",
            time: 1,
            comment: "Finish feature",
            mergeTo: "develop"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return Feature;
})();

var feature = new Feature();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var HotFix = (function () {
  function HotFix() {
    _classCallCheck(this, HotFix);
  }

  _prototypeProperties(HotFix, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("hotfix"));
        var data = {
          branches: [{ title: "master" }, { title: "hotfix" }],
          commits: [{
            branch: "master",
            time: 0,
            comment: "Release 1.0"
          }, {
            branch: "master",
            time: 1,
            comment: "Release 1.1",
            mergeTo: "hotfix"
          }, {
            branch: "hotfix",
            time: 2,
            comment: "Fixed security exploit",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 3,
            comment: "Hotfix 1.1.0.1"
          }, {
            branch: "master",
            time: 4,
            comment: "Release 1.2"
          }, {
            branch: "master",
            time: 4,
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

  return HotFix;
})();

var hotfix = new HotFix();
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

var mergeRebase = new MergeRebase();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MultipleMasters = (function () {
  function MultipleMasters() {
    _classCallCheck(this, MultipleMasters);
  }

  _prototypeProperties(MultipleMasters, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("multiplemasters"));
        var data = {
          branches: [{ title: "password-encryption" }, { title: "release-2.0" }, { title: "release-3.0" }, { title: "password-reset" }],
          commits: [{
            branch: "release-2.0",
            time: 0
          }, {
            branch: "password-encryption",
            time: 0,
            comment: "Adding password encryption"
          }, {
            branch: "password-encryption",
            time: 1,
            comment: "Applying fixes"
          }, {
            branch: "password-encryption",
            time: 2,
            comment: "Final cleanup",
            mergeTo: "release-2.0"
          }, {
            branch: "release-2.0",
            time: 3,
            comment: "Password Encryption"
          }, {
            branch: "password-reset",
            time: 2,
            comment: "Adding password reset"
          }, {
            branch: "password-reset",
            time: 3,
            comment: "Jim's suggestions"
          }, {
            branch: "password-reset",
            time: 4,
            comment: "Final cleanup",
            mergeTo: "release-3.0"
          }, {
            branch: "release-2.0",
            time: 4,
            comment: "Security fix",
            mergeTo: "release-3.0"
          }, {
            branch: "release-2.0",
            time: 5,
            mergeTo: "release-3.0"
          }, {
            branch: "release-3.0",
            time: 1
          }, {
            branch: "release-3.0",
            time: 3
          }, {
            branch: "release-3.0",
            time: 5,
            comment: "Password Reset"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return MultipleMasters;
})();

var multiplemasters = new MultipleMasters();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PullRequest = (function () {
  function PullRequest() {
    _classCallCheck(this, PullRequest);
  }

  _prototypeProperties(PullRequest, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("pullrequest"));
        var data = {
          branches: [{ title: "password-encryption" }, { title: "master" }, { title: "password-reset" }],
          commits: [{
            branch: "master",
            time: 0
          }, {
            branch: "password-encryption",
            time: 0,
            comment: "Adding password encryption"
          }, {
            branch: "password-encryption",
            time: 1,
            comment: "Applying fixes"
          }, {
            branch: "password-encryption",
            time: 2,
            comment: "Final cleanup",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 3,
            comment: "Password Encryption"
          }, {
            branch: "password-reset",
            time: 2,
            comment: "Adding password reset"
          }, {
            branch: "password-reset",
            time: 3,
            comment: "Jim's suggestions"
          }, {
            branch: "password-reset",
            time: 4,
            comment: "Final cleanup",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 4,
            comment: "Security fix"
          }, {
            branch: "master",
            time: 5,
            comment: "Password Reset"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return PullRequest;
})();

var pullrequest = new PullRequest();
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Release = (function () {
  function Release() {
    _classCallCheck(this, Release);
  }

  _prototypeProperties(Release, null, {
    init: {
      value: function init() {
        var chart = new BranchChart(document.getElementById("release"));
        var data = {
          branches: [{ title: "master" }, { title: "hotfix" }, { title: "release-2.0" }],
          commits: [{
            branch: "master",
            time: 0,
            comment: "Release 1.0"
          }, {
            branch: "master",
            time: 1,
            comment: "Release 1.1",
            mergeTo: "hotfix"
          }, {
            branch: "hotfix",
            time: 2,
            comment: "Fixed security exploit",
            mergeTo: "master"
          }, {
            branch: "master",
            time: 3,
            comment: "Hotfix 1.1.0.1"
          }, {
            branch: "master",
            time: 4,
            comment: "Release 1.2"
          }, {
            branch: "master",
            time: 5,
            comment: "Release 2.0"
          }, {
            branch: "release-2.0",
            time: 3,
            comment: "Cut for release"
          }, {
            branch: "release-2.0",
            time: 4,
            comment: "stabilize",
            mergeTo: "master"
          }]
        };
        var defaultData = jQuery.extend(true, {}, data);
        chart.init(data);
      },
      writable: true,
      configurable: true
    }
  });

  return Release;
})();

var release = new Release();