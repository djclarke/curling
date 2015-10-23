var D1TEAMSCHED = 'D1TeamSched';

/**
 * TEAM Info
 */
var TEAM_RANGE = 'teams';

function Team_(row) {
  this.id = row[0];
  this.drawId = row[2];
  this.name = row[1];
}

function getTeams() {
  var teamsRange = SpreadsheetApp.openById(SHEET_ID).getRangeByName(TEAM_RANGE);
  var data = teamsRange.getValues();
  var teams = new Array(data.length);
  
  for (var i = 0; i < data.length; i++) {
     teams[i] = new Team_(data[i]);  
  }
  
  return teams;
}

function TeamSchedule_(team, name) {
  this.team = team;
  this.name = name;
  this.games = [];
}

function TeamGame_() {
  this.date;
  this.time;
  this.sheet;
  this.against;
  this.againstTeam;
  this.result;
  this.notes;
}

function getTeamSchedule(team) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(D1TEAMSCHED);
  sheet.getRange('G1').setValue(team);
  var data = sheet.getDataRange().getValues();
  
  var sched = new TeamSchedule_(data[0][6], data[0][7]);
  
  for (var i = 2; i < data.length; i++) {
    var game = new TeamGame_();
    game.date = Utilities.formatDate(data[i][6], Session.getScriptTimeZone(), 'MMM d');
    game.time = data[i][7];
    if (game.time != 'BYE') {
      game.time = Utilities.formatDate(game.time, Session.getScriptTimeZone() , "hh:mm");
    }
    game.sheet = data[i][8];
    game.against = data[i][9];
    game.againstTeam = data[i][5];
    game.result = data[i][10];
    if (game.result != '' && game.result.substring(0,3) != 'Tie') {
      var scores = game.result.split("-");
      if (team < game.againstTeam) {
        if (scores[0] < scores[1]) {
         game.result = 'Loss ' + game.result; 
        } else {
         game.result = 'Win ' + game.result; 
        }
      } else {
        if (scores[0] < scores[1]) {
         game.result = 'Win ' + scores[1] + '-' +scores[0]; 
        } else {
         game.result = 'Loss ' + game.result; 
        }
      }
    }
    game.notes = data[i][11];
    
    sched.games[sched.games.length] = game;
  }
  
  return sched;
}



