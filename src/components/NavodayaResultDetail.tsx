import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react';

interface Question {
  number: number;
  question: string;
  questiontype: 'img' | 'txt';
  options: { [key: string]: string | number };
  correctanswer: string;
  studentanswer: string;
}

interface Part {
  part: string;
  description: string;
  questionList: Question[];
}

interface Section {
  section: string;
  description: string;
  parts: Part[];
}

interface TestData {
  questions: Section[];
}

interface NavodayaResult {
  id: string;
  testId: string;
  testTitle: string;
  score: number;
  totalPoints: number;
  percentage: number;
  completedAt: string;
  answers: { [key: string]: string };
  testData: TestData;
}

const NavodayaResultDetail: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<NavodayaResult | null>(null);
  const [selectedSection, setSelectedSection] = useState(0);

  useEffect(() => {
    if (resultId) {
      const results = JSON.parse(localStorage.getItem('navodayaResults') || '[]');
      const foundResult = results.find((r: NavodayaResult) => r.id === resultId);
      if (foundResult) {
        setResult(foundResult);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading result details...</p>
        </div>
      </div>
    );
  }

  const calculateSectionScore = (section: Section) => {
    let correct = 0;
    let total = 0;

    section.parts.forEach(part => {
      part.questionList.forEach(question => {
        total++;
        if (result.answers[question.number.toString()] === question.correctanswer) {
          correct++;
        }
      });
    });

    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{result.testTitle}</h1>
                <p className="text-gray-600">Detailed Results</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(result.completedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Overall Score */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Questions</h3>
                    <p className="text-3xl font-bold text-blue-600">{result.totalPoints}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Correct Answers</h3>
                    <p className="text-3xl font-bold text-green-600">{result.score}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Score</h3>
                    <p className="text-3xl font-bold text-purple-600">{result.percentage}%</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Incorrect</h3>
                    <p className="text-3xl font-bold text-orange-600">{result.totalPoints - result.score}</p>
                  </div>
                </div>
              </div>

              {/* Section Performance */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Section-wise Performance</h2>
                <div className="space-y-4">
                  {result.testData.questions.map((section, sectionIndex) => {
                    const sectionScore = calculateSectionScore(section);
                    return (
                      <div key={sectionIndex} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {section.section}
                            </h3>
                            {section.description !== "NA" && (
                              <p className="text-gray-600 mt-1">{section.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{sectionScore.percentage}%</div>
                            <div className="text-sm text-gray-600">
                              {sectionScore.correct}/{sectionScore.total} correct
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {section.parts.map((part, partIndex) => {
                            let partCorrect = 0;
                            let partTotal = 0;
                            
                            part.questionList.forEach(question => {
                              partTotal++;
                              if (result.answers[question.number.toString()] === question.correctanswer) {
                                partCorrect++;
                              }
                            });

                            return (
                              <div key={partIndex} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-lg font-medium text-gray-700">{part.part}</h4>
                                  <div className="text-sm text-gray-600">
                                    {partCorrect}/{partTotal} correct
                                  </div>
                                </div>
                                {part.description !== "NA" && (
                                  <p className="text-sm text-gray-600 mb-3">{part.description}</p>
                                )}
                                
                                <div className="grid grid-cols-5 gap-2">
                                  {part.questionList.map((question, questionIndex) => {
                                    const isAnswered = result.answers[question.number.toString()];
                                    const isCorrect = isAnswered === question.correctanswer;
                                    
                                    return (
                                      <div
                                        key={questionIndex}
                                        className={`p-2 rounded text-sm font-medium text-center ${
                                          isAnswered
                                            ? isCorrect
                                              ? 'bg-green-100 text-green-800 border border-green-300'
                                              : 'bg-red-100 text-red-800 border border-red-300'
                                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                                        }`}
                                      >
                                        {question.number}
                                        {isAnswered && (
                                          <span className="ml-1">
                                            {isCorrect ? <CheckCircle className="w-3 h-3 inline" /> : <XCircle className="w-3 h-3 inline" />}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.percentage}%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.score}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{result.totalPoints - result.score}</div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{result.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Section Performance</h4>
                <div className="space-y-2">
                  {result.testData.questions.map((section, sectionIndex) => {
                    const sectionScore = calculateSectionScore(section);
                    return (
                      <div key={sectionIndex} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate">
                          {section.section.split(':')[1]?.trim() || section.section}
                        </span>
                        <span className="font-medium text-gray-800">{sectionScore.percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavodayaResultDetail; 