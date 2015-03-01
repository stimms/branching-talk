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

    this.createEdges(chart, xScale, yScale, data);
    this.createBranches(chart, yScale, data);
    this.createCommits(chart, yScale, xScale, branchColourScale, data);




  }

  createEdges(chart, xScale, yScale, data){
    var edges = chart.selectAll(".edge").data(data.commits);
    edges.enter()
          .append("line")
          .attr("class", "edge")
          .attr("y1", (commit) => yScale(commit.branch))
          .attr("x1", (commit) => xScale(commit.time))
          .attr("x2", (commit) => {
            if(commit.time == d3.max(data.commits.filter((c)=>c.branch == commit.branch), (c) => c.time))
              return xScale(commit.time);
            return xScale(d3.min(data.commits.filter((c)=>c.branch == commit.branch && c.time > commit.time), (c) => c.time));
          })
          .attr("y2", (commit) => yScale(commit.branch));
    var mergeEdges = chart.selectAll(".merge-edge").data(data.commits.filter((c)=> c.mergeTo !== undefined));
    mergeEdges.enter()
          .append("path")
          .attr("class", "edge merge-edge")
          .attr("fill", "rgba(255,255,255,0)")
          .attr("d", (commit) => {
                                  var startX = xScale(commit.time);
                                  var endX = xScale(d3.min(data.commits.filter((c)=>c.time > commit.time), (c)=>c.time));
                                  var startY = yScale(commit.branch);
                                  var endY = yScale(commit.mergeTo);

                              return "M" + startX + "," +  startY +
                                " C" +
                                (endX+(startX - endX)/2) + "," + startY + " " +
                                (endX+(startX - endX)/2) + "," + endY + " " +
                                endX +"," + endY;
                              });

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
      comment: "some comment",
      mergeTo: "develop"
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
        comment: "some comment"
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
