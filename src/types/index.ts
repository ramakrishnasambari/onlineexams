export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdBy: string;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  studentAnswer: string | string[];
  isCorrect: boolean;
  points: number;
}

export interface StudentPerformance {
  totalTests: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  recentResults: TestResult[];
} 