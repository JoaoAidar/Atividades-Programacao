const node01 = { value: "A" , next: null};
const node02 = { value: "B" , next: null};
const node03 = { value: "C" , next:null};

node01.next = node02;
node02.next = node03;
node03.next = null;

function readLinkedList(callNode, startNode){
    let currentNode = callNode;

    if((currentNode !== null) && (currentNode !== startNode)) {
        if(startNode == null){
            startNode = callNode;
        }
        console.log(currentNode.value);
        readLinkedList(currentNode.next,startNode)
    }
}

//readLinkedList(node01, null);

function addTail(startNode, newTailNode){
    var curNode = startNode;
    while(curNode.next !== null){
        curNode = curNode.next;
    }

    //We found the tail, let's add the new node
    curNode.next = newTailNode;

}

//operations -> "substitute", "squish"
function addAtPos(startNode, pos, newNode, operation){
    let index = 0;
    let curNode = startNode;
    while(index != pos-1){
        curNode = curNode.next;
        index+=1;
    }

    if(operation == "squish"){
        var shiftedNode = curNode.next;
        curNode.next = newNode;

        newNode.next = shiftedNode;
    }

    if(operation == "substitute"){
        var shiftedNode = curNode.next;
        curNode.next = newNode;

        newNode.next = shiftedNode.next;
    }   

}
function countNodes(headNode, count = undefined){
    if(count == undefined){
        count = 0;
    }
    let curNode = headNode;
    count += 1;
    if(curNode.next != null){
        countNodes(curNode.next, count);
    } else {
        console.log(`Count = ${count}`);
    }

}

function deleteNodeByPos(listHead, nodePos) {
    if (!listHead) return null; // List is empty
    
    // Special case: delete head
    if (nodePos === 0) {
        return listHead.next;
    }
    
    let index = 0;
    let curNode = listHead;
    while (index != (nodePos - 1)) {
        console.log(`${index} = index; ${curNode}; ${nodePos}`);
        if(curNode == undefined){
            console.log("This node is undefined");
            return;
        }
        curNode = curNode.next;
        index += 1;
    }
    
    // Delete node at position nodePos
    if (curNode.next) {
        curNode.next = curNode.next.next;
    } else {
        console.log(`No node to delete at position ${nodePos}`);
    }
    
    return listHead;
}


function findValue(headNode, value,count){
    if(count == undefined){
        count = -1;
    }
    
    count+=1;
    var curNode = headNode;
    if(curNode.value !== value){
        if(curNode.next !== null){
            findValue(curNode.next, value, count);
        } else {
            console.log(`Didn't find any node with the value ${value}`);
        }
    } else {
        console.log(`Found value ${value} at pos ${count}`);
        return count;
    }
    

}
var node04 = {value: "D", next:null};

addTail(node01, node04);

//readLinkedList(node01, null);

var node0X = {value:"X", next:null};



var lion = {value: "Leão", next: null};
var rhino = {value: "Rinoceronte", next: null};
var zebra = {value: "Zebra", next: null};
var elephant = {value: "Elefante", next: null};

addTail(lion, rhino);
addTail(lion, zebra);
addTail(lion, elephant);

readLinkedList(lion);

var cheetah = {value: "Leopardo", next:null};
var ox = {value: "Búfalo", next:null};

addTail(lion, cheetah);
addTail(lion,ox);

readLinkedList(lion);

var elephantPos = findValue(lion, "Elefante");
console.log(elephantPos);
deleteNodeByPos(lion, elephantPos);

readLinkedList(lion);

countNodes(lion);

findValue(lion, "Leão");
findValue(lion, "Rinoceronte");