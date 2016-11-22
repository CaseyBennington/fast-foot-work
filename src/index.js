/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    moves = require('./moves');

var APP_ID = 'amzn1.echo-sdk-ams.app.573597b9-22a7-44a2-ab0b-f07ca22803ea'; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var MOVE_LIST = [
    {move: "inside roll", moveInstruction: "Roll the ball across your body from outside to inside, with the inside, and sole of the foot, and stop the ball with the inside of the other foot."},
    {move: "outside roll", moveInstruction: "Roll the ball across your body from inside to outside, with the outside, and sole of the foot, and stop the ball with the inside of the same foot."},
    {move: "side to side", moveInstruction: "Tap ball back and forth with inside of feet."},
    {move: "push-pull", moveInstruction: "Tap ball back and forth with inside of feet, push ball forward with one foot, and pull it back with the sole of the opposite foot."},
    {move: "side to side step-on", moveInstruction: "Roll ball to outside with the sole by stepping lightly on the ball, then tap ball back to the inside with the inside of the foot."},
    {move: "side to side front roll", moveInstruction: "Tap ball back and forth with inside of feet, push ball slightly forward, then, pull the ball across your body with the front part of the sole."},
    {move: "pull, instep push", moveInstruction: "Push ball forward, and pull it back with the sole, then tap ball forward with the instep of the same foot."},
    {move: "pull a vee", moveInstruction: "Push the ball forward, and pull it back with the sole of the foot while turning, and then take the ball with the inside of the same foot."},
    {move: "pull and take with outside of foot", moveInstruction: "Push the ball forward, and pull the ball back with the sole, then push the ball diagonally forward with the outside of the foot."},
    {move: "pull and roll behind", moveInstruction: "Push the ball forward, and pull the ball back with the sole of the foot, then pass the ball behind the standing leg with the inside of the foot. Control the ball with the sole of the other foot."},
    {move: "pull turn", moveInstruction: "Push ball forward with one foot, and pull it back with the other, while turning toward ball, and take the ball in the opposite direction with the inside of the first foot."},
    {move: "inside of foot turn", moveInstruction: "Push ball forward, move past ball, and turn toward ball, and take it with the inside of the foot in the opposite direction."},
    {move: "outside of foot turn", moveInstruction: "Push ball forward, move past ball, and turn toward ball while taking it with the outside of the foot in the opposite direction."},
    {move: "cruyff", moveInstruction: "Push the ball forward, fake kick with inside of foot, but instead, pull ball behind the standing leg and change directions."},
    {move: "step-over turn", moveInstruction: "Push ball forward, step over ball with one foot, turn toward ball, and take it in the opposite direction."},
    {move: "hip swivel", moveInstruction: "Fake with inside of one foot by swivelling hips toward ball, then reverse direction, and take the ball with the inside of the other foot."},
    {move: "matthews", moveInstruction: "Fake with inside of foot, nudging ball by dipping shoulder, then take ball in the opposite direction with the outside of same foot. Explode."},
    {move: "cap", moveInstruction: "Cut ball with inside of foot slightly backward, and take ball ahead with the inside of the opposite foot."},
    {move: "stepover", moveInstruction: "With ball moving, stepover ball, so ball is outside of stepover foot, turn and take the ball with the other foot."},
    {move: "scissors", moveInstruction: "Starting with the ball to one side, step over or in front of ball so that the ball ends up on the other side of you. Take the ball in the opposite direction, with the outside of the other foot, and then stop ball with the sole of the first foot."},
    {move: "rivelino", moveInstruction: "With ball moving, stepover ball so ball is outside of step-over foot, turn and take the ball with the outside of step-over foot."}
];

/**
 * FastFootWork is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FastFootWork = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FastFootWork.prototype = Object.create(AlexaSkill.prototype);
FastFootWork.prototype.constructor = FastFootWork;

/**
 * Overriden to show that a subclass can override this function to initialize session state.
 */
FastFootWork.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // Any session init logic would go here.
};

/**
 * If the user launches without specifying an intent, route to the correct function.
 */
FastFootWork.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Fast Foot Work. I will give you 21 moves to execute at least 4 times each. To begin your workout, say begin. Let me know when you would like to begin the workout. Or, you can jump to a move, if you know the specific name. Or you can ask a question like, what's the next move? ... Now, are you ready to begin?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

/**
 * Overriden to show that a subclass can override this function to teardown session state.
 */
FastFootWork.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    //Any session cleanup logic would go here.
};

