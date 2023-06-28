document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the input from the user
  const input = document.querySelector('input').value;

  // Convert the input into an array of numbers
  const arr = input.split(',').map(Number);

  // Calculate the minimum cost of ropes
  const minimumCost = minCostToConnectRopes(arr.length, arr);

   // Display the result
  document.querySelector('#result').innerText = minimumCost;
});