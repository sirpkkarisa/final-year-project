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

main.views.generateExam = {
    setupUserInterface: function() {
        const formEl = document.forms['exam-specification'];

        formEl.addEventListener('submit',
            main.views.generateExam.handlePreviewEvent
        );
    },
    handlePreviewEvent: function(evt) {
        evt.preventDefault();

        const formEl = document.forms['exam-specification'];
        const examPaperDetails = {
            instutionName: formEl['institution-name'].value,
            degreeName: formEl['degree-name'].value,
            yearExamined: formEl['year-examined'].value,
            academicYear: formEl['academic-year'].value,
            courseCode: formEl['course-code'].value,
            courseName: formEl['course-name'].value,
            duration: formEl['duration'].value,
            instructions: formEl['instructions'].value,
            numOfModules: formEl['num-of-modules'].value,
            moduleWeight: formEl['module-weight'].value,
            compulsoryModule: 'Option one',
        }
        const examination = new Examination();
        examination.sendExamSpecs(
            {
                degreeName: examPaperDetails.degreeName,
                courseName: examPaperDetails.courseName,
                numOfModules: examPaperDetails.numOfModules,
                moduleWeight: examPaperDetails.moduleWeight,
                compulsoryModule: examPaperDetails.compulsoryModule
            },
            '/auth/all-questions'
            );
        document.querySelector('#preview-window').removeAttribute('hidden');

        main.views.generateExam.handleExampaperUI(examPaperDetails);
        document.querySelector('#download-btn').addEventListener('click', 
            main.views.generateExam.convertPaperToPDF
        );
    },
    displayExamQuestions: function(questions) {
        console.log(questions)
        let html = '';
        
        questions.forEach(item => {

                html += `
                    <div class="exam-paper" id="elementH">
                    <h1>INSTRUCTIONS:</h1>
                    <ul>
                        <li>Answer question <strong>ONE</strong> and any other <strong>TWO</strong> from section B</li>
                    </ul>
                    <h1>SECTION A(30 MARKS)</h1>
                    <ol>
                        <li>${item['questions']}</li>
                    </ol>
                </div>
                    `;
        });
        document.querySelector('#questions').innerHTML = html;
    },
    handleExampaperUI: function(details){
        const {
            instutionName,
            degreeName,
            yearExamined,
            academicYear,
            courseCode,
            courseName,
            duration,
            instructions,
        } = details
        const html = `<div class="bunner" style="display: flex;">
                        <h1>${instutionName.split(' ')[0]}</h1>
                        <img src="/resources/favicon.png" alt="Badge">
                        <h1 style="color: #E31A1C;">${instutionName.split(' ')[1]}</h1>
                    </div>
                    <div class="title">
                        <h2>${instutionName.split(' ')[1]}EXAMINATION  1ST SEMESTER ${academicYear} ACADEMIC YEAR</h2>
                    </div>
                    <div class="degree-details">YEAR ${yearExamined} EXAMINATION FOR THE DEGREE OF BACHELOR OF ${degreeName}</div>
                    <div class="course-details">
                        <h3 style="text-decoration:underline;text-align: center;"> ${courseCode}: ${courseName} </h3>
                    </div>
                    <div class="stream-duration">
                        <span>STREAM: R</span>
                        <span>TIME: ${duration}HRS</span>
                    </div>
                    <div class="day-date">
                        <span>DAY: TUESDAY[8:30 - 10:30]</span>
                        <span>DATE: 25/05/2021</span>
                    </div>
                    <div class="instruction">
                        <p>THIS QUESTION PAPER CONSISTS OF FOUR(4) PAGES</p>
                        <p>${instructions}</p>
                    </div>
                    <div class="footer">
                        <img src="/resources/footer.png" alt="Footer">
                    </div>`;
        document.querySelector('#my-pdf').innerHTML = html;
    },
    convertPaperToPDF: function() {
        var doc = new jsPDF();
            
        doc.addHTML(document.querySelector('.exam-paper'), function(){
            doc.addPage();
            doc.fromHTML(document.querySelector('#elementH'), 15, 15,{width:170});
            doc.addPage();
            doc.fromHTML(document.querySelector('#elementH2'), 15, 15,{width:170});
            doc.save('test.pdf');
        });
    }
};

