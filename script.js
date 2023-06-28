function minCostToConnectRopes(n, arr) {
  // Create a min-heap
  const minHeap = new MinHeap();

  // Insert all elements from the array into the min-heap
  for (let i = 0; i < n; i++) {
    minHeap.insert(arr[i]);
  }

  let totalCost = 0;

  // Continue until the min-heap has more than one element
  while (minHeap.size() > 1) {
    // Extract the two minimum elements
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();

    // Add their sum to the total cost
    const sum = min1 + min2;
    totalCost += sum;

    // Insert the sum back into the min-heap
    minHeap.insert(sum);
  }

  return totalCost;
}

// Implementation of a MinHeap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.heapifyDown(smallest);
    }
  }
}

// Example usage:
const n = prompt();
const len = parseInt(n);
const arr = [len];
const minimumCost = minCostToConnectRopes(n, arr);
console.log(minimumCost); // Output: 29
