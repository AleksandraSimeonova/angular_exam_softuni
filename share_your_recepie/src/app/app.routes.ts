import { Routes } from '@angular/router';
import { NotFound } from './features/shared/not-found/not-found';


export const routes: Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'posts',
        loadComponent: () => import('./features/posts/post-board/post-board').then(c => c.PostBoard)
    },
    {
        path: 'new-post',
        loadComponent: () => import('./features/posts/new-post/new-post').then(c => c.NewPost)
    },
    {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/post-content/post-content').then(c => c.PostContent)
    },
    {
        path: 'logout',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFound
    }
];
