// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvO-6ogGoed3l-42lRWewUp5jxQ9P8oxE",
  authDomain: "train-schedule-ff.firebaseapp.com",
  databaseURL: "https://train-schedule-ff.firebaseio.com/",
  projectId: "train-schedule-ff",
  storageBucket: "",
  messagingSenderId: "918662813078"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainNameInput = "";
var destinationInput = "";
var firstTrainTimeInput = "";
var frequencyInMinutesInput = "";
var minutesAway = "";


$("#submit").on("click", function() {
  event.preventDefault();

  trainNameInput = $("#trainNameInput").val().trim();
  destinationInput = $("#destinationInput").val().trim();
  firstTrainTimeInput = $("#firstTrainTimeInput").val().trim();
  frequencyInMinutesInput = $("#frequencyInMinutesInput").val().trim();
  minutesAway = "";

  database.ref().push({
    trainNameInput: trainNameInput,
    destinationInput: destinationInput,
    firstTrainTimeInput: firstTrainTimeInput,
    frequencyInMinutesInput: frequencyInMinutesInput,
    minutesAway: minutesAway

  });


});


database.ref().on("child_added", function(snapshot) {

  var trainNameInput = (snapshot.val().trainNameInput);
  var destinationInput = (snapshot.val().destinationInput);
  var firstTrainTimeInput = (snapshot.val().firstTrainTimeInput);
  var frequencyInMinutesInput = (snapshot.val().frequencyInMinutesInput);
  console.log(snapshot.val());

  $("#table").append("<tr><td>" + trainNameInput + "</td><td>" +
    destinationInput + "</td><td>" + firstTrainTimeInput + "</td><td>" +
    frequencyInMinutesInput + "</td><td>" + minutesAway + "</td></tr>");
});

//***************************************************
//***************************************************
//***************************************************

// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));