
export type IBuildMode = 'production' | 'development'
export interface IBuildPaths{
    entry: string;
    build: string;
    html: string;
    src: string
}


export interface IBuildOptions{
    mode: IBuildMode;
    paths: IBuildPaths;
    isDev: boolean;
    port: number;
}

export interface IBuildEnv{
    mode: IBuildMode;
    port: number;
}
