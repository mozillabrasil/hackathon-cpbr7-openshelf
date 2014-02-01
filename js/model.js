var dbName = "openshelf";
var dbVersion = 1;

var db;
var request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
    console.error("Can't open indexedDB!!!", event);
};
request.onsuccess = function (event) {
    console.log("Database opened ok");
    db = event.target.result;
};

request.onupgradeneeded = function (event) {

    console.log("Running onUpgradeNeeded");

    db = event.target.result;

    if (!db.objectStoreNames.contains(dbName)) {

        console.log("Creating objectStore");

        var objectStore = db.createObjectStore("perfil", {
            keyPath: "id",
            autoIncrement: true
        });
        objectStore.createIndex("nome", "nome", {
            unique: false
        });
        objectStore.createIndex("notification_date", "notification_date", {
            unique: false
        });

        var p = new Perfil();
        p.notification_date = Date.now();
        objectStore.add(p);
    }
};

function Perfil() {
    this.modificado = Date.now();
}

function consultaPerfil(inCallback) {

    var objectStore = db.transaction("perfil").objectStore("perfil");

    objectStore.openCursor().onsuccess = function(event) {
        console.log("sucesso na consulta");
      var cursor = event.target.result;
      if (cursor.key == 1) {

        //cursor.value.notification_date

      }
    };

}

function todosRegistros(inCallback){
    var objectStore = db.transaction("perfil").objectStore("perfil");
    console.log("Listando registros...");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log("#" + cursor.value.id + " - " + cursor.value.notification_date);
            inCallback(null, cursor.value);
            cursor.continue();
        }
    };
}

function saveProfile(perfil, inCallback) {
    var objectStore = db.transaction(["perfil"], "readwrite").objectStore("perfil");
    var request = objectStore.get(1);

    request.onerror = function(event) {
        console.log("Falha ao buscar perfil");
    };

    request.onsuccess = function(event) {

      var data = request.result;
      
      data.notification_date = Date.now();

      var requestUpdate = objectStore.put(data);
       requestUpdate.onerror = function(event) {
            console.log("Falha ao atualizar");

       };
       requestUpdate.onsuccess = function(event) {
            console.log("Salvo com sucesso");
           };
    }

}