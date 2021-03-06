var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  $scope.spacer = "-"
  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.edit = false;

  function blankChord(breaks) {
    var breakCt = breaks || 4;
    return {
      breakCt: breaks,
      chordInput: '',
      stringInput: Array(6)
    }
  };

  function titleCase(text) {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }
  }

  $scope.reset = function(breaks) {
    $scope.inputForm = blankChord(breaks);
  }
  $scope.reset(4);

  $scope.resetAll = function() {
    $scope.tabs = [];
    $scope.reset(4);
  }

  $scope.buildRawTab = function() {
    var strings = $scope.inputForm.stringNumbers.split('');
    var frets = $scope.inputForm.fretNumbers.split('');

    for(var i=0; i<strings.length; i++) {
      $scope.inputForm.stringInput[strings[i] - 1] = frets[i];
    }
    $scope.addTab();
  }

  $scope.printSpacing = function(spaces, character) {
    var joinVal = character || $scope.spacer;
    return Array(spaces + 1).join(joinVal);
  }

  $scope.insertTab = function() {
    $scope.editIdx = this.$index;
    $scope.tabs.splice($scope.editIdx, 0, blankChord($scope.inputForm.breakCt));
    $scope.edit = true;
  }

  $scope.editTab = function() {
    $scope.inputForm.chordInput = $scope.tabs[this.$index].chordInput;
    $scope.inputForm.stringInput = $scope.tabs[this.$index].stringInput;
    $scope.editIdx = this.$index;
    $scope.edit = true;
  }

  $scope.saveEditTab = function() {
    $scope.tabs[$scope.editIdx].chordInput  = $scope.inputForm.chordInput;
    $scope.tabs[$scope.editIdx].stringInput = $scope.inputForm.stringInput;
    $scope.reset($scope.inputForm.breakCt);
    $scope.edit = false;
  }

  $scope.deleteTab = function() {
    var idx = this.$index;
    $scope.tabs.splice(idx, 1);
  }

  $scope.editMeasure = function(num) {
    if (num > 0) {
      $scope.tabs[this.$index].breakCt += 1
    } else if ($scope.tabs[this.$index].breakCt > 0) {
      $scope.tabs[this.$index].breakCt -= 1;
    }
  }

  $scope.lookupChord = function(){
    $scope.inputForm.chordInput = titleCase($scope.inputForm.chordInput);
    for(var i=0;i<ChordLibrary.length; i++){
      if($scope.inputForm.chordInput === ChordLibrary[i].name){
        $scope.inputForm.stringInput = ChordLibrary[i].tab;
      }
    }
  }

  $scope.addTab = function() {
    if ($scope.inputForm.stringInput.length > 0 && !$scope.edit) {
      $scope.tabs.push($scope.inputForm);
      $scope.reset($scope.inputForm.breakCt);
      document.getElementById("chord-input").focus();
    } else{
      console.log('Empty Forms');
    }
  }

  $scope.addMeasure = function() {
    $scope.inputForm.chordInput = '|';
    $scope.lookupChord();
    $scope.tabs.push($scope.inputForm);
    $scope.reset($scope.inputForm.breakCt);
  }

  $scope.clickedFilteredChord = function(choice) {
    $scope.inputForm.chordInput = choice.name;
    $scope.inputForm.stringInput = choice.tab;
    $scope.edit ? $scope.saveEditTab() : $scope.addTab();
  }

  $scope.pressEnter = function(e) {
    if($scope.inputForm.chordInput || e.which == 77){
      if(e.which==13){
        $scope.edit ? $scope.saveEditTab() : $scope.addTab();
      };
      if(e.which==77){ $scope.addMeasure() };
    }
  }

}])
