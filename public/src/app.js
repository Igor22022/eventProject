import User from "./createUser";
import request from "./getEventsData";
import renderData from "./showEventsData";
import PriceOfEvent from "./maxMinPrice";
import AddEvent from "./addEvent";
// import deleteEventFromList from "./deleteEvent";
// import selectEvent from "./favoriteEvent";


//При першому відкритті створюємо юзера і зберегаємо в локалсторедж
function createUserToLocalStorage() {
    var instance = User.getInstance(); 
}

window.onload = createUserToLocalStorage();

/**
 * getting data about events from database and save it
 * @param {array} data - save all events from database
 */
function getData(){
  request({url: "http://localhost:3000/events"})
 .then(data => {
    let allEvents = JSON.parse(data);
    renderData(allEvents); // show events on webpage
  })
 .catch(error => {
   console.log(error);
  });
}

getData(); // show data
/*-----------------------------------------------*/

 /**
  * delete Event from list
  */

$('#list').on('click', '#deleteItem', function(){
  
  var eventId = $(this).attr("data-id");
  let http  = 'http://localhost:3000/events/' + eventId;
  $.ajax(http, {
    method: 'DELETE'
  });
  getData(); // show new data
});

/*-------------------------------------------*/

// select an Event to favorite
$('#list').on('click', '#selectedEvent', function(){
  $(this).parent().css("background-color","#FFE4B5");
});

/*-------------------------------------------*/

/*--- show/hide Modal Wrapper to add new event ---*/
$('body').on('click', '#addEvent',function(e){
  e.preventDefault();
  $('.modal_wrapper').show(600);
});

$('.modal_wrapper').on('click', '.close_icon, #overlay, #addNewEvent, #newEvent', function(){
  $('.modal_wrapper').hide(600);
});

// prevent default for form
// $("#addForm").submit(function(e){
//   e.preventDefault();
// });


/*--- The most expensive event ---*/
$('body').on('click', '#maxPrice',function(e){
  request({url: "http://localhost:3000/events"})
   .then(data => {
      let allEvents = JSON.parse(data);

//    Найдорожчий квиток
      let max = new PriceOfEvent();
      max.showPrice(max.maxPrice(allEvents));
    })
   .catch(error => {
     console.log(error);
  });
});

/*--- The cheapest event ---*/
$('body').on('click', '#minPrice',function(e){
  request({url: "http://localhost:3000/events"})
   .then(data => {
      let allEvents = JSON.parse(data);

//    Найдешевший квиток
      let min = new PriceOfEvent();
      min.showPrice(min.minPrice(allEvents));
    })
   .catch(error => {
     console.log(error);
  });
});

/*----------------------------------*/

//add new event to database(events.json)
$('body').on('click', '#newEvent',function(e){
  let type = document.getElementById('type').value; 
  let name = document.getElementById('name').value; 
  let date = document.getElementById('date').value; 
  let city = document.getElementById('city').value; 
  let price = document.getElementById('price').value;

  let newEvent = new AddEvent(type, name, date, city, price);
  newEvent.addEvent();

  getData(); //show updated data
  $('.modal_wrapper').hide(600);
  

});

  

/*----------------------------------*/

//Show all events by pressing button
$('body').on('click', '#allDataEvents',function(e){
  getData();
});






 

