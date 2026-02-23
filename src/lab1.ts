//Task 1
export interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

export function createUser (
    id: number,
    name: string,
    email?: string,
    isActive: boolean = true
): User {
    return { id, name, email, isActive};
}

//Task 2
export type Genre = "fiction" | "non-fiction"

export interface Book {
    title: string;
    author: string;
    year?: number;
    genre: Genre;
}

export function createBook (book: Book): Book {
    return book;
}

//Task 3
export type Shape = "circle" | "square";

export function calculateArea(shape: "circle", params: {radius: number}): number;
export function calculateArea(shape: "square", params: {side: number}): number;

export function calculateArea (
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

 //Task 4
export type Status = "active" | "inactive" | "new"

export function getStatusColor ( status: Status): string {
    switch (status) {
        case "active":
            return "green";
        case "inactive":
            return "gray";
        case "new":
            return "blue";
        default:
            return "gray";
    }
 }

 //Task 5
export type StringFormatter = (text: string, uppercase?: boolean) => string;

export const makeFirstBig: StringFormatter = (text, uppercase = false) => {
  const s = text.trim();
  if (s.length === 0) return "";

  let res = s.charAt(0).toUpperCase() + s.slice(1);
  if (uppercase) res = res.toUpperCase();
  return res;
};

export const cleanText: StringFormatter = (text, uppercase = false) => {
  const s = text.trim();
  return uppercase ? s.toUpperCase() : s;
};

//Task 6
export function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

//Task 7
export interface HasId {
    id: number;
}

export function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id);
}