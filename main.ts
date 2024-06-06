#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInMinutes } from "date-fns/differenceInMinutes";

let Text :any= {
  Easy: "The sun set behind the mountains, painting the sky in hues of orange and pink.",
  Medium:
    "The serene beauty of the sunset over the tranquil lake was a sight to behold, casting hues of orange and pink across the sky. It was a perfect end to a day filled with adventure and discovery.",
  Hard: "Life is a relentless march through an unforgiving terrain, where moments of joy are fleeting and the weight of existence often crushes the spirit. Yet, within this struggle lies the raw beauty of human resilience and the undying quest for meaning.",
};

class user {
  name: string;
  email: string;
  password: string;
  score: number[] = [];
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  viewScore() {
    if(this.score.length===0){
        console.log(chalk.red(`You've not attempted any test yet!`));
    }else{
        console.log(`Your score is ${this.score}WPM`);
    }
    
  }
   Results(text:string,timer:number,level:string){
    var correctWord=0;
    var errors=0;
    let typedText=text.trim().split(" ");
    let securedScore=Math.round(typedText.length/timer);
    this.score.push(securedScore);
    let OriginalText=Text[level].trim().split(" ");
    let OriginalScore=Math.round(OriginalText.length/timer);
    let typingSpeed=Math.floor(typedText.length*100/OriginalText.length);
    console.log(`SCORE(Words per minute): ${securedScore}WPM`);
    console.log(`And your typing speed is ${typingSpeed}%`);

    
    for(let i=0;i<typedText.length;i++){
        if(typedText[i]===OriginalText[i]){
            correctWord++;
        }else{
            errors++
        }
    }
    console.log(chalk.greenBright(`You've typed ${correctWord} correct words`));
    console.log(chalk.red(`There is ${errors} error in you typed text!`));
}
}

let users: user[] = [];

function userExists(
  username: string,
  email: string,
  password: string
): boolean {
  for (const user of users) {
    if (
      user.name === username &&
      user.email === email &&
      user.password === password
    ) {
      return true;
    }
  }
  return false;
}

function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

async function TestStarts(text: string) {
  if (text === "Easy") {
    console.log(`Here is you sample text..`);
    console.log(`"${Text[text]}"`);
    console.log(
      chalk.cyanBright(
        `Intruction: Start typing once your test starts , type as fast as you can before timer ends..`
      )
    );
   
    await wait().then(() => {
      console.log(`Start typing!`);
    });
  } else if (text === "Medium") {
    console.log(`Here is you sample text..`);
    console.log(`"${Text[text]}"`);
    console.log(
      chalk.cyanBright(
        `Intruction: Start typing once your test starts , type as fast as you can before timer ends..`
      )
    );
    await wait().then(() => {
      console.log(`Start typing!`);
    });
  } else if (text === "Hard") {
    console.log(`Here is you sample text..`);
    console.log(`"${Text[text]}"`);
    console.log(
      chalk.cyanBright(
        `Intruction: Start typing once your test starts , type as fast as you can before timer ends & once you are done press ENTER to see your result..`
      )
    );
    await wait().then(() => {
      console.log(`Start typing!`);
    });
  }
}

async function main() {
  console.log(chalk.yellowBright(`WELCOME TO OUR TYPING SPEED TESTER!`));
  console.log(chalk.yellowBright("-".repeat(80)));

  while (true) {
    let question1 = await inquirer.prompt({
      message: "What do you want to do?",
      type: "list",
      name: "Options",
      choices: [
        "Create an account-SignUp",
        "Already have an account-Login",
        "Exit",
      ],
    });
    if (question1.Options === "Create an account-SignUp") {
      let question2 = await inquirer.prompt([
        {
          message: "Enter your name.",
          type: "input",
          name: "name",
        },
        {
          message: "Enter your email.",
          type: "input",
          name: "email",
        },
        {
          message: "Choose your password.",
          type: "password",
          name: "password",
        },
      ]);
      if (userExists(question2.name, question2.email, question2.password)) {
        console.log(`You already have an account ,go login!`);
      } else {
        let newUser = new user(
          question2.name,
          question2.email,
          question2.password
        );
        users.push(newUser);
        console.log(
          chalk.greenBright(`Your account has been created successfully!`)
        );
      }
    } else if (question1.Options === "Already have an account-Login") {
      let question3 = await inquirer.prompt([
        {
          message: "Enter your name.",
          type: "input",
          name: "name",
        },
        {
          message: "Enter your email.",
          type: "input",
          name: "email",
        },
        {
          message: "Choose your password.",
          type: "password",
          name: "password",
        },
      ]);
      if (userExists(question3.name, question3.email, question3.password)) {
        console.log(chalk.greenBright(`You are logged in your account!`));
        var condition1=true;
        while (condition1) {
          let questiona = await inquirer.prompt({
            message: "What do you want to do now?",
            type: "list",
            choices: ["Start test", "View scores", "logOut"],
            name: "choice",
          });
          if (questiona.choice === "Start test") {
            var condition=true
            while(condition){
                let questionb = await inquirer.prompt([
                    {
                      message: "Enter your name.",
                      type: "input",
                      name: "userName",
                    },
                    {
                      message: "Choose your difficulty level",
                      type: "list",
                      choices: ["Easy", "Medium", "Hard"],
                      name: "level",
                    },
                    {
                      message: "Choose your timer in minutes..",
                      type: "list",
                      choices: [1, 2],
                      name: "timer",
                    },
                  ]);
                  let USER = users.findIndex(
                    (user) => user.name === questionb.userName
                  );
                  let RealUser=users[USER];
                  await TestStarts(questionb.level);
                let startTime=new Date().getTime();
                  let questionc=await inquirer.prompt({
                      message:"..",
                      type:"input",
                      name:"Text"
                  })
                  let EndTime=new Date().getTime();
                  const timeTakenSeconds = (EndTime - startTime) / 1000; // time in seconds
                  const timeTakenMinutes = timeTakenSeconds / 60; // time in minutes
                  if(timeTakenMinutes>questionb.timer){
                    console.log(chalk.red(`You failed! You were supposed to write it in ${questionb.timer} minutes!`));
                    condition=false;
                  }else if(timeTakenMinutes===0){
                    console.log(chalk.red(`Type properly please..`));
                    
                  }else{
                    RealUser.Results(questionc.Text,timeTakenMinutes,questionb.level);
                  }
                  


                  let questiond=await inquirer.prompt({
                    message:"Do you want to re-attempt the test?",
                    type:"confirm",
                    name:"Confirm"
                  })
                  condition=questiond.Confirm;
            }

          }else if(questiona.choice ==="View scores"){
            let questione = await inquirer.prompt([
                {
                  message: "Enter your name.",
                  type: "input",
                  name: "userName",
                }])
                let USER = users.findIndex(
                    (user) => user.name === questione.userName
                  );
                  let RealUser=users[USER];
                  if(!RealUser){
                    console.log(chalk.red(`This user doesn't exist!`));
                    
                  }
                  RealUser.viewScore();

          }else{
            condition1=false;
          }
        }
      } else {
        console.log(chalk.redBright(`This user doesn't exist..`));
      }
    } else {
      console.log(chalk.blueBright(`Hope to see you again..`));
      process.exit();
    }
  }
}
main();
