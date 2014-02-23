var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', function($scope, ChordLibrary){
  $scope.chords = ChordLibrary;
})


guitarApp.controller('TabCtrl', function($scope, ChordLibrary){
  var spacer = "-"
  var spacerCt = 3;

  $scope.spacing = new Array(spacerCt + 1).join(spacer);
  $scope.tabs = [
  { eH: '0',b: '1',g: '0',d: '2',a: '3',eL: 'X' },
  { eH: '2',b: '3',g: '2',d: '0',a: '0',eL: 'X' },
  { eH: '0',b: '0',g: '1',d: '2',a: '2',eL: '0' },
  { eH: '1',b: '1',g: '2',d: '3',a: '3',eL: '1' },
  ]
})
