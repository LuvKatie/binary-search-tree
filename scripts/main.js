let test = [30, 20, 32, 40, 50, 60, 70, 65, 75, 80, 34, 36, 85, 28, 37, 19, 12, 13, 14];

class Tree { 
    constructor(arr, root = null, left = null, right = null) {
        this.arr = arr;
        this.root = root;
        this.left = left;
        this.right = right;
    }

    buildTree(arr = mergeSort(this.arr), start, end) {
        console.log(arr)
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
            node.right.right = new Nodes();
            node.right.left = new Nodes();
        } else if (value < node.root && node.left.root == null) {
            node.left = new Nodes(value);
            node.left.right = new Nodes();
            node.left.left = new Nodes();
        }

        if (value > node.root) {
            return this.insert(value, node = node.right);
        } else if (value < node.root) {
            return this.insert(value, node = node.left);
        }
    }
    
    delete(value, node = this) {
        if (node.root == value) {
            if (node.left.root == null && node.right.root == null) {
                node = new Nodes();
            } else if (node.left.root !== null && node.right.root !== null) {
                node.root = this.checkSmallest(node.right.left);
            } else if (node.right.root == null) {
                Object.assign(node, node.left);
            } else if (node.left.root == null) {
                Object.assign(node, node.right);
            }
            return;
        }
        
        if (value > node.root) {
            return this.delete(value, node = node.right);
        } else if (value < node.root) {
            return this.delete(value, node = node.left);
        }
    }
    
    checkSmallest(node) {
        if (node.left.root == null) {
            const smallest = node.root;
            Object.assign(node, node.right);
            return smallest;
        }

        return this.checkSmallest(node = node.left);
    }

    find(value, node = this) {
        if (value == node.root) {
            return node;
        }

        if (value > node.root) {
            return this.find(value, node = node.right);
        } else if (value < node.root) {
            return this.find(value, node = node.left);
        }
    }

    levelOrder(fn, currNodes = [this], breadth = []) {
        let tempArr = [];

        if (currNodes.length >= 1) {

            if (currNodes.length == 1) {
                breadth.push(currNodes[0].root);
            }

            currNodes.forEach(n => {
                if(n.left.root !== null) {
                    tempArr.push(n.left);
                    breadth.push(n.left.root);
                }
                
                if(n.right.root !== null) {
                    tempArr.push(n.right);
                    breadth.push(n.right.root);
                }
                return;
            });
        } else if (breadth.length == this.arr.length) {
            return breadth;
        }

        return this.levelOrder(fn, currNodes = tempArr, breadth);
    }

    inOrder(fn, node = this, inOrderArr = []) {
        if (node.root === null) {
            return;
        }

        this.inOrder(fn, node.left, inOrderArr);
        inOrderArr.push(node.root);
        this.inOrder(fn, node.right, inOrderArr);


        return inOrderArr;
    }

    preOrder(fn, node = this, preOrder = []) {
        if (node.root === null) {
            return;
        }

        preOrder.push(node.root);
        this.preOrder(fn, node.left, preOrder)
        this.preOrder(fn, node.right, preOrder)

        return preOrder;
    }

    postOrder(fn, node = this, postOrder = []) {
        if (node.root === null) {
            return;
        }

        this.postOrder(fn, node.left, postOrder)
        this.postOrder(fn, node.right, postOrder)
        postOrder.push(node.root);
        
        return postOrder;
    }

    height(node = this, tall = 0) {
        if (node.left === null) {
            return tall;
        }

        return this.height(node.left, tall + 1);
    }

    depth(node, currNodes = [this], queue = [], level = 1) {
        let tempArr = [];
        
        if (currNodes.length >= 1) {

            if (currNodes.length == 1) {
                queue.push(currNodes[0].root);
            }
            // Increment each time we check a level of the tree
            level++;

            currNodes.forEach(n => {
                if(n.left.root !== null) {
                    tempArr.push(n.left);
                    queue.push(n.left.root);
                }
                
                if(n.right.root !== null) {
                    tempArr.push(n.right);
                    queue.push(n.right.root);
                }
                return;
            });
        }

        if(queue.includes(node)) {
            return level;
        }

        return this.depth(node, currNodes = tempArr, queue, level);
    }

    isBalanced() {
        let left = this.count(this.left, []);
        let right = this.count(this.right, []);

        let leftL = left.length;
        let rightL = right.length;
        
        if (leftL == rightL ||
            leftL == rightL - 1 ||
            leftL - 1 == rightL) {
                return true;
            }
        return false;
    }
    // Counts amount of nodes in each side of the tree
    count(node, array) {
        if (node.root === null) {
            return;
        }

        array.push(node.root);
        this.count(node.left, array);
        this.count(node.right, array);

        return array;
    }

    rebalance() {
        let newArr = this.count(this, []);

        this.arr = newArr
        this.buildTree(newArr);
    }

    messUpTree() {
        for (let i = 0; i < 202; i++) {
            let randomNum = Math.floor(Math.random() * 427);
            this.insert(randomNum);
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

const getTree = new Tree(test);