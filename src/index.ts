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