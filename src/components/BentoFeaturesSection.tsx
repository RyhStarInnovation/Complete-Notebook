import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Delete } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { MEDIA_REGISTRY } from '../assets/mediaRegistry';
import { MediaFrame } from './MediaFrame';
import { EASE_OUT_EXPO, FloatingShowcase, RevealInView } from './motionPrimitives';

export function BentoFeaturesSection() {
  const { t } = useLanguage();
  const [selectedUtilityIndex, setSelectedUtilityIndex] = useState(0);

  // Interactive states inside the live utility preview (labels come live from active language)
  const [doneMap, setDoneMap] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
  });
  const [calcDisplay, setCalcDisplay] = useState('1250000');
  const [calcAccumulator, setCalcAccumulator] = useState<number | null>(null);
  const [calcOperator, setCalcOperator] = useState<string | null>(null);
  const [calcFresh, setCalcFresh] = useState(true);

  const activeUtility = t.utilities.items[selectedUtilityIndex] ?? t.utilities.items[0];

  const handleToggleTodo = (index: number) => {
    setDoneMap((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCalcDigit = (digit: string) => {
    if (calcFresh) {
      setCalcDisplay(digit);
      setCalcFresh(false);
    } else {
      setCalcDisplay((prev) => (prev === '0' ? digit : (prev + digit).slice(0, 12)));
    }
  };

  const handleCalcOp = (op: string) => {
    setCalcAccumulator(Number(calcDisplay) || 0);
    setCalcOperator(op);
    setCalcFresh(true);
  };

  const handleCalcEquals = () => {
    if (calcAccumulator === null || !calcOperator) return;
    const current = Number(calcDisplay) || 0;
    let result = current;
    if (calcOperator === '+') result = calcAccumulator + current;
    if (calcOperator === '-') result = calcAccumulator - current;
    if (calcOperator === '×') result = calcAccumulator * current;
    if (calcOperator === '÷') result = current !== 0 ? Math.round((calcAccumulator / current) * 100) / 100 : 0;
    setCalcDisplay(String(result));
    setCalcAccumulator(null);
    setCalcOperator(null);
    setCalcFresh(true);
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcAccumulator(null);
    setCalcOperator(null);
    setCalcFresh(true);
  };

  return (
    <>
      {/* Section 01: Asymmetric Bento Grid of Flagship Highlights */}
      <section
        id="features"
        className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealInView className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
              {t.bento.sectionNumber}
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.bento.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.bento.subheading}
            </p>
          </RevealInView>

          {/* Asymmetric Bento Grid with Official App Screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Marquee Card 1: Versatile Notebook, Custom Canvas & Offline/Online OCR (col-span-6) */}
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="group lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1527] overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.bento.smartNotesMeta}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {t.bento.smartNotesTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.bento.smartNotesDesc}
                </p>
              </div>
              <div className="bg-slate-50/70 dark:bg-[#081020]/70 border-t border-slate-200 dark:border-slate-800/80 p-4 sm:p-5 flex justify-center">
                <FloatingShowcase amplitude={6} duration={5.6} className="w-full">
                  <MediaFrame
                    src={MEDIA_REGISTRY.versatileNotebookScreen}
                    alt={t.bento.smartNotesTitle}
                    className="h-80 sm:h-96 w-full bg-transparent"
                    imgClassName="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(2,8,23,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </FloatingShowcase>
              </div>
            </motion.article>

            {/* Marquee Card 2: Achieve Financial Goals – Savings & Expenses (col-span-6) */}
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: 0.07, ease: EASE_OUT_EXPO }}
              className="group lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1527] overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.bento.financeMeta}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {t.bento.financeTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.bento.financeDesc}
                </p>
              </div>
              <div className="bg-slate-50/70 dark:bg-[#081020]/70 border-t border-slate-200 dark:border-slate-800/80 p-4 sm:p-5 flex justify-center">
                <FloatingShowcase amplitude={6} duration={6.1} delay={0.4} className="w-full">
                  <MediaFrame
                    src={MEDIA_REGISTRY.financialGoalsScreen}
                    alt={t.bento.financeTitle}
                    className="h-80 sm:h-96 w-full bg-transparent"
                    imgClassName="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(2,8,23,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </FloatingShowcase>
              </div>
            </motion.article>

            {/* Secondary Asymmetric Row: Plans/Calendar/Reminders Graphic + Core Capabilities */}
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="group lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1527] overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-3">
                <p className="text-xs font-mono text-blue-600 dark:text-sky-400">03</p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {t.bento.agendaAlarmTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.bento.agendaAlarmDesc}
                </p>
              </div>
              <div className="bg-slate-50/70 dark:bg-[#081020]/70 border-t border-slate-200 dark:border-slate-800/80 p-4 flex justify-center">
                <FloatingShowcase amplitude={5} duration={5.8} delay={0.2} className="w-full">
                  <MediaFrame
                    src={MEDIA_REGISTRY.plansCalendarScreen}
                    alt={t.bento.agendaAlarmTitle}
                    className="h-72 sm:h-80 w-full bg-transparent"
                    imgClassName="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(2,8,23,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </FloatingShowcase>
              </div>
            </motion.article>

            <div className="lg:col-span-7 grid grid-cols-1 gap-6">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: 0.05, ease: EASE_OUT_EXPO }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1527] p-6 sm:p-7 space-y-3"
              >
                <p className="text-xs font-mono text-blue-600 dark:text-sky-400">04</p>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {t.bento.cnotExportTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.bento.cnotExportDesc}
                </p>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0D1527] p-6 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <p className="text-xs font-mono text-blue-600 dark:text-sky-400">05</p>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {t.bento.calculatorTitle} & {t.bento.globalLocTitle}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.bento.calculatorDesc} {t.bento.globalLocDesc}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                  EN · ID · ES · FR · JA · AR · RU · KO +
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Interactive Deep-Dive into the 7 Core Utilities */}
      <section
        id="utilities"
        className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#080F1E]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealInView className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-sky-400">
              {t.utilities.sectionNumber}
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.24] font-bold tracking-tight text-slate-950 dark:text-white text-balance">
              {t.utilities.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.utilities.subheading}
            </p>
          </RevealInView>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selector List: 7 Core Utilities */}
            <div className="lg:col-span-5 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] overflow-hidden">
              {t.utilities.items.map((item, idx) => {
                const isSelected = idx === selectedUtilityIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedUtilityIndex(idx)}
                    className={`w-full text-start p-5 transition-colors duration-150 cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-[#152342]'
                        : 'hover:bg-slate-50 dark:hover:bg-[#111C35]'
                    }`}
                  >
                    <div className="space-y-1">
                      <p
                        className={`font-display text-sm sm:text-base font-bold ${
                          isSelected
                            ? 'text-blue-700 dark:text-sky-300'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <span className="font-mono text-xs me-2 opacity-75">
                          0{idx + 1}.
                        </span>
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                        {item.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detail & Interactive Workspace Preview */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] p-6 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUtility.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
                      {t.utilities.modulePrefix} 0{selectedUtilityIndex + 1} / 07 · COMPLETE NOTEBOOK
                    </p>
                    <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-950 dark:text-white">
                      {activeUtility.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeUtility.detail}
                    </p>
                  </div>

                  {/* Clean Unboxed Capability Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                    {activeUtility.highlights.map((point, index) => (
                      <div key={point} className="space-y-1">
                        <p className="font-mono text-xs text-slate-400 tabular-nums">
                          0{index + 1}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

              {/* Contextual Interactive Workspace Preview Widget */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                {activeUtility.id === 'calculator' ? (
                  <div className="space-y-3 max-w-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.utilities.preview.calcTitle}</span>
                      <span className="font-mono tabular-nums">
                        {calcAccumulator !== null && calcOperator
                          ? `${calcAccumulator.toLocaleString()} ${calcOperator}`
                          : t.utilities.preview.calcOfflineReady}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#070D19] border border-slate-200 dark:border-slate-800 text-end font-mono text-xl font-semibold text-slate-900 dark:text-sky-300 tabular-nums">
                      {Number(calcDisplay).toLocaleString()}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'].map(
                        (key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              if (key === 'C') handleCalcClear();
                              else if (key === '=') handleCalcEquals();
                              else if (['+', '-', '×', '÷'].includes(key)) handleCalcOp(key);
                              else handleCalcDigit(key);
                            }}
                            className={`h-10 rounded-lg font-mono text-sm font-semibold transition-colors cursor-pointer ${
                              key === '='
                                ? 'bg-blue-600 dark:bg-sky-500 text-white dark:text-slate-950'
                                : ['+', '-', '×', '÷', 'C'].includes(key)
                                ? 'bg-slate-200 dark:bg-[#162447] text-slate-900 dark:text-sky-300'
                                : 'bg-slate-100 dark:bg-[#091122] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#13203B]'
                            }`}
                          >
                            {key === 'C' ? <Delete className="w-4 h-4 mx-auto" /> : key}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : activeUtility.id === 'finance' ? (
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Interactive SVG Cash-Flow Pie Chart Representation */}
                    <svg
                      viewBox="0 0 36 36"
                      className="w-28 h-28 shrink-0 -rotate-90"
                      aria-label="Savings and Expense Pie Chart"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4.2"
                        className="text-slate-200 dark:text-slate-800"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4.2"
                        strokeDasharray="62 38"
                        strokeDashoffset="0"
                        className="text-blue-600 dark:text-sky-400"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="4.2"
                        strokeDasharray="24 76"
                        strokeDashoffset="-62"
                        className="text-indigo-500 dark:text-blue-500"
                      />
                    </svg>
                    <div className="space-y-2 text-sm w-full">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                        <span className="text-slate-600 dark:text-slate-300">
                          {t.utilities.preview.financeSavingsLabel}
                        </span>
                        <span className="font-mono font-semibold text-blue-600 dark:text-sky-400 tabular-nums">
                          62%
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                        <span className="text-slate-600 dark:text-slate-300">
                          {t.utilities.preview.financeBudgetLabel}
                        </span>
                        <span className="font-mono font-semibold text-indigo-600 dark:text-blue-400 tabular-nums">
                          24%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-300">
                          {t.utilities.preview.financeBufferLabel}
                        </span>
                        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                          14%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.utilities.preview.todoHeader}
                    </p>
                    <div className="space-y-2">
                      {t.utilities.preview.todoItems.map((label, idx) => {
                        const isDone = Boolean(doneMap[idx]);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleToggleTodo(idx)}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#081020] text-start text-sm transition-colors hover:border-blue-500/40 dark:hover:border-sky-400/40 cursor-pointer"
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                isDone
                                  ? 'bg-blue-600 dark:bg-sky-400 border-blue-600 dark:border-sky-400 text-white dark:text-slate-950'
                                  : 'border-slate-400 dark:border-slate-600'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3" />}
                            </span>
                            <span
                              className={
                                isDone
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-800 dark:text-slate-200'
                              }
                            >
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
