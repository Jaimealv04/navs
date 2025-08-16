import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Award } from 'lucide-react';
import { surveyQuestions, type QuestionOption } from '../data/surveyQuestions';

interface SurveyFormProps {
  onBack: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;
  const currentQ = surveyQuestions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-white rounded-full mx-auto mb-8 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Check className="w-10 h-10 text-black" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-light mb-6 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experiencia Creada
          </motion.h1>

          <motion.p
            className="text-xl text-white/70 mb-12 font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Te contactaremos pronto para coordinar tu visita
          </motion.p>

          <motion.button
            onClick={onBack}
            className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Volver al inicio
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={onBack}
              className="flex items-center text-white/70 hover:text-white transition-colors"
              whileHover={{ x: -2 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Volver
            </motion.button>

            <motion.div
              className="text-white/70 text-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentQuestion + 1} / {surveyQuestions.length}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-px mb-16">
            <motion.div
              className="bg-white h-px rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-light mb-16 text-center leading-tight tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {currentQ.question}
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                {currentQ.options.map((option: QuestionOption, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                      selectedAnswer === option.value
                        ? 'border-white bg-white/5'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-medium">
                        {option.label}
                      </h3>
                      {selectedAnswer === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-black" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {option.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <motion.div
                className="flex justify-between items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    currentQuestion === 0
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white/70 hover:text-white border border-white/20 hover:border-white/40'
                  }`}
                  whileHover={currentQuestion > 0 ? { x: -2 } : {}}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Anterior
                </motion.button>

                <motion.button
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedAnswer
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/20 text-white/50 cursor-not-allowed'
                  }`}
                  whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                >
                  {currentQuestion === surveyQuestions.length - 1 ? (
                    <>
                      Finalizar
                      <Award className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
