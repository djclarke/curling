/*
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CVCC//NONSGML Friday Mixed//EN
BEGIN:VEVENT
UID:19970610T172345Z-AF23B2@example.com
DTSTAMP:19970610T172345Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR
*/

function Calendar() {
  this.version = 2.0;
  this.prodId;
  this.events = [];
  this.addEvent = function(uid, stamp, start, end, summary) {
    var newEvent = new Event_();
    newEvent.uid = uid;
    newEvent.dtstamp = stamp;
    newEvent.dtstart = start;
    newEvent.dtend = end;
    newEvent.summary = summary;
    this.events[this.events.length] = newEvent;
  }
  this.print = function(output) {
    output.append('BEGIN:VCALENDAR\n');
    output.append('VERSION:2.0\n');
    output.append('PRODID:-//CVCC//NONSGML Friday Mixed//EN\n');
    for (var i = 0; i < this.events.length; i++) {
      this.events[i].print(output);
    }
    output.append('END:VCALENDAR\n');
  }
}

function Event_() {
  this.uid;
  this.dtstamp;
  this.dtstart;
  this.dtend;
  this.summary;
  this.print = function(output) {
    output.append('BEGIN:VEVENT\n');
    output.append('UID:' + this.ui + '\n');
    output.append('DTSTAMP:' + Utilities.formatDate(this.dtstamp, 'ET', 'yyyyMMddTHHmmssZ') + '\n');
    output.append('DTSTART;TZID=America/New_York:' + Utilities.formatDate(this.dtstart, 'ET', 'yyyyMMddTHHmmss') + '\n');
    output.append('DTEND:' + Utilities.formatDate(this.dtend, 'ET', 'yyyyMMddTHHmmssZ') + '\n');
    output.append('SUMMARY:' + this.summary + '\n');
    output.append('END:VEVENT\n');
  }
}
