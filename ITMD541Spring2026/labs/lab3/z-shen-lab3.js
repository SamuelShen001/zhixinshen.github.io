//Zhixin Shen
//ITMD 541-01 Graduate Student

//Exercise #1 - minMaxAverage
// Given an array of numbers, print: total count, min value, max value, and average value. 给一个数字数组，打印：总数、最小值、最大值、平均值
function minMaxAverage(numbers) {
    //Parameter check: must be an array and cannot be empty. 参数检查：必须是数组，且不能为空
    if (!Array.isArray(numbers) || numbers.length === 0) {
        console.log("Total Numbers: 0, Min Value: N/A, Max Value: N/A, Average: N/A");
        return;
    }

    //Initialize: use the first element as the initial min/max.  初始化，先拿第一个数作为 min/max 初始值
    let min = numbers[0];
    let max = numbers[0];
    let sum = 0;

    //Loop through the array: update min/max and accumulate sum. 遍历数组，更新最小、最大值，并累加 sum
    for (const n of numbers) {
        if (typeof n !== "number" || Number.isNaN(n)) {
            console.log("Invalid input: array must contain only valid numbers.");
            return;
        }
        if (n < min) min = n;
        if (n > max) max = n;
        sum += n;
    }

    //Average = sum / count. 平均值=总和/个数
    const avg = sum / numbers.length;
    //Print in the required format. 格式打印
    console.log(
        `Total Numbers: ${numbers.length}, Min Value: ${min}, Max Value: ${max}, Average: ${avg}`
    );
}

console.log("\nExercise #1 - minMaxAverage\n");
minMaxAverage([2, 5, 23, 6, 9, 4, 30, 1]);
minMaxAverage([1, 5, 3, 5, 10, 12, 8, 6]);
minMaxAverage([-10, 0, 10, 20]);

//Exercise #2 - countVowels
//Count the number of vowels (a/e/i/o/u) in a string and return the count. 统计字符串里a/e/i/o/u的数量，返回数字
function countVowels(str) {
    if (typeof str !== "string") return 0;

    let count = 0;
    const vowels = "aeiou";

    //Convert to lowercase and check each character. 转小写后逐个字检查是否为元音
    for (const ch of str.toLowerCase()) {
        if (vowels.includes(ch)) count++;
    }
    return count;
}

console.log("\nExercise #2 - countVowels\n");
const w1 = "Winter";
console.log(`${w1}: ${countVowels(w1)} vowels`);
const w2 = "Samuel";
console.log(`${w2}: ${countVowels(w2)} vowels`);
const w3 = "Cryptography";
console.log(`${w3}: ${countVowels(w3)} vowels`);

//Exercise #3 - sortNumbers
//Return a new array sorted in ascending order without modifying the original array. 返回一个从小到达排序的新数组，不修改原来数组
function sortNumbers(arr) {
    if (!Array.isArray(arr)) return [];

    //Make a copy to avoid mutating the original array. 复制一份，不改动原来数组
    const copy = arr.slice();

    //Validate that all items are numbers. 校验是否全是数字
    for (const n of copy) {
        if (typeof n !== "number" || Number.isNaN(n)) {
            console.log("Invalid input: array must contain only valid numbers.");
            return [];
        }
    }

    // JavaScript's default sort is lexicographic; use (a, b) => a - b for numeric sorting. JS默认sort的字符串排序，写为 (a,b)=>a-b
    copy.sort((a, b) => a - b);
    return copy;
}

console.log("\nExercise #3 - sortNumbers\n");
let a1 = [9, 4, 6, 2];
console.log("Original Array:", a1, "Sorted Array:", sortNumbers(a1));
let a2 = [100, 5, 25, 1, 0, -3];
console.log("Original Array:", a2, "Sorted Array:", sortNumbers(a2));
let a3 = [3.14, 2.71, 1.41, 1.62];
console.log("Original Array:", a3, "Sorted Array:", sortNumbers(a3));

//Exercise #4 - celsiusToFahrenheit
//Convert Celsius to Fahrenheit and force output to 1 decimal place. 摄氏度-> 华氏度，并强制输出1位小数
//Also supports numeric strings. 支持数字字符
function celsiusToFahrenheit(celsius) {
    let c = celsius;

    // If it's a string, try to convert it to a number. 如果是字符串，尝试转成数字
    if (typeof c === "string") {
        c = c.trim();
        if (c === "" || Number.isNaN(Number(c))) {
            console.log(`Invalid Celsius value: "${celsius}"`);
            return;
        }
        c = Number(c);
    }

    //If it's not a valid number, print an error message. 如果不是合法数字，直接提示
    if (typeof c !== "number" || Number.isNaN(c)) {
        console.log(`Invalid Celsius value: ${celsius}`);
        return;
    }

    //Fahrenheit = Celsius * 9/5 + 32 . 华氏=摄氏*9/5 + 32
    const f = (c * 9 / 5) + 32;

    // Force 1 decimal place. 强制 1 位小数
    console.log(`${c.toFixed(1)} Celsius = ${f.toFixed(1)} Fahrenheit`);
}

console.log("\nExercise #4 - celsiusToFahrenheit\n");
celsiusToFahrenheit(30);
celsiusToFahrenheit(0);
celsiusToFahrenheit(-40);

celsiusToFahrenheit("35"); //Extra test. 额外测试
celsiusToFahrenheit("  12.5  "); //Extra test. 额外测试

//Exercise #5 - sort people by age and introduce
//Sort by age (ascending) and return an array of introduction sentences. 按 age 从小到大排序，然后返回介绍语句数组
//Format for each sentence: "{name} is {age} and from {city}". 每条格式："{name} is {age} and from {city}"
function introducePeopleSortedByAge(people) {
    if (!Array.isArray(people)) return [];
    
     //Copy + sort (do not modify the original array). 复制 + 排序（不改原数组）
    const sorted = people.slice().sort((p1, p2) => p1.age - p2.age);

     //Convert each object to the required string format. 把对象转换为题目要求的字符串
    return sorted.map(p => `${p.name} is ${p.age} and from ${p.city}`);
}

console.log("\nExercise #5 - introducePeopleSortedByAge\n");

//Test case 1
const people1 = [{
        name: "Amy",
        age: 29,
        city: "Chicago"
    },
    {
        name: "Ben",
        age: 22,
        city: "Taipei"
    },
    {
        name: "Cindy",
        age: 35,
        city: "New York"
    },
    {
        name: "David",
        age: 27,
        city: "San Francisco"
    },
    {
        name: "Eva",
        age: 24,
        city: "Seattle"
    }
];
console.log("Input:", people1);
console.log("Output:", introducePeopleSortedByAge(people1));

// Test case 2 
const people2 = [{
        name: "Leo",
        age: 40,
        city: "Los Angeles"
    },
    {
        name: "Mina",
        age: 19,
        city: "Boston"
    },
    {
        name: "Nora",
        age: 33,
        city: "Austin"
    },
    {
        name: "Owen",
        age: 28,
        city: "Houston"
    },
    {
        name: "Paul",
        age: 25,
        city: "Miami"
    }
];
console.log("Input:", people2);
console.log("Output:", introducePeopleSortedByAge(people2));