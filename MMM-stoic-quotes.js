Module.register("MMM-stoic-quotes", {
    defaults: {
        size: "small",
        time: 24 * 60 * 1000
    },
    start: function () {
        setInterval(() => {
            this.updateDom()
        }, this.config.time)
    },
    getStyles: function () {
        return ["stoic-quotes.css"]
    },
    parseSize: function (size) {
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
    getDom: async function () {
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
    fetchQuote: async function () {
        try {
            const response = await fetch('https://stoic-quotes.com/api/quote');
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
})
