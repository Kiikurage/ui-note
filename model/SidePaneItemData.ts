import path from 'path';
import { Post } from './Post';

export interface SidePaneItemData {
    path: string;
    title: string;
    body: string;
    children: SidePaneItemData[];
}

export namespace SidePaneItemData {
    export async function loadAll(): Promise<SidePaneItemData[]> {
        const rootPost = await Post.loadAll(path.join(process.cwd(), './posts/'));
        return rootPost.children.map((post) => fromPost(post));
    }

    export function fromPost(post: Post, parentPath = ''): SidePaneItemData {
        const postPath = parentPath + '/' + post.slug;

        return {
            path: postPath,
            title: post.title,
            body: post.body,
            children: post.children.map((childPost) => fromPost(childPost, postPath)),
        };
    }
}
