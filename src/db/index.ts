export interface Product {
  id: number;
  name: string;
  company: string;
  sales: number;
  date: string;
}

class DatabaseService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'salesDB';
  private readonly DB_VERSION = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('sales')) {
          const store = db.createObjectStore('sales', { keyPath: 'id', autoIncrement: true });
          store.createIndex('company', 'company', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  async addSale(sale: Omit<Product, 'id'>): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error('Database not initialized');

      const transaction = this.db.transaction(['sales'], 'readwrite');
      const store = transaction.objectStore('sales');
      const request = store.add(sale);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllSales(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error('Database not initialized');

      const transaction = this.db.transaction(['sales'], 'readonly');
      const store = transaction.objectStore('sales');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getSalesByCompany(company: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error('Database not initialized');

      const transaction = this.db.transaction(['sales'], 'readonly');
      const store = transaction.objectStore('sales');
      const index = store.index('company');
      const request = index.getAll(company);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateSale(updatedSale: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error('Database not initialized');

      const transaction = this.db.transaction(['sales'], 'readwrite');
      const store = transaction.objectStore('sales');
      const request = store.put(updatedSale);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new DatabaseService();