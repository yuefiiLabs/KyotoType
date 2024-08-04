import { ChangeEvent, useEffect, useState } from "react";
import { motion } from 'framer-motion';

export default function Home() {
  const sampleTexts = [
    "Ini adalah teks sampel untuk mengetes kecepatan mengetik Anda.",
    "Sebuah tes typing untuk mengukur seberapa cepat dan akurat Anda mengetik.",
    "Pastikan untuk membaca teks dengan cermat dan mengetikkan dengan tepat.",
    "Berlatih mengetik dengan teks yang berbeda dapat meningkatkan keterampilan mengetik Anda.",
    "Teks ini dirancang untuk memberikan tantangan dan meningkatkan kecepatan mengetik Anda."
  ];

  const [text, setText] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>('');
  const [showText, setShowText] = useState<boolean>(false);

  const getRandomSampleText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && !isFinished) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive || isFinished) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isFinished]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);

    if (!isActive) {
      setIsActive(true);
    }

    if (value === currentText) {
      setIsFinished(true);
      setIsActive(false);
    }
  };

  const handleStart = () => {
    setCurrentText(getRandomSampleText());
    setText('');
    setTime(0);
    setIsActive(true);
    setIsFinished(false);
    setShowText(true);
  };

  const handleRestart = () => {
    handleStart();
  };

  const calculateWPM = (): number => {
    const words = text.split(' ').length;
    const minutes = time / 60;
    return Math.round(words / minutes);
  };

  const getStyledSampleText = () => {
    if (!showText) return '';

    return currentText.split('').map((char, index) => {
      let colorClass = 'text-black font-medium text-lg';
      if (text[index] === char) {
        colorClass = 'text-teal-500';
      } else if (text[index] !== undefined) {
        colorClass = 'text-red-500';
      }

      return (
        <motion.span
          key={index}
          className={colorClass}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: text[index] === char ? 1 : 0.5, y: text[index] === char ? 0 : 10 }}
          transition={{ duration: 0.3, delay: index * 0.01 }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div className="p-6 mt-10 border rounded-md max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Typing Test</h1>
      {!showText ? (
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
          >
            Mulai Sekarang
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 whitespace-pre-wrap text-xl border p-4 rounded bg-gray-100">
            {getStyledSampleText()}
          </div>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Mulai mengetik di sini..."
            disabled={isFinished}
            className="w-full h-40 p-2 border border-gray-300 rounded resize-none"
          />
          {isFinished && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold mb-2">Hasil Tes</h2>
              <p className="text-lg">Kecepatan Mengetik: {calculateWPM()} WPM</p>
              <p className="text-lg">Waktu: {time} detik</p>
              <button
                onClick={handleRestart}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-all"
              >
                Mulai Lagi
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
