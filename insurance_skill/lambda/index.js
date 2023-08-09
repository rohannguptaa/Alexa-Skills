// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const repromptText = "What would you like to do next?";

var counter = 0;
const spokenIntents = '<break time="0.25s"/> i can help you with <break time="0.25s"/>, Policy Status<break time="0.25s"/>, Fund Value<break time="0.25s"/>, NAV Value<break time="0.25s"/>,Policy Receipt<break time="0.25s"/> , new Policy<break time="0.25s"/> and Policy Renewal <break time="0.25s"/>';

const ThankYouResponses = [
  'You are welcome!  ',
  'Sure ',
  "That's what I'm here for! ",
  "My pleasure! "
];

const HowareYouResponses = [
  'I am fine!  ',
  'Not Bad!  ',
  "Good! Thanks!  ",
  "Great "
];

const HelloResponses = [
  'Hello!  ',
  'Hi!  ',
  "Hey! "
];

const endResponses = [
  'Thank you for using Avaya Insurance services !  ',
  'Thank you for using our services ',
  "Goodbye! Thank you for using our services ",
  "Bye! "
];
//State Management Map
const state = new Map();
state.set('PolicyIntent','Not Triggered');

//Store Names
const nameMap = new Map();
nameMap.set('1234567','Rohan Gupta');
nameMap.set('1357891','Shikhar Raj');
nameMap.set('1786543','Rahul Sharma');
nameMap.set('1543210','Rohit Jain');
nameMap.set('1797654','Rajesh Kapoor');

//Store Fund Values
const fundMap = new Map();
fundMap.set('1234567',50000);
fundMap.set('1357891',60000);
fundMap.set('1786543',70000);
fundMap.set('1543210',80000);
fundMap.set('1797654',90000);


//Store NAV Values
const navMap = new Map();
navMap.set('1234567',1000);
navMap.set('1357891',2000);
navMap.set('1786543',3000);
navMap.set('1543210',4000);
navMap.set('1797654',5000);

//Policy Status

const policyStatus = new Map();
policyStatus.set('1234567','Active');
policyStatus.set('1357891','Not Active');
policyStatus.set('1786543','Active');
policyStatus.set('1543210','Not Active');
policyStatus.set('1797654','Active');

//Policy Dates 
//In javascript month begins from 0
const today = new Date();
const y = today.getFullYear();
const date1 = new Date(y, 4, 30);
const date2 = new Date(y, 5, 31);
const date3 = new Date(y, 2, 25);
const date4 = new Date(y, 1, 31);
const date5 = new Date(y, 5, 28 );


const dateMap = new Map();
dateMap.set('1234567',date1);
dateMap.set('1357891',date2);
dateMap.set('1786543',date3);
dateMap.set('1543210',date4);
dateMap.set('1797654',date5);



//Policy Prices
const policyPrice = new Map();
policyPrice.set('1234567',4000);
policyPrice.set('1357891',5000);
policyPrice.set('1786543',6000);
policyPrice.set('1543210',7000);
policyPrice.set('1797654',8000);




const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Avaya Insurance , Please tell me your Policy Number?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const HelloIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
    },
    handle(handlerInput) {
        let speechText = getRandomPhrase(HelloResponses);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const PolicyNumberIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PolicyNumberIntent';
    },
    handle(handlerInput) {
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const policy = handlerInput.requestEnvelope.request.intent.slots.number.value.toString();
        var speechText = '';
        
        if(nameMap.has(policy))
        {const name = nameMap.get(policy);
        sessionAttributes.number = policy;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        var greetText = `Welcome ${name}`;
        speechText = greetText + spokenIntents;
        }
        
        else{
            speechText = 'Please Enter a valid Policy Number'
        }
        
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const PolicyStatusIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PolicyStatusIntent';
    },
    handle(handlerInput) {
        
         const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         const policy = sessionAttributes.number;
         var speechText = '';
         if(policyStatus.has(policy)){
            
            const status = policyStatus.get(policy); 
           speechText = `Your policy is currently ${status} `;
         }
         
         else{
             speechText = `Cannot check policy status, please provide your policy number`;
         }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};


const FundValueIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'FundValueIntent';
    },
    handle(handlerInput) {
         const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         const policy = sessionAttributes.number;
         var speechText = '';
        if(fundMap.has(policy)){
            
            const value = fundMap.get(policy); 
           speechText = `Your Fund Value is Rs ${value} `;
         }
         
         else{
             speechText = `Your Fund Value cannot be calculated at the moment,please provide your policy number`;
         } 
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const NAVValueIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NAVValueIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         const policy = sessionAttributes.number;
         var speechText = '';
        if(navMap.has(policy)){
            
            const value = navMap.get(policy); 
           speechText = `Your Net Asset Value is Rs ${value} `;
         }
         
         else{
             speechText = `Your Net Asset Value cannot be calculated at the moment,please provide your policy number`;
         } 
        

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const NoRecieptIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NoRecieptIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
         const policy = sessionAttributes.number;
         var speechText = '';
         
        if(nameMap.has(policy)){
        
         speechText = 'Ok noted ! I have sent you an email containing the receipt,would you like a hard copy as well?'
         state.set('No Receipt','Triggered');
        }
        else{
            speechText = 'Error in processing your request,please provide your policy number'
        }
         
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'YesIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(state.get('No Receipt') === 'Triggered'){
        speechText = 'ok,i have sent the reciept to your address,it will arrive in 7 days';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NoIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(state.get('No Receipt') === 'Triggered'){
        speechText = 'ok,What would you like to do next?';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};


const GetPremiumDateIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetPremiumDateIntent';
    },
    handle(handlerInput) {
       const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const policy = sessionAttributes.number;
        var speechText = '';
        
        if(dateMap.has(policy)){
            
            const date = dateMap.get(policy);
            const month = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();
            
            const m =  date.getMonth();
             const d = date.getDate() - 1;
             const y = today.getFullYear() + 1;
            const premium = new Date(y,m,d);
            const pMonth = premium.getMonth();
            const pDay = premium.getDate();
            const pYear = premium.getFullYear();
            var dateFormat = day+'-'+month+'-'+year;
            var premFormat = pDay+'-'+pMonth+'-'+pYear;
           // const d = date.toString();
            //const p = premium.toString();
            
           speechText = `You bought the policy on ${dateFormat}  ` + `and your renewal date is ${premFormat}`;
         }
         
         else{
             speechText = `Your Renewal date cannot be calculated at the moment,please provide your policy number`;
         } 

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const ThankYouIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ThankYouIntent';
    },
    handle(handlerInput) {
        let speechText =  getRandomPhrase(ThankYouResponses) + 'Thank you for using our Services';

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt()
            .getResponse();
    }
};

const RenewalPriceIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RenewalPriceIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const policy = sessionAttributes.number;
        var speechText = '';
        
        if(dateMap.has(policy)){
            
            const price = policyPrice.get(policy);
            const renPrice = price + 500;
            
           // const d = date.toString();
            //const p = premium.toString();
            
           speechText = `You bought the policy for Rs ${price}  ` + `and your renewal price is Rs ${renPrice}     `+repromptText;
         }
         
         else{
             speechText = `Policy Renewal Price cannot be calculated at the moment,please provide your policy number`;
         } 
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const NoPolicyNumberIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NoPolicyNumberIntent';
    },
    handle(handlerInput) {
        const speechText = "Ok! In order to generate a policy number, please buy a new policy!";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HowAreYouIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HowAreYouIntent';
    },
    handle(handlerInput) {
        let speechText = getRandomPhrase(HowareYouResponses);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const NewPolicyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NewPolicyIntent';
    },
    handle(handlerInput) {
        const speechText = 'Your request has been noted,Our agents will call you in a short while!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can tell me to do the following'+ spokenIntents;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        var speechText = "I am sorry i cannot help you with that" ;
        counter =counter + 1;
        if(counter===3){
            speechText =getRandomPhrase(endResponses);
            return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = getRandomPhrase(endResponses);
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return (array[i]);
}
// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloIntentHandler,
        PolicyNumberIntentHandler,
        PolicyStatusIntentHandler,
        FundValueIntentHandler,
        NAVValueIntentHandler,
        NoRecieptIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        GetPremiumDateIntentHandler,
        ThankYouIntentHandler,
        RenewalPriceIntentHandler,
        NoPolicyNumberIntentHandler,
        NewPolicyIntentHandler,
        HowAreYouIntentHandler,
        FallbackIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
