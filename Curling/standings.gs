var STANDINGS_RANGE_NAME = 'D1Standings';

function TeamStandings_() {
  this.row = 0;
  this.teamNum;
  this.teamName;
  this.teamDrawNum;
  this.points;
  this.scoreFor;
  this.scoreAgainst;
}

function DivisionStandings_(name) {
  //Logger.log('DivisionStandings::' + name);
  this.name = name;
  this.teams = new Array(8);
  this.display = 'none';
  this.selected = '';
}

function setDisplay_(standings, div) {
  if (standings.name == div) {
    standings.display = 'block';
    standings.selected = 'selected';
  } else {
    standings.display = 'none';
    standings.selected = '';
  }
}


function getStandings(selected) {
  var divStandings = new Array(3);
  
  divStandings[0] = getStandingsDiv_('A', selected);
  divStandings[1] = getStandingsDiv_('B', selected);
  divStandings[2] = getStandingsDiv_('C', selected);
    
  return divStandings;
}

function getStandingsDiv_(div, selected) {
  var range = SpreadsheetApp.openById(SHEET_ID).getRangeByName(STANDINGS_RANGE_NAME + div);
  
  if (range == null) {
    return null;
  }
  
  range.sort({column: 4, ascending: false});
  
  var data = range.getValues();
  var divStanding = new DivisionStandings_(div);
  
  for (var row = 0; row < data.length; row ++) {
    var teamStanding = new TeamStandings_();
    teamStanding.row = row;
    teamStanding.teamNum = data[row][0];
    teamStanding.teamName = data[row][1];
    teamStanding.teamDrawNum = data[row][2];
    teamStanding.points = data[row][3];
    teamStanding.scoreFor = data[row][4];
    teamStanding.scoreAgainst = data[row][5];
    divStanding.teams[row] = teamStanding;
  }
  setDisplay_(divStanding, selected);
    
  return divStanding;
}


