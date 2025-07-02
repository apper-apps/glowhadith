import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import moment from 'moment';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { timerService } from '@/services/api/timerService';

const TimerPage = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentGoal, setCurrentGoal] = useState(25); // Default 25 minutes
  const [goalType, setGoalType] = useState('pomodoro'); // pomodoro, custom
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Load sessions on component mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  // Check if goal is reached
  useEffect(() => {
    if (time > 0 && time === currentGoal * 60 && isRunning) {
      handleGoalReached();
    }
  }, [time, currentGoal, isRunning]);

  const loadSessions = async () => {
    try {
      const sessionsData = await timerService.getAll();
      setSessions(sessionsData);
    } catch (error) {
      toast.error('Failed to load timer sessions');
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = new Date();
    toast.success('Timer started');
  };

  const pauseTimer = () => {
    setIsPaused(true);
    toast.info('Timer paused');
  };

  const resumeTimer = () => {
    setIsPaused(false);
    toast.success('Timer resumed');
  };

  const stopTimer = async () => {
    if (time > 0) {
      try {
        const session = {
          duration: time,
          goalMinutes: currentGoal,
          goalType: goalType,
          completed: time >= currentGoal * 60,
          startTime: startTimeRef.current,
          endTime: new Date()
        };
        
        await timerService.create(session);
        toast.success(`Session saved: ${formatTime(time)}`);
        loadSessions();
      } catch (error) {
        toast.error('Failed to save session');
      }
    }
    
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    startTimeRef.current = null;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    startTimeRef.current = null;
    toast.info('Timer reset');
  };

  const handleGoalReached = () => {
    toast.success('🎉 Goal reached! Great job!');
    // Auto-save when goal is reached
    stopTimer();
  };

  const deleteSession = async (sessionId) => {
    try {
      await timerService.delete(sessionId);
      toast.success('Session deleted');
      loadSessions();
    } catch (error) {
      toast.error('Failed to delete session');
    }
  };

  const formatTime = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const secs = duration.seconds();
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (currentGoal === 0) return 0;
    return Math.min((time / (currentGoal * 60)) * 100, 100);
  };

  const getTotalStudyTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getCompletedSessions = () => {
    return sessions.filter(session => session.completed).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold font-display text-islamic-800 mb-2">
            Study Timer
          </h1>
          <p className="text-islamic-600 font-urdu text-lg">
            مطالعہ کا وقت - Track Your Learning Journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 islamic-border"
          >
            {/* Goal Setting */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-islamic-700 mb-2">
                Study Goal
              </label>
              <div className="flex gap-2 mb-4">
                <Button
                  variant={goalType === 'pomodoro' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setGoalType('pomodoro');
                    setCurrentGoal(25);
                  }}
                  disabled={isRunning}
                >
                  Pomodoro (25m)
                </Button>
                <Button
                  variant={goalType === 'short' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setGoalType('short');
                    setCurrentGoal(15);
                  }}
                  disabled={isRunning}
                >
                  Short (15m)
                </Button>
                <Button
                  variant={goalType === 'long' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setGoalType('long');
                    setCurrentGoal(45);
                  }}
                  disabled={isRunning}
                >
                  Long (45m)
                </Button>
              </div>
              
              {goalType === 'custom' && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={currentGoal}
                    onChange={(e) => setCurrentGoal(parseInt(e.target.value) || 1)}
                    disabled={isRunning}
                    className="w-20 px-3 py-2 border border-islamic-300 rounded-lg focus:ring-2 focus:ring-islamic-500 focus:border-transparent"
                  />
                  <span className="text-islamic-600">minutes</span>
                </div>
              )}
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <motion.div
                key={time}
                initial={{ scale: 1 }}
                animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
                className="relative"
              >
                {/* Progress Circle */}
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Timer Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold font-mono text-islamic-800">
                        {formatTime(time)}
                      </div>
                      <div className="text-sm text-islamic-600 mt-1">
                        Goal: {currentGoal}m
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Status */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  {isRunning && !isPaused && (
                    <motion.div
                      key="running"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-green-600"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Timer Running</span>
                    </motion.div>
                  )}
                  {isPaused && (
                    <motion.div
                      key="paused"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-yellow-600"
                    >
                      <ApperIcon name="Pause" size={16} />
                      <span className="font-medium">Paused</span>
                    </motion.div>
                  )}
                  {!isRunning && (
                    <motion.div
                      key="stopped"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-islamic-600"
                    >
                      <ApperIcon name="Clock" size={16} />
                      <span className="font-medium">Ready to Start</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                {!isRunning ? (
                  <Button
                    onClick={startTimer}
                    variant="primary"
                    size="lg"
                    className="px-8"
                  >
                    <ApperIcon name="Play" size={20} className="mr-2" />
                    Start
                  </Button>
                ) : (
                  <>
                    {!isPaused ? (
                      <Button
                        onClick={pauseTimer}
                        variant="secondary"
                        size="lg"
                      >
                        <ApperIcon name="Pause" size={20} className="mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        onClick={resumeTimer}
                        variant="primary"
                        size="lg"
                      >
                        <ApperIcon name="Play" size={20} className="mr-2" />
                        Resume
                      </Button>
                    )}
                    <Button
                      onClick={stopTimer}
                      variant="outline"
                      size="lg"
                    >
                      <ApperIcon name="Square" size={20} className="mr-2" />
                      Stop
                    </Button>
                  </>
                )}
                
                {(time > 0 || isRunning) && (
                  <Button
                    onClick={resetTimer}
                    variant="ghost"
                    size="lg"
                  >
                    <ApperIcon name="RotateCcw" size={20} className="mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Statistics & History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg islamic-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <ApperIcon name="Clock" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-islamic-600">Total Time</p>
                    <p className="text-lg font-bold text-islamic-800">
                      {formatTime(getTotalStudyTime())}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg islamic-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <ApperIcon name="Target" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-islamic-600">Completed</p>
                    <p className="text-lg font-bold text-islamic-800">
                      {getCompletedSessions()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session History */}
            <div className="bg-white rounded-xl shadow-lg p-6 islamic-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-islamic-800">
                  Recent Sessions
                </h3>
                <ApperIcon name="History" size={20} className="text-islamic-600" />
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {sessions.length === 0 ? (
                  <div className="text-center py-8 text-islamic-500">
                    <ApperIcon name="Clock" size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No sessions yet</p>
                    <p className="text-sm">Start your first study session!</p>
                  </div>
                ) : (
                  sessions.slice(0, 10).map((session) => (
                    <motion.div
                      key={session.Id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-cream-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          session.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          <ApperIcon 
                            name={session.completed ? "CheckCircle" : "Clock"} 
                            size={16} 
                          />
                        </div>
                        <div>
                          <p className="font-medium text-islamic-800">
                            {formatTime(session.duration)}
                          </p>
                          <p className="text-xs text-islamic-600">
                            {moment(session.startTime).format('MMM DD, YYYY HH:mm')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.completed 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {session.goalMinutes}m goal
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSession(session.Id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <ApperIcon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;