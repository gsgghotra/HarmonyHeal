console.log("helloworld")

var quoteEl = document.getElementById("quote")
var h5El = document.createElement('h5');
var h6El = document.createElement('h6');


let optionSection = document.querySelector('#optionSection');
optionSection.addEventListener('click', async(event) => {
  if(event.target.dataset.quote){
    h5El.innerHTML = '';
    h6El.innerHTML = '';
quoteCat = event.target.dataset.quote;
// console.log(quoteCat)
fetch('https://api.api-ninjas.com/v1/quotes?category=' + quoteCat, {
  headers: {
      'X-Api-Key': 'ywwpzBRnPosEDtdbyOdjyQ==SbFIzsUdYwJwVLmm',
      'Content-Type': 'application/json'
  },
})
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      // console.log(data[0].quote)
      // console.log(data[0].quote.author)
        
        h5El.textContent = '"' + data[0].quote + '"';
        h6El.textContent = data[0].author 
        quoteEl.appendChild(h5El);
        quoteEl.appendChild(h6El);

    });
  }
  


})

