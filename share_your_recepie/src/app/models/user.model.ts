export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    postedRecipes: string[];
    likedRecipes: string[];
    accessToken: string;

}
