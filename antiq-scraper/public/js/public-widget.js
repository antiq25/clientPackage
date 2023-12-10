// public-widget.js hosted on your-domain.com and embedded by users on their site
(() => {
  let widgetId;
  try {
    // Assuming the script is correctly included with a full URL
    const scriptSrc = document.currentScript.src;
    const url = new URL(scriptSrc);
    widgetId = url.searchParams.get("id");
  } catch (error) {
    console.error("The script tag's src attribute must be a valid URL.", error);
  }

  if (widgetId) {
    fetch(`http://localhost:3002/scrape/widgets/${widgetId}`)
      .then((response) => {
        if (response.ok) {
          return response.text(); // If server returns HTML, use .text() instead of .json()
        } else {
          throw new Error("Server responded with an error.");
        }
      })
      .then((htmlContent) => {
        const widgetContainer = document.createElement("div");
        widgetContainer.innerHTML = htmlContent;
        document.body.appendChild(widgetContainer);
      })
      .catch((error) => console.error("Failed to load widget:", error));
  } else {
    console.error(
      "Failed to load widget - Widget ID not found in script tag URL",
    );
  }
})();