FastFootWork.prototype.intentHandlers = {
  "WorkOutIntent": function (intent, session, response) {
      var speechText = "";

      //Reprompt speech will be triggered if the user doesn't respond.
      var repromptText = "You can ask me to begin the workout when you are ready.";

      //Check if session variables are already initialized.
      if (session.attributes.stage) {
        session.attributes.move = MOVE_LIST[session.attributes.stage].move;
        session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
        // session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;

          //Ensure the dialogue is on the correct stage.
          if (session.attributes.stage === 0) {
              //The session.attributes.stage is already initialized, this function has no more work.
              speechText = "Number " + (session.attributes.stage + 1) + ": " + session.attributes.move + ": " + session.attributes.moveInstruction;
          } else {
              //The user attempted to jump to the intent of another stage.
              session.attributes.stage = 0;
              speechText = "That's not correct. We will start over. "
                  + "Number " + (session.attributes.stage + 1) + ": " + session.attributes.move + ": " + session.attributes.moveInstruction;
          }
          session.attributes.stage++;
      } else {
          session.attributes.stage = 0;

          //The session.attributes.stage variable tracks the phase of the dialogue.
          //When this function completes, it will be on session.attributes.stage 1.
          session.attributes.move = MOVE_LIST[session.attributes.stage].move;
          session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
          // session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;

          speechText = "Number " + (session.attributes.stage + 1) + ": " + session.attributes.move + ": " + session.attributes.moveInstruction;
          session.attributes.stage++;
      }

      var speechOutput = {
          speech: speechText,
          type: AlexaSkill.speechOutputType.PLAIN_TEXT
      };
      var repromptOutput = {
          speech: repromptText,
          type: AlexaSkill.speechOutputType.PLAIN_TEXT
      };
      response.askWithCard(speechOutput, repromptOutput, "Fast Foot Work", speechText);
  },
    "NextMoveIntent": function (intent, session, response) {
        var speechText = "";

        //Reprompt speech will be triggered if the user doesn't respond.
        var repromptText = "You can ask me to move onto the next move when you are ready.";

            //Check if session variables are already initialized.
            if (session.attributes.stage) {

              // Check if length of Slot has been reached.
              if (session.attributes.stage < MOVE_LIST.length) {
                session.attributes.move = MOVE_LIST[session.attributes.stage].move;
                session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
                // session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
                speechText = "Number " + (session.attributes.stage + 1) + ": " + session.attributes.move + ": " + session.attributes.moveInstruction;
              } else {

                // If the end of the slot has been reached, inform the user they have completed the workout.
                speechText = "That is the end of the workout. Congratulations! Say stop to end the session.";
                // this.eventHandlers.onSessionStarted(event.request, event.session);
                var speechOutput = {
                    speech: speechText,
                    type: AlexaSkill.speechOutputType.PLAIN_TEXT
                };
                var repromptOutput = {
                    speech: repromptText,
                    type: AlexaSkill.speechOutputType.PLAIN_TEXT
                };
                response.askWithCard(speechOutput, repromptOutput, "Fast Foot Work", speechText, true);

              }
            } else {
                session.attributes.stage = 0;
                session.attributes.move = MOVE_LIST[session.attributes.stage].move;
                session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
                // session.attributes.moveInstruction = MOVE_LIST[session.attributes.stage].moveInstruction;
                speechText = "Number " + (session.attributes.stage + 1) + ": " + session.attributes.move + ": " + session.attributes.moveInstruction;
            }
            session.attributes.stage++;

            var speechOutput = {
                speech: speechText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            var repromptOutput = {
                speech: repromptText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };

        response.askWithCard(speechOutput, repromptOutput, "Fast Foot Work", speechText);
    },

    "SkillMoveIntent": function (intent, session, response) {
        var moveSlot = intent.slots.Move,
            moveName;
        if (moveSlot && moveSlot.value){
            moveName = moveSlot.value.toLowerCase();
        }

        var cardTitle = "Move steps for " + moveName,
            move = moves[moveName],
            speechOutput,
            repromptOutput;
        if (move) {
            speechOutput = {
                speech: move,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, move);
        } else {
            var speech;
            if (moveName) {
                speech = "I'm sorry, I currently do not know the " + moveName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that move. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions such as, what's the next move, or, you can say exit, or to begin, say start workout... Now, what can I help you with?";
        var repromptText = "You can ask questions such as, what's the next move, or, you can say exit, or to begin, say start workout... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var footwork = new FastFootWork();
    footwork.execute(event, context);
};
