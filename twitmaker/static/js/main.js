document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let tweets = document.querySelector('.tweets');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    axios.post(
      this.action,
      formData,
    ).then(function(response) {
      console.log(response);
      const data = response.data;
      const newItem = document.createElement('li');
      newItem.className = 'tweet';
      const newTime = document.createElement('time');
      newTime.innerText = data.created_at;
      newItem.append(newTime);
      const newParagraph = document.createElement('p');
      newParagraph.innerText = data.message;
      newItem.append(newParagraph);
      // tweets.insertAdjacentHTML('afterbegin', newItem.outerHTML);
      tweets.prepend(newItem);
    }).catch(function(error) {
      console.log(error);
    });
  });
});
