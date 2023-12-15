# Eris Discord Bot Template

A free bot template coded using Eris libary.

## How to use

1. Go to the [Discord Developer Portal Applications](https://discord.com/developers/applications) and create "New Application".

2. Go to the Bot section and generate a token.

3. Copy that token and paste to the 'config.json' file.
   
   (You can change your prefix too)

4. Open a terminal at bot files directory and run
   
   ```bash
   node .
   ```



### How to make new commands

In '/commands' there is a 'example.js' command file.

```js
exports.run = (client, message, args) => {
	// CODE HERE
}

exports.info = {
	name: "example", //commands name
	enabled: true  //is this command enabled (true or false)
}
```


