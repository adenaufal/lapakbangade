import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Lock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RateVolatilityAlertProps {
  currentRate: number;
  rateSource: 'api' | 'fallback';
}

const CURRENT_RATE_STORAGE_KEY = 'lapakbangade_rate_current';
const PREVIOUS_RATE_STORAGE_KEY = 'lapakbangade_rate_previous';

const parseStoredRate = (value: string | null): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const RateVolatilityAlert: React.FC<RateVolatilityAlertProps> = ({
  currentRate,
  rateSource,
}) => {
  const [previousRate, setPreviousRate] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Only capture real API rates, never fallback placeholders.
    if (rateSource !== 'api' || !Number.isFinite(currentRate) || currentRate <= 0) {
      return;
    }

    const lastCapturedRate = parseStoredRate(localStorage.getItem(CURRENT_RATE_STORAGE_KEY));

    if (lastCapturedRate !== null && lastCapturedRate !== currentRate) {
      setPreviousRate(lastCapturedRate);
      setShowAlert(true);
      localStorage.setItem(PREVIOUS_RATE_STORAGE_KEY, lastCapturedRate.toString());
    } else {
      setPreviousRate(null);
    }

    localStorage.setItem(CURRENT_RATE_STORAGE_KEY, currentRate.toString());
  }, [currentRate, rateSource]);

  if (!previousRate || !showAlert) {
    return null;
  }

  const rateDifference = currentRate - previousRate;
  const percentageChange = (rateDifference / previousRate) * 100;
  const isIncrease = rateDifference > 0;
  const isSignificantChange = Math.abs(percentageChange) >= 0.5;

  if (!isSignificantChange) {
    return null;
  }

  const alertConfig = isIncrease
    ? {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        icon: <TrendingUp size={24} />,
        title: 'Rate Naik!',
        message: `Rate naik Rp ${Math.abs(rateDifference).toFixed(0)} dari rate terakhir (${percentageChange.toFixed(2)}%)`,
        actionText: 'Lock Rate Sekarang',
        recommendation:
          'Rate sekarang lebih tinggi dari rate sebelumnya. Cocok untuk convert biar Rupiah diterima lebih besar.',
      }
    : {
        bg: 'bg-gradient-to-r from-red-500 to-orange-500',
        icon: <TrendingDown size={24} />,
        title: 'Rate Turun!',
        message: `Rate turun Rp ${Math.abs(rateDifference).toFixed(0)} dari rate terakhir (${Math.abs(percentageChange).toFixed(2)}%)`,
        actionText: 'Pantau Rate Lagi',
        recommendation:
          'Rate sekarang lebih rendah dari rate sebelumnya. Kamu bisa tunggu sampai rate naik lagi.',
      };

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className={`${alertConfig.bg} rounded-xl p-6 text-white shadow-xl relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mt-32 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-2xl -mr-24 -mb-24 animate-pulse delay-75"></div>
            </div>

            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span className="text-lg leading-none">x</span>
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  {alertConfig.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black flex items-center gap-2">{alertConfig.title}</h3>
                  <p className="text-sm opacity-90">{alertConfig.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                  <p className="text-xs opacity-70 mb-1">Rate Sebelumnya</p>
                  <p className="text-2xl font-bold">Rp {previousRate.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4">
                  <p className="text-xs opacity-70 mb-1">Rate Sekarang</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">Rp {currentRate.toLocaleString()}</p>
                    <span
                      className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                        isIncrease ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {isIncrease ? '+' : '-'} {Math.abs(percentageChange).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-4">
                <p className="text-sm flex items-start gap-2">
                  {isIncrease ? (
                    <Zap size={16} className="flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  )}
                  <span className="opacity-90">{alertConfig.recommendation}</span>
                </p>
              </div>

              {isIncrease && (
                <a
                  href="#calculator"
                  className="block w-full bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Lock size={18} />
                  {alertConfig.actionText}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
