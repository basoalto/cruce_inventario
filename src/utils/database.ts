


import { processCsvData } from './fileUtils'; 

export const openDatabase = (dbName: string, index: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        // Verifica si IndexedDB está disponible
        if (!window.indexedDB) {
            reject("Este navegador no soporta IndexedDB.");
            return;
        }

        // Abre la base de datos
        const request = indexedDB.open("csvDatabase", 36);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            // Crea el objectStore si no existe
            if (!db.objectStoreNames.contains(dbName)) {
                db.createObjectStore(dbName, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            // Más detalles del error en consola
            console.error("Error en IndexedDB:", (event.target as IDBOpenDBRequest).error);
            reject("Error opening database: " + (event.target as IDBOpenDBRequest).error?.message);
        };
    });
};

  
// Otros métodos relacionados con IndexedDB

// Función para obtener los datos desde IndexedDB
const getCsvDataFromIndexedDB = async (storeName: string, index: number) => {
    try {
        const db = await openDatabase(storeName, index); // Abrir la base de datos

        return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll(); // Obtener todos los datos del almacén

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBRequest).error?.message);
        };
        });
    } catch (error) {
        console.error("Error al interactuar con IndexedDB: ", error);
    }
    };
    export const loadDataAndProcess = async (index: number, storeName: string, setCsvData: Function, setChartData: Function, setChartData2: Function, setMetrics: Function,  stockP: string, 
        activoP: string, 
        robadoP: string,
        setChartDataType: string,
        setChartData2Type: string
    ) => {
    try {
        const data: any = await getCsvDataFromIndexedDB(storeName, index);
        if (data) {
        processCsvData(data, setChartData, setChartData2, setMetrics,stockP,activoP,robadoP,setChartDataType, setChartData2Type);  // Pasar los datos obtenidos a la función que procesa los gráficos
        setCsvData(data);
        }
    } catch (error) {
        console.error("Error al cargar los datos de IndexedDB: ", error);
    }
}

// Exportar la función para guardar datos
export const saveCsvData = async (index: number, jsonData: any[], storeName: string, setCsvData: Function, setChartData: Function, setChartData2: Function, setMetrics: Function,   stockP: string, 
    activoP: string, 
    robadoP: string,
    setChartDataType: string,
    setChartData2Type: string) => {
    try {
        const db = await openDatabase(storeName, index); // Abrir la base de datos
        
        const transaction = db.transaction(storeName, "readwrite"); // Iniciar una transacción para el almacén específico
        const store = transaction.objectStore(storeName); // Acceder al almacén de objetos específico
    
        jsonData.forEach((row: any) => {
            store.add(row); // Agregar cada fila del CSV (convertido a JSON)
        });
    
        transaction.oncomplete = () => {
            console.log(`Datos guardados exitosamente en IndexedDB en el almacén ${storeName}`);
        };

        // Llamar a loadDataAndProcess después de guardar los datos
        await loadDataAndProcess(index,storeName, setCsvData, setChartData, setChartData2, setMetrics,stockP,  
            activoP,  
            robadoP,
            setChartDataType, 
            setChartData2Type);
        transaction.onerror = (event) => {
            console.log(`Error al guardar los datos en IndexedDB en el almacén ${storeName}: `, (event.target as IDBRequest).error?.message);
        };
    } catch (error) {
        console.error("Error al interactuar con IndexedDB: ", error);
    }
};