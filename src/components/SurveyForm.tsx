import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Star, Award } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15),transparent_50%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div
          className="max-w-4xl text-center relative z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-slate-900/80 backdrop-blur-xl rounded-full border border-indigo-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur animate-pulse"></div>
              <Check className="w-16 h-16 text-indigo-400 relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experiencia Personalizada
          </motion.h1>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl text-slate-200 leading-relaxed font-light">
              Tu perfil de sabores ha sido creado exitosamente
            </p>
            <div className="flex items-center justify-center gap-3 text-lg text-indigo-300">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span className="font-medium">Preparando tu experiencia única</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-12 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            whileHover={{ borderColor: 'rgba(79, 70, 229, 0.5)' }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
              <h3 className="text-xl font-semibold text-white">Próximos Pasos</h3>
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            </div>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-3 flex-shrink-0"></div>
                <p>Nuestro equipo revisará tus preferencias personalizadas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                <p>Te contactaremos en 24 horas con tu menú de degustación</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-3 flex-shrink-0"></div>
                <p>Coordinaremos horarios disponibles para tu experiencia</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              onClick={onBack}
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300">
                Volver al Inicio
              </div>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-slate-800/60 hover:bg-slate-700/70 rounded-2xl border-2 border-slate-600 hover:border-indigo-500/50 transition-all duration-300 font-semibold text-slate-200 hover:text-white backdrop-blur-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar Ahora
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,85,99,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.2),transparent_50%)]" />

        {/* Animated background elements */}
        <motion.div
          animate={{
            y: [-30, -80, -30],
            x: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [30, -50, 30],
            x: [10, -10, 10],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-slate-600/10 to-gray-600/10 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={onBack}
              className="flex items-center text-slate-300 hover:text-white transition-colors text-lg font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50"
              whileHover={{ x: -5, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              Volver
            </motion.button>

            <motion.div
              className="flex items-center gap-3 text-lg text-slate-300 bg-slate-800/60 backdrop-blur-xl rounded-full px-6 py-3 border border-slate-600/50"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span className="font-medium">{currentQuestion + 1} de {surveyQuestions.length}</span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-700/50 rounded-full h-2 mb-12 backdrop-blur-sm border border-slate-600/30">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-indigo-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="relative z-10 px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center leading-tight max-w-4xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {currentQ.question}
                </span>
              </motion.h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto">
                {currentQ.options.map((option: QuestionOption, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`group relative p-8 lg:p-10 rounded-3xl border-2 text-left transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                      selectedAnswer === option.value
                        ? 'border-indigo-400/50 bg-slate-800/60 shadow-2xl shadow-indigo-500/20'
                        : 'border-slate-600/50 bg-slate-900/40 hover:border-slate-500 hover:bg-slate-800/50'
                    }`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    {/* Selection indicator */}
                    {selectedAnswer === option.value && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-xl lg:text-2xl font-bold transition-colors ${
                          selectedAnswer === option.value
                            ? 'text-white'
                            : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {option.label}
                        </h3>

                        {selectedAnswer === option.value && (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                            className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      <p className={`text-base lg:text-lg leading-relaxed transition-colors ${
                        selectedAnswer === option.value
                          ? 'text-slate-200'
                          : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {option.description}
                      </p>

                      {/* Selection indicator line */}
                      <div className={`mt-6 h-1 w-full rounded-full transition-all duration-500 ${
                        selectedAnswer === option.value
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30'
                          : 'bg-slate-600/50 group-hover:bg-slate-500/70'
                      }`} />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-8 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg backdrop-blur-xl ${
                    currentQuestion === 0
                      ? 'text-slate-600 cursor-not-allowed bg-slate-800/30 border border-slate-700/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60 bg-slate-800/50 border border-slate-600/50 hover:border-slate-500'
                  }`}
                  whileHover={currentQuestion > 0 ? { x: -5, scale: 1.02 } : {}}
                  whileTap={currentQuestion > 0 ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft className="w-6 h-6 mr-2" />
                  Anterior
                </motion.button>

                <motion.button
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className={`group relative overflow-hidden flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-lg ${
                    selectedAnswer
                      ? 'text-white border-2 border-transparent'
                      : 'bg-slate-700/50 text-slate-500 cursor-not-allowed border-2 border-slate-600/50'
                  }`}
                  whileHover={selectedAnswer ? { x: 5, scale: 1.02 } : {}}
                  whileTap={selectedAnswer ? { scale: 0.95 } : {}}
                >
                  {selectedAnswer && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 rounded-2xl transition-all duration-300"></div>
                    </>
                  )}
                  <span className="relative z-10">
                    {currentQuestion === surveyQuestions.length - 1 ? (
                      <>
                        Crear Experiencia
                        <Award className="w-6 h-6 ml-2" />
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ChevronRight className="w-6 h-6 ml-2" />
                      </>
                    )}
                  </span>
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