main.views.questionTypes = {
    setupUserInterface: function(){
        const ieqForm = document.forms['ieq'];
        const fqForm  = document.forms['fq'];
        const ieqQPreview = document.querySelector('#ieq-prev');
        const fqQPreview = document.querySelector('#fq-prev');
        const field = document.createElement('div');
        const passage = document.createElement('div');
        const question = document.createElement('div');
        const responses = document.createElement('div');
        const questionWeight = document.createElement('div');
        const field2 = document.createElement('div');
        const question2 = document.createElement('div');
        const responses2 = document.createElement('div');
        const questionWeight2 = document.createElement('div');
    
        ieqQPreview.appendChild(field);
        ieqQPreview.appendChild(passage);
        ieqQPreview.appendChild(question);
        ieqQPreview.appendChild(responses);
        ieqQPreview.appendChild(questionWeight);



        ieqForm['field'].addEventListener('input',function(evt) {
            field.textContent = `Field: ${evt.target.value}`;
        });
        ieqForm['passage'].addEventListener('input',function(evt) {
            passage.textContent = `Passage: ${evt.target.value}`;
        });
        ieqForm['question'].addEventListener('input',function(evt) {
            question.textContent = `Question: ${evt.target.value}`;
        });
        ieqForm['responses'].addEventListener('input',function(evt) {
            responses.textContent = `Responses: ${evt.target.value}`;
        });
        ieqForm['question-weight'].addEventListener('input',function(evt) {
            questionWeight.textContent = `Question Weight: ${evt.target.value}`;
        });


        fqQPreview.appendChild(field2);
        fqQPreview.appendChild(question2);
        fqQPreview.appendChild(responses2);
        fqQPreview.appendChild(questionWeight2);

        fqForm['field'].addEventListener('input',function(evt) {
            field2.textContent = `Field: ${evt.target.value}`;
        });
        fqForm['question'].addEventListener('input',function(evt) {
            question2.textContent = `Question: ${evt.target.value}`;
        });
        fqForm['responses'].addEventListener('input',function(evt) {
            responses2.textContent = `Responses: ${evt.target.value}`;
        });
        fqForm['question-weight'].addEventListener('input',function(evt) {
            questionWeight2.textContent = `Question Weight: ${evt.target.value}`;
        });



        ieqForm['btn-more'].addEventListener('click', function() {
            ieqForm.reset();
        });
        fqForm['btn-more'].addEventListener('click', function() {
            fqForm.reset();
        });
        ieqForm.addEventListener('submit',
            main.views.questionTypes.handleIEQs
        );
        fqForm.addEventListener('submit', 
            main.views.questionTypes.handleFQs
        );
    },
    handleIEQs: function(evt) {
        evt.preventDefault();
        const formEl = document.forms['ieq'];
        const questionObject = {
            type:'ieq',
            field: formEl['field'].value,
            passage: formEl['passage'].value,
            question: formEl['question'].value,
            response: formEl['responses'].value,
            questionWeight: formEl['question-weight'].value,
        };
        const examination = new Examination();
        examination.newQuestionObject(questionObject, '/auth/questions');
    },
    handleFQs: function(evt){
        evt.preventDefault();
        const formEl = document.forms['fq'];
        const questionObject = {
            type:'fq',
            field: formEl['field'].value,
            question: formEl['question'].value,
            response: formEl['responses'].value,
            questionWeight: formEl['question-weight'].value,
        };
        const examination = new Examination();
        examination.newQuestionObject(questionObject, '/auth/questions');
    }
};
main.views.login.setupUserInterface();
main.views.addUser.setupUserInterface();
main.views.questionTypes.setupUserInterface();
main.views.generateExam.setupUserInterface();
