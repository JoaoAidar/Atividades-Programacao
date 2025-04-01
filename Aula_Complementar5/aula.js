/*
class Person {
    constructor(name,age,sex,weight,height,bodyFat){
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.weight = weight;
        this.height = height;
        this.bodyFat = bodyFat;
    }

    getInfo(){
        console.log(`Name: ${this.name} \nAge: ${this.age} \nSex: ${this.sex}`);	
    } 

    getBMI(_weight, _height){
        let w = _weight;
        let h = _height;

        return (w/(h*h));
    }

    getFatWeight(_bfPercentage, _weight){
        return (_weight*_bfPercentage)
    }
    
    createStudent(name, age,course){
        let newStudent = new Student(name,age,course);
        return newStudent;
    }
}

class Student extends Person{
    constructor(name, age, course){
        super(name, age);
        this.course = course;
    }
    getInfo(){
        console.log(`Name: ${this.name} \nAge: ${this.age} \nCourse : ${this.course}`);	
    } 
    printCourse(){
        console.log(this.course);
    }

}
let p0 = new Person("Jane Doesnt", 23,"F",70,1.88,0.114);
let sN0 = p0.createStudent("Student", 21, "Math");
let s0 = new Student("Jane Doe", 21, "Economics");
s0.printCourse();
sN0.printCourse();
sN0.getInfo();

*/
/*
class Car {
    constructor(model, year){
        this.model = model;
        this.year = year;
    }

    printInfo() {
        console.log(`Model: ${this.model} `);
        console.log(`Year: ${this.year}`  );
    }
}

class SportsCar extends Car {
    constructor(model,year,engine){
        super(model,year);
        this.engine = engine;
    }

    printInfo(){
        super.printInfo();
        console.log(`Engine: ${this.engine}`);
    }
}

let sCar = new SportsCar("Ferrari", 2020, "V1.6");
sCar.printInfo();

*/

class Fruit {
    constructor(name,type,price){
        this.name = name;
        this.type = type;
        this.price = price;
    }

    getFruitInfo(){
        let returnString = '';
        returnString += "Name: " + this.name + "\n";
        returnString += "Type: " + this.type + "\n";
        returnString += "Price: " + this.price;
        return returnString;
    }
}

let apple = new Fruit("Apple", "Sazonal", 3);
console.log(apple.getFruitInfo());
let banana = new Fruit("Banana", "Tropical", 3);
console.log(banana.getFruitInfo());