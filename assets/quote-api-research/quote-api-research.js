var quoteEl = document.getElementById("quote")
var h3El = document.createElement('h3');


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
        
        h3El.textContent = data[0].quote;
        quoteEl.appendChild(h3El);

    });

})

