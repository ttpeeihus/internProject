export class CreatePlaylistDto {
    avtUser: string;
    src: string;
    name: string;
    author: string;
    watched: string = "0";
    date: string;
    constructor() {
        this.date = this.getCurrentDateFormatted();
    }

    private getCurrentDateFormatted(): string {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }
}
