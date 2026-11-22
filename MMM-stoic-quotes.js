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
      this.runAtTime(this.config.runAtHour)
    }
  },
  getStyles: function() {
    return ["stoic-quotes.css"]
  },
  getDom: async function() {
    Log.info("Updating DOM")
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
  runAtTime: function(targetHour) {
    const now = new Date()
    const delay = this.calculateRunningTime(now, targetHour)
    Log.info(`Setting delay for stoic quotes to be ${delay}`)
    setTimeout(() => {
      this.updateDom()
      this.runAtTime(targetHour)
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
      // Use www directly: the apex domain answers with a 307 redirect that has
      // no CORS header, so the browser blocks the request.
      const response = await fetch('https://www.stoic-quotes.com/api/quote');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      Log.error(`[MMM-stoic-quotes] Fetch error: ${error}`);
      return {};
    }
  }
})
