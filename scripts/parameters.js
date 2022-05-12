window.expParam = {


  menu: {
    list: [{
      title: 'Item A',
      list: [{
        title: 'Item AA',
        list: [{
          title: 'Item AAA',
          products: [
            {
              img: "",
              desc: ""
            }
          ]
        }, {
          title: 'Item AAB'
        }]
      }, {
        title: 'Item AB',
        list: [{
          title: 'Item ABA'
        }, {
          title: 'Item ABB'
        }]
      }, {
        title: 'Item AC',
        list: [{
          title: 'Item ACA'
        }, {
          title: 'Item ACB'
        }]
      }]

    }, {
      title: 'Item B',
      list: [{
        title: 'Item BA',
        list: [{
          title: 'Item BAA'
        }, {
          title: 'Item BAB'
        }]
      }, {
        title: 'Item BB',
        list: [{
          title: 'Item BBA'
        }, {
          title: 'Item BBB'
        }]
      }, {
        title: 'Item BC',
        list: [{
          title: 'Item BCA'
        }, {
          title: 'Item BCB'
        }]
      }]
    }, {
      title: 'Item C',
      list: [{
        title: 'Item CA',
        list: [{
          title: 'Item CAA'
        }, {
          title: 'Item CAB'
        }]
      }, {
        title: 'Item CB',
        list: [{
          title: 'Item CBA'
        }, {
          title: 'Item CBB'
        }]
      }, {
        title: 'Item C',
        list: [{
          title: 'Item CCA'
        }, {
          title: 'Item CCB'
        }]
      }]
    }, {
      title: 'Item D',
      list: [{
        title: 'Item DA',
        list: [{
          title: 'Item DAA'
        }, {
          title: 'Item DAB'
        }]
      }, {
        title: 'Item DB',
        list: [{
          title: 'Item DBA'
        }, {
          title: 'Item DBB'
        }]
      }, {
        title: 'Item DC',
        list: [{
          title: 'Item DCA'
        }, {
          title: 'Item DCB'
        }]
      }]
    }]
  },

  postquestions: [{
    question: "q1",
    placeholder: "Enter your answer here.",
    type: 'textbox',
    title: 'Q1',
    required: true
  }, {
    question: "q2",
    choices: ["Yes", "No"],
    type: 'choice',
    title: 'q2'
  }, {
    question: "What is your age?",
    placeholder: " ",
    type: 'number',
    min: 18,
    max: 99,
    title: 'Age'
  }, {
    question: "What is your gender?",
    choices: ["Male", "Female", "Other"],
    type: 'choice',
    title: 'Gender'
  }, {
    question: "What is your highest level of education?",
    choices: ["Less than high school", "High school graduate", "Some college", "2 year degree", "4 year degree", "Professional Degree", "Doctorate"],
    type: 'choice',
    title: 'Education'
  }, {
    question: "Do you have any feedback for us? This is an optional question. If you don't have any feedback, please type 'NONE' in the box below",
    placeholder: "Enter your answer here.",
    type: 'textbox',
    title: 'Feedback',
    required: false
  }],

  confirm_popup: {
    title: "Submission Complete",
    content: 'Thank you for completing the experiment! Your data has been recorded. Please click "Next" below to continue back to prolific.'
  },

  prequestions: [{
    question: "Some consent form",
    choices: ["<b>By clicking this button, you are indicating that you are at least 18 years old, have read and understand this consent form, and you agree to participate in this online research study.</b>"],
    type: 'choice',
    title: 'Consent Information'
  }, {
    question: "Welcome to the study! Please read all the instructions carefully. Please work on a <b>laptop or desktop</b> for the study. Please <b>do not</b> exit or refresh the page while you are working on the study.",
    type: 'text',
    title: 'Welcome'
  }, {
    question: "some text",
    type: 'text',
    title: 'Game Description'
  }, {
    question: "text2",
    type: 'text',
    title: 'Game Description'
  }, {
    question: "text 2.223",
    type: 'text',
    title: 'Game Description'
  }, {
    question: "text 2.3333333",
    type: 'text',
    title: 'Game Description'
  }, {
    question: "text 6.2",
    type: 'text',
    title: 'Game Description'
  }, ]

}
