import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/cseiith2.jpg';

export default function Home() {
  const navigate = useNavigate();
  const ctaButtons = [
    { to: '/dashboard', label: 'Go to Dashboard' },
    { to: '/leave', label: 'Add Leave' },
    { to: '/create-task', label: 'Create Task' }
  ];

  const floatingCircles = [
    { size: 400, top: '10%', left: '5%', xRange: 30, yRange: 20, delay: 0 },
    { size: 300, top: '70%', left: '85%', xRange: -40, yRange: 25, delay: 2 },
    { size: 300, top: '50%', left: '30%', xRange: 20, yRange: -30, delay: 1 }
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Ken Burns background */}
      <div
        className="absolute inset-0 bg-cover bg-center adapt-zoom"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Animated floating spheres */}
      {floatingCircles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-600 opacity-30"
          style={{ width: c.size, height: c.size, top: c.top, left: c.left }}
          animate={{ x: [0, c.xRange, 0], y: [0, c.yRange, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: c.delay
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to Admin Module
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Manage tasks, assign responsibilities, and handle staff leave details — all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}
        >
          {ctaButtons.map((btn, idx) => (
            <motion.button
              key={btn.to}
              onClick={() => navigate(btn.to)}
              className="px-6 py-3 rounded-lg font-semibold bg-orange-500 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {btn.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
