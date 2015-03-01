class BranchChart{
  constructor(container){
    this.container = container;
  }
  init(data){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.radius = 26;
    this.chart = d3.select(this.container)
    .append("svg")
    .attr("height", this.height)
    .attr("width", this.width);

    this.yScale = d3.scale.ordinal()
                  .domain(data.branches.map((d)=>d.title))
                  .rangeBands([20, Math.min(this.height, data.branches.length * 120)], .1);

    this.xScale = d3.scale.linear()
                   .domain([0, d3.max(data.commits, (x) => x.time)])
                   .range([100, this.width-100]);
    this.branchColourScale = d3.scale.category10().domain(data.branches);

    this.addData(data, true);
  }

  addData(data, transitions=false){
    this.yScale.domain(data.branches.map((d)=>d.title));
    this.xScale.domain([0, d3.max(data.commits, (x) => x.time)]);

    this.branchColourScale.domain(data.branches);

    this.createEdges(data);
    this.createBranches(data);
    this.createCommits(data, transitions);
  }

  createEdges(data){
    var edges = this.chart.selectAll(".edge").data(data.commits, (d)=> d.branch + d.time);
    edges.exit().remove();
    edges.enter()
          .append("line")
          .attr("class", "edge");
    edges.transition()
          .attr("y1", (commit) => this.yScale(commit.branch))
          .attr("x1", (commit) => this.xScale(commit.time)-this.radius)
          .attr("x2", (commit) => {
            if(commit.time == d3.min(data.commits.filter((c)=>c.branch == commit.branch), (c) => c.time))
              return this.xScale(commit.time)-this.radius;
            return this.xScale(d3.max(data.commits.filter((c)=>c.branch == commit.branch && c.time < commit.time), (c) => c.time))+this.radius;
          })
          .attr("y2", (commit) => this.yScale(commit.branch));


    var mergeEdges = this.chart.selectAll(".merge-edge").data(data.commits.filter((c)=> c.mergeTo !== undefined));
    mergeEdges.exit().remove();
    mergeEdges.enter()
          .append("path")
          .attr("class", "edge merge-edge")
          .attr("fill", "rgba(255,255,255,0)");
    mergeEdges.transition()
          .attr("d", (commit) => {
                                  var startX = this.xScale(commit.time)+this.radius;
                                  var endX = this.xScale(d3.min(data.commits.filter((c)=>c.time > commit.time), (c)=>c.time))-this.radius;
                                  var startY = this.yScale(commit.branch);
                                  var endY = this.yScale(commit.mergeTo);

                              return "M" + startX + "," +  startY +
                                " C" +
                                (endX+(startX - endX)/2) + "," + startY + " " +
                                (endX+(startX - endX)/2) + "," + endY + " " +
                                endX +"," + endY;
                              });

  }

  createBranches(data){
    var branches = this.chart.selectAll(".branch").data(data.branches);
    branches.exit().remove();
    branches.enter()
      .append("text")
      .attr("class", "branch");
    branches.transition()
      .attr("x", 10)
      .attr("y", (branch) => this.yScale(branch.title))
      .text((branch)=>branch.title);
  }

  createCommits(data, transitions){
    var commits = this.chart
                    .selectAll(".commit").data(data.commits);
    commits.exit().remove();
    commits.enter()
      .append("circle")
      .attr("class","commit")
      .attr("cy", (commit) => this.yScale(commit.branch))
      .attr("cx", (commit) => this.xScale(commit.time))
      .attr("r",0);
    commits.transition()
    .delay((d)=> transitions ? d.time * 200 : 0)
    .duration(500)
      .attr("cy", (commit) => this.yScale(commit.branch))
      .attr("cx", (commit) => this.xScale(commit.time))
      .attr("r", this.radius)
      .attr("fill", (commit) => this.branchColourScale(commit.branch));
  }
}
