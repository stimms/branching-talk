class BranchChart{
  constructor(container){
    this.container =container;
  }
  init(data){

    var width = window.innerWidth;
    var height = window.innerHeight;
    var chart = d3.select(this.container)
    .append("svg")
    .attr("height", height)
    .attr("width", width);

    var yScale = d3.scale.ordinal()
                  .domain(data.branches)
                  .rangeBands([20, Math.min(height, data.branches.length * 120)], .1);

    var xScale = d3.scale.linear()
                   .domain([0, d3.max(data.commits, (x) => x.time)])
                   .range([100, width-100]);

    var branchColourScale = d3.scale.category10().domain(data.branches);

    this.createBranches(chart, yScale, data);
    this.createCommits(chart, yScale, xScale, branchColourScale, data);



  }

  createBranches(chart, yScale, data){
    var branches = chart.selectAll(".branch").data(data.branches);
    branches.exit().remove();
    branches.enter()
      .append("text")
      .attr("x", 10)
      .attr("y", (branch) => yScale(branch))
      .text((branch)=>branch);
  }

  createCommits(chart, yScale, xScale, branchColourScale, data){
    var commits = chart.selectAll(".commit").data(data.commits);
    commits.exit().remove();
    commits.enter()
      .append("circle")
      .attr("class","commit")
      .attr("cy", (commit) => yScale(commit.branch))
      .attr("cx", (commit) => xScale(commit.time))
      .attr("r", 25)
      .attr("fill", (commit) => branchColourScale(commit.branch));
  }
}



var chart = new BranchChart(document.getElementById("container"));
chart.init(
  {
    branches: ["develop", "master"],
    commits: [
    {
      branch: "master",
      time: 0,
      comment: "some comment"
    },
    {
      branch: "master",
      time: 4,
      comment: "some comment"

    },
      {
        branch: "develop",
        time: 1,
        comment: "some comment"
      },
      {
        branch: "develop",
        time: 2,
        comment: "some comment",
        mergeTo: "master"
      },
      {
        branch: "develop",
        time: 3,
        comment: "some comment",
        mergeTo: "master"
      }
    ]
  }

);
