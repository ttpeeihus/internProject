"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaylistDto = void 0;
class CreatePlaylistDto {
    constructor() {
        this.watched = "0";
        this.date = this.getCurrentDateFormatted();
    }
    getCurrentDateFormatted() {
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
exports.CreatePlaylistDto = CreatePlaylistDto;
//# sourceMappingURL=create-playlist.dto.js.map