class HydraFeature{
   init(){
    var chart = new BranchChart(document.getElementById("hydraFeature"));
    var data = {
      branches: [{title:"8.0_master"}, {title: "password-reset"},{title:"8.1_master"}],
      commits: [
      {
        branch: "8.0_master",
        time: 0,
        comment: "Release 8.0",
        mergeTo: "password-reset"
      },
      {
        branch: "password-reset",
        time: 1
      },
      {
        branch: "password-reset",
        time: 2
      },
      {
        branch: "password-reset",
        time: 3,
        mergeTo: "8.1_master"
      },
      {
        branch: "8.1_master",
        time: 4
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var hydraFeature = new HydraFeature();
