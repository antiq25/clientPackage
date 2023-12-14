import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    const fetchData = () => {
      return fetch("https://www.sheret.com/account/js/pages/quotes-c158fa5f4b314acaf9ce7d12adba0e53.js", {
        method: "GET",
        headers: {
          "sec-ch-ua": "\"HeadlessChrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
          "referer": "https://www.sheret.com/account/catalog/categories/?branchUpdated=1",
          "sec-ch-ua-mobile": "?0",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/119.0.6045.105 Safari/537.36",
          "sec-ch-ua-platform": "\"macOS\"",
          "accept": "*/*",
          "cookie": "JSESSIONID=0CF08F67BF49D6E326B33565CAF4E883"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    fetchData();
  }, []);

  return <div>My Component</div>;
};

export default MyComponent;
