import { makeAutoObservable } from "mobx";

class CounterStore {
    count = 0;

    constructor(){
        makeAutoObservable(this);
    }

    increment(){
        this.count++;
    }

    decrement(){
        this.count--;
    }

    reset(){
        this.count = 0;
    }
}

const counterStore = new CounterStore();

export default counterStore;