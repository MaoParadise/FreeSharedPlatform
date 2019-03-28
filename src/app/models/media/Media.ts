export interface Media {
    _idUser: string;
    title: string;
    description: string;
    totalEpisodes: number;
    studio: string;
    miniature: string;
    releaseDate: Date;
    //upload: [uploadClass];
    statusMedia: number;
    references: string[];
}