//start a new botUI. The string between the brackets needs to be the same as the ID on the HTML page
var botui = new BotUI('fastpass');
var option; //store user chosen input
var initialLoad = true; //Plays a video only once until the page has been refreshed
var initialLoadCol = true;//Plays a video in the colleague only once until the page has been refreshed

//This is a function that replaces the current video with the next video as soon the user presses on a button
var video = document.createElement('video')
var source = document.createElement('source')
video.classList.add('backgroundVideo');
video.setAttribute('playsinline', true);
video.autoplay = true;
source.setAttribute('src', 'Intro.mp4');
video.load();
console.log(video)
document.querySelector('.computeroverlay').append(video)
document.querySelector('.backgroundVideo').append(source)
//To make sure the video play's automaticly
function switchVideo(newSource){
  source.setAttribute('src', newSource);
  video.load();
  video.play();
}

//create a button where the player can choose the answer, you can put as many answers in here as you want
botui.action.button({
    delay: 10000,
    autoHide: true,
    action: [
        {
            text: 'Visitor',
            //only give it a value if you are going to use the value, see below
            value: 'visitor'
        },
        {
            text: 'Colleague',
            value: 'colleague'
        }
    ]
//use res to get the two values
}).then(function (res) {
    //if the value is the same as the string, the functions will run
    if (res.value == 'visitor') {
        convostart.visitorpart();
    }
    if (res.value == 'colleague') {
        convostart.colleaguepart();
    }
});
//a var is created for each major conversation point
var convostart = {
    //a function is created for minor conversation points
    visitorpart: function () {

        botui.message.add({
          type: 'html',
          content:'<div></div>'
        })
      .then(function() {
        if(initialLoad) {
          initialLoad = false;
          switchVideo('I can help you with that.mp4'); // depending of what the user chose, the bot will show different options
        }
        return botui.action.button({
          delay: 4000,
          action: [
            {
              text: 'I have a appointment',
              value: 'appointment'
            },
            {
              text: 'I have a question regarding working at the office',
              value: 'office question'
            },
            {
              text: 'Tell me more about your role as Digital trend watcher',
              value: 'trend'
            }
          ]
        })
      })
      .then(function (res) { //Depending on what the user in the previous step chose it will show the matching video
        var message;

        if(res.value === "appointment"){
            switchVideo('Sort appointment.mp4');
          } else if (res.value === "trend"){
            switchVideo('Trend watcher V2.mp4');
            setTimeout(function(){
              switchVideo('help with something else.mp4');
            },31010)
          } else if (res.value === "office question"){
            switchVideo('No problem V2.mp4');
          }

          option = res.value;

        })
        .then(function () {
          if (option === "trend") {
            return botui.action.button({
              delay: 34010,
              action: [
                {
                  text: 'Yes!',
                  value: 'y'
                },
                {
                  text: 'No, that was it',
                  value: 'n'
                }
              ]
            })
          };
        })
        .then(function () {
          if (option === "y") {
            convostart.visitorpart();
          }
        })
        //////////////////////////////////Start office qustions part////////////////////////
        .then(function () {
          if (option === "office question"){
            return botui.action.button({
              delay: 4000,
              action: [
                {
                  text: 'Can I reserve a workspace?',
                  value: 'reserve'
                },
                {
                  text: 'I am looking for a specific meeting room',
                  value: 'meeting room'
                }
              ]
            });
          }
        })
        .then(function (res){
          var message;
          if(res) {
            option = res.value;
          }
          if (option === "reserve") {
            switchVideo('Guest account V2.mp4');
            setTimeout(function(){
              switchVideo('help with something else.mp4');
            },7010)
          } else if (option === "meeting room") {
            switchVideo('Which meeting room V2.mp4');
          }
        })
        .then(function () {
          if (option === "meeting room") {
            return botui.action.button({
              delay: 4000,
              action: [
                {
                  text: 'Rocket meeting room',
                  value: 'rocket'
                },
                {
                  text: 'Brainstorm meeting room.',
                  value: 'brainstorm'
                },
                {
                  text: 'On stage meeting room.',
                  value: 'on stage'
                }
              ]
            });
          }
          })
          .then(function (res) {

            if (res){
              option = res.value
            }
            if (option === "rocket"){
              switchVideo('Rocket meeting room.mp4');

            } else if (option === "brainstorm") {
              switchVideo('Brainstorm meeting room.mp4');

            } else if (option === "on stage") {
              switchVideo('On stage meeting room.mp4');
            }
            botui.message.add({
              delay: 6010,
              type: 'html',
                 content:'<div></div>'
            })
        })
      //////////////////////////////////End office qustions part////////////////////////

      //////////////////////////////////Start appointment part////////////////////////
        .then(function () {
          if (option === "appointment") {
            return botui.action.button({
              delay: 4000,
              action: [
                {
                  text: 'I am here for a job interview.',
                  value: 'interview'
                },
                {
                  text: 'Regular appointment.',
                  value: 'regular'
                }
              ]
            });
          }
          })
          .then(function (res) {
            var message;
            if(res) {
              option = res.value;
            }
            if (option === "interview"){
              switchVideo('Interview.mp4');
            } else if (option === "regular"){
              switchVideo('I can help you with that.mp4');
            }
          })
          .then(function (res) {
            if (option === "interview"){
              return botui.action.button({
                delay: 3500,
                action: [
                  {
                    text: 'Timmie',
                    value: 't'
                  },
                  {
                    text: 'Nikki',
                    value: 'n'
                  },
                  {
                    text: 'Kelvin',
                    value: 'k'
                  },
                  {
                    text: 'Luca',
                    value: 'lc'
                  }
                ]
              });
            } else if (option === "regular"){
              return botui.action.button({
                action: [
                  {
                    text: 'Alex',
                    value: 'a'
                  },
                  {
                    text: 'Jordan',
                    value: 'j'
                  },
                  {
                    text: 'Sander',
                    value: 's'
                  },
                ]
              });
            }
          })
          .then(function (res) {
            if (option === "interview"){
            if (res){
              option = res.value
            }
            if (option === "t"){
              switchVideo('Timmie.mp4');
              setTimeout(function(){
                switchVideo('help with something else.mp4');
              },7010)
            } else if (option === "n") {
              switchVideo('Nikki.mp4');
              setTimeout(function(){
                switchVideo('help with something else.mp4');
              },7010)
            } else if (option === "k") {
              switchVideo('Kelvin.mp4');
              setTimeout(function(){
                switchVideo('help with something else.mp4');
              },7010)
            } else if (option === "lc") {
              switchVideo('Luca.mp4');
              setTimeout(function(){
                switchVideo('help with something else.mp4');
              },7010)
            }
            botui.message.add({
              delay: 6010,
              type: 'html',
                 content:'<div></div>'
            })
          }
          else if (option === "regular"){
            if (res){
              option = res.value
            }
            if (option === "a"){
                switchVideo('Alex.mp4');
                setTimeout(function(){
                  switchVideo('help with something else.mp4');
                },7010)
              } else if (option === "j") {
                switchVideo('Jordan.mp4');
                setTimeout(function(){
                  switchVideo('help with something else.mp4');
                },7010)
              } else if (option === "s") {
                switchVideo('Sander.mp4');
                setTimeout(function(){
                  switchVideo('help with something else.mp4');
                },7010)
              }
            }
          })
          .then(function (res) {
            return botui.action.button({
              delay: 8010,
              action: [
                {
                  text: 'Yes!',
                  value: 'yes'
                },
                {
                  text: 'No, that was it',
                  value: 'no'
                }
              ]
            })
          }).then(function (res) {

          var message;

          if (res.value === "yes"){
            switchVideo('Sure thing.mp4');
          }
          else if (res.value === "no"){
            switchVideo('Have a nice day.mp4');
          }

          option = res.value;

          return botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: message
          })
        })
        .then(function () { //Going back to to the beginning of the conversation
          if (option === "yes") {
            convostart.visitorpart();
          }
        })
      },
      //////////////////////////////Ending appointment part//////////////////////////
  //////////////////////////////Ending visitor part//////////////////////////

      //////////////////////////////start the colleague part of the chatbot//////////////////////////
    colleaguepart: function () {

      botui.message.add({
        type: 'html',
        content:'<div></div>'
      })
      .then(function() {
        if(initialLoadCol) {
          initialLoadCol = false;
          switchVideo('Colleagues.mp4'); // depending of what the user chose, the bot will show different options
        }
        return botui.action.button({
          delay: 4000,
          action: [
            {
              text: 'Could you print me something?',
              value: 'print'
            },
            {
              text: 'I have a question regarding working at the office',
              value: 'vragen'
            },
            {
              text: 'Tell me more about your role as Digital trend watcher',
              value: 'trendC'
            },
            {
              text: 'Show me the upcoming events',
              value: 'events'
            }
          ]
        })
        .then(function (res) { //Depending on what the user in the previous step chose it will show the matching video
          var message;

          if(res.value === "print"){
              switchVideo('not a printer.mp4');
            }
            else if (res.value === "trend"){
              switchVideo('Trend watcher V2.mp4');
              setTimeout(function(){
                switchVideo('help with something else.mp4');
              },31010)
            }
            else if (res.value === "vragen"){
              switchVideo('No problem V2.mp4');
            }
            else if (res.value === "events"){
              switchVideo('Upcoming events.mp4');
            }
            option = res.value;
          })
          //////////////////////////////////Start office qustions part////////////////////////
          .then(function () {
            if (option === "vragen"){

              return botui.action.button({
                delay: 4000,
                action: [
                  {
                    text: 'Can I reserve a workspace?',
                    value: 'reserve'
                  },
                  {
                    text: 'I am looking for a specific meeting room',
                    value: 'meeting room'
                  }
                ]
              });
            }
          })
          .then(function (res){
            var message;
            if(res) {
              option = res.value;
            }
            if (option === "reserve") {
              switchVideo('Mapiq.mp4');
            }
            else if (option === "meeting room") {
              switchVideo('Which meeting room V2.mp4');
            }
          })
          .then(function () {
            if (option === "reserve") {
              return botui.action.button({
                delay: 5000,
                action: [
                  {
                    text: 'Yes please',
                    value: 'yp'
                  },
                  {
                    text: 'No, thank you',
                    value: 'nt'
                  }
                ]
              });
            }
            })
            .then(function (res) {

              if (res){
                option = res.value
              }
              if (option === "yp"){
                switchVideo('outlook.mp4');
              }
              else if (option === "nt") {
                switchVideo('help with something else.mp4');
              }
              botui.message.add({
                delay: 6010,
                type: 'html',
                   content:'<div></div>'
              })
          })
          .then(function () {
            if (option === "meeting room") {
              return botui.action.button({
                delay: 4000,
                action: [
                  {
                    text: 'Rocket meeting room',
                    value: 'rocket'
                  },
                  {
                    text: 'Brainstorm meeting room',
                    value: 'brainstorm'
                  },
                  {
                    text: 'On stage meeting room',
                    value: 'on stage'
                  }
                ]
              });
            }
            })
            .then(function (res) {

              if (res){
                option = res.value
              }
              if (option === "rocket"){
                switchVideo('Rocket meeting room.mp4');

              } else if (option === "brainstorm") {
                switchVideo('Brainstorm meeting room.mp4');

              } else if (option === "on stage") {
                switchVideo('On stage meeting room.mp4');
              }
              botui.message.add({
                delay: 6010,
                type: 'html',
                   content:'<div></div>'
              })
          })
          //////////////////////////////////End office qustions part////////////////////////

          //////////////////////////////////Start events part////////////////////////
          .then(function () {
            if (option === "events") {
              return botui.action.button({
                delay: 4000,
                action: [
                  {
                    text: 'June',
                    value: 'june'
                  },
                  {
                    text: 'May',
                    value: 'may'
                  },
                  {
                    text: 'April',
                    value: 'april'
                  }
                ]
              });
            }
            })
            .then(function (res) {

              if (res){
                option = res.value
              }
              if (option === "june"){
                switchVideo('Events June.mp4');

              } else if (option === "may") {
                switchVideo('May.mp4');

              } else if (option === "april") {
                switchVideo('Events April.mp4');
              }
          })
          .then(function (res) {
            if (option === "june" || option === "may" || option === "april")
            return botui.action.button({
              delay: 8010,
              action: [
                {
                  text: 'Yes!',
                  value: 'yes'
                },
                {
                  text: 'No, thank you',
                  value: 'no thank you'
                }
              ]
            })
          })
          //////////////////////////////////End events part////////////////////////
          .then(function (res) {
            if (res){
              option = res.value
            }
            if (option === "no thank you") {
              switchVideo('help with something else.mp4');
            }
          })

          .then(function (res) {
            return botui.action.button({
              delay: 8010,
              action: [
                {
                  text: 'Yes!',
                  value: 'yes'
                },
                {
                  text: 'No, that was it',
                  value: 'no'
                }
              ]
            })
          })
          .then(function (res) {

          if (res.value === "yes"){
            switchVideo('Sure thing.mp4');
          }
          else if (res.value === "no"){
            switchVideo('Have a nice day.mp4');
          }

          option = res.value;
        })
        .then(function () {
          if (option === "yes") {
            convostart.colleaguepart();
          }
        })
      })
    },
  }
