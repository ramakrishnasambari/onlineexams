import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  BarChart3, 
  LogOut, 
  Calendar,
  Clock,
  CheckCircle,
  Play,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Test, TestResult, StudentPerformance } from '../types';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'results' | 'analytics'>('overview');

  // Mock data
  const [availableTests] = useState<Test[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Basic JavaScript concepts and syntax',
      duration: 60,
      questions: [],
      startDate: '2024-01-15T10:00:00',
      endDate: '2024-01-15T11:00:00',
      isActive: true,
      createdBy: '1'
    },
    {
      id: '2',
      title: 'React Basics',
      description: 'Introduction to React components and hooks',
      duration: 90,
      questions: [],
      startDate: '2024-01-20T14:00:00',
      endDate: '2024-01-20T15:30:00',
      isActive: true,
      createdBy: '1'
    },
    {
      id: 'navodaya',
      title: 'Navodaya Mock Test',
      description: 'Complete mock test for Navodaya Vidyalaya entrance examination',
      duration: 120,
      questions: [],
      startDate: '2024-01-01T00:00:00',
      endDate: '2024-12-31T23:59:59',
      isActive: true,
      createdBy: '1'
    }
  ]);

  const [testResults] = useState<TestResult[]>(() => {
    // Get Navodaya results from localStorage
    const navodayaResults = JSON.parse(localStorage.getItem('navodayaResults') || '[]');
    const existingResults = [
      {
        id: '1',
        testId: '1',
        studentId: '2',
        score: 85,
        totalPoints: 100,
        percentage: 85,
        completedAt: '2024-01-15T10:45:00',
        answers: []
      }
    ];
    
    // Combine existing results with Navodaya results
    return [...navodayaResults, ...existingResults];
  });

  const [performance] = useState<StudentPerformance>({
    totalTests: 5,
    averageScore: 78,
    highestScore: 95,
    lowestScore: 65,
    recentResults: []
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTakeTest = (testId: string) => {
    if (testId === 'navodaya') {
      navigate('/navodaya-mock-test');
    } else {
      navigate(`/student/test/${testId}`);
    }
  };

  const handleViewResult = (resultId: string) => {
    if (resultId.startsWith('navodaya-')) {
      navigate(`/navodaya-result/${resultId}`);
    } else {
      navigate(`/student/result/${resultId}`);
    }
  };

  const stats = [
    { label: 'Tests Taken', value: performance.totalTests, icon: FileText, color: 'bg-blue-500' },
    { label: 'Average Score', value: `${performance.averageScore}%`, icon: BarChart3, color: 'bg-green-500' },
    { label: 'Highest Score', value: `${performance.highestScore}%`, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Available Tests', value: availableTests.length, icon: GraduationCap, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'tests', label: 'Available Tests', icon: FileText },
              { id: 'results', label: 'My Results', icon: CheckCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available Tests */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Available Tests</h3>
                </div>
                <div className="p-6">
                  {availableTests.length > 0 ? (
                    <div className="space-y-4">
                                             {availableTests.slice(0, 3).map((test) => (
                         <div key={test.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                           <div className="flex-1 min-w-0 mr-4">
                             <h4 className="text-sm font-medium text-gray-900">{test.title}</h4>
                             <p className="text-sm text-gray-500 line-clamp-2">{test.description}</p>
                             <div className="flex items-center mt-1 text-xs text-gray-400">
                               <Clock className="h-3 w-3 mr-1" />
                               {test.duration} min
                             </div>
                           </div>
                           <button
                             onClick={() => handleTakeTest(test.id)}
                             className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                           >
                             <Play className="h-3 w-3 mr-1" />
                             Take Test
                           </button>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No tests available at the moment.</p>
                  )}
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Results</h3>
                </div>
                <div className="p-6">
                  {testResults.length > 0 ? (
                    <div className="space-y-4">
                      {testResults.slice(0, 3).map((result) => (
                        <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {availableTests.find(t => t.id === result.testId)?.title || 'Test'}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Completed {new Date(result.completedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">{result.percentage}%</div>
                            <button
                              onClick={() => handleViewResult(result.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No test results yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Available Tests</h3>
            </div>
            <div className="p-6">
              {availableTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTests.map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{test.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{test.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          Duration: {test.duration} minutes
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Start: {new Date(test.startDate).toLocaleDateString()}
                        </div>
                      </div>

                      <button
                        onClick={() => handleTakeTest(test.id)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Test
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No tests available at the moment.</p>
              )}
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">My Test Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {availableTests.find(t => t.id === result.testId)?.title || 'Test'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.percentage}%</div>
                        <div className="text-sm text-gray-500">{result.score}/{result.totalPoints} points</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewResult(result.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{performance.totalTests}</div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{performance.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{performance.highestScore}%</div>
                  <div className="text-sm text-gray-600">Highest Score</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{performance.lowestScore}%</div>
                  <div className="text-sm text-gray-600">Lowest Score</div>
                </div>
              </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Score Trend</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard; 