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
    var branches = chart.selectAll(".branch").data(data.branches);

    branches.exit().remove();

    branches.enter()
      .append("text")
      .attr("x", 10)
      .attr("y", (branch) => yScale(branch))
      .text((branch)=>branch);
  }
}

var chart = new BranchChart(document.getElementById("container"));
chart.init(
  {
    branches: ["develop", "master"],
    commits: [
      {
        branch: "develop",
        time: 1,
        comment: "some comment",
        mergeTo: "master"
      }
    ]
  }

);
