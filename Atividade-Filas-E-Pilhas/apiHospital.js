import { memoryUsage } from 'process';
import {Queue, Stack} from './utils.js'

class Hospital{
    constructor(){
        this.pacientes = new Queue;
        this.relatorios = new Stack;
    }

    //Método para receber o paciente no hospital
    receberPaciente(nomePaciente){
        this.pacientes.enqueue(nomePaciente);
        console.log(`Paciente ${nomePaciente} foi colocado na fila de atendimento`);
    }

    //Método para encaminhar o próximo paciente da fila para o atendimento
    atenderPróximo(){
        if(this.pacientes.size != 0){
            let pacienteAtendido = this.pacientes.dequeue();
            this.relatorios.stack(pacienteAtendido);
            console.log(`Paciente ${pacienteAtendido} atendido!`);
        }
    }

    //Método para documentar o próximo relatório e o remover da stack
    documentarPróximoRelatório(){
        if(this.relatorios.size != 0){
            let relatorioDoc = this.relatorios.destack();
            console.log(`Relatório ${relatorioDoc} documentado!`);
        }
    }

    //Print de debugging 
    mostrarFilas(){
        this.pacientes.print();
        this.relatorios.print();
    }

    //Método para achar um paciente na fila de atendimento
    acharPacienteNaFilaDeAtendimento(nomePaciente){
        let tamanhoFila = this.pacientes.size();
        for(var i = 0; i < tamanhoFila; i++){
            if(this.pacientes[i] === nomePaciente){
                console.log("Paciente encontrado! Retornando seu index...");
                return i;
            }
        }
    }

};

let nomes = ["João","Pedro","Cláudio","Richard","Cristiano","Sérgio","Rui"];
function simularHospital(tamanhoFilaInicial, arrayNomes){
    var hospital = new Hospital;

    console.log("Começando o dia");


    for(var i = 0; i < tamanhoFilaInicial; i++){
        hospital.pacientes.enqueue(arrayNomes[i]);
    }
    hospital.mostrarFilas();

    hospital.atenderPróximo();
    hospital.atenderPróximo();
    console.log(hospital.acharPacienteNaFilaDeAtendimento("Cláudio"));
    hospital.mostrarFilas();

    hospital.documentarPróximoRelatório();
    hospital.mostrarFilas(); 
}

simularHospital(7, nomes);

/*
let meuHospital = new Hospital();
meuHospital.receberPaciente("João");
meuHospital.receberPaciente("Pedro");
meuHospital.receberPaciente("Cláudio");
meuHospital.receberPaciente("Edu");
meuHospital.receberPaciente("Cristiano");
meuHospital.mostrarFilas();
let tamanhoFilaPacientes = meuHospital.pacientes.size();

for(let i = 0; i < tamanhoFilaPacientes; i++){
    meuHospital.atenderPróximo();
}


meuHospital.mostrarFilas();

for(let j = 0; j < tamanhoFilaPacientes; j++){
    meuHospital.documentarPróximoRelatório();
}

meuHospital.mostrarFilas();
*/