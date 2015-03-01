class HotFix{
   init(){
    var chart = new BranchChart(document.getElementById("hotfix"));
    var data = {
      branches: [{title:"master"}, {title:"hotfix"}],
      commits: [
      {
        branch: "master",
        time: 0,
        comment: "Release 1.0"
      },
      {
        branch: "master",
        time: 1,
        comment: "Release 1.1",
        mergeTo: "hotfix"
      },
      {
        branch: "hotfix",
        time: 2,
        comment: "Fixed security exploit",
        mergeTo: "master"
      },
      {
        branch: "master",
        time: 3,
        comment: "Hotfix 1.1.0.1"
      },
      {
        branch: "master",
        time: 4,
        comment: "Release 1.2"
      },
      {
        branch: "master",
        time: 4,
        comment: "Release 2.0"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var hotfix = new HotFix();
