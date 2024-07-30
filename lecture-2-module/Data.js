

const sum = (a, b) => {
    return a + b;
}
const substrection = (a, b) => {
    return a - b;
}
const multiplication = (a, b) => {
    return a * b;
}
const division = (a, b) => {
    return a / b;
}
const sort = (arr) => {
    let size = arr.length;
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr
}
const list = [
    {
        "name": "John",
        "age": 20,
    },
    {
        "name": "Mike",
        "age": 30,
    },
    
]
module.exports = {
    sum, substrection, multiplication, division, sort,list
}
