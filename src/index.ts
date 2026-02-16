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