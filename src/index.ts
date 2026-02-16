//Task 1
interface User {
    id: number;
    name: string;
    email: string | undefined;
    isActive: boolean;
}

function createUser (
    id: number,
    name: string,
    email: string | undefined,
    isActive: boolean = true
): User {
    return { id, name, email, isActive};
}

const user1 = createUser(1, "Victoria", undefined);
const user2 = createUser(2, "Vika", "vika@mail.com", false);
console.log("Task1:", user1, user2);

//Task 2
type Genre = "fiction" | "non-fiction"

interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
}

function createBook (book: Book): Book {
    return book;
}

const bookA = createBook({
  title: "The Master and Margarita",
  author: "Mikhail Bulgakov",
  year: 1967,
  genre: "fiction",
});

const bookB = createBook({
  title: "Harry Potter",
  author: "J. K. Rowling",
  genre: "non-fiction",
});

console.log("Task 2:", bookA, bookB);

//Task 3
type Shape = "circle" | "square";

function calculateArea(shape: "circle", params: {radius: number}): number;
function calculateArea(shape: "square", params: {side: number}): number;

 function calculateArea (
    shape: Shape,
    params: { radius: number } | { side: number }
 ): number {
    if (shape === "circle") {
        const { radius } = params as { radius: number };
        return Math.PI * radius * radius;
    } else {
        const { side } = params as {side: number};
        return side * side;
    }
 }
 
 const circleArea = calculateArea("circle", { radius: 10 });
 const squareArea = calculateArea("square", { side: 5 });

 console.log("Task 3:", { circleArea, squareArea });

 //Task 4
 type Status = "active" | "inactive" | "new"

 function getStatusColor ( status: Status): string {
    switch (status) {
        case "active":
            return "green";
        case "inactive":
            return "gray";
        case "new":
            return "blue";
    }
 }

console.log("Task 4:", getStatusColor("active"));
console.log("Task 4:", getStatusColor("inactive"));
console.log("Task 4:", getStatusColor("new"));

//Task 5
type StringFormatter = (text: string, uppercase?: boolean) => string;

const makeFirstBig: StringFormatter = (text, uppercase = false) => {
  const s = text.trim();
  if (s.length === 0) return "";

  let res = s.charAt(0).toUpperCase() + s.slice(1);
  if (uppercase) res = res.toUpperCase();
  return res;
};

const cleanText: StringFormatter = (text, uppercase = false) => {
  const s = text.trim();
  return uppercase ? s.toUpperCase() : s;
};

console.log("Task 5:", makeFirstBig("  hello  "));        
console.log("Task 5:", makeFirstBig("  hello  ", true));  
console.log("Task 5:", cleanText("  hello  "));           
console.log("Task 5:", cleanText("  hello  ", true));     

//Task 6
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const nums = [10, 20, 30];
const words = ["apple", "banana", "cherry"];
const empty: number[] = [];

console.log("Task 6 (nums):", getFirstElement(nums));   
console.log("Task 6 (words):", getFirstElement(words));
console.log("Task 6 (empty):", getFirstElement(empty));  