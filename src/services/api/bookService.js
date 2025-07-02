import { books } from '@/services/mockData/books.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookService = {
  async getAll() {
    await delay(300);
    return [...books];
  },
  
  async getById(id) {
    await delay(200);
    const book = books.find(b => b.Id === parseInt(id));
    return book ? { ...book } : null;
  },
  
  async create(book) {
    await delay(400);
    const maxId = Math.max(...books.map(b => b.Id), 0);
    const newBook = { ...book, Id: maxId + 1 };
    books.push(newBook);
    return { ...newBook };
  },
  
  async update(id, data) {
    await delay(300);
    const index = books.findIndex(b => b.Id === parseInt(id));
    if (index === -1) throw new Error('Book not found');
    
    books[index] = { ...books[index], ...data };
    return { ...books[index] };
  },
  
  async delete(id) {
    await delay(300);
    const index = books.findIndex(b => b.Id === parseInt(id));
    if (index === -1) throw new Error('Book not found');
    
    const deleted = books.splice(index, 1)[0];
    return { ...deleted };
  },
  
  async search(query) {
    await delay(250);
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.nameUrdu.toLowerCase().includes(lowercaseQuery) ||
      book.nameArabic.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery)
    ).map(book => ({ ...book }));
  }
};