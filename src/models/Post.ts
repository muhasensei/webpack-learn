export default class Post {
    private readonly title: string;
    private readonly img: string;
    private createdAt: Date;
    constructor(title, img) {
        this.title = title;
        this.img = img;
        this.createdAt = new Date();
    }

    getInfo() {
        return JSON.stringify({
            title: this.title,
            img: this.img,
            createdAt: this.createdAt.toJSON(),
        }, null, 2);
    }
}