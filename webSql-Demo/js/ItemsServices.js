import {DbCreator} from "./DbCreator.js";

class ItemsServices {
    _id;
    _name;
    _amount;
    _dbContext;
    _dbCreator;

    constructor() {
        this._dbCreator = new DbCreator();
        this._dbContext = this._dbCreator.db;
        this._dbCreator.createItemsTable();
    }

    get dbContext() {
        return this._dbContext;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }


    createItem(Item) {
        this._dbContext.transaction(transaction => {
            transaction.executeSql("insert into items values (?,?,?)", [Item.id, Item.name, Item.amount], (result) => {
                console.log("item has been created\n");
            }), (error) => {
                console.log("Bad request");
                console.log(error);
            };
        });
    }

    updateItem(Item) {
        this._dbContext.transaction(transaction => {
            transaction.executeSql("update items set name=?,amount=? where id = ?", [Item.name, Item.amount, Item.id], (result) => {
                console.log("item has been updated\n");
            }), (error) => {
                console.log("Bad request");
                console.log(error);
            };
        });
    }

    deleteItem(id) {
        this._dbContext.transaction(transaction => {
            transaction.executeSql("delete from items where id = ?", [id], (result) => {
                console.log("Item has been deleted");
            }, (error) => {
                console.log(error);
            })
        })
    }

    getItems() {
        this._dbContext.transaction(transaction => {
            transaction.executeSql("select * from items", [], (transaction, results) => {
                console.log(results);
                for (const resultElement of results.rows) {
                    console.log(
                        "id = " + resultElement.id + "\n" +
                        "name =" + resultElement.name + "\n" +
                        "amount = " + resultElement.amount + "\n" +
                        "----------------------------------------\n"
                    );
                }
            }, (error) => {
                console.log(error);
            });
        })
    }
}

let itemServices = new ItemsServices();

itemServices.createItem({
    "id": 2,
    "name": "test",
    "amount": 100
});
itemServices.createItem({
    "id": 3,
    "name": "test2",
    "amount": 10
});

itemServices.updateItem({
    "id": 1,
    "name": "FsFsFsFs",
    "amount": 10
});

itemServices.getItems();