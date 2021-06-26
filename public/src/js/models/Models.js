class MainClass {
    constructor(){
        this.xhr = null;
    }
    ajaxGetRequest(path, callback) {
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200 || this.status === 201) {
                    callback(this.response);
                }
            }
        }
        this.xhr.open('GET',path)
        this.xhr.send(null);
    }
    ajaxPostRequest(data, path, callback) {
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = function() {
            if(this.readyState === 4) {
                if(this.status === 200 || this.status === 201) {
                    callback(this.response);
                }
            }
        }
        
        this.xhr.open('POST',path);
        this.xhr.setRequestHeader('Content-Type','application/json');
        this.xhr.send(JSON.stringify(data));
    }
}

class User extends MainClass {
    constructor(){
        super();
    }
    logUser(data, path){
        this.ajaxPostRequest(data, path, this.logUserResponse);
    }  
    logUserResponse(response) {
        const res = JSON.parse(response);

        if(res.status === 'success') {
            localStorage.setItem('user',response);
        }
    }
    addUser(data, path) {
        this.ajaxPostRequest(data, path, this.addUserResponse);
    }
    addUserResponse(response) {
        main.views.addUser.displayUser(response);
    }
    getUsers(path) {
        this.ajaxGetRequest(path, this.displayUsers);
    }
    displayUsers(response) {
        main.views.adminPanel.displayUsers(JSON.parse(response))
    }
}

class AdminSummary extends MainClass {
    constructor() {
        super();
    }
    buildGraphs() {
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter'
          };
          
          var trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: 'scatter'
          };
          
          var data = [trace1, trace2];
          
          return data;
    }
}