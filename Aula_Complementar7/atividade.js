import {Stack, Queue} from "./aula.js";

var filaNormal = new Queue();
var filaPrioritaria = new Stack();

filaNormal.enqueue("Aluno 1");
filaNormal.peek();
filaNormal.print();
filaNormal.dequeue();
filaNormal.peek();
filaNormal.print();

filaPrioritaria.stack("Doc urgente");
filaPrioritaria.print();
filaPrioritaria.destack();
filaPrioritaria.peek();
filaPrioritaria.print();