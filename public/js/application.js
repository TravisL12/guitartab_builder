var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  var findTab = function(input, type){
    for(var i=0;i<ChordLibrary.tabs.length; i++){
      if(input === ChordLibrary.tabs[i].name){
        return ChordLibrary.tabs[i][type];
      }
    }
  }

  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.stringInput = {}
  $scope.chord = '';

  $scope.pressEnter = function(e) {
    if($scope.note || e.which == 77){
      if(e.which==13){ $scope.addTab('chord') };
      if(e.which==77){ $scope.addTab('measure') };
    }
  }

  var spacer = "-"
  $scope.spacing = function(){
    if(!$scope.spaces) $scope.spaces = 4;
    return new Array($scope.spaces + 1).join(spacer);
  }

  $scope.spacerCt = function(){
    $scope.tabs.push({
      eH: $scope.spacing(),
      b:  $scope.spacing(),
      g:  $scope.spacing(),
      d:  $scope.spacing(),
      a:  $scope.spacing(),
      eL: $scope.spacing()})
  }

  var spaceListen = $scope.$watch('breakCt', function() {
    $scope.spaces = parseInt($scope.breakCt)
    $scope.spacing();
  });

  $scope.$watch('chord', function() {
    $scope.stringInput = {};
    $scope.nameTab = findTab($scope.chord, 'tab');
    $scope.chordName = findTab($scope.chord, 'name');
  });

  $scope.$watchCollection('[string_eH,string_b,string_g,string_d,string_a,string_eL]', function() {
    $scope.chord = '';
  }, true);

  $scope.note = function(chord, string, name){
    if(chord){
      $('#add-tab').attr('disabled', false)
      $scope.stringInput[name] = chord;
      return chord;
    }else if(string){
      $('#add-tab').attr('disabled', false)
      if(string === '0'){
        $scope.stringInput[name] = string;
        return string;
      }
      string = string.replace(/^0/g,'');
      $scope.stringInput[name] = string;
      return string;
    }else{
      $scope.stringInput[name] = spacer;
      return spacer;
    }
  }

  $scope.addTab = function(item){
    if(item === 'measure'){
      $scope.tabs.push({
        name: '|',
        eH:   '|' + $scope.spacing(),
        b:    '|' + $scope.spacing(),
        g:    '|' + $scope.spacing(),
        d:    '|' + $scope.spacing(),
        a:    '|' + $scope.spacing(),
        eL:   '|' + $scope.spacing()
      })
    }else if(item === 'chord' && $scope.stringInput !== {}){
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
