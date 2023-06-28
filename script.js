function minCostToConnectRopes(arr) {
  // Create a min-heap
  const heap = new MinHeap();
  
  // Insert all the rope lengths into the heap
  for (let i = 0; i < arr.length; i++) {
    heap.insert(arr[i]);
  }
  
  let totalCost = 0;
  
  while (heap.size() > 1) {
    // Extract the two smallest elements from the heap
    const min1 = heap.extractMin();
    const min2 = heap.extractMin();
    
    const cost = min1 + min2;
    totalCost += cost;
    
    // Insert the sum back into the heap
    heap.insert(cost);
  }
  
  return totalCost;
}

// Implementation of a MinHeap data structure
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  size() {
    return this.heap.length;
  }
  
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  
  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    
    const min = this.heap[0];
    const lastElement = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.sinkDown(0);
    }
    
    return min;
  }
  
  bubbleUp(index) {
    const parentIdx = Math.floor((index - 1) / 2);
    
    if (parentIdx >= 0 && this.heap[index] < this.heap[parentIdx]) {
      [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
      this.bubbleUp(parentIdx);
    }
  }
  
  sinkDown(index) {
    const leftChildIdx = 2 * index + 1;
    const rightChildIdx = 2 * index + 2;
    let smallest = index;
    
    if (leftChildIdx < this.heap.length && this.heap[leftChildIdx] < this.heap[smallest]) {
      smallest = leftChildIdx;
    }
    
    if (rightChildIdx < this.heap.length && this.heap[rightChildIdx] < this.heap[smallest]) {
      smallest = rightChildIdx;
    }
    
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}

// Example usage:
const ropes = [4, 2, 7, 6, 9];
const minCost = minCostToConnectRopes(ropes);
console.log("Minimum cost to connect the ropes:", minCost);
