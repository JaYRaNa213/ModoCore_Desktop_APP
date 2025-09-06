// PowerOfTwoMaxHeap.js

class PowerOfTwoMaxHeap {
  constructor(k) {
    if (k < 0) {
      throw new Error("k must be >= 0");
    }
    this.k = k;
    this.branching = 1 << k; // 2^k
    this.data = [];
  }

  insert(value) {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  popMax() {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }
    const max = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return max;
  }

  peekMax() {
    if (this.isEmpty()) {
      throw new Error("Heap is empty");
    }
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }

  printHeap() {
    console.log(this.data);
  }

  siftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / this.branching);
      if (this.data[index] > this.data[parent]) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  siftDown(index) {
    while (true) {
      let maxIndex = index;
      const firstChild = index * this.branching + 1;
      for (let i = 0; i < this.branching; i++) {
        const child = firstChild + i;
        if (
          child < this.data.length &&
          this.data[child] > this.data[maxIndex]
        ) {
          maxIndex = child;
        }
      }
      if (maxIndex !== index) {
        this.swap(index, maxIndex);
        index = maxIndex;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

// Example usage:
const heap = new PowerOfTwoMaxHeap(1); // binary heap
heap.insert(10);
heap.insert(20);
heap.insert(5);
heap.insert(30);
heap.insert(25);

heap.printHeap();
console.log("Max:", heap.popMax());
heap.printHeap();
