# jokeBot

## Commands
### `/joke`
Get a random joke from one of these APIs:
* https://yomomma.info/
* https://icanhazdadjoke.com/
* https://api.chucknorris.io/
* https://v2.jokeapi.dev/

### `/flachwitz`
Get na anti-joke (german: Flachwitz) from [here](https://github.com/derphilipp/Flachwitze).

## Requirements:
- [node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/download)
- a [Telegram token](https://core.telegram.org/bots#6-botfather)

Put the token in a [.env file](https://www.npmjs.com/package/dotenv) like this:
```
TG_API_TOKEN=123456789:abcdefghijklmnopqrstuvwxyzABCDEFGHIJ
```

## Installation
```sh
git clone https://github.com/tschlumpf/jokeBot.git
cd jokeBot
npm run build
```

### systemd service
```sh
bash createSystemdService.sh
# check the output!
cat jokeBot.service
sudo cp jokeBot.service /etc/systemd/system
sudo chmod 664 /etc/systemd/system/jokeBot.service
sudo systemctl daemon-reload
sudo systemctl enable jokeBot.service
sudo systemctl start jokeBot.service
```