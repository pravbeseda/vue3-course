import Main from "@/pages/Main";
import { createRouter, createWebHistory } from 'vue-router';
import PostsPage from "@/pages/PostsPage";
import About from "@/pages/About";
import PostPage from "@/pages/PostPage";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import PostsPageCompositionApi from "@/pages/PostsPageCompositionApi";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/posts/:id',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },
    {
        path: '/composition',
        component: PostsPageCompositionApi
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;
