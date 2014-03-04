var guitarApp = angular.module('guitarApp', []);

guitarApp.controller('ChordCtrl', ['$scope', 'ChordLibrary', '$filter', function($scope, ChordLibrary, $filter){

  var spacer = "-"
  $scope.chordLib = ChordLibrary;
  $scope.tabs = [];
  $scope.stringInput = {}
  $scope.chord = '';
  $scope.edit = false;

  var findTab = function(input, type){
    for(var i=0;i<ChordLibrary.tabs.length; i++){
      if(input === ChordLibrary.tabs[i].name){
        return ChordLibrary.tabs[i][type];
      }
    }
  }

  var checkLength = function(){
    var count = 0;
    for(var i = 0; i < $scope.tabs.length; i++){
      count += $scope.tabs[i]['eH'].length;
    }
    if(count >= (parseInt(count/80)+80*parseInt(count%80)) ){
      $('.note-stem').append("<ul id='base-notes'><li>&nbsp;</li><li>e|--</li><li>B|--</li><li>G|--</li><li>D|--</li><li>A|--</li><li>E|--</li></ul>")
    }
  }
  var checkNotes = function(){
    keys = ['eH','b','g','d','a','eL'];
    for(var i = 0; i < keys.length; i++){
      if(!$scope.stringInput[keys[i]]){
        $scope.stringInput[keys[i]] = spacer;
      }
      if($('#add-tab').attr('disabled','false') && $scope.stringInput[keys[i]].length === 2){
        $scope.stringInput[keys[i]] = $scope.stringInput[keys[i]].replace(/^0/g,'');
      }
    }
  }

  $scope.pressEnter = function(e) {
    if($scope.stringInput || e.which == 77){
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
        name: $scope.chordName || "\u00A0",
        eH:   space + $scope.spacing(),
        b:    space + $scope.spacing(),
        g:    space + $scope.spacing(),
        d:    space + $scope.spacing(),
        a:    space + $scope.spacing(),
        eL:   space + $scope.spacing()
      })
    }else if(item === 'chord' && $scope.stringInput !== {}){
      checkNotes();
      if($scope.edit){
        $scope.tabs[$scope.editItem] = {
          name: $scope.chordName || "\u00A0",
          eH:   $scope.stringInput['eH'] + $scope.spacing(),
          b:    $scope.stringInput['b']  + $scope.spacing(),
          g:    $scope.stringInput['g']  + $scope.spacing(),
          d:    $scope.stringInput['d']  + $scope.spacing(),
          a:    $scope.stringInput['a']  + $scope.spacing(),
          eL:   $scope.stringInput['eL'] + $scope.spacing()
        };
        $scope.edit = false;
      }else{
        $scope.tabs.push({
          name: $scope.chordName || "\u00A0",
          eH:   $scope.stringInput['eH'] + $scope.spacing(),
          b:    $scope.stringInput['b']  + $scope.spacing(),
          g:    $scope.stringInput['g']  + $scope.spacing(),
          d:    $scope.stringInput['d']  + $scope.spacing(),
          a:    $scope.stringInput['a']  + $scope.spacing(),
          eL:   $scope.stringInput['eL'] + $scope.spacing()
        });
      }
    }
    checkLength();
    $scope.resetStrings();
    return;
  }

  var spaceListen = $scope.$watch('breakCt', function() {
    $scope.spaces = parseInt($scope.breakCt)
    $scope.spacing();
  });

  $scope.$watch('chord', function() {
    $('#add-tab').attr('disabled', false)
    if($scope.chord) $scope.chord = $scope.chord[0].toUpperCase() + $scope.chord.slice(1);
    $scope.nameTab = findTab($scope.chord, 'tab');
    $scope.chordName = findTab($scope.chord, 'name');
    if($scope.nameTab){
      $scope.stringInput = {
        eH: $scope.nameTab[5],
        b:  $scope.nameTab[4],
        g:  $scope.nameTab[3],
        d:  $scope.nameTab[2],
        a:  $scope.nameTab[1],
        eL: $scope.nameTab[0]
      }
    }
  });

  $scope.$watchCollection('[string_eH,string_b,string_g,string_d,string_a,string_eL]', function() {
    $('#add-tab').attr('disabled', false)
    $scope.stringInput = {
      eH: $scope.string_eH,
      b:  $scope.string_b,
      g:  $scope.string_g,
      d:  $scope.string_d,
      a:  $scope.string_a,
      eL: $scope.string_eL
    }
  }, true);

  $scope.noteEdit = function(){
    $scope.editItem = this.$index;
    $scope.edit = true;
    var editString = $scope.tabs.slice($scope.editItem)[0];
    if(editString['name'] !== "\u00A0"){
      $scope.chord = findTab(editString['name'], 'name');
    }else{
      $scope.stringInput = {
        eH:   editString['eH'][0],
        b:    editString['b'][0],
        g:    editString['g'][0],
        d:    editString['d'][0],
        a:    editString['a'][0],
        eL:   editString['eL'][0]
      }
    }
  }

  $scope.deleteTab = function(){
    var remove = this.$index;
    $scope.tabs.splice(remove, 1);
  }

  $scope.insertTab = function(){
    var insert = this.$index;
    $scope.tabs.splice(insert+1, 0, {
      name: "\u00A0",
      eH:   spacer + $scope.spacing(),
      b:    spacer + $scope.spacing(),
      g:    spacer + $scope.spacing(),
      d:    spacer + $scope.spacing(),
      a:    spacer + $scope.spacing(),
      eL:   spacer + $scope.spacing()
    } );
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
