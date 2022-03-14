export {DbCreator}

class DbCreator {

    _db;

    constructor() {
        this._db = window.openDatabase("onlineStore", "1.0", "Online Store", 1024 * 1024 * 5);
    }

    createItemsTable() {
        this._db.transaction(transaction => {
            transaction.executeSql("create table if not exists items (id int primary key, name varchar(50), amount int)", [], (result) => {
                console.log(result);
            }, (error => {
                console.log(error);
            }));
        });
    }

    get db() {
        return this._db;
    }
}