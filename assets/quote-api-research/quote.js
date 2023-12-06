console.log("helloworld")

var quoteEl = document.getElementById("quote")
var h3El = document.createElement('h3');
var h4El = document.createElement('h4');


let optionSection = document.querySelector('#optionSection');
optionSection.addEventListener('click', async(event) => {
  h3El.innerHTML = '';
quoteCat = event.target.dataset.quote;
console.log(quoteCat)
fetch('https://api.api-ninjas.com/v1/quotes?category=' + quoteCat, {
  headers: {
      'X-Api-Key': 'ywwpzBRnPosEDtdbyOdjyQ==SbFIzsUdYwJwVLmm',
      'Content-Type': 'application/json'
  },
})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data[0].quote)
      console.log(data[0].quote.author)
        
        h3El.textContent = '"' + data[0].quote + '"';
        h4El.textContent = data[0].author 
        quoteEl.appendChild(h3El);
        quoteEl.appendChild(h4El);

    });

})

