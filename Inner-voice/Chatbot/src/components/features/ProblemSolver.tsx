import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Lightbulb, Target, Zap } from 'lucide-react';

interface ProblemSolverProps {
  onComplete?: (solution: ProblemSolution) => void;
  onClose?: () => void;
}

interface ProblemSolution {
  problem: string;
  goals: string[];
  solutions: string[];
  actionPlan: string[];
  nextSteps: string;
}

type SolverStep = 'problem' | 'goals' | 'solutions' | 'action' | 'summary';

export function ProblemSolver({ onComplete, onClose }: ProblemSolverProps) {
  const [currentStep, setCurrentStep] = useState<SolverStep>('problem');
  const [solution, setSolution] = useState<ProblemSolution>({
    problem: '',
    goals: [''],
    solutions: [''],
    actionPlan: [''],
    nextSteps: ''
  });

  const steps: Array<{
    key: SolverStep;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }> = [
    {
      key: 'problem',
      title: 'Define Problem',
      subtitle: 'Clearly describe the challenge you\'re facing',
      icon: <Target className="w-5 h-5" />
    },
    {
      key: 'goals',
      title: 'Set Goals',
      subtitle: 'What results do you want to achieve?',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      key: 'solutions',
      title: 'Brainstorm',
      subtitle: 'Think of all possible solutions',
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      key: 'action',
      title: 'Action Plan',
      subtitle: 'Turn the best solution into concrete steps',
      icon: <Zap className="w-5 h-5" />
    },
    {
      key: 'summary',
      title: 'Summary',
      subtitle: 'Review your solution',
      icon: <ArrowRight className="w-5 h-5" />
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const currentStepInfo = steps[currentStepIndex];

  const updateSolution = (field: keyof ProblemSolution, value: any) => {
    setSolution(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: 'goals' | 'solutions' | 'actionPlan') => {
    setSolution(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateItem = (field: 'goals' | 'solutions' | 'actionPlan', index: number, value: string) => {
    setSolution(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeItem = (field: 'goals' | 'solutions' | 'actionPlan', index: number) => {
    setSolution(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'problem':
        return solution.problem.trim().length > 0;
      case 'goals':
        return solution.goals.some(goal => goal.trim().length > 0);
      case 'solutions':
        return solution.solutions.some(sol => sol.trim().length > 0);
      case 'action':
        return solution.actionPlan.some(step => step.trim().length > 0);
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].key);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].key);
    }
  };

  const handleComplete = () => {
    onComplete?.(solution);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'problem':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your problem or challenge:
              </label>
              <textarea
                value={solution.problem}
                onChange={(e) => updateSolution('problem', e.target.value)}
                placeholder="For example: I need to find a new job, but don't know where to start..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none h-24"
              />
            </div>
            <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              💡 Zara's tip: The more specific, the better! This way we can create precise solutions.
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your goals? (The results you want to achieve)
              </label>
              {solution.goals.map((goal, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={goal}
                    onChange={(e) => updateItem('goals', index, e.target.value)}
                    placeholder={`Goal ${index + 1}...`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {solution.goals.length > 1 && (
                    <button
                      onClick={() => removeItem('goals', index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem('goals')}
                className="text-orange-500 hover:text-orange-700 text-sm font-medium"
              >
                + Add more goals
              </button>
            </div>
          </div>
        );

      case 'solutions':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brainstorm: Think of all possible solutions
              </label>
              {solution.solutions.map((sol, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={sol}
                    onChange={(e) => updateItem('solutions', index, e.target.value)}
                    placeholder={`Solution ${index + 1}...`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {solution.solutions.length > 1 && (
                    <button
                      onClick={() => removeItem('solutions', index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem('solutions')}
                className="text-orange-500 hover:text-orange-700 text-sm font-medium"
              >
                + Add more solutions
              </button>
            </div>
            <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              💡 Don't limit yourself! This stage is about thinking of all possibilities, even if they seem a bit crazy.
            </div>
          </div>
        );

      case 'action':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose the best solution and create specific action steps:
              </label>
              {solution.actionPlan.map((step, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center mt-1">
                    {index + 1}
                  </span>
                  <input
                    value={step}
                    onChange={(e) => updateItem('actionPlan', index, e.target.value)}
                    placeholder={`Step ${index + 1}...`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {solution.actionPlan.length > 1 && (
                    <button
                      onClick={() => removeItem('actionPlan', index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem('actionPlan')}
                className="text-orange-500 hover:text-orange-700 text-sm font-medium"
              >
                + Add step
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's the most important next action?
              </label>
              <input
                value={solution.nextSteps}
                onChange={(e) => updateSolution('nextSteps', e.target.value)}
                placeholder="The first thing I need to do tomorrow is..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">🎯 Your Solution</h4>

              <div className="mb-3">
                <strong className="text-gray-700">Problem:</strong>
                <p className="text-gray-600 mt-1">{solution.problem}</p>
              </div>

              <div className="mb-3">
                <strong className="text-gray-700">Goals:</strong>
                <ul className="text-gray-600 mt-1 list-disc list-inside">
                  {solution.goals.filter(g => g.trim()).map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <strong className="text-gray-700">Action Plan:</strong>
                <ol className="text-gray-600 mt-1 list-decimal list-inside">
                  {solution.actionPlan.filter(s => s.trim()).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {solution.nextSteps && (
                <div className="mb-3">
                  <strong className="text-gray-700">Next Action:</strong>
                  <p className="text-gray-600 mt-1">{solution.nextSteps}</p>
                </div>
              )}
            </div>

            <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
              🦊 Zara says: Excellent! You've broken down a complex problem into actionable steps. Remember, success is achieved one step at a time!
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/95 rounded-xl shadow-lg border border-orange-200 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-orange-100">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Smart Solution</h3>
          <p className="text-sm text-gray-600">Zara's Problem-Solving Framework</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-orange-100">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === step.key
                    ? 'bg-orange-500 text-white'
                    : currentStepIndex > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStepIndex > index ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStepIndex > index ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2">
          <h4 className="font-medium text-gray-800">{currentStepInfo.title}</h4>
          <p className="text-sm text-gray-600">{currentStepInfo.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">{renderStepContent()}</div>

      {/* Navigation */}
      <div className="flex justify-between p-6 border-t border-orange-100">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <div className="flex gap-2">
          {currentStep !== 'summary' ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <CheckCircle size={16} />
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}