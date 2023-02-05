let test = [9, 1, 8, 2, 4, 3, 7, 6, 5];
let test2 = [1, 2, 3, 4, 5, 6, 7];

class Tree { 
    constructor(arr, root, left, right) {
        this.arr = arr;
        this.root = root;
        this.left = left;
        this.right = right;
    }

    buildTree(arr = mergeSort(this.arr), start, end) {
        start = 0;
        end = arr.length - 1;

        let mid = Math.floor((start + end) / 2);

        
        this.left = this.setLeft(arr, start, mid - 1);
        this.right = this.setRight(arr, mid + 1, end);
        
        return this.root = arr[mid];
    }

    setLeft(arr, start, mid, left = this.left) {
        if(start > mid) {
            return null;
        }

        arr = arr.slice(start, mid + 1);
        let newMid = Math.floor(mid / 2);
        
        left = new Nodes(arr[newMid]);
        left.left = this.setLeft(arr, start, newMid - 1);

        return left;
    }

    setRight(arr, mid, end, right = this.right) {
        console.log(arr)
        console.log("mid " + mid)
        console.log("end " + end)
        if(mid <= 0) {
            return null;
        }

        arr = arr.slice(mid, end + 1);
        let newMid = Math.floor((mid - 2) / 2);
        console.log("New Mid: " + newMid);

        right = new Nodes(arr[newMid]);
        right.right = this.setRight(arr, newMid + 1, end);

        return right;
    }
}

class Nodes {
    constructor(root, left, right) {
        this.root = root;
        this.left = left;
        this.right = right;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }

    let half = Math.floor(arr.length / 2);
    // Recursively divide left and right half of the array
    let left = mergeSort(arr.slice(0, half));
    let right = mergeSort(arr.slice(half));

    // Evaluate each half on split
    return merge(left, right);
}

function merge(left, right) {
    const resultArr = [];

    while (left.length > 0 && right.length > 0) {
        const minValue = left[0] < right[0] ? left : right;
        const getValue = minValue.shift();
        if(resultArr.includes(getValue)) {
            continue;
        }
        resultArr.push(getValue);
    }

    return resultArr.concat(left, right);
}

const testTree = new Tree(test2);