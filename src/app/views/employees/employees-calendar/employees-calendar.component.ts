import { Component, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import listPlugin from "@fullcalendar/list";

@Component({
  selector: "employees-calendar",
  templateUrl: "./employees-calendar.component.html",
  styleUrls: ["./employees-calendar.component.scss"],
})
export class EmployeesCalendarComponent {
  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  defaultView = "listWeek";
  header = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin,
    listPlugin,
  ];
  calendarWeekends = true;

  calendarEvents: EventInput[] = [
    { title: "Event Now", start: new Date(), end: new Date().setHours(11) },
    { title: "Event Now", start: new Date().setHours(30), color: "#378006" },
  ];

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }
}
