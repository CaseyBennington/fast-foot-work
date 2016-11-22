[![Enable Skill.](fastfootwork.png)](https://www.amazon.com/dp/B01N64LK3O/ref=syps?s=digital-skills&ie=UTF8&qid=1479774740&sr=1-1&keywords=fast+foot+work)

# Fast Foot Work skill for Alexa
[Fast Foot Work](https://www.amazon.com/dp/B01N64LK3O/ref=syps?s=digital-skills&ie=UTF8&qid=1479774740&sr=1-1&keywords=fast+foot+work) is an Amazon Alexa Skill for improving your soccer foot Skills. I created this Skill to practice using voice based technology with Alexa utilizing Node.js.

The app is deployed on Amazon.

The source code is here on GitHub: https://github.com/CaseyBennington/fastfootwork

Follow along with this skill and complete all the moves, 4 times or more for each move, every day.
This takes about 7 minutes to complete and will give you over 500 touches on the ball.
Consistently completing this training skill will improve your foot skills!
Get started today!

Open the skill today with, 'Alexa, open Fast Foot Work'.
Say something like 'begin', or 'start', to start your daily workout.
After you complete each move 4 or more times, advance to the next move with something like 'next'.
After you finish, simply say 'stop'.

## Created using the following steps:

## Concepts
This sample shows how to create a Lambda function for handling Alexa Skill requests that:

- Custom slot type: demonstrates using custom slot types to handle a finite set of known values

## Setup
To run this example skill you need to do two things. The first is to deploy the example code in lambda, and the second is to configure the Alexa skill to use Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Skip the blueprint
4. Name the Lambda Function "Minecraft-Helper-Example-Skill".
5. Select the runtime as Node.js
6. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
7. Select Code entry type as "Upload a .ZIP file" and then upload the .zip file to the Lambda
8. Keep the Handler as index.handler (this refers to the main js file in the zip).
9. Create a basic execution role and click create.
10. Leave the Advanced settings as the defaults.
11. Click "Next" and review the settings then click "Create Function"
12. Click the "Event Sources" tab and select "Add event source"
13. Set the Event Source type as Alexa Skills kit and Enable it now. Click Submit.
14. Copy the ARN from the top right to be used later in the Alexa Skill Setup


### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set "MinecraftHelper" as the skill name and "minecraft helper" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, Ask minecraft help how to make a door."
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the custom slot types from the customSlotTypes folder. Each file in the folder represents a new custom slot type. The name of the file is the name of the custom slot type, and the values in the file are the values for the custom slot.
5. Copy the Intent Schema from the included IntentSchema.json.
6. Copy the Sample Utterances from the included SampleUtterances.txt. Click Next.
7. [optional] go back to the skill Information tab and copy the appId. Paste the appId into the index.js file for the variable APP_ID,
   then update the lambda source zip file with this change and upload to lambda again, this step makes sure the lambda function only serves request from authorized source.
8. You are now able to start testing your sample skill! You should be able to go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled.
9. In order to test it, try to say some of the Sample Utterances from the Examples section below.
10. Your skill is now saved and once you are finished testing you can continue to publish your skill.
