//Linked list vs Array

//Abstração linked list 
/*
    o0 (head) -> o1 -> o2 ... -> oN(tail)
*/

//lion -> zebra -> owl -> beaver -> END
const lion = { value: "Lion", next:null};
const zebra = {value: "Zebra", next:null};
const owl = {value: "Owl", next:null};
const beaver = {value: "Beaver", next:null};

lion.next = zebra;
zebra.next = owl;
owl.next = beaver;
beaver.next = null;

function getAllAnimals(firstNode, output){
    if(output == undefined){output = "";}

    var _output = output
    _output += firstNode.value += " ";

    if(firstNode.next != null){
        getAllAnimals(firstNode.next, _output);
    } else { 
        console.log(_output);       
    }
}

getAllAnimals(lion);