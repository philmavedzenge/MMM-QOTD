## MMM-QOTD

Quote of the day displays QuoteOfTheDay from branham.org

## Install it
* `cd ~/MagicMirror/modules`
* `git clone https://github.com/philmavedzenge/MMM-QOTD` into the `~/MagicMirror/modules` directory.
* `npm install`

## Config.js entry and options

```javascript
{
    module: 'MMM-QOTD',
    position: 'bottom_center',
    config: {
		updateInterval: 1000*60*60*6,
		initialLoadDelay: 1000,
		maxWidth: "1100px"
    }
},
```
