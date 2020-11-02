import fs from 'fs';
import path from 'path';

export interface Post {
    title: string;
    slug: string;
    body: string;
    order: number;
    children: Post[];
}

export namespace Post {
    export function fromText(text: string): Post {
        const lines = text.split('\n');

        const meta = new Map<string, string>();
        let body: string;
        if (lines[0] === '---') {
            let i: number;
            for (i = 1; i < lines.length; i++) {
                const line = lines[i];
                if (line === '---') {
                    i++;
                    break;
                }
                const keyAndValue = line.split(':');
                if (keyAndValue.length === 2) {
                    const key = keyAndValue[0].trim();
                    const value = keyAndValue[1].trim();
                    meta.set(key, value);
                }
            }
            body = lines.slice(i).join('\n').trim();
        } else {
            body = text.trim();
        }

        const title = meta.get('title') ?? '(No Title)';
        const slug = meta.get('slug') ?? '';
        const order = Number(meta.get('order') ?? Number.MAX_VALUE);

        return {
            title,
            slug,
            body,
            order,
            children: [],
        };
    }

    export async function loadAll(targetPath: string): Promise<Post> {
        const files = await fs.promises.readdir(targetPath);
        let post: Post | null = null;
        const children: Post[] = [];

        for (const file of files) {
            const stats = await fs.promises.stat(path.resolve(targetPath, file));
            if (stats.isDirectory()) {
                children.push(await loadAll(path.resolve(targetPath, file)));
                continue;
            }

            if (file.startsWith('_')) {
                if (file === '_index.md') {
                    post = fromText(await fs.promises.readFile(path.resolve(targetPath, file), 'utf-8'));
                }
                continue;
            }

            children.push(fromText(await fs.promises.readFile(path.resolve(targetPath, file), 'utf-8')));
        }

        return { ...post, children: children.sort((c1, c2) => c1.order - c2.order || (c1.title < c2.title ? -1 : +1)) };
    }
}
