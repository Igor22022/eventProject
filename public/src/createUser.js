
//При першому відкритті створюємо юзера і зберегаємо в локалсторедж

var User = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                if(!localStorage.getItem('User')){
                  localStorage.setItem('User', "visited");
                }
            }
            return instance;
        }
    };
})();

export default User;