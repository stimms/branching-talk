class PatchBranch{
   init(){
    var chart = new BranchChart(document.getElementById("patchBranch"));
    var data = {
      branches: [{title:"8.0_master"}, {title: "8.0_patch1"}],
      commits: [
      {
        branch: "8.0_master",
        time: 0,
        comment: "Release 8.0.1"
      },
      {
        branch: "8.0_patch1",
        time: 1,
        comment: "Fix for #3"
      },
      {
        branch: "8.0_patch1",
        time: 2,
        comment: "Fix for #5"
      },
      {
        branch: "8.0_patch1",
        time: 3,
        comment: "Fix for #8",
        mergeTo: "8.0_master"
      },
      {
        branch: "8.0_master",
        time: 4,
        comment: "Release 8.0.1"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var patchBranch = new PatchBranch();
