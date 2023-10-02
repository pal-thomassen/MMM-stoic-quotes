# MMM-stoic-quotes

A module which uses the open API from https://github.com/benhoneywill/stoic-quotes to fetch a random quote. 

The modules does not depend on any 3rd party packages. 

![Whole mirror with quote on upper left](screenshot%20whole%20mirror.png)

![Just the quote up close](screenshot%20just%20module.png)

## Installing

In your magic mirror directory 

```bash
cd modules
git clone 
```

## Updating the module

In your magic mirror directory. This will pull the latest code from github. 

```bash
cd modules/MMM-stoic-quotes
git pull
```

## Configuration

Not many options, but some.

| Option | Description | Default value | Possible values |
|--------|-------------|---------------|-----------------|
| size   | The size of the modules. Both width and font size | "small" | "xsmall", "small", "medium", "large", "xlarge" |
| time   | The time before fetching a new quote in milliseconds| Once every 24h | Can be any number in milliseconds, for example 60 * 1000 for every hour |

## Example config.js

An example config.js configuration. This would fetch a new quote once every hour.

```javascript
{
	module: "MMM-stoic-quotes",
	position: "top_left",
	config: {
		size: "small",
		time: 60 * 1000
	}
}
```

## Contributing
If you find any issues, or would like to participate. Just open an issue or pull request in this repository.