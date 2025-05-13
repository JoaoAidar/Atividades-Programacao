class Queue{
    constructor(){
        this.queue = [];
    }

    enqueue(item){
        this.queue.push(item);
        //console.log(`Enqueued ${item}`);
    }

    dequeue(){
        let item = this.queue.shift();
        //console.log(`Dequeued ${item}`);
        return item;
        
    }
    size(){
        return this.queue.length;
    }
    peek(){
        return this.queue[0];
    }

    print(){
        console.log("Current queue is: " + this.queue);
    }
};

class Stack{
    constructor(){
        this.items = [];
    }

    stack(item){
        this.items.push(item);
    }

    destack(){
        return this.items.pop();
    }

    size(){
        return this.items.length;
    }
    peek(){
        return this.items[this.items.length() - 1];
    }
    print(){
        console.log("Current stack is: " + this.items);
    }
};

export {Stack, Queue};
