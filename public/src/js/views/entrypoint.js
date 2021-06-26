// Import Login constraints
const { 
    checkLogMandatoryConstraint,
    checkLogRangeConstraint
 } = main.controllers.login;
const {
    checkNewRangeConstraint,
    checkNewIntervalConstraint,
    checkNewPatternConstraint,
    checkNewMandatoryConstraint
} = main.controllers.newUser;


main.views.login = {
    setupUserInterface: function(){
        const formEl = document.forms['login-form'];
        formEl.addEventListener('submit',
        main.views.login.handleLoginEvent
        );

        formEl.username.addEventListener('input',
        main.views.login.handleInputEvent
        );
        formEl.password.addEventListener('input',
        main.views.login.handleInputEvent
        );
    },
    handleInputEvent: function(evt) {
       const status = checkLogMandatoryConstraint(evt.target.value);
       const loginBtn = document.forms['login-form'].loginbtn;
       if(status instanceof(NoConstraintViolation)){
           loginBtn.classList.add('btn-hover');
           loginBtn.removeAttribute('disabled');
           loginBtn.style.cursor = 'pointer';
       } else {
            loginBtn.classList.remove('btn-hover');
            loginBtn.setAttribute('disabled');
            loginBtn.style.cursor = 'unset';
       }
    },
    handleLoginEvent: function(evt) {
        evt.preventDefault();
        const formEl = document.forms['login-form'];
        checkLogMandatoryConstraint(formEl.username.value);
        checkLogMandatoryConstraint(formEl.password.value);

        const user_data = {
            username: formEl.username.value,
            password: formEl.password.value,
        }
        const user = new User();
        user.logUser(user_data, '/auth/login');
        main.views.login.updateUserInterface();
    },
    updateUserInterface: function() {
        if(localStorage.getItem('user')){
            document.querySelector('.login-section').setAttribute('hidden','true');
            document.querySelector('#user-section').removeAttribute('hidden');
            main.views.adminPanel.setupUserInterface();
            return;
        }
    },
};

main.views.adminPanel = {
    setupUserInterface: function() {
        const profileName = document.querySelector('#user-username');
        profileName.textContent = 'pascal';
        main.views.adminPanel.handleSummary();
        main.views.adminPanel.handleUsers();
    },
    handleSummary: function() {
        const summary = new AdminSummary();
        const summaryDiv = document.querySelector('.summary-section');
        let divs = '';
        for(let i=0; i< 8; i++ ) {
             divs += '<div></div>';
        }
        summaryDiv.innerHTML = divs;
        const nodes = document.querySelectorAll('.summary-section>div');
        console.log(nodes.length)
        for(let i=0; i<nodes.length; i++) {
            Plotly.newPlot(nodes[i],summary.buildGraphs());
        }
    },
    handleUsers: function() {
        const user = new User();
        user.getUsers('/auth/all');
    },
    displayUsers: function(res){
        const tbodyEl = document.querySelector('#add-user>table>tbody');
        let rows = '';
        res.data.forEach(row => {
            rows += `<tr>
                        <td>${row.name}</td>
                        <td>${row.email}</td>
                        <td>${row.type}</td>
                        <td>${row.status}</td>
                    </tr>
            `
        });
        tbodyEl.innerHTML = rows;
    },
    updateUserInterface: function() {
        console.log(34)
    }
};

main.views.addUser = {
    setupUserInterface: function() {
        const formEl = document.forms['new-user-form'];

        formEl.addEventListener('submit',
        main.views.addUser.handleLoginEvent
        );

        // formEl['first-name'].addEventListener('input',
        // main.views.addUser.handleInputEvent
        // );
        // formEl['last-name'].addEventListener('input',
        // main.views.addUser.handleInputEvent
        // );
        formEl.addEventListener('submit',
        main.views.addUser.handleSubmitEvent
        );
    },
    handleInputEvent: function(evt) {
        const status1 = checkNewMandatoryConstraint(evt.target.value);
        const status2 = checkNewRangeConstraint(evt.target.value);
        const loginBtn = document.forms['new-user-form']['add-newuser'];
        if(status1 instanceof(NoConstraintViolation) && status2 instanceof(NoConstraintViolation)){
            loginBtn.classList.add('btn-hover');
            loginBtn.removeAttribute('disabled');
            loginBtn.style.cursor = 'pointer';
        } else {
                loginBtn.classList.remove('btn-hover');
                loginBtn.setAttribute('disabled');
                loginBtn.style.cursor = 'unset';
        }
    },
    handleSubmitEvent: function(evt) {
        evt.preventDefault();
        const formEl = document.forms['new-user-form'];

        // Check if any of the below fields is empty
        // checkNewMandatoryConstraint(formEl['first-name'].value);
        // checkNewMandatoryConstraint(formEl['last-name'].value);
        // checkNewMandatoryConstraint(formEl['email'].value);
        // checkNewMandatoryConstraint(formEl['uid'].value);

        // // Check if names contain special characters
        // checkNewRangeConstraint(formEl['first-name'].value);
        // checkNewRangeConstraint(formEl['last-name'].value);

        const user_data = {
            firstName: formEl['first-name'].value,
            lastName: formEl['last-name'].value,
            email: formEl['email'].value,
            uid: formEl['uid'].value,
            type: 'Student',
        }
        const user = new User();
        user.addUser(user_data, '/auth/add-user');
    },
    displayUser: function(data) {
        console.log(data);
    }
};


main.views.login.setupUserInterface();
main.views.addUser.setupUserInterface();
