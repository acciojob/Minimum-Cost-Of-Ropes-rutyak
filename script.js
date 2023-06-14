function calculateMinimumCost(ropeLengths) {
  // Convert the input string to an array of integers
  const ropes = ropeLengths.split(",").map(Number);

  // Create a priority queue (min heap) to store the rope lengths
  const pq = new MinHeap();

  // Insert all rope lengths into the priority queue
  ropes.forEach((rope) => pq.insert(rope));

  let totalCost = 0;

  // Keep merging ropes until there is only one rope left
  while (pq.size() > 1) {
    // Extract the two smallest ropes from the priority queue
    const smallest1 = pq.extractMin();
    const smallest2 = pq.extractMin();

    // Calculate the cost of merging the two ropes
    const cost = smallest1 + smallest2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the merged rope back into the priority queue
    pq.insert(cost);
  }

  // Return the minimum cost
  return totalCost;
}

// MinHeap class to implement the priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    return min;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element >= parent) {
        break;
      }

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;
    const length = this.size();

    if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
      smallest = leftChild;
    }

    if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}

// Handle form submission
document.getElementById("ropeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ropeInput = document.getElementById("ropeInput");
  const ropeLengths = ropeInput.value.trim();

  // Check if the input is valid
  if (ropeLengths.length === 0) {
    return;
  }

  // Calculate the minimum cost
  const minimumCost = calculateMinimumCost(ropeLengths);

  // Display the result
 
