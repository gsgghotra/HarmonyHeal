var category = 'happiness';
var quoteEl = document.getElementById("quote")


    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
      headers: {
          'X-Api-Key': 'ywwpzBRnPosEDtdbyOdjyQ==SbFIzsUdYwJwVLmm',
          'Content-Type': 'application/json'
      },
  })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          console.log(data[0].quote)
            var h3El = document.createElement('h3');
            h3El.textContent = data[0].quote;
            quoteEl.appendChild(h3El);
        });