class BranchChart{
  constructor(container, options){
    this.options = {
      edgeTransitions: true
    };
    this.options = $.extend(this.options, options);
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
                  .rangeBands([60, Math.min(this.height, data.branches.length * 130)], .1);

    this.xScale = d3.scale.linear()
                   .domain([0, d3.max(data.commits, (x) => x.time)])
                   .range([220, this.width-150]);
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
          .attr("class", "edge")
          .attr("opacity", 0);
    edges.transition()
          .attr("opacity", 0)
          .delay(()=>  this.options.edgeTransitions ? d3.max(data.commits, (d)=>d.time) + 1 * 1500 : 0)
          .duration(200)
          .attr("y1", (commit) => this.yScale(commit.branch))
          .attr("x1", (commit) => this.xScale(commit.time)-this.radius)
          .attr("x2", (commit) => {
            if(commit.time == d3.min(data.commits.filter((c)=>c.branch == commit.branch), (c) => c.time))
              return this.xScale(commit.time)-this.radius;
            return this.xScale(d3.max(data.commits.filter((c)=>c.branch == commit.branch && c.time < commit.time), (c) => c.time))+this.radius;
          })
          .attr("y2", (commit) => this.yScale(commit.branch))
          .attr("opacity", 1);

    var edgeNodes = [];
    var tempEdgeNodes = data.commits.filter((c)=> c.mergeTo !== undefined);
    for(var i = 0; i<tempEdgeNodes.length;i++)
    {
      if(tempEdgeNodes[i].mergeTo.constructor === Array)
      {
        for(var j = 0; j<tempEdgeNodes[i].mergeTo.length; j++)
        {
          var edge = $.extend({},tempEdgeNodes[i]);
          edge.mergeTo = tempEdgeNodes[i].mergeTo[j];
          edgeNodes.push(edge);
        }
      }
      else
        edgeNodes.push(tempEdgeNodes[i]);
    }
    var mergeEdges = this.chart.selectAll(".merge-edge").data(edgeNodes);

    mergeEdges.exit().remove();
    mergeEdges.enter()
          .append("path")
          .attr("class", "edge merge-edge")
          .attr("fill", "rgba(255,255,255,0)");
    mergeEdges.transition()
          .delay(()=> this.options.edgeTransitions ? d3.max(data.commits, (d)=>d.time) + 1 * 1500 : 0)
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
      .attr("r",0)
      .on("click", (commit)=>{
        if(commit.selected)
        {
          commit.selected = false;
          d3.select(d3.event.srcElement).transition().attr("r", this.radius);
        }
        else{
          commit.selected = true;
          d3.select(d3.event.srcElement).transition().attr("r", this.radius*1.4);
        }

      });
    commits.transition()
    .delay((d)=> transitions ? d.time * 200 : 0)
    .duration(500)
      .attr("cy", (commit) => this.yScale(commit.branch))
      .attr("cx", (commit) => this.xScale(commit.time))
      .attr("r", (commit) =>  this.selected ? this.radius * 1.4 : this.radius)
      .attr("fill", (commit) => this.branchColourScale(commit.branch));
      var commitBox = this.chart
                          .selectAll(".commit-box")
                          .data(data.commits);
      commitBox.exit().remove();
      commitBox.enter()
      .append("rect")
      .attr("class", "commit-box");
      commitBox.transition()
      .attr("y", (commit) => this.yScale(commit.branch) - this.radius - 43)
      .attr("x", (commit) => this.xScale(commit.time) - 85)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("width", (commit) => commit.comment === undefined ? 0 : 170)
      .attr("height", 40);

      var commitLabels = this.chart
      .selectAll(".commit-label").data(data.commits);
      commitLabels.exit().remove();
      commitLabels.enter()
      .append("text")
      .attr("class", "commit-label");
      commitLabels.transition()
      .attr("y", (commit) => this.yScale(commit.branch) - this.radius - 13)
      .attr("x", (commit) => this.xScale(commit.time))
      .attr("text-anchor", "middle")
      .text((commit)=>commit.comment);
  }
}
