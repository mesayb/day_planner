// capture Elements
var mainContainer = $(".container");
var currentDay = $("#currentDay");

var scheduleRecord = [];

//add date to the jumbotron in the form -> Saturday, January 11th
var todayDate = moment().format("dddd, MMMM Do");
currentDay.text(todayDate);


var myMoment = moment();
//Testing purpose only - delete this and update if to moment()
// var myMoment = moment().set({
//     'hour': 14,
//     'minute': 30
// });


//CREATE active hours array
var activeHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];


//create an object of hourlyData of 'startTime' and 'endTime' between 9am->5pm
var hourlyData = [{
        startTime: moment().set({
            'hour': 9,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 10,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 10,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 11,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 11,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 12,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 12,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 13,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 13,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 14,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 14,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 15,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 15,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 16,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 16,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 17,
            'minute': 00
        }),
    },
    {
        startTime: moment().set({
            'hour': 17,
            'minute': 00
        }),
        endTime: moment().set({
            'hour': 18,
            'minute': 00
        }),
    },
];

//create elements
function createElements() {
    //create 9 div rows - for each block of time
    for (var i = 0; i < 9; i++) {
        var row = $("<div>");
        row.addClass("row");

        //iterate and create 3 div columns with respective data under each div row
        for (var j = 1; j <= 3; j++) {
            //create columns 'j==1'=> timer indicator grid, 'j==2'=> textarea & 'j==3'=>save buttons
            var columns = $("<div>");
            if (j === 1) {
                columns.addClass("col-sm-2 hour pt-4 text-center");
                for (var k = 0; k < activeHours.length; k++) {
                    columns.text(activeHours[i]);
                }
            } else
            if (j === 2) {
                //set grid col size
                columns.addClass("col-sm-8");
                //create a textarea
                var textarea = $("<textarea>");
                //add class for styling
                textarea.addClass("w-100 h-100");
                //add 'id' to the textarea by iterating through activeHours array
                textarea.attr("id", activeHours[i]);

                //Apply the dynamic color to textarea based on current time
                if (myMoment.isBetween(hourlyData[i].startTime, hourlyData[i].endTime)) {
                    textarea.addClass("present");
                } else
                if (hourlyData[i].startTime.isAfter(myMoment)) {
                    textarea.addClass("future");
                } else {
                    textarea.addClass("past")
                }

                //populate textarea with records from locaStorage if there are any
                var retrievedSchedule = JSON.parse(localStorage.getItem("scheduleRecord_personal"));
                if (retrievedSchedule === null) {
                    textarea.text(scheduleRecord[i]);
                } else {
                    textarea.text(retrievedSchedule[i]);
                    scheduleRecord = retrievedSchedule;
                }

                //append textarea into the col
                columns.append(textarea);
            } else {
                //create the save buttons on the right handside
                columns.addClass("col-sm-2 saveBtn text-center fa fa-save pt-4 btn btn-primary");
                columns.attr("id", `${activeHours[i]}Save`);

            }
            row.append(columns);
        }
        mainContainer.append(row);
    }
}

createElements();


//add eventListner to save buttons
$(".saveBtn").click(function (event) {
    event.preventDefault();
    for (var i = 0; i < activeHours.length; i++) {
        if (event.target.id === `${activeHours[i]}Save`) {
            var val = $(`#${activeHours[i]}`).val();
            scheduleRecord[i] = val.trim();
        }
    }
    localStorage.setItem("scheduleRecord_personal", JSON.stringify(scheduleRecord));
})