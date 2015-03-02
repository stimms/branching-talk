class MultipleMasters{
   init(){
    var chart = new BranchChart(document.getElementById("multiplemasters"));
    var data = {
      branches: [{title: "password-encryption"},{title:"release-2.0"},{title: "release-3.0"},{title: "password-reset"}],
      commits: [
      {
        branch: "release-2.0",
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
        mergeTo: "release-2.0"
      },
      {
        branch: "release-2.0",
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
        mergeTo: "release-3.0"
      },
      {
        branch: "release-2.0",
        time: 4,
        comment: "Security fix",
        mergeTo: "release-3.0"
      },
      {
        branch: "release-2.0",
        time: 5,
        mergeTo: "release-3.0"
      },
      {
        branch: "release-3.0",
        time: 1
      },
      {
        branch: "release-3.0",
        time: 3
      },
      {
        branch: "release-3.0",
        time: 5,
        comment: "Password Reset"
      }
      ]
    };
    var defaultData = jQuery.extend(true, {}, data);
    chart.init(data);
  }
}
var multiplemasters = new MultipleMasters();
