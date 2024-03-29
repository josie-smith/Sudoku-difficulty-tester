export enum Difficulty {
    Random = 'Random',
    Easy = 'Easy',
    Medium = 'Medium',
}

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;
export type Digit = typeof digits[number];

export type Block = (Digit)[];
export type Sudoku = Block[];

export class NoSolutionsError extends Error {
    constructor() {
        super('There are no solutions');
        Object.setPrototypeOf(this, NoSolutionsError.prototype);
    }
}

export class MultipleSolutionsError extends Error {
    constructor() {
        super('There are multiple solutions');
        Object.setPrototypeOf(this, NoSolutionsError.prototype);
    }
}

export class NotCompleteError extends Error {
    constructor() {
        super('The puzzle is not complete.');
        Object.setPrototypeOf(this, NoSolutionsError.prototype);
    }
}

export class InvalidSolutionError extends Error {
    constructor() {
        super('There is a mistake somewhere.');
        Object.setPrototypeOf(this, NoSolutionsError.prototype);
    }
}
