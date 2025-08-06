import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { navodayaMockTestData, TestData } from '../data/navodayaMockTest';



const NavodayaMockTest: React.FC = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState<TestData | null>(navodayaMockTestData);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 2 hours in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);



  useEffect(() => {
    if (timeLeft > 0 && !isTestComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isTestComplete) {
      setIsTestComplete(true);
      setShowResults(true);
    }
  }, [timeLeft, isTestComplete]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionNumber: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber.toString()]: answer
    }));
  };

  const getCurrentQuestion = (): Question | null => {
    if (!testData) return null;
    const section = testData.questions[currentSection];
    if (!section || !section.parts[currentPart]) return null;
    return section.parts[currentPart].questionList[currentQuestion];
  };

  const getTotalQuestions = (): number => {
    if (!testData) return 0;
    return testData.questions.reduce((total, section) => {
      return total + section.parts.reduce((partTotal, part) => {
        return partTotal + part.questionList.length;
      }, 0);
    }, 0);
  };

  const getAnsweredQuestions = (): number => {
    return Object.keys(answers).length;
  };

  const calculateScore = (): { correct: number; total: number; percentage: number } => {
    if (!testData) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    let total = 0;

    testData.questions.forEach(section => {
      section.parts.forEach(part => {
        part.questionList.forEach(question => {
          total++;
          if (answers[question.number.toString()] === question.correctanswer) {
            correct++;
          }
        });
      });
    });

    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  };

  const nextQuestion = () => {
    if (!testData) return;
    
    const section = testData.questions[currentSection];
    const part = section.parts[currentPart];
    
    if (currentQuestion < part.questionList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPart < section.parts.length - 1) {
      setCurrentPart(currentPart + 1);
      setCurrentQuestion(0);
    } else if (currentSection < testData.questions.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentPart(0);
      setCurrentQuestion(0);
    } else {
      setIsTestComplete(true);
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (!testData) return;
    
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
      const section = testData.questions[currentSection];
      setCurrentQuestion(section.parts[currentPart - 1].questionList.length - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const section = testData.questions[currentSection - 1];
      setCurrentPart(section.parts.length - 1);
      setCurrentQuestion(section.parts[section.parts.length - 1].questionList.length - 1);
    }
  };

  const goToQuestion = (sectionIndex: number, partIndex: number, questionIndex: number) => {
    setCurrentSection(sectionIndex);
    setCurrentPart(partIndex);
    setCurrentQuestion(questionIndex);
  };

  // Save result to localStorage and redirect to dashboard when test is complete
  useEffect(() => {
    if (showResults && testData) {
      const score = calculateScore();
      const result = {
        id: `navodaya-${Date.now()}`,
        testId: 'navodaya',
        testTitle: 'Navodaya Mock Test',
        score: score.correct,
        totalPoints: score.total,
        percentage: score.percentage,
        completedAt: new Date().toISOString(),
        answers: answers,
        testData: testData
      };
      
      // Save to localStorage
      const existingResults = JSON.parse(localStorage.getItem('navodayaResults') || '[]');
      existingResults.unshift(result);
      localStorage.setItem('navodayaResults', JSON.stringify(existingResults));
      
      // Redirect to dashboard after 3 seconds
      const timer = setTimeout(() => {
        navigate('/student/dashboard');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showResults, testData, answers, navigate]);

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Navodaya Mock Test...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Navodaya Mock Test - Results
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Questions</h3>
                <p className="text-3xl font-bold text-blue-600">{score.total}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Correct Answers</h3>
                <p className="text-3xl font-bold text-green-600">{score.correct}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Score</h3>
                <p className="text-3xl font-bold text-purple-600">{score.percentage}%</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600">Redirecting to dashboard in 3 seconds...</p>
            </div>

            <div className="space-y-4">
              {testData.questions.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {section.section}
                  </h3>
                  {section.description !== "NA" && (
                    <p className="text-gray-600 mb-4">{section.description}</p>
                  )}
                  
                  {section.parts.map((part, partIndex) => (
                    <div key={partIndex} className="ml-4 mb-4">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">
                        {part.part}
                      </h4>
                      {part.description !== "NA" && (
                        <p className="text-sm text-gray-600 mb-3">{part.description}</p>
                      )}
                      
                      <div className="grid grid-cols-5 gap-2">
                        {part.questionList.map((question, questionIndex) => {
                          const isAnswered = answers[question.number.toString()];
                          const isCorrect = isAnswered === question.correctanswer;
                          
                          return (
                            <button
                              key={questionIndex}
                              onClick={() => goToQuestion(sectionIndex, partIndex, questionIndex)}
                              className={`p-2 rounded text-sm font-medium transition-colors ${
                                isAnswered
                                  ? isCorrect
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                                  : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                              }`}
                            >
                              {question.number}
                              {isAnswered && (
                                <span className="ml-1">
                                  {isCorrect ? <CheckCircle className="w-3 h-3 inline" /> : <XCircle className="w-3 h-3 inline" />}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = getCurrentQuestion();
  if (!currentQuestionData) return null;

  const section = testData.questions[currentSection];
  const part = section.parts[currentPart];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Navodaya Mock Test</h1>
              <p className="text-gray-600">{section.section}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Question {getAnsweredQuestions()}/{getTotalQuestions()}
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
              {/* Section and Part Info */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {section.section}
                </h2>
                {section.description !== "NA" && (
                  <p className="text-gray-600 mb-4">{section.description}</p>
                )}
                
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {part.part}
                </h3>
                {part.description !== "NA" && (
                  <p className="text-sm text-gray-600 mb-4">{part.description}</p>
                )}
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Question {currentQuestionData.number}
                  </h4>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionData.number} of {getTotalQuestions()}
                  </span>
                </div>

                <div className="mb-6">
                  {currentQuestionData.questiontype === 'img' ? (
                    <div className="text-center">
                                             <img
                         src={`${process.env.PUBLIC_URL}/navodaya/${currentQuestionData.question}`}
                         alt={`Question ${currentQuestionData.number}`}
                         className="max-w-full h-auto mx-auto border rounded-lg shadow-sm"
                         style={{ maxHeight: '400px' }}
                         onError={(e) => {
                           console.error(`Failed to load image: ${currentQuestionData.question}`);
                           e.currentTarget.style.display = 'none';
                         }}
                       />
                    </div>
                  ) : (
                    <div className="text-lg text-gray-800 leading-relaxed">
                      {currentQuestionData.question.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">{line}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {Object.entries(currentQuestionData.options).map(([key, value]) => (
                    <label
                      key={key}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        answers[currentQuestionData.number.toString()] === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionData.number}`}
                        value={key}
                        checked={answers[currentQuestionData.number.toString()] === key}
                        onChange={() => handleAnswerSelect(currentQuestionData.number, key)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[currentQuestionData.number.toString()] === key
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestionData.number.toString()] === key && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-700 mr-2">{key}.</span>
                      <span className="text-gray-800">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

                             {/* Navigation */}
               <div className="flex justify-between items-center pt-6 border-t">
                 <button
                   onClick={previousQuestion}
                   disabled={currentSection === 0 && currentPart === 0 && currentQuestion === 0}
                   className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm border border-gray-300"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                   Previous
                 </button>
                 
                                   <button
                    onClick={() => {
                      const unansweredCount = getTotalQuestions() - getAnsweredQuestions();
                      if (unansweredCount > 0) {
                        setShowSubmitAlert(true);
                      } else {
                        setIsTestComplete(true);
                        setShowResults(true);
                      }
                    }}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit Test
                  </button>
                 
                 <button
                   onClick={nextQuestion}
                   className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm transform hover:scale-105"
                 >
                   Next
                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
               </div>
            </div>
          </div>

                     {/* Sidebar - Question Navigator */}
           <div className="lg:col-span-1">
             <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigator</h3>
               
               <div className="space-y-4">
                 <div>
                   <h4 className="text-sm font-medium text-gray-700 mb-2">
                     {section.section.split(':')[1]?.trim() || section.section}
                   </h4>
                   
                   {section.parts.map((part, partIndex) => (
                     <div key={partIndex} className="ml-2 mb-3">
                       <h5 className="text-xs font-medium text-gray-600 mb-2">
                         {part.part}
                       </h5>
                       
                       <div className="grid grid-cols-4 gap-2">
                         {part.questionList.map((question, questionIndex) => {
                           const isAnswered = answers[question.number.toString()];
                           const isCurrent = partIndex === currentPart && 
                                           questionIndex === currentQuestion;
                           
                           return (
                             <button
                               key={questionIndex}
                               onClick={() => goToQuestion(currentSection, partIndex, questionIndex)}
                               className={`w-8 h-8 text-xs rounded-full border-2 transition-colors flex items-center justify-center ${
                                 isCurrent
                                   ? 'bg-blue-500 text-white border-blue-500'
                                   : isAnswered
                                   ? 'bg-green-100 text-green-800 border-green-300'
                                   : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                               }`}
                             >
                               {question.number}
                             </button>
                           );
                         })}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Answered:</span>
                  <span className="font-medium text-green-600">{getAnsweredQuestions()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-red-600">{getTotalQuestions() - getAnsweredQuestions()}</span>
                </div>
              </div>
            </div>
          </div>
                 </div>
       </div>

       {/* Submit Alert Popup */}
       {showSubmitAlert && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
             <div className="flex items-center mb-4">
               <div className="flex-shrink-0">
                 <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                 </svg>
               </div>
               <div className="ml-3">
                 <h3 className="text-lg font-medium text-gray-900">Confirm Submission</h3>
               </div>
             </div>
             
             <div className="mb-6">
               <p className="text-sm text-gray-600">
                 {(() => {
                   const unansweredCount = getTotalQuestions() - getAnsweredQuestions();
                   return `${unansweredCount} question${unansweredCount > 1 ? 's' : ''} still unanswered. Are you sure you want to submit the test?`;
                 })()}
               </p>
             </div>
             
             <div className="flex justify-end space-x-3">
               <button
                 onClick={() => setShowSubmitAlert(false)}
                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
               >
                 Cancel
               </button>
               <button
                 onClick={() => {
                   setShowSubmitAlert(false);
                   setIsTestComplete(true);
                   setShowResults(true);
                 }}
                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
               >
                 Submit Test
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default NavodayaMockTest; 