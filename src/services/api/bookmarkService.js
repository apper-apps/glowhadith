const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for bookmarks (in a real app, this would be saved to localStorage or backend)
let bookmarks = JSON.parse(localStorage.getItem('hadith-bookmarks') || '[]');

const saveToStorage = () => {
  localStorage.setItem('hadith-bookmarks', JSON.stringify(bookmarks));
};

export const bookmarkService = {
  async getAll() {
    await delay(200);
    return [...bookmarks];
  },
  
  async getById(id) {
    await delay(150);
    const bookmark = bookmarks.find(b => b.Id === parseInt(id));
    return bookmark ? { ...bookmark } : null;
  },
  
  async addBookmark(bookmarkData) {
    await delay(300);
    const maxId = Math.max(...bookmarks.map(b => b.Id || 0), 0);
    const newBookmark = { 
      ...bookmarkData, 
      Id: maxId + 1,
      dateAdded: bookmarkData.dateAdded || new Date().toISOString()
    };
    bookmarks.push(newBookmark);
    saveToStorage();
    return { ...newBookmark };
  },
  
  async removeBookmark(hadithId) {
    await delay(250);
    const index = bookmarks.findIndex(b => b.hadithId === hadithId);
    if (index === -1) throw new Error('Bookmark not found');
    
    const deleted = bookmarks.splice(index, 1)[0];
    saveToStorage();
    return { ...deleted };
  },
  
  async updateNote(hadithId, note) {
    await delay(300);
    const index = bookmarks.findIndex(b => b.hadithId === hadithId);
    if (index === -1) throw new Error('Bookmark not found');
    
    bookmarks[index].note = note;
    saveToStorage();
    return { ...bookmarks[index] };
  },
  
  isBookmarked(hadithId) {
    return bookmarks.some(b => b.hadithId === hadithId);
  },
  
  async clearAll() {
    await delay(200);
    bookmarks = [];
    saveToStorage();
    return true;
  }
};