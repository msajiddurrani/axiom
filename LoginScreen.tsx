/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2, Lock, Mail, Eye, EyeOff, Terminal, ArrowRight, User } from 'lucide-react';

// SVG Paths capturing the organic droplet "A-X-I-O-M" visual with fluid curves
const letterA = [
  { d: "M 150 40 C 158 40, 160 45, 153 47 C 146 49, 142 45, 142 42 C 142 40, 145 40, 150 40 Z", delay: 0.05 },
  { d: "M 132 56 C 158 56, 166 61, 160 63 C 150 65, 128 65, 124 61 C 122 58, 126 56, 132 56 Z", delay: 0.10 },
  { d: "M 152 72 C 122 72, 114 77, 118 79 C 124 81, 158 81, 162 77 C 164 74, 158 72, 152 72 Z", delay: 0.15 },
  { d: "M 112 88 C 144 88, 180 94, 172 97 C 160 100, 108 102, 104 96 C 102 92, 106 88, 112 88 Z", delay: 0.20 },
  { d: "M 148 104 C 102 104, 94 111, 98 114 C 104 117, 170 117, 176 111 C 180 107, 168 104, 148 104 Z", delay: 0.25 },
  { d: "M 96 120 C 142 120, 158 128, 148 131 C 136 134, 82 133, 82 127 C 82 122, 88 120, 96 120 Z", delay: 0.30 },
  { d: "M 78 138 C 102 138, 106 145, 98 147 C 90 149, 66 148, 66 143 C 66 139, 72 138, 78 138 Z", delay: 0.35 },
  { d: "M 154 138 C 134 138, 130 145, 138 147 C 146 149, 166 148, 166 143 C 166 139, 160 138, 154 138 Z", delay: 0.38 }
];

const letterX = [
  { d: "M 254 44 C 274 44, 282 50, 274 53 C 264 56, 246 52, 246 48 C 246 45, 250 44, 254 44 Z", delay: 0.12 },
  { d: "M 316 44 C 296 44, 288 50, 296 53 C 306 56, 324 52, 324 48 C 324 45, 320 44, 316 44 Z", delay: 0.15 },
  { d: "M 262 62 C 286 62, 292 70, 280 73 C 268 76, 252 70, 252 65 C 252 62, 256 62, 262 62 Z", delay: 0.20 },
  { d: "M 308 62 C 284 62, 278 70, 290 73 C 302 76, 318 70, 318 65 C 318 62, 314 62, 308 62 Z", delay: 0.23 },
  { d: "M 272 80 C 294 80, 298 88, 286 91 C 274 94, 262 88, 262 84 C 262 81, 266 80, 272 80 Z", delay: 0.28 },
  { d: "M 298 80 C 276 80, 272 88, 284 91 C 296 94, 308 88, 308 84 C 308 81, 304 80, 298 80 Z", delay: 0.31 },
  { d: "M 262 98 C 286 98, 292 106, 280 109 C 268 112, 252 106, 252 101 C 252 98, 256 98, 262 98 Z", delay: 0.36 },
  { d: "M 308 98 C 284 98, 278 106, 290 109 C 302 112, 318 106, 318 101 C 318 98, 314 98, 308 98 Z", delay: 0.39 },
  { d: "M 254 116 C 274 116, 282 123, 274 126 C 264 129, 246 124, 246 120 C 246 117, 250 116, 254 116 Z", delay: 0.44 },
  { d: "M 316 116 C 296 116, 288 123, 296 126 C 306 129, 324 124, 324 120 C 324 117, 320 116, 316 116 Z", delay: 0.47 },
  { d: "M 242 134 C 262 134, 268 142, 258 145 C 248 148, 232 142, 232 137 C 232 134, 236 134, 242 134 Z", delay: 0.52 },
  { d: "M 328 134 C 308 134, 302 142, 312 145 C 322 148, 338 142, 338 137 C 338 134, 334 134, 328 134 Z", delay: 0.55 }
];

