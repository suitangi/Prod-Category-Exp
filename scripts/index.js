//Helper: shuffle an array
function shuffle(array) {
  for (var i = array.length - 1; i > 0; --i) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Helper: check if array has duplicates
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

//Helper: check if 2 arrays are the same
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

//returns a random number generated by a truncated normal distribution
function normal(mean, std, left_trunc, right_trunc) {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let result = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  result *= std;
  result += mean;
  if (result < left_trunc) result = left_trunc;
  if (result > right_trunc) result = right_trunc;
  return result;
}

//Helper: Better rounding
function roundBetter(num, place) {
  let mod = Math.pow(10, place);
  return Math.round(num * mod + Math.sign(num) * 0.1 ** (17 - 2 - (Math.round(num * mod) / mod).toString().length)) / mod;
}

//Helper: Get Query
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//functions for the prequestions
function preQuestions(qNum) {
  if (qNum == window.expParam.prequestions.length) {
    setTimeout(function() {
      startExp();
    }, 500);
  } else {
    let question = window.expParam.prequestions[qNum],
      html = '',
      keys = ['enter'];
    if (question.type == 'textbox') {
      html = '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>' +
        question.question + '</label>' +
        '<textarea type="text" placeholder="' +
        question.placeholder +
        '" class="textAnswer" style="height: 70px;" required /></textarea>' +
        '</div>' +
        '</form>'
    } else if (question.type == 'choice' || question.type == 'exclusion') {
      html = question.question + '<br>';
      for (var i = 0; i < question.choices.length; i++) {
        if (question.choices[i].toLowerCase() != 'other') {
          html += '<label class="radioContainer">' +
            question.choices[i] +
            '<input type="radio" name="radio"> <span class="checkmark"></span> </label>'
        } else {
          html += '<label class="radioContainer" onclick="otherRadioClick()"><input type="radio" name="radio"><label>Other: <input type="text" class="radioOther"></label><span class="checkmark"></span> </label>'
        }
      }
    } else if (question.type == 'text') {
      html = question.question;
    } else if (question.type == 'specialKey') {
      keys = ['p', 'q'];
      html = question.question;
    }
    $.confirm({
      title: question.title,
      content: html,
      type: 'blue',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        formSubmit: {
          text: 'Next',
          btnClass: 'btn-blue',
          keys: keys,
          action: function() {
            if (question.type == 'textbox') {
              var textAns = this.$content.find('.textAnswer').val();
              if (!textAns && question.required) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.preQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                preQuestions(qNum + 1);
              }
            } else if (question.type == 'choice') {
              var radioList = this.$content.find($('.radioContainer'));
              for (var j = 0; j < radioList.length; j++) {
                if (radioList[j].getElementsByTagName('input')[0].checked) {

                  if (question.choices[j].toLowerCase() != 'other') {
                    window.expData.preQuestions.push({
                      question: question.title,
                      answer: question.choices[j]
                    });
                  } else if (this.$content.find('.radioOther').val().length == 0) {
                    $.alert({
                      title: 'Error',
                      boxWidth: '25%',
                      useBootstrap: false,
                      content: 'If you select other, please do not leave it blank.',
                      type: 'red',
                    });
                    return false;
                  } else {
                    window.expData.preQuestions.push({
                      question: question.title,
                      answer: this.$content.find('.radioOther').val()
                    });
                  }
                  preQuestions(qNum + 1);
                  return true;
                }
              }
              $.alert({
                title: 'Error',
                boxWidth: '25%',
                useBootstrap: false,
                content: 'Please select an answer',
                type: 'red',
              });
              return false;
            } else {
              preQuestions(qNum + 1);
            }
          }
        }
      },
      onContentReady: function() {
        var jc = this;
        this.$content.find('form').on('submit', function(e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      },
      onOpenBefore: function() {
        if (question.type == 'specialKey') {
          this.buttons.formSubmit.hide();
        }
      }
    });
  }
}

//functions for the prequestions
function postQuestions(qNum) {
  if (qNum == window.expParam.postquestions.length) {
    console.log("Experiment Done");
    saveData(new Date().getTime() + "" + Math.floor(Math.random() * 10) + ".csv", dataToCSV());

  } else {
    let question = window.expParam.postquestions[qNum],
      html = '';
    if (question.type == 'textbox') {
      html = '<form action="" class="formName">' +
        '<div class="form-group">' +
        '<label>' +
        question.question + '</label>' +
        '<textarea type="text" placeholder="' +
        question.placeholder +
        '" class="textAnswer" style="height: 70px;" required /></textarea>' +
        '</div>' +
        '</form>'
    } else if (question.type == 'choice') {
      html = question.question + '<br>';
      for (var i = 0; i < question.choices.length; i++) {
        if (question.choices[i].toLowerCase() != 'other') {
          html += '<label class="radioContainer">' +
            question.choices[i] +
            '<input type="radio" name="radio"> <span class="checkmark"></span> </label>'
        } else {
          html += '<label class="radioContainer" onclick="otherRadioClick()"><input type="radio" name="radio"><label>Other: <input type="text" class="radioOther"></label><span class="checkmark"></span> </label>'
        }
      }
    } else if (question.type == 'text') {
      html = question.question;
    } else if (question.type == "number") {
      html = question.question + '<br>' + "<input type=\"number\" id=\"ageInput\" min=\"" + question.min + "\" max=\"" + question.max + "\">";
    } else if (question.type == "ladder") {
      html = question.question + '<br><br>';
      for (var i = 1; i < 10; i++) {
        html += '<select id=\"ladderInput' + i + '\"><option value=\"-1\">Select a choice</option><option value=\"1\">' + (10 - i) + '0% Chance chance of $1.00</option><option value=\"0\">$0.50 for sure</option></select><br><br>';
      }
    }
    $.confirm({
      title: question.title,
      content: html,
      type: 'blue',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        formSubmit: {
          text: 'Next',
          btnClass: 'btn-blue',
          keys: ['enter'],
          action: function() {
            if (question.type == 'textbox') {
              var textAns = this.$content.find('.textAnswer').val();
              if (!textAns && question.required) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.postQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                postQuestions(qNum + 1);
              }
            } else if (question.type == 'choice') {
              var radioList = this.$content.find($('.radioContainer'));
              for (var j = 0; j < radioList.length; j++) {
                if (radioList[j].getElementsByTagName('input')[0].checked) {

                  if (question.choices[j].toLowerCase() != 'other') {
                    window.expData.postQuestions.push({
                      question: question.title,
                      index: j,
                      answer: question.choices[j]
                    });
                  } else if (this.$content.find('.radioOther').val().length == 0) {
                    $.alert({
                      title: 'Error',
                      boxWidth: '25%',
                      useBootstrap: false,
                      content: 'If you select other, please do not leave it blank.',
                      type: 'red',
                    });
                    return false;
                  } else {
                    window.expData.postQuestions.push({
                      question: question.title,
                      answer: this.$content.find('.radioOther').val()
                    });
                  }
                  postQuestions(qNum + 1);
                  return true;
                }
              }
              $.alert({
                title: 'Error',
                boxWidth: '25%',
                useBootstrap: false,
                content: 'Please select an answer',
                type: 'red',
              });
              return false;
            } else if (question.type == 'number') {
              var textAns = this.$content.find('#ageInput').val();
              if (!textAns) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please provide a valid answer',
                  type: 'red',
                });
                return false;
              } else {
                window.expData.postQuestions.push({
                  question: question.title,
                  answer: textAns
                });
                postQuestions(qNum + 1);
              }
            } else if (question.type == 'ladder') {
              var ans = true;
              for (var i = 1; i < 10; i++) {
                ans = ans && document.getElementById('ladderInput' + i).value != "-1";
              }
              if (!ans) {
                $.alert({
                  title: 'Error',
                  boxWidth: '25%',
                  useBootstrap: false,
                  content: 'Please make sure you select answers for all choices.',
                  type: 'red',
                });
                return false;
              } else {
                let prob = []
                for (var i = 1; i < 10; i++) {
                  prob.push(parseInt(document.getElementById('ladderInput' + i).value));
                }
                window.expData.postQuestions.push({
                  question: question.title,
                  answer: prob
                });
                postQuestions(qNum + 1);
              }
            } else {
              postQuestions(qNum + 1);
            }
          }
        }
      },
      onContentReady: function() {
        var jc = this;
        this.$content.find('form').on('submit', function(e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      }
    });
  }
}

