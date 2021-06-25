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
}

class AdminSummary extends MainClass {
    constructor() {
        super();
    }
    buildGraphs() {

    }
}