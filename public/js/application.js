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

  $scope.reset = function(breaks) {
    $scope.inputForm = {
      breakCt: breaks,
      chordInput: '',
      stringInput: []
    };
  }
  $scope.reset(4);

  $scope.resetAll = function() {
    $scope.tabs = [];
    $scope.reset(4);
  }

  $scope.printSpacing = function(spaces, character) {
    var joinVal = character || spacer;
    return Array(spaces + 1).join(joinVal);
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
    if ($scope.inputForm.stringInput.length > 0) {
      $scope.tabs.push($scope.inputForm);
      $scope.reset($scope.inputForm.breakCt);
      document.getElementById("chord-input").focus();
    } else{
      console.log('Empty Forms');
    }
  }

  $scope.addMeasure = function() {
    $scope.inputForm.chordInput = '|';
    $scope.lookupChordTab();
    $scope.tabs.push($scope.inputForm);
    $scope.reset($scope.inputForm.breakCt);
  }

  $scope.editMeasure = function(num) {
    num > 0 ? $scope.tabs[this.$index].breakCt += 1 : $scope.tabs[this.$index].breakCt -= 1;
  }

  $scope.clickedChord = function(choice) {
    $scope.inputForm.chordInput = choice.name;
    $scope.inputForm.stringInput = choice.tab;
    $scope.addTab();
  }

  $scope.pressEnter = function(e) {
    if($scope.inputForm.chordInput || e.which == 77){
      if(e.which==13){ $scope.addTab() };
      if(e.which==77){ $scope.addMeasure() };
    }
  }

}])