function dataToCSV() {
  var csv = "";
  csv += "Prolific ID," + window.expData.proID + '\n';
  csv += '\nPrequestion,Answer\n'
  for (i = 0; i < window.expData.preQuestions.length; i++) {
    csv += "\"" + window.expData.preQuestions[i].question + '","' +
      window.expData.preQuestions[i].answer + '"\n';
  }
  csv += '\nPostquestion,Answer\n';
  if (window.expData.postQuestions.length == 0) {
    for (i = 0; i < window.expParam.postquestions.length; i++) {
      csv += '"' + window.expParam.postquestions[i].title + '",""\n';
    }
  } else {
    for (i = 0; i < window.expData.postQuestions.length; i++) {
      csv += '"' + window.expData.postQuestions[i].question + '","' +
        window.expData.postQuestions[i].answer + '"\n';
    }
  }

  return csv;
}

//function partial save
function saveData(filename, filedata) {
  $.ajax({
    type: 'post',
    cache: false,
    url: './save_data.php', // this is the path to the PHP script
    data: {
      filename: filename,
      filedata: filedata
    },
    success: function(msg) {
      $.confirm({
        title: window.expParam.confirm_popup.title,
        content: window.expParam.confirm_popup.content,
        type: 'blue',
        boxWidth: '55%',
        useBootstrap: false,
        typeAnimated: true,
        buttons: {
          close: {
            text: "Next",
            btnClass: 'btn-blue',
            action: function() {
              window.location.replace(window.expParam.redirect);
            }
          }
        },
      });

      console.log('Data saved');
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

function startTrial() {
  let el, newDiv, newText;
  let menuBar = document.getElementById('menuBar');

  window.products = {};

  setUpLinks(window.expParam.menu, menuBar, 0, '', []);

  document.addEventListener('click', function() {
    clearMenus();
  });

  //this is a mess: don't look at this don't think about it, it works
  function setUpLinks(menuObj, div, level, id, all) {
    let nd, nt, tmp;

    for (var i = 0; i < menuObj.list.length; i++) {
      nd = document.createElement('div');
      nd.setAttribute('data-level', level);
      nd.classList.add('level' + level);
      nt = document.createTextNode(menuObj.list[i].title);
      nd.appendChild(nt);
      let allList = [];
      if (menuObj.list[i].list !== undefined) {
        nd2 = document.createElement('div');
        nd.appendChild(nd2);
        nd2.style = "display: none;";
        nd2.classList.add('menu' + level);
        nd.addEventListener('click', function(e) {
          e.stopPropagation();
          clearMenus();
          tmp = this.firstElementChild;
          while (tmp != menuBar) {
            tmp.style = "";
            tmp = tmp.parentElement;
          }
        });
        setUpLinks(menuObj.list[i], nd2, level + 1, id + '-' + i, allList);


      } else {
        window.products[id + '-' + i] = menuObj.list[i].products;
        nd.setAttribute('data-id', id + '-' + i);
        allList.push(id + '-' + i);
        nd.addEventListener('click', function(e) {
          e.stopPropagation();
          setupProducts(this.getAttribute('data-id'));
          clearMenus();
        })
      }
      all.push(...allList);
      div.appendChild(nd);
    }
    //all node
    let nda, nta;
    nd = document.createElement('div');
    nd.setAttribute('data-level', level);
    nd.setAttribute('data-id', all.join('/'));
    nd.classList.add('level' + level);
    nt = document.createTextNode('All');
    nd.appendChild(nt);
    nd.addEventListener('click', function(e) {
      e.stopPropagation();
      clearMenus();
      setupProductsAll(this.getAttribute('data-id'));
    });

    div.appendChild(nd);

  }
}

function setupProducts(id) {
  let li = window.products[id];
  let html = '';
  for (var i = 0; i < li.length; i++) {
    html += '<div class="productCard">' +
      '<img src="' + li[i].img + '">' +
      li[i].desc + '</div>';
  }
  document.getElementById('productArea').innerHTML = html;
}

function setupProductsAll(str) {
  let li1 = str.split('/');
  let html = '';
  let li;
  for (var j = 0; j < li1.length; j++) {
    li = window.products[li1[j]];
    for (var i = 0; i < li.length; i++) {
      html += '<div class="productCard">' +
        '<img src="' + li[i].img + '">' +
        li[i].desc + '</div>';
    }
  }
  document.getElementById('productArea').innerHTML = html;
}

function clearMenus() {
  let li;
  for (var i = 0; i < 2; i++) {
    li = document.getElementsByClassName('menu' + i);
    for (e of li) {
      e.style = 'display:none;';
    }
  }
}

//function to start experiment
function startExp() {
  console.log("Experiment Started");
  startTrial();
}


//start script
$(document).ready(function() {

  //check device type
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('Mobile');
    $.confirm({
      title: "Error",
      content: "Please do not use a mobile device for this experiment.",
      type: 'red',
      boxWidth: '55%',
      useBootstrap: false,
      typeAnimated: true,
      buttons: {
        close: {
          text: "Close",
          btnClass: 'btn-blue',
          action: function() {
            return false;
          }
        }
      },
      onOpenBefore: function() {
        // before the modal is displayed.
        this.buttons.close.hide();
      },
    });
  } else { //not mobile

    //set up data collection object
    window.expData = {};
    window.expData.preQuestions = [];
    window.expData.postQuestions = [];
    window.expData.trialData = [];
    window.expData.proID = getParameterByName('PROLIFIC_PID');

    window.blk = 0;


    preQuestions(0);
  }
});
