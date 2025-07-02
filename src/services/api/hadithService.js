import { hadith } from '@/services/mockData/hadith.json';
import { bookService } from './bookService';
import { chapterService } from './chapterService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const hadithService = {
  async getAll() {
    await delay(300);
    return [...hadith];
  },
  
  async getById(id) {
    await delay(200);
    const hadithItem = hadith.find(h => h.Id === parseInt(id));
    if (!hadithItem) return null;
    
    // Enrich with book and chapter info
    const book = await bookService.getById(hadithItem.bookId);
    const chapter = await chapterService.getById(hadithItem.chapterId);
    
    return {
      ...hadithItem,
      bookName: book ? book.nameUrdu : 'Unknown Book',
      chapterTitle: chapter ? chapter.titleUrdu : null
    };
  },
  
  async getByChapterId(chapterId) {
    await delay(300);
    const chapterHadith = hadith.filter(h => h.chapterId === chapterId);
    
    // Enrich with book info
    const enrichedHadith = await Promise.all(
      chapterHadith.map(async (h) => {
        const book = await bookService.getById(h.bookId);
        const chapter = await chapterService.getById(h.chapterId);
        return {
          ...h,
          bookName: book ? book.nameUrdu : 'Unknown Book',
          chapterTitle: chapter ? chapter.titleUrdu : null
        };
      })
    );
    
    return enrichedHadith.sort((a, b) => a.number - b.number);
  },
  
  async search(query) {
    await delay(400);
    const lowercaseQuery = query.toLowerCase();
    const results = hadith.filter(h => 
      h.arabicText.toLowerCase().includes(lowercaseQuery) ||
      h.urduText.toLowerCase().includes(lowercaseQuery) ||
      h.narrator.toLowerCase().includes(lowercaseQuery)
    );
    
    // Enrich with book and chapter info
    const enrichedResults = await Promise.all(
      results.map(async (h) => {
        const book = await bookService.getById(h.bookId);
        const chapter = await chapterService.getById(h.chapterId);
        return {
          ...h,
          bookName: book ? book.nameUrdu : 'Unknown Book',
          chapterTitle: chapter ? chapter.titleUrdu : null
        };
      })
    );
    
    return enrichedResults.sort((a, b) => a.number - b.number);
  },
  
  async create(hadithItem) {
    await delay(400);
    const maxId = Math.max(...hadith.map(h => h.Id), 0);
    const newHadith = { ...hadithItem, Id: maxId + 1 };
    hadith.push(newHadith);
    return { ...newHadith };
  },
  
  async update(id, data) {
    await delay(300);
    const index = hadith.findIndex(h => h.Id === parseInt(id));
    if (index === -1) throw new Error('Hadith not found');
    
    hadith[index] = { ...hadith[index], ...data };
    return { ...hadith[index] };
  },
  
  async delete(id) {
    await delay(300);
    const index = hadith.findIndex(h => h.Id === parseInt(id));
    if (index === -1) throw new Error('Hadith not found');
    
    const deleted = hadith.splice(index, 1)[0];
    return { ...deleted };
  }
};