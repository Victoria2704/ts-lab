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