const letterI = [
  { d: "M 404 44 C 420 44, 422 49, 412 51 C 402 53, 396 49, 396 46 C 396 44, 400 44, 404 44 Z", delay: 0.18 },
  { d: "M 412 60 C 396 60, 394 65, 402 67 C 411 69, 418 65, 418 62 C 418 60, 415 60, 412 60 Z", delay: 0.22 },
  { d: "M 404 76 C 420 76, 422 81, 412 83 C 402 85, 396 81, 396 78 C 396 76, 400 76, 404 76 Z", delay: 0.26 },
  { d: "M 412 92 C 396 92, 394 97, 402 99 C 411 101, 418 97, 418 94 C 418 92, 415 92, 412 92 Z", delay: 0.30 },
  { d: "M 404 108 C 420 108, 422 113, 412 115 C 402 117, 396 113, 396 110 C 396 108, 400 108, 404 108 Z", delay: 0.34 },
  { d: "M 412 124 C 396 124, 394 129, 402 131 C 411 133, 418 129, 418 126 C 418 124, 415 124, 412 124 Z", delay: 0.38 },
  { d: "M 404 140 C 420 140, 422 145, 412 147 C 402 149, 396 145, 396 142 C 396 140, 400 140, 404 140 Z", delay: 0.42 }
];

const letterO = [
  { d: "M 490 44 C 504 44, 508 49, 494 51 C 480 53, 476 49, 476 46 C 476 44, 483 44, 490 44 Z", delay: 0.22 },
  { d: "M 472 60 C 512 60, 521 67, 507 70 C 492 73, 460 73, 460 66 C 460 61, 465 60, 472 60 Z", delay: 0.26 },
  { d: "M 458 80 C 522 80, 531 89, 515 92 C 499 95, 449 95, 449 86 C 449 81, 453 80, 458 80 Z", delay: 0.30 },
  { d: "M 453 100 C 527 100, 536 109, 520 112 C 504 115, 444 115, 444 106 C 444 101, 448 100, 453 100 Z", delay: 0.34 },
  { d: "M 458 120 C 522 120, 531 129, 515 132 C 499 135, 449 135, 449 126 C 449 121, 453 120, 458 120 Z", delay: 0.38 },
  { d: "M 472 140 C 512 140, 521 147, 507 150 C 492 153, 460 153, 460 146 C 460 141, 465 140, 472 140 Z", delay: 0.42 },
  { d: "M 490 156 C 504 156, 508 161, 494 163 C 480 165, 476 161, 476 158 C 476 156, 483 156, 490 156 Z", delay: 0.46 }
];

const letterM = [
  { d: "M 602 44 C 612 44, 617 49, 610 52 C 603 55, 593 51, 593 47 C 593 44, 596 44, 602 44 Z", delay: 0.28 },
  { d: "M 700 44 C 710 44, 715 49, 708 52 C 701 55, 691 51, 691 47 C 691 44, 694 44, 700 44 Z", delay: 0.30 },
  { d: "M 597 60 C 623 60, 642 69, 651 69 C 660 69, 679 60, 705 60 C 714 60, 718 65, 709 68 C 690 73, 671 80, 651 80 C 631 80, 612 73, 593 68 C 585 65, 588 60, 597 60 Z", delay: 0.35 },
  { d: "M 593 78 C 625 78, 644 89, 651 89 C 658 89, 677 78, 709 78 C 719 78, 723 83, 712 86 C 691 91, 671 100, 651 100 C 631 100, 610 91, 589 86 C 579 83, 582 78, 593 78 Z", delay: 0.39 },
  { d: "M 590 98 C 627 98, 646 111, 651 111 C 656 111, 675 98, 712 98 C 724 98, 728 105, 716 108 C 693 115, 670 124, 651 124 C 632 124, 609 115, 586 108 C 574 105, 578 98, 590 98 Z", delay: 0.43 },
  { d: "M 593 118 C 625 118, 644 129, 651 129 C 658 129, 677 118, 709 118 C 719 118, 723 123, 712 126 C 691 131, 671 140, 651 140 C 631 140, 610 131, 589 126 C 579 123, 582 118, 593 118 Z", delay: 0.47 },
  { d: "M 597 138 C 623 138, 642 147, 651 147 C 660 147, 679 138, 705 138 C 714 138, 718 143, 709 146 C 690 151, 671 158, 651 158 C 631 158, 612 151, 593 146 C 585 143, 588 138, 597 138 Z", delay: 0.51 },
  { d: "M 602 154 C 612 154, 617 159, 610 162 C 603 165, 593 161, 593 157 C 593 154, 596 154, 602 154 Z M 700 154 C 710 154, 715 159, 708 162 C 701 165, 691 161, 691 157 C 691 154, 694 154, 700 154 Z", delay: 0.55 }
];

