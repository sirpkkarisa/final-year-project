// Import Login constraints
const { 
    checkMandatoryConstraint,
    checkRangeConstraint,
 } = main.controllers.login;

main.views.login = {
    setupUserInterface: function(){
        const formEl = document.forms['login-form'];
        formEl.addEventListener('submit',
        main.views.login.handleLoginEvent
        )

        formEl.username.addEventListener('input',
        main.views.login.handleInputEvent
        )
    },
    handleInputEvent: function(evt) {
       const status = checkMandatoryConstraint(evt.target.value);
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
        checkMandatoryConstraint(formEl.username.value);
        checkMandatoryConstraint(formEl.password.value);

        const user_data = {
            username: formEl.username.value,
            password: formEl.password.value,
        }
        const user = new User();
        user.logUser(user_data, '/auth');
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
    },
    handleSummary: function() {
        
    }
};
main.views.login.setupUserInterface();

