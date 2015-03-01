class MergeRebase{
   init(){
    var chart = new BranchChart(document.getElementById("mergeRebase"));
    var data = {
      branches: [{ title:"develop"}, {title:"master"}],
      commits: [
      {
        branch: "master",
        time: 0,
        mergeTo: "develop"
      },
      {
        branch: "master",
        time: 4,
        comment: "merge from develop"
      },
        {
          branch: "develop",
          time: 1,
          comment: "add feature"
        },
        {
          branch: "develop",
          time: 2,
          comment: "stabilize"
        },
        {
          branch: "develop",
          time: 3,
          comment: "stabilize",
          mergeTo: "master"
        }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);

    $("[data-action=rebase]").click(()=>{
      data.commits.forEach((d)=>{d.branch="master"; delete d.mergeTo;});
      chart.addData(data);
    });
    $("[data-action=merge]").click(()=>{
      var maxMaster = d3.max(data.commits, (d)=>d.time);
      data.commits.forEach((d)=>{delete d.mergeTo;});
      data.commits.filter((d)=>d.branch=="develop").forEach((d)=>{d.branch="master";  d.time=maxMaster+d.time;});
      chart.addData(data);
    });
    $("[data-action=reset]").click(()=>{
      data = jQuery.extend(true, {}, defaultData);
      chart.addData(data);
    });
  }
}
