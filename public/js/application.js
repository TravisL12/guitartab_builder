var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  var spacer = "-"
  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.edit = false;

  function titleCase(text) {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }
  }

  $scope.lookupChordTab = function(){
    $scope.inputForm.chordInput = titleCase($scope.inputForm.chordInput);
    for(var i=0;i<ChordLibrary.length; i++){
      if($scope.inputForm.chordInput === ChordLibrary[i].name){
        $scope.inputForm.stringInput = ChordLibrary[i].tab;
      }
    }
  }

  $scope.addTab = function() {
    var chordName = $scope.inputForm.chordInput || ' ';
    var notes = $scope.inputForm.stringInput.reverse();
    $scope.inputForm = {};

    var tab = {
      name: chordName,
      notes: notes
    }
    $scope.tabs.push(tab);
  }

  $scope.updateChord = function(choice) {
    $scope.inputForm.chordInput = choice.name;
    $scope.inputForm.stringInput = choice.tab;
  }

}])
