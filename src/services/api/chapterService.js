import { chapters } from '@/services/mockData/chapters.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const chapterService = {
  async getAll() {
    await delay(300);
    return [...chapters];
  },
  
  async getById(id) {
    await delay(200);
    const chapter = chapters.find(c => c.Id === parseInt(id));
    return chapter ? { ...chapter } : null;
  },
  
  async getByBookId(bookId) {
    await delay(250);
    return chapters
      .filter(c => c.bookId === bookId)
      .sort((a, b) => a.numberInBook - b.numberInBook)
      .map(chapter => ({ ...chapter }));
  },
  
  async create(chapter) {
    await delay(400);
    const maxId = Math.max(...chapters.map(c => c.Id), 0);
    const newChapter = { ...chapter, Id: maxId + 1 };
    chapters.push(newChapter);
    return { ...newChapter };
  },
  
  async update(id, data) {
    await delay(300);
    const index = chapters.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error('Chapter not found');
    
    chapters[index] = { ...chapters[index], ...data };
    return { ...chapters[index] };
  },
  
  async delete(id) {
    await delay(300);
    const index = chapters.findIndex(c => c.Id === parseInt(id));
    if (index === -1) throw new Error('Chapter not found');
    
    const deleted = chapters.splice(index, 1)[0];
    return { ...deleted };
  }
};