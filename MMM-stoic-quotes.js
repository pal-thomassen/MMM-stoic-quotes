Module.register("MMM-stoic-quotes", {
  defaults: {
    size: "small",
    interval: 24 * 60 * 60 * 1000,
    runAtHour: undefined
  },
  start: function() {
    if (this.config.runAtHour === undefined) {
      setInterval(() => {
        this.updateDom()
      }, this.config.interval)
    } else {
      this.runAtTime(this.updateDom, this.config.runAtHour)
    }
  },
  getStyles: function() {
    return ["stoic-quotes.css"]
  },
  getDom: async function() {
    Log.debug("Updating DOM")
    const quote = await this.fetchQuote();

    const element = document.createElement("div")
    const sizeClass = this.parseSize(this.config.size)
    element.className = `stoic-quotes ${sizeClass}`

    const quoteElement = document.createElement("p")
    quoteElement.innerHTML = quote.text || ""
    quoteElement.id = "quoteText"

    const authorElement = document.createElement("p")
    authorElement.innerHTML = quote.author || ""
    authorElement.id = "quoteAuthor"

    element.appendChild(quoteElement)
    element.appendChild(authorElement)

    return element

  },
  runAtTime: function(func, targetHour) {
    const now = new Date()
    const delay = calculateRunningTime(now, targetHour)
    Log.debug(`Setting delay for stoic quotes to be ${delay}`)
    setTimeout(() => {
      func()
      this.runAtTime(func, targetHour)
    }, delay)
  },

  calculateRunningTime: function(now, targetHour) {
    const targetHourInt = parseInt(targetHour)

    if (targetHourInt < 0 || targetHourInt > 23) {
      throw new Error("targetHour must be between 0 and 23")
    }
    const targetTime = new Date(now)
    targetTime.setHours(targetHourInt, 0, 0, 0) // Setting the target time for today

    // If the target time is in the past (today), set it for tomorrow
    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    return targetTime - now
  },
  parseSize: function(size) {
    switch (size) {
      case 'xsmall':
        return "xsmall";
      case 'small':
        return "small";
      case 'medium':
        return "medium";
      case 'large':
        return "large";
      case "xlarge":
        return "xlarge"
      default:
        return "medium"
    }
  },
  fetchQuote: async function() {
    try {
      const response = await fetch('https://stoic-quotes.com/api/quote');
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
})
