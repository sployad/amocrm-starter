var Logger = {
    log: function (message) {
        const date = new Date();
        const options = {
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        };
        const timeMark = new Intl.DateTimeFormat('ru-RU', options).format(date);
        console.log(`[${timeMark}]: ${message}`);
    }
}
