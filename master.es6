class Master{
   init(){
    var chart = new BranchChart(document.getElementById("master"));
    var data = {
      branches: [{title:"master"}],
      commits: [
      {
        branch: "master",
        time: 0,
        comment: "Release 1.0"
      },
      {
        branch: "master",
        time: 1,
        comment: "Release 1.1"
      },
      {
        branch: "master",
        time: 2,
        comment: "Release 1.2"
      },
      {
        branch: "master",
        time: 3,
        comment: "Release 2.0"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var master = new Master();
