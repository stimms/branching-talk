class VersionMaster{
   init(){
    var chart = new BranchChart(document.getElementById("versionMaster"));
    var data = {
      branches: [{title:"8.0_master"}],
      commits: [
      {
        branch: "8.0_master",
        time: 0,
        comment: "Release 8.0.1"
      },
      {
        branch: "8.0_master",
        time: 1,
        comment: "Release 8.0.2"
      },
      {
        branch: "8.0_master",
        time: 2,
        comment: "Release 8.0.3"
      },
      {
        branch: "8.0_master",
        time: 3,
        comment: "Release 8.0.4"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var versionMaster = new VersionMaster();
