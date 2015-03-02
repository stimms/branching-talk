class HydraFix{
   init(){
    var chart = new BranchChart(document.getElementById("hydraFix"));
    var data = {
      branches: [{title:"8.0_master"}, {title: "fix-for-7"},{title:"8.1_master"}],
      commits: [
      {
        branch: "8.1_master",
        time: 0,
      },
      {
        branch: "8.0_master",
        time: 0,
        comment: "Release 8.0",
        mergeTo: "fix-for-7"
      },
      {
        branch: "fix-for-7",
        time: 1
      },
      {
        branch: "fix-for-7",
        time: 2
      },
      {
        branch: "fix-for-7",
        time: 3,
        mergeTo: ["8.1_master", "8.0_master"]
      },
      {
        branch: "8.1_master",
        time: 4
      },
      {
        branch: "8.0_master",
        time: 4
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var hydraFix = new HydraFix();
