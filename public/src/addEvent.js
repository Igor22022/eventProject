/*
 *  add new event to database
*/

class AddEvent{
  constructor(type, name, date, city, price){
    this.type = type;
    this.name = name;
    this.date = date;
    this.city = city;
    this.price = price;
  }

  addEvent(){
    $.ajax('http://localhost:3000/events', {
      method: 'POST',
      data: {
        type: this.type,
        name: this.name,
        date: this.date,
        city: this.city,
        price: this.price
      }
    })
  }

}

export default AddEvent;
