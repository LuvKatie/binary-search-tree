let test = [24, 17, 10, 15, 8, 0, 230, 40, 88, 98, 5, 12];

class Tree { 
    constructor(arr, root = null, left = null, right = null) {
        this.arr = arr;
        this.root = root;
        this.left = left;
        this.right = right;
    }

    buildTree(arr = mergeSort(this.arr), start, end) {
        start = 0;
        end = arr.length;

        let mid = Math.floor((start + end) / 2);

        this.left = this.setLeft(arr, start, mid - 1);
        this.right = this.setRight(arr, mid + 1, end);

        
        return this.root = arr[mid];
    }

    prettyPrint(node = this, prefix = '', isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    setLeft(arr, start, mid, left = this.left) {
        if (arr.length == 0) {
            return null;
        }

        arr = arr.slice(start, mid + 1);

        let newMid = Math.floor((arr.length - 1) / 2);

        left = new Nodes(arr[newMid]);
        left.right = this.setRight(arr, newMid + 1, arr.length - 1);
        left.left = this.setLeft(arr, start, newMid - 1);
        

        return left;
    }

    setRight(arr, mid, end, right = this.right) {
        if (arr.length == 0) {
            return null;
        }

        arr = arr.slice(mid, end + 1);
        let newMid = Math.floor((arr.length) / 2);

        right = new Nodes(arr[newMid]);
        right.left = this.setLeft(arr, 0, newMid - 1);
        right.right = this.setRight(arr, newMid + 1, end);

        return right;
    }

    insert(value, node = this) {
        if (value > node.root && node.right.root == null) {
            node.right = new Nodes(value);
        } else if (value < node.root && node.left.root == null) {
            node.left = new Nodes(value);
        }

        if (value > node.root) {
            return this.insert(value, node = node.right);
        } else if (value < node.root) {
            return this.insert(value, node = node.left);
        }
    }

    delete(value, node = this) {
        if (node.right.root == value) {
            let child = node.right;

            if (child.left.root == null && child.right.root == null) {
                child = new Nodes();
            } else if (child.left.root !== null && child.right.root !== null) {
                child.right.left.left = child.left;
                node.right = child.right;
            } else if (child.right.root !== null) {
                child = child.right;
            } else if (child.left.root !== null) {
                child = child.left;
            }
            return;
        } else if (node.left.root == value) {
            let child = node.left;

            if (child.left.root == null && child.right.root == null) {
                child = new Nodes();
            } else if (child.left.root !== null && child.right.root !== null) {
                child.right.left.left = child.left;
                node.left = child.right;
            } else if (child.right.root !== null) {
                child = child.right;
            } else if (child.left.root !== null) {
                child = child.left;
            }
            return;
        }

        if (value > node.root) {
            return this.delete(value, node = node.right);
        } else if (value < node.root) {
            return this.delete(value, node = node.left);
        }
    }
}

class Nodes {
    constructor(root = null, left = null, right = null) {
        this.root = root;
        this.left = left;
        this.right = right;
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

const testTree = new Tree(test);