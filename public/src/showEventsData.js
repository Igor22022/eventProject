
// show events on webpage
function renderData(data) {
  let html = "";

  data.forEach(event => {
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
  });
  document.getElementById("list").innerHTML = html;
}

export default renderData;