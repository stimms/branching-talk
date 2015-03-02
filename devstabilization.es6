class DevStabilization{
   init(){
    var chart = new BranchChart(document.getElementById("devstabilization"));
    var data = {
      branches: [{title: "password-encryption"},{title:"stabilization"},{title: "password-reset"},{title: "master"}],
      commits: [
      {
        branch: "master",
        time: 0
      },
      {
        branch: "password-encryption",
        time: 0,
        comment: "Adding password encryption"
      },
      {
        branch: "password-encryption",
        time: 1,
        comment: "Applying fixes"
      },
      {
        branch: "password-encryption",
        time: 2,
        comment: "Final cleanup",
        mergeTo: "stabilization"
      },
      {
        branch: "password-reset",
        time: 1,
        comment: "Adding password reset"
      },
      {
        branch: "password-reset",
        time: 2,
        comment: "Jim's suggestions"
      },
      {
        branch: "password-reset",
        time: 3,
        comment: "Final cleanup",
        mergeTo: "stabilization"
      },
      {
        branch: "master",
        time: 5,
        comment: "Ready for release"
      },
      {
        branch: "stabilization",
        time: 5
      },
      {
        branch: "stabilization",
        time: 0
      },
      {
        branch: "stabilization",
        time: 3
      },
      {
        branch: "stabilization",
        time: 4,
        mergeTo: "master"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var devstabilization = new DevStabilization();
