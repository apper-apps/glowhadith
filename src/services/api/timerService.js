import timerData from '@/services/mockData/timer.json';

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage key for timer sessions
const STORAGE_KEY = 'hadith_timer_sessions';
const ID_COUNTER_KEY = 'hadith_timer_id_counter';

// Initialize data from localStorage or use mock data
const initializeData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with mock data if no stored data exists
  const initialData = timerData.map(session => ({
    ...session,
    startTime: new Date(session.startTime),
    endTime: new Date(session.endTime)
  }));
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Get next available ID
const getNextId = () => {
  const stored = localStorage.getItem(ID_COUNTER_KEY);
  const currentId = stored ? parseInt(stored) : 0;
  const nextId = currentId + 1;
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString());
  return nextId;
};

// Save data to localStorage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

let sessions = initializeData();

export const timerService = {
  // Get all timer sessions
  async getAll() {
    await delay(200);
    // Sort by start time, most recent first
    return [...sessions].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
  },

  // Get timer session by ID
  async getById(id) {
    await delay(200);
    const session = sessions.find(s => s.Id === parseInt(id));
    if (!session) {
      throw new Error(`Timer session with ID ${id} not found`);
    }
    return { ...session };
  },

  // Create new timer session
  async create(sessionData) {
    await delay(300);
    
    const newSession = {
      Id: getNextId(),
      duration: sessionData.duration || 0,
      goalMinutes: sessionData.goalMinutes || 25,
      goalType: sessionData.goalType || 'pomodoro',
      completed: sessionData.completed || false,
      startTime: sessionData.startTime || new Date(),
      endTime: sessionData.endTime || new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    sessions.push(newSession);
    saveData(sessions);
    
    return { ...newSession };
  },

  // Update timer session
  async update(id, updateData) {
    await delay(300);
    
    const index = sessions.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Timer session with ID ${id} not found`);
    }
    
    // Prevent updating the ID field
    const { Id, ...allowedUpdates } = updateData;
    
    sessions[index] = {
      ...sessions[index],
      ...allowedUpdates,
      updatedAt: new Date()
    };
    
    saveData(sessions);
    return { ...sessions[index] };
  },

  // Delete timer session
  async delete(id) {
    await delay(250);
    
    const index = sessions.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Timer session with ID ${id} not found`);
    }
    
    const deletedSession = sessions[index];
    sessions.splice(index, 1);
    saveData(sessions);
    
    return { ...deletedSession };
  },

  // Get timer statistics
  async getStatistics() {
    await delay(200);
    
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed).length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageSession = totalSessions > 0 ? totalDuration / totalSessions : 0;
    
    // Get sessions from last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSessions = sessions.filter(s => new Date(s.startTime) >= weekAgo);
    
    return {
      totalSessions,
      completedSessions,
      totalDuration,
      averageSession,
      weekSessions: weekSessions.length,
      weekDuration: weekSessions.reduce((sum, s) => sum + s.duration, 0),
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
    };
  },

  // Get sessions by date range
  async getSessionsByDateRange(startDate, endDate) {
    await delay(200);
    
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= new Date(startDate) && sessionDate <= new Date(endDate);
    });
  }
};