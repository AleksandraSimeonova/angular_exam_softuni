import { Routes } from '@angular/router';
import { NotFound } from './features/shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';


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
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile),
        canActivate: [authGuard]
    },
    {
        path: 'posts',
        loadComponent: () => import('./features/posts/post-board/post-board').then(c => c.PostBoard)
    },
    {
        path: 'create',
        loadComponent: () => import('./features/posts/new-post/new-post').then(c => c.NewPost),
        
    },
    {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/post-content/post-content').then(c => c.PostContent)
    },
    {
        path: 'posts/:id/edit',
        loadComponent: () => import('./features/posts/edit-post/edit-post').then(c => c.EditPost)
    },
        {
        path: 'postsowner',
        loadComponent: () => import('./features/posts/my-posts/my-posts').then(c => c.MyPosts)
    },
    {
        path: '**',
        component: NotFound
    }
];
