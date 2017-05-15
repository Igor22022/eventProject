/*
 * 
 * @param {object} maxPriceEvent - save the most expensive ticket
 *
*/

class PriceOfEvent{

  maxPrice(data) {
    var maxPriceEvent = {};
    let maxPrice = 0;
    data.map(function(event){
      if(event.price > maxPrice)
      {
        maxPrice = event.price;
        maxPriceEvent = event;
      }
    });
    return maxPriceEvent;
  }

  minPrice(data) {
    var minPriceEvent = {};
    let minPrice = 100000000000;
    data.map(function(event){
      if(event.price < minPrice)
      {
        minPrice = event.price;
        minPriceEvent = event;
      }
    });
    return minPriceEvent;
  }

  // show event with max price on webpage
  showPrice(event) {
    let html = "";

    switch(event.type){
      case "football": {event.type = "футбол";break;}
      case "film": {event.type = "кіно";break;}
      case "performance": {event.type = "театральна вистава";break;}
    };
    html += `
      <div>
        <div class="show_event">
          <p>${event.type}:  ${event.name} </p>
          <p> Дата: ${event.date} </p>
          <p>Місто: ${event.city} </p>
          <p>Ціна квитка: ${event.price}</p> 
          <button id="selectedEvent" >Додати в обрані</button>
          <button id="deleteItem" data-id="${event.id}">Видалити подію</button>
          <hr/>
        </div>
      </div>`;
    
    document.getElementById("list").innerHTML = html;
  }
}

export default PriceOfEvent;


