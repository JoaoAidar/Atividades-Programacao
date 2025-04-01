let listaDeTarefas = [];
listaDeTarefas.push("Estudar Javascript");
listaDeTarefas.push("Fazer exercícios de Matemática");
listaDeTarefas.push("Ler um livro");
console.log("Você tem " + listaDeTarefas.length + " tarefas");
listaDeTarefas.unshift("Fazer compras");
listaDeTarefas.splice(2,0,"Reunião com a equipe");
listaDeTarefas.push("Pagar contas");
listaDeTarefas.splice(3,1);
listaDeTarefas.pop(4);

console.log(listaDeTarefas);