<div align="center">
  <img src="https://user-images.githubusercontent.com/92172698/212478747-4db80253-59a9-4702-b5a8-0cb2ecb7ef62.png"><br>
  <p style="font-family:'Courier New'">
    DiscordJS-Moderation-Bot 
  </p>
</div>

# DiscordJS-Moderation-Bot
The best Discord Moderation bot that I have ever created, all made with discord.js version 14 and discord.js-v14-helper. This project requires MongoDB to connect to the database, so make sure to get a MongoDB URI! You can create many commands as you want to improve your bot, just make sure that your bot won't go crazy!

#### Warning
This project is made for single guild, and not a multi-guild one. I currently have a problem with Slash commands permissions, so I used role_perms property instead of them. If you have a solution, create a pull request.

# Setup the project

## Dependencies installation:
Firstly, install `package-lock.json` file:
```shell
npm init -y
```

Then install the required dependencies:

```shell
npm i discord.js@14 discord.js-v14-helper os ms uuidv4 axios mongoose
```

## Start the project:
The setup for now is for [Visual Studio Code](https://code.visualstudio.com/) users only. If you are a repl.it user and non-beginner programmer, you can read the setup below but you have to edit the Environment processing for MongoDB and the bot token.
- 1. Install [Visual Studio Code](https://code.visualstudio.com/).
- 2. Install [node.js](https://nodejs.org/en/download/).
- 3. Open command propmt and then type `node -v` and make sure that you have installed node.js version **16.9.0** or above.
- 4. [Download the project](https://github.com/TFAGaming/Tags-System-Discord-Bot/archive/refs/heads/main.zip) and extract the folder from .zip folder to a normal folder.
- 5. Open the folder on a new VSCode tab.
- 6. Go to `config/main.js` and edit the properties of each file. Also make sure to check `config/data.json` because it is also a configuration file.
- 7. Open terminal and then type `node index.js` or `node .`.
- 8. Enjoy.

## Issues
If you have an issue, do not start to panic! Create an issue right [here](https://github.com/TFAGaming/Tags-System-Discord-Bot/issues) and wait for me or some people to respond to your errors.
Please remember to not create an issue that includes "it's broken", "not working at all", or other similar comments like these, thank you.

**Project made with ❤ by T.F.A#7524.** Make sure to credit to me when you are using this project, thank you.
