var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  var spacer = "-"
  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.stringInput = {}
  $scope.chord = '';

  var findTab = function(input, type){
    for(var i=0;i<ChordLibrary.tabs.length; i++){
      if(input === ChordLibrary.tabs[i].name){
        return ChordLibrary.tabs[i][type];
      }
    }
  }

  var checkNotes = function(){
    keys = ['eH','b','g','d','a','eL'];
    for(var i = 0; i < keys.length; i++){
      if(!$scope.stringInput[keys[i]]){
        $scope.stringInput[keys[i]] = spacer;
      }
      if($scope.stringInput[keys[i]][0] === '0' && $scope.stringInput[keys[i]].length === 2){
        $scope.stringInput[keys[i]] = $scope.stringInput[keys[i]].replace(/^0/g,'');
      }
    }
  }

  $scope.pressEnter = function(e) {
    if($scope.note || e.which == 77){
      if(e.which==13){ $scope.addTab('chord') };
      if(e.which==77){ $scope.addTab('measure') };
    }
  }

  $scope.spacing = function(){
    if(!$scope.spaces) $scope.spaces = 4;
    return new Array($scope.spaces + 1).join(spacer);
  }

  $scope.addTab = function(item){
    if(item !== 'chord'){
      var space = item == 'break' ? '' : '|';
      $scope.tabs.push({
        name: space,
        eH:   space + $scope.spacing(),
        b:    space + $scope.spacing(),
        g:    space + $scope.spacing(),
        d:    space + $scope.spacing(),
        a:    space + $scope.spacing(),
        eL:   space + $scope.spacing()
      })
    }else if(item === 'chord' && $scope.stringInput !== {}){
      checkNotes();
      $scope.tabs.push({
        name: $scope.chordName,
        eH:   $scope.stringInput['eH'] + $scope.spacing(),
        b:    $scope.stringInput['b']  + $scope.spacing(),
        g:    $scope.stringInput['g']  + $scope.spacing(),
        d:    $scope.stringInput['d']  + $scope.spacing(),
        a:    $scope.stringInput['a']  + $scope.spacing(),
        eL:   $scope.stringInput['eL'] + $scope.spacing()
      });
    }
    $scope.resetStrings();
    return;
  }

  var spaceListen = $scope.$watch('breakCt', function() {
    $scope.spaces = parseInt($scope.breakCt)
    $scope.spacing();
  });

  $scope.$watch('chord', function() {
    $scope.stringInput = {};
    $('#add-tab').attr('disabled', false)
    if($scope.chord) $scope.chord = $scope.chord[0].toUpperCase() + $scope.chord.slice(1);
    $scope.nameTab = findTab($scope.chord, 'tab');
    $scope.chordName = findTab($scope.chord, 'name');
    if($scope.nameTab){
      $scope.stringInput['eH'] = $scope.nameTab[5];
      $scope.stringInput['b']  = $scope.nameTab[4];
      $scope.stringInput['g']  = $scope.nameTab[3];
      $scope.stringInput['d']  = $scope.nameTab[2];
      $scope.stringInput['a']  = $scope.nameTab[1];
      $scope.stringInput['eL'] = $scope.nameTab[0];
    }
  });

  $scope.$watchCollection('[string_eH,string_b,string_g,string_d,string_a,string_eL]', function() {
    $('#add-tab').attr('disabled', false)
    $scope.stringInput['eH']   = $scope.string_eH;
    $scope.stringInput['b']    = $scope.string_b;
    $scope.stringInput['g']    = $scope.string_g;
    $scope.stringInput['d']    = $scope.string_d;
    $scope.stringInput['a']    = $scope.string_a;
    $scope.stringInput['eL']   = $scope.string_eL;
  }, true);

  $scope.resetStrings = function(){
    $('#add-tab').attr('disabled', true)
    $scope.stringInput = {};
    $scope.chord       = '';
    $scope.chordName   = '';
    $scope.string_eH   = '';
    $scope.string_b    = '';
    $scope.string_g    = '';
    $scope.string_d    = '';
    $scope.string_a    = '';
    $scope.string_eL   = '';
  }

  $scope.resetAll = function(){
    $scope.resetStrings();
    $scope.tabs = [];
  }

}])
