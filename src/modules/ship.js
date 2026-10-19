class Ship{
    #length;
    #hitNumb = 0;
    
    constructor(length){
        if(length <= 0) throw new Error("Ships must have a length of at least 1")
        
        this.#length = length;
    }

    get length(){ return this.#length; }
    get hitNumb(){ return this.#hitNumb; }

    hit(){
        this.#hitNumb++;
    }

    isSunk(){
        return this.#hitNumb >= this.#length;
    }
}

export default Ship;