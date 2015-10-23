var SHEET_NAME = 'D1Results';

function Result() {
  this.row = 0;
  this.division;
  this.date = null;
  this.time = null;
  this.team1;
  this.team1Score;
  this.team1Points;
  this.team2;
  this.team2Score;
  this.team2Points;
}

function ResultDate(date) {
  this.date = date;
  this.results = new Array(9);
}

function getResults_() {
  var data = SpreadsheetApp.openById(SHEET_ID).getRangeByName('D1Results').getValues();
  var results = new Array(10);
  var resultIndex = 0;
  var resDateIndex = 0;
  
  for (var row = 0; row < data.length; row++) {
    var result = new Result();
    result.row = row;
    result.division = data[row][0];
    result.date = Utilities.formatDate(data[row][2], Session.getScriptTimeZone(), "MMM d, yyyy");
    result.time = Utilities.formatDate(data[row][3], Session.getScriptTimeZone() , "hh:mm");
    result.team1 = data[row][5];
    result.team1Score = data[row][6];
    result.team1Points = data[row][7];
    result.team2 = data[row][8];
    result.team2Score = data[row][9];
    result.team2Points = data[row][10];
    
    var resDate = results[resultIndex];
    if (resDate != null && resDate.date != result.date) {
      resDate = null;
      resultIndex = resultIndex + 1;
    }
    if (resDate == null) {
      resDate = new ResultDate(result.date);
      results[resultIndex] = resDate;
      resDateIndex = 0;
    } 
    resDate.results[resDateIndex++] = result;
  }
  
  return results;
}

// <td align='center'><input id='game1Team1Score' type='number' class='score' min=0 onkeyup="JavaScript: checkInputs()" onmouseup="JavaScript: checkInputs()" value='3'/></td>

