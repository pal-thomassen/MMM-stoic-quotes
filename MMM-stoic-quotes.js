Module.register("MMM-stoic-quotes", {
  defaults: {
    size: "small",
    interval: 24 * 60 * 60 * 1000,
    runAtHour: undefined
  },
  start: function() {
    if (runAtHour === undefined) {
      setInterval(() => {
        this.updateDom()
      }, this.config.interval)
    } else {
      runAtTime(this.updateDom, this.config.runAtHour)
    }
  },
  getStyles: function() {
    return ["stoic-quotes.css"]
  },
  getDom: async function() {
    const quote = await this.fetchQuote();

    const element = document.createElement("div")
    const sizeClass = parseSize(this.config.size)
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