interface LoginScreenProps {
  onLoginSuccess: (email: string, username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('sajiddurrani987@gmail.com');
  const [username, setUsername] = useState('sajiddurrani987');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormMode, setIsFormMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your workspace identity address.');
      return;
    }
    if (!username.trim()) {
      setErrorMessage('Please enter your custom username.');
      return;
    }
    
    // Call success
    onLoginSuccess(email, username);
  };

  const handleGithubClick = () => {
    // Quick frictionless bypass - sign in immediately using their email!
    const finalUsername = username.trim() || email.split('@')[0] || 'sajiddurrani987';
    onLoginSuccess(email || 'sajiddurrani987@gmail.com', finalUsername);
  };

  return (
    <div id="login-container" className="h-screen w-full bg-black text-white flex flex-col lg:flex-row overflow-hidden relative font-sans antialiased select-none">
      
      {/* ==================== LEFT PANEL: BREATHTAKING TYPOGRAPHICAL SECTION ==================== */}
      <div id="login-marketing-panel" className="relative hidden lg:flex w-full lg:w-1/2 flex-col justify-between p-16 xl:p-24 select-none bg-[#030303] h-full overflow-hidden text-left border-r border-white/[0.03]">
        
        {/* Subtle decorative mesh grid to feel premium and tech-centric */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Massive Watermark Icon in bottom-right corner, stylized backplate of client nodes */}
        <div className="absolute -bottom-16 -right-16 w-[450px] h-[450px] opacity-[0.025] pointer-events-none z-0">
          <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>



        {/* Centered Typography layout - replaced with the iconic droplet AXIOM wordmark exactly as in the second screenshot */}
        <div className="my-auto w-full max-w-lg z-10 flex flex-col items-center justify-center py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-auto flex items-center justify-center filter drop-shadow-[0_8px_32px_rgba(255,255,255,0.06)]"
          >
            <svg 
              viewBox="0 0 800 200" 
              fill="none" 
              className="w-full h-auto text-white select-none"
              style={{ contentVisibility: 'auto' }}
            >
              {/* AXIOM SVG Letters containing individual biological droplet tracks shifted for mathematically perfect, equal 52-unit spacing */}
              <g id="letter-A" transform="translate(0, 0)">
                {letterA.map((cell, idx) => (
                  <motion.path
                    key={`a-${idx}`}
                    d={cell.d}
                    fill="currentColor"
                    initial={{ opacity: 0, scaleY: 0.6, y: 4 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1, 
                      y: 0,
                      transition: { 
                        delay: cell.delay, 
                        duration: 0.65, 
                        ease: [0.215, 0.610, 0.355, 1.000] 
                      } 
                    }}
                  />
                ))}
              </g>

              <g id="letter-X" transform="translate(-4, 0)">
                {letterX.map((cell, idx) => (
                  <motion.path
                    key={`x-${idx}`}
                    d={cell.d}
                    fill="currentColor"
                    initial={{ opacity: 0, scaleY: 0.6, y: 4 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1, 
                      y: 0,
                      transition: { 
                        delay: cell.delay, 
                        duration: 0.65, 
                        ease: [0.215, 0.610, 0.355, 1.000] 
                      } 
                    }}
                  />
                ))}
              </g>

              <g id="letter-I" transform="translate(-10, 0)">
                {letterI.map((cell, idx) => (
                  <motion.path
                    key={`i-${idx}`}
                    d={cell.d}
                    fill="currentColor"
                    initial={{ opacity: 0, scaleY: 0.6, y: 4 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1, 
                      y: 0,
                      transition: { 
                        delay: cell.delay, 
                        duration: 0.65, 
                        ease: [0.215, 0.610, 0.355, 1.000] 
                      } 
                    }}
                  />
                ))}
              </g>

              <g id="letter-O" transform="translate(16, 0)">
                {letterO.map((cell, idx) => (
                  <motion.path
                    key={`o-${idx}`}
                    d={cell.d}
                    fill="currentColor"
                    initial={{ opacity: 0, scaleY: 0.6, y: 4 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1, 
                      y: 0,
                      transition: { 
                        delay: cell.delay, 
                        duration: 0.65, 
                        ease: [0.215, 0.610, 0.355, 1.000] 
                      } 
                    }}
                  />
                ))}
              </g>

              <g id="letter-M" transform="translate(19, 0)">
                {letterM.map((cell, idx) => (
                  <motion.path
                    key={`m-${idx}`}
                    d={cell.d}
                    fill="currentColor"
                    initial={{ opacity: 0, scaleY: 0.6, y: 4 }}
                    animate={{ 
                      opacity: 1, 
                      scaleY: 1, 
                      y: 0,
                      transition: { 
                        delay: cell.delay, 
                        duration: 0.65, 
                        ease: [0.215, 0.610, 0.355, 1.000] 
                      } 
                    }}
                  />
                ))}
              </g>
            </svg>
          </motion.div>
        </div>



      </div>

      {/* ==================== RIGHT PANEL: IMMERSIVE CARD SIGN-IN ==================== */}
      <div id="login-auth-panel" className="w-full lg:w-1/2 flex items-center justify-center bg-black px-6 sm:px-12 relative overflow-hidden h-full z-10 py-10 lg:py-0">
        
        {/* Subtle ambient flare directly behind the card for gentle contrast */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-white/[0.01] blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[390px] bg-[#0A0A0C] border border-[#16161A] rounded-[28px] p-8 sm:p-10 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] flex flex-col justify-between"
        >
          {/* Centered logo, titles, and authentication options */}
          <div className="space-y-7 text-center">
            
            {/* Beautiful layered-globe sphere brand logo exactly matching the second screenshot */}
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-white shrink-0 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                <rect x="38" y="14" width="24" height="6" rx="3" />
                <rect x="22" y="25" width="56" height="6" rx="3" />
                <rect x="9" y="36" width="82" height="6" rx="3" />
                <rect x="3" y="47" width="94" height="6" rx="3" />
                <rect x="9" y="58" width="82" height="6" rx="3" />
                <rect x="22" y="69" width="56" height="6" rx="3" />
                <rect x="38" y="80" width="24" height="6" rx="3" />
              </svg>
            </div>

            {/* Application Branding */}
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                Axiom.
              </h2>
              <p className="text-xs text-neutral-400 font-light max-w-[260px] mx-auto leading-relaxed">
                Sign in to securely access your workspace.
              </p>
            </div>

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl border border-white/20 bg-neutral-900/80 flex items-start gap-2.5 text-xs text-neutral-200 text-left"
              >
                <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {!isFormMode ? (
                <motion.div
                  key="sso-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Real-brand Social Authentication Options */}
                  <div className="space-y-4">
                    <div id="social-logos-grid" className="grid grid-cols-3 gap-3.5">
                      {/* Google Button */}
                      <button
                        id="btn-google-sso"
                        type="button"
                        onClick={handleGithubClick}
                        className="bg-[#0e0e11] hover:bg-neutral-900 border border-white/[0.05] hover:border-white/10 py-3 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-[0.95] cursor-pointer group shadow-sm hover:shadow-[0_4px_16px_rgba(255,255,255,0.02)]"
                        title="Sign in with Google"
                      >
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      </button>

                      {/* LinkedIn Button */}
                      <button
                        id="btn-linkedin-sso"
                        type="button"
                        onClick={handleGithubClick}
                        className="bg-[#0e0e11] hover:bg-neutral-900 border border-white/[0.05] hover:border-white/10 py-3 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-[0.95] cursor-pointer group shadow-sm hover:shadow-[0_4px_16px_rgba(255,255,255,0.02)]"
                        title="Sign in with LinkedIn"
                      >
                        <svg className="w-5 h-5 text-[#0A66C2] fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </button>

                      {/* GitHub Button */}
                      <button
                        id="btn-github-sso"
                        type="button"
                        onClick={handleGithubClick}
                        className="bg-[#0e0e11] hover:bg-neutral-900 border border-white/[0.05] hover:border-white/10 py-3 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-[0.95] cursor-pointer group shadow-sm hover:shadow-[0_4px_16px_rgba(255,255,255,0.02)]"
                        title="Sign in with GitHub"
                      >
                        <svg className="w-5 h-5 text-white fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47722 2 2 6.47722 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21.02C9.5 20.79 9.5 20.18 9.5 19.4C6.73 20 6.14 18.07 6.14 18.07C5.69 16.92 5.03 16.61 5.03 16.61C4.13 16 5.1 16 5.1 16C6.1 16.07 6.63 17.03 6.63 17.03C7.52 18.55 8.97 18.11 9.54 17.85C9.63 17.2 9.89 16.76 10.18 16.51C7.97 16.26 5.64 15.4 5.64 11.59C5.64 10.5 6.03 9.61 6.67 8.91C6.57 8.66 6.23 7.64 6.77 6.27C6.77 6.27 7.61 6 9.52 7.29C10.32 7.07 11.18 6.96 12.04 6.96C12.9 6.96 13.76 7.07 14.56 7.29C16.47 5.99 17.31 6.27 17.31 6.27C17.85 7.64 17.51 8.66 17.41 8.91C18.05 9.61 18.44 10.5 18.44 11.59C18.44 15.42 16.11 16.25 13.89 16.5C14.25 16.81 14.56 17.43 14.56 18.38C14.56 19.74 14.56 20.83 14.56 21.08C14.56 21.33 14.72 21.62 15.22 21.52C19.19 20.19 22 16.42 22 12C22 6.47722 17.5228 2 12 2Z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Secondary alternative authorization route */}
                  <button
                    type="button"
                    onClick={() => setIsFormMode(true)}
                    className="w-full bg-transparent hover:bg-white/[0.02] border border-white/[0.04] text-neutral-300 hover:text-white text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span>Sign in with Email & Password</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleLogin} className="space-y-4 text-left">
                    {/* Username Handle */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                        Username Handle
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="sajiddurrani987"
                          className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Identity Mail */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                        Work Identity
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sajiddurrani987@gmail.com"
                          className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Access Passkey */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                        Access Key
                      </label>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 w-4 h-4 text-neutral-500" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••••"
                          className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl pl-10 pr-12 py-3 text-xs text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/20 transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 p-1 text-neutral-500 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-white hover:bg-neutral-100 text-black font-bold text-[11px] tracking-wider uppercase py-3 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Sign In</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFormMode(false)}
                      className="text-[10px] font-mono text-neutral-500 hover:text-neutral-300 block text-center mx-auto mt-2 cursor-pointer transition-colors uppercase tracking-wider"
                    >
                      ← Back to Single Sign-On
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Secure label exactly mirroring the lower section of RepoMind's card */}
          <div className="text-[8.5px] font-mono text-neutral-600 tracking-[0.25em] text-center uppercase pt-8 shrink-0">
            Secure Axiom Link (V&nbsp;2.4.0)
          </div>

        </motion.div>

      </div>

    </div>
  );
}
