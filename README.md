# Alexa Insurance Skill Deployment Guide (Alexa-Hosted Skill Edition)

This guide will walk you through the process of deploying an Alexa Insurance Skill using the Alexa Developer Console's Alexa-hosted skill feature. The skill is designed to provide users with information about insurance policies and answer insurance-related queries through voice commands.

## Prerequisites

Before you begin, make sure you have the following:

1. An Amazon Developer account: [Sign up here](https://developer.amazon.com/).
2. Basic understanding of Alexa Skills Kit and Voice User Interface (VUI) design.
3. Familiarity with JSON and JavaScript.

## Steps to Deploy

### 1. Clone or Download the Repository

Start by cloning or downloading the GitHub repository containing the Alexa Insurance Skill code:

```bash
git clone https://github.com/your-username/alexa-insurance-skill.git
```

### 2. Create an Alexa-Hosted Skill

1. Log in to the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
2. Click the "Create Skill" button.
3. Choose the "Custom" option, and then click the "Create Skill" button again.
4. Enter the skill name and select the language you prefer for your skill.
5. Choose a model: Select "Custom" model under Recommended model.
6. For Hosting services Select "Alexa-Hosted Node.js"
7. Select your preferred Hosting Region for minimised latency

### 3. Configure Interaction Model

1. In the Alexa Developer Console, navigate to the "Interaction Model" tab.
2. Click the "JSON Editor" button.
3. Open the `en-US.json` file under `model` folder from the cloned repository.
4. Copy the content of the file and paste it into the JSON Editor.
5. Save and build the interaction model.

### 4. Deploy Skill Code to Alexa-Hosted

1. In the Alexa Developer Console, navigate to the "Code" tab.
2. Replace the code in "index.js" file with code in `index.js` under `lambda` folder from the cloned repository.
3. Click on Deploy to deploy your skill code.

### 5. Test Your Skill

1. In the Alexa Developer Console, navigate to the "Test" tab.
2. Choose "Skill Testing is enabled in : Devleopment"
3. Use the simulator to test various sample utterances defined in your interaction model.
4. Say "avaya insurance" to invoke the skill
5. The invocation name can be changed later from "Build" Tab

### 6. Submit Your Skill for Certification

1. Once you're satisfied with your skill's functionality and testing, navigate to the "Distribution" tab in the Alexa Developer Console.
2. Complete all the necessary information, such as the skill's name, icon, description, etc.
3. Submit your skill for certification.

### 7. Publish Your Skill

1. Once your skill is certified by Amazon, you can choose to publish it to the Alexa Skill Store.
2. Follow the instructions provided by Amazon to make your skill available to users.

## Conclusion

Congratulations! You've successfully deployed an Alexa Insurance Skill using the Alexa Developer Console's Alexa-hosted skill feature. Users can now interact with your skill to obtain information about insurance policies and receive answers to insurance-related questions through their Alexa-enabled devices.

For further improvements and enhancements, feel free to customize the skill's interaction model, add more insurance-related queries, and refine the user experience.

## Resources

- [Alexa Skills Kit Documentation](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/overview.html)
- [Voice Design Guide](https://developer.amazon.com/en-US/docs/alexa/design/welcome.html)
- [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
