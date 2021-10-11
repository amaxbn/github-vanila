export class Log {
    constructor() {
    }

    countMessage(counter) {
        return counter ? `Найдено ${counter} пользователей` : `Не найдено`;
    }
}
