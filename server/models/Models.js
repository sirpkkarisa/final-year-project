const users = [
    {
      name: 'Pascal Kazungu',
      email: 'pk@yahoo.com',
      type: 'lecturer',
      status: 'active'
    },
    {
      name: 'Pascal Karisa',
      email: 'pkk@yahoo.com',
      type: 'student',
      status: 'active'
    },
    {
      name: 'Karisa Kazungu',
      email: 'kk@yahoo.com',
      type: 'lecturer',
      status: 'inactive'
    },
    {
      name: 'Gustavo Pablo',
      email: 'gp@yahoo.com',
      type: 'student',
      status: 'active'
    }
  ];
const questions = [
    {
        qid: 1,
        question: [
            `Laikipia University wishes to automate various faculty office tasks. Theses tasks inclue task allocation, filing, deadlines, duty reporting among others. Describe this category of information systems giving two examples and other use cases.`
        ]
    },
    {
        qid: 2,
        question: [
            `Discuss the objectives and characteristics of the following types of information systems in use today.  Outline the two advantages and two challenges of the same and examples where necessary.`,
            {
                subquestions:[
                    'Executive Support System',
                    `Transaction Processing System`,
                    `Business Expert System`
                ]
            }
        ]
    },
    {
        qid: 3,
        question: [
            `A number of youth from Karuga area, have taken up the use of mobile money lending applications especially Tala and Branch. These applications collect data and create a credit profile for every account holder. Discuss the following terms used in Information System, in the setting of these mobile money lending apps.`,
            {
                subquestions: [
                    `Objectives`,
                    `Information`,
                    `Users`,
                    `Rules`
                ]
            }
        ]
    },
    {
        qid: 4,
        question: [
            `Explain what you understand by the term Management of Information systems?`
        ]
    },
    {
        qid: 5,
        question: [
            `OdiBet Limited has tasked a foreign company to ensure profits are maximized on wage-placing citizens, through the below listed components. The Kenyan government has tasked you to elucidate how best to limit the following, from betting companies;`,
            {
                subquestions: [
                    `Processing`,
                    `Data`,
                    `Decision Making`,
                    `System`,
                    `Output`
                ]
            }
        ]
    },
    {
        qid: 6,
        question: [
            `H.E Governor Ndiritu Muriithi is a seasoned economist and financial markets expert who relies on information so as to make decisions. Discuss three types of the information he consumes and where they are applicable`
        ]
    },
    {
        qid: 7,
        question: [
            `Differentiate Executive Support System(ESS) and Decision Support Systems(DSS)`
        ]
    },
    {
        qid: 8,
        question: [
            `An information system is greatly dependent on proper use of its resources. Describe the major resources found within an information system, giving examples`
        ]
    },
    {
        qid: 9,
        question: [
            `Discuss three different types of Information Systems in the context of the County Government of Laikipia in the Sub County of Sipili.`
        ]
    },
    {
        qid: 10,
        question: [
            `Explain hardware and software issues in Management Information Systems.`
        ]
    },
    {
        qid: 11,
        question: [
            `Using diagram explain the objectives of MIS`
        ]
    },
    {
        qid: 12,
        question: [
            `Discuss an Organizational Need for the following MIS at Panari Hotels LTD.`,
            {
                subquestions: [
                    `Marketing Information System`,
                    `Manufacturing Information System`,
                    `Business Information System`,
                    `Accounting Information System`
                ]
            }
        ]
    },
    {
        qid: 13,
        question: [
            `A model management sub system is a software package that includes financial, statistical, management science or quantitative models that provide the systems analytical capabilities and appropriate software management. Discuss the elements that composes a model management sub system.`
        ]
    }
];

module.exports = {
    users,
    questions
}