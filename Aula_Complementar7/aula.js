//Aula de stacks e queues
export {Stack, Queue};
//Stacks 
//LIFO -> Last in, first out
/* LISTA DE MÉTODOS BÁSICOS
    pop() -> Remove item do final
    push() -> Adiciona item no final
    peek() -> Retorna o item no final da stack
    isEmpty() -> Checa se está vazia e retorna booleano
*/
/*  Notas gerais
    O acesso é restrito ao último elemento da fila
*/
class Stack {
    constructor() {
        this.items = [];
    }

    stack(item){ 
        this.items.push(item);
    }

    destack(){ 
        return this.items.pop();
    }

    peek(item){
        return this.items[this.items.length -1 ];
    }
    size(){
        return this.items.length;
    }
    print(){
        console.log("Current stack:", "Base -->",this.items.slice().join(), "<-- Topo");
    }
}

//Queues
//FIFO -> First in, first out
/* LISTA DE MÉTODOS BÁSICOS
    enqueue() -> Adiciona item ao final da queue
    dequeue() -> Remove e retorna o primeiro item da queue
    peek() -> Retorna o elemento no início (primeiro) da queue
    isEmpty() -> Auto-explicativo
*/
/*  Notas gerais
    O acesso é restrito ao primeiro e o último da fila sob condições específicas
*/
class Queue {
    constructor(){
        this.items = [];
    }

    enqueue(item){
        console.log("Enqueueing:", item);
        this.items.push(item)
    }

    dequeue(){
        return this.items.shift();
    }

    peek(){
        console.log("Peeking first item in queue", this.items[0]);
        return this.items[0];
    }
    size(){ 
        return this.items.length;
    }
    print(){
        console.log("Current queue: Final-->", this.items.slice().reverse().join(), "<-- Início");
    }
}
