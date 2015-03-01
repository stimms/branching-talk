class PullRequest{
   init(){
    var chart = new BranchChart(document.getElementById("pullrequest"));
    var data = {
      branches: [{title: "password-encryption"},{title:"master"},{title: "password-reset"}],
      commits: [
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
        mergeTo: "master"
      },
      {
        branch: "master",
        time: 3,
        comment: "Password Encryption"
      },
      {
        branch: "password-reset",
        time: 2,
        comment: "Adding password reset"
      },
      {
        branch: "password-reset",
        time: 3,
        comment: "Jim's suggestions"
      },
      {
        branch: "password-reset",
        time: 4,
        comment: "Final cleanup",
        mergeTo: "master"
      },
      {
        branch: "master",
        time: 4,
        comment: "Security fix"
      },
      {
        branch: "master",
        time: 5,
        comment: "Password Reset"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var pullrequest = new PullRequest();
