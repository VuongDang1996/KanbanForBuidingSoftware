import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder, usePushToTalk } from '../lib/audio/useRecorder';
import LiveWaveformCanvas from '../components/audio/LiveWaveformCanvas';
import MicPermissionModal from '../components/audio/MicPermissionModal';
import PhonemeHeatmapRenderer from '../components/audio/PhonemeHeatmapRenderer';
import { alignSentencePhonemes } from '../lib/scoring/phonemeAlignment';
import FluencyTimelineTracker from '../components/scoring/FluencyTimelineTracker';
import { analyzeFluency } from '../lib/scoring/fluencyAnalysis';
import EndingSoundInspector from '../components/ending-sounds/EndingSoundInspector';
import SyllableStressVisualizer from '../components/prosody/SyllableStressVisualizer';
import PitchContourMelodyView from '../components/prosody/PitchContourMelodyView';
import StressVsToneVisualizer from '../components/prosody/StressVsToneVisualizer';
import MinimalPairQuiz from '../components/articulation/MinimalPairQuiz';
import MouthAnatomyView from '../components/anatomy/MouthAnatomyView';
import AudioDictationCard from '../components/articulation/AudioDictationCard';
import TargetSoundSentenceView from '../components/articulation/TargetSoundSentenceView';
import DualTrackStudio from '../components/articulation/DualTrackStudio';
import PositionalLadder from '../components/articulation/PositionalLadder';
import ConnectedProgression from '../components/articulation/ConnectedProgression';
import VoicingRuleMastery from '../components/articulation/VoicingRuleMastery';
import CrossTransitionDrill from '../components/articulation/CrossTransitionDrill';
import MultiSpellingSoundMap from '../components/articulation/MultiSpellingSoundMap';
import VideoMasterclassPlayer from '../components/articulation/VideoMasterclassPlayer';
import SoundSaturationDrill from '../components/articulation/SoundSaturationDrill';
import NativeTonguePlacementGuide from '../components/articulation/NativeTonguePlacementGuide';
import VoiceBiometricConsentModal from '../components/legal/VoiceBiometricConsentModal';

export default function PracticeStudioView() {
  const { setActiveTab, practiceSubTab, setPracticeSubTab } = useApp();
  const [selectedWord, setSelectedWord] = useState('six');
  const [showFormantGrid, setShowFormantGrid] = useState(true);
  const [spectrogramOpen, setSpectrogramOpen] = useState(false);
  const [drillMode, setDrillMode] = useState('sentence'); // 'sentence' | 'dictation'
  const [dictationAnswer, setDictationAnswer] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showVoiceConsentModal, setShowVoiceConsentModal] = useState(false);
  const [isVoiceConsented, setIsVoiceConsented] = useState(() => {
    try {
      return localStorage.getItem('vietphonics_voice_biometric_consented') === 'true';
    } catch {
      return false;
    }
  });

  const targetSentence = "Six months ago, she baked fresh bread for breakfast on the street.";
  const [alignmentData, setAlignmentData] = useState(() => alignSentencePhonemes(targetSentence));
  const [fluencyData, setFluencyData] = useState(() => analyzeFluency({ sentence: targetSentence, totalDurationSec: 5.6 }));
  const [colorblindMode, setColorblindMode] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const { isRecording, start, stop, analyserNode, isPermissionDenied } = useRecorder({ autoAnalyze: true });

  const evaluateSpeech = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/v1/scoring/phoneme-alignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: targetSentence })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.words) {
          setAlignmentData(data);
        }
      }
    } catch {
      setAlignmentData(alignSentencePhonemes(targetSentence));
    }

    try {
      const fluRes = await fetch('/api/v1/scoring/fluency-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: targetSentence, totalDurationSec: 5.6 })
      });
      if (fluRes.ok) {
        const fluJson = await fluRes.json();
        if (fluJson.success && fluJson.fluency) {
          setFluencyData(fluJson.fluency);
        }
      }
    } catch {
      setFluencyData(analyzeFluency({ sentence: targetSentence, totalDurationSec: 5.6 }));
    }

    setIsEvaluating(false);
  };

  React.useEffect(() => {
    if (isPermissionDenied) {
      setShowPermissionModal(true);
    }
  }, [isPermissionDenied]);

  // AC 3: Push-to-Talk via Space key with debouncing (requires voice biometric consent LEG-101)
  usePushToTalk({
    onStart: () => {
      if (!isVoiceConsented) {
        setShowVoiceConsentModal(true);
        return;
      }
      start();
    },
    onStop: async () => {
      if (!isVoiceConsented) return;
      await stop();
      await evaluateSpeech();
    },
    isRecording,
    disabled: showPermissionModal || showVoiceConsentModal
  });

  const playAudio = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicToggle = async () => {
    if (isRecording) {
      await stop();
      await evaluateSpeech();
    } else {
      if (!isVoiceConsented) {
        setShowVoiceConsentModal(true);
        return;
      }
      await start();
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Sub-Tab Navigation Header */}
      <section className="w-full px-margin md:px-margin-desktop py-space-sm max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-white border border-slate-200/80 p-3 sm:p-4 rounded-2xl shadow-xs">
          {/* Segmented Sub-Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setPracticeSubTab('coda-sentences')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                practiceSubTab === 'coda-sentences'
                  ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">graphic_eq</span>
              <span>Luyện Câu &amp; Sóng Âm</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeSubTab('khau-hinh-2d')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                practiceSubTab === 'khau-hinh-2d'
                  ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">face</span>
              <span>Khẩu Hình 2D &amp; Lưỡi</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeSubTab('mastery-pairs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                practiceSubTab === 'mastery-pairs'
                  ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">checklist_rtl</span>
              <span>Cặp Âm &amp; Quy Tắc Ngữ Âm</span>
            </button>
          </div>

          {/* Engine Status & Score */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-label-mono text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              GOP v5.1
            </span>
            <span className={`px-2.5 py-1 rounded-full border font-label-mono text-xs font-bold ${
              alignmentData.overallGop >= 85 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
              alignmentData.overallGop >= 60 ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-rose-50 border-rose-200 text-rose-700'
            }`}>
              SCORE: {alignmentData.overallGop}% GOP
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Rendered According to Active Sub-Tab */}
      <div className="w-full px-margin md:px-margin-desktop space-y-space-lg max-w-[1440px] mx-auto pb-space-xl">
        {/* SUB-TAB 1: Luyện Câu & Đối Chiếu Sóng */}
        {practiceSubTab === 'coda-sentences' && (
          <>
            {/* Dictation Mode Toggle */}
            <div className="flex items-center justify-between bg-white border border-slate-200/80 p-3 rounded-xl shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Chế độ bài tập:</span>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setDrillMode('sentence')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      drillMode === 'sentence' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đối Chiếu Sóng
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrillMode('dictation')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      drillMode === 'dictation' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chính Tả Âm Đuôi
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFormantGrid(!showFormantGrid)}
                className={`px-3 py-1 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
                  showFormantGrid ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-sm text-sky-600">layers</span>
                <span>{showFormantGrid ? 'Lưới F1-F2: Bật' : 'Bật Lưới Âm Học'}</span>
              </button>
            </div>

            {/* Dictation Mode Exercise Container if active (PRON-202) */}
            {drillMode === 'dictation' && (
              <AudioDictationCard />
            )}

            {/* 1. Target Practice Card (Character-level color coded & Interactive IPA Callouts) */}
            <section className="w-full bg-white rounded-xl p-space-md md:p-space-lg shadow-sm border border-slate-200/80 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-2 border-b border-slate-100 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-label-mono uppercase text-sky-700 font-bold tracking-wider">Acoustic Token Map</span>
                  <span className="text-slate-400 font-label-mono text-label-mono">/ forced_alignment_v4 /</span>
                </div>
                <div className="flex items-center gap-3 font-label-mono text-label-mono font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Chuẩn xác (&gt;90%)
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Cảnh báo (60-89%)
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Lỗi nuốt/rụng âm (&lt;60%)
                  </span>
                </div>
              </div>

              {/* Phonetic Dissection & Sentence Display */}
              <div className="py-space-md relative z-10">
                <div className="flex items-center justify-between mb-space-sm">
                  <h2 className="font-headline-sm text-headline-sm text-slate-700 font-semibold">
                    Câu thực hành mục tiêu &amp; Giám định âm học:
                  </h2>
                  <button
                    type="button"
                    onClick={() => playAudio(targetSentence, 0.9)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200 flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span> Nghe toàn câu mẫu
                  </button>
                </div>

                <PhonemeHeatmapRenderer
                  words={alignmentData.words}
                  overallGop={alignmentData.overallGop}
                  onPlayAudio={playAudio}
                  colorblindMode={colorblindMode}
                  onToggleColorblind={setColorblindMode}
                />
              </div>

              {/* Missing Ending Sound Callout Flags & Badges */}
              <div className="mt-space-sm pt-space-sm bg-slate-50 border border-slate-200/80 rounded-xl p-space-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm relative z-10">
                <div className="p-space-sm rounded-lg bg-rose-50/80 border border-rose-200 text-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-ipa-inline text-ipa-inline font-bold text-rose-700">/ks/ coda in "Six"</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-rose-600 text-white font-bold">CRITICAL</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-700">
                      ⚠️ <strong className="text-rose-700">Rụng âm đuôi /ks/!</strong> Bạn nói thành <span className="font-ipa-inline text-rose-900 font-bold">/sɪ/</span> (lỗi nuốt âm điển hình của người Việt).
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                    <span>Acoustic Burst: 0.0ms</span>
                    <button type="button" onClick={() => playAudio('Six', 0.8)} className="text-rose-600 font-bold hover:underline cursor-pointer">
                      Nghe mẫu /sɪks/
                    </button>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-rose-50/80 border border-rose-200 text-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-ipa-inline text-ipa-inline font-bold text-rose-700">/nθs/ coda in "months"</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-rose-600 text-white font-bold">CRITICAL</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-700">
                      ⚠️ <strong className="text-rose-700">Mất cụm /nθs/!</strong> Bạn phát âm thành <span className="font-ipa-inline text-rose-900 font-bold">/mʌn/</span> hoặc mất âm xát /s/.
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                    <span>Acoustic Burst: 0.0ms</span>
                    <button type="button" onClick={() => playAudio('months', 0.8)} className="text-rose-600 font-bold hover:underline cursor-pointer">
                      Nghe mẫu /mʌnθs/
                    </button>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-amber-50/80 border border-amber-200 text-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-ipa-inline text-ipa-inline font-bold text-amber-800">/kt/ coda in "baked"</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-amber-500 text-white font-bold">WARNING</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-700">
                      ⚡ <strong className="text-amber-800">Bỏ âm bật /t/ đuôi.</strong> Biến đổi thành /beɪk/ thay vì cụm phụ âm vô thanh /beɪkt/.
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                    <span>Burst: 18.2ms (&lt;30ms)</span>
                    <button type="button" onClick={() => playAudio('baked', 0.8)} className="text-amber-700 font-bold hover:underline cursor-pointer">
                      Nghe mẫu /beɪkt/
                    </button>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-emerald-50/80 border border-emerald-200 text-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-ipa-inline text-ipa-inline font-bold text-emerald-800">/st/ coda in "street"</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-emerald-600 text-white font-bold">GOOD</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-700">
                      ✅ <strong className="text-emerald-700">Chuẩn âm đuôi!</strong> Đạt xung năng lượng bật hơi 42.6ms với biên độ dao động mạnh mẽ.
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                    <span>Burst: 42.6ms (&gt;30ms)</span>
                    <button type="button" onClick={() => playAudio('street', 0.8)} className="text-emerald-700 font-bold hover:underline cursor-pointer">
                      Nghe lại /striːt/
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Fluency Timeline & Speech Rate Metrics (ELSA-204) */}
            <FluencyTimelineTracker
              wpm={fluencyData.wpm}
              speechRateCategory={fluencyData.speechRateCategory}
              hesitationCount={fluencyData.hesitationCount}
              pauseCount={fluencyData.pauseCount}
              pauseDistribution={fluencyData.pauseDistribution}
              hesitations={fluencyData.hesitations}
              speechTimeline={fluencyData.speechTimeline}
              totalDurationSec={fluencyData.totalDurationSec}
            />

            {/* Syllable Stress Visualizer (ELSA-202) */}
            <SyllableStressVisualizer
              initialWord="photography"
            />

            {/* Suprasegmental Pitch & Sentence Intonation Melody Canvas (ELSA-203) */}
            <PitchContourMelodyView
              initialSentenceId="sent_yes_no_01"
            />

            {/* Syllable Stress vs Tone & Schwa Demotion (VN-103) */}
            <StressVsToneVisualizer
              initialWord="banana"
            />

            {/* Targeted Sound Read-Aloud & Contextual Fluency Drills (PRON-203) */}
            <TargetSoundSentenceView
              initialSentenceId="sat_theta_01"
            />

            {/* Dual-Track Audio Recording & Native Speaker Waveform Comparison (PRON-204) */}
            <DualTrackStudio
              initialWord="thought"
            />
          </>
        )}

        {/* SUB-TAB 2: Khẩu Hình 2D & Cơ Quan Phát Âm */}
        {practiceSubTab === 'khau-hinh-2d' && (
          <>
            {/* Interactive 2D Anatomical Lip & Tongue Articulation Guide (PRON-201) */}
            <MouthAnatomyView
              initialPhoneme="/θ/"
            />

            {/* Vietnamese Native-Tongue Mouth & Tongue Placement Guides (VN-105) */}
            <NativeTonguePlacementGuide
              initialPhoneme="/ð/"
            />

            {/* 3-Tier Positional Phoneme Ladder (PRON-205) */}
            <PositionalLadder
              initialPhoneme="/z/"
            />

            {/* Connected Speech Positional Progression (PRON-206) */}
            <ConnectedProgression
              initialProgressionId="prog_breathe"
            />
          </>
        )}

        {/* SUB-TAB 3: Cặp Âm & Quy Tắc Ngữ Âm */}
        {practiceSubTab === 'mastery-pairs' && (
          <>
            {/* Minimal Pair Auditory Discrimination Quizzes (ELSA-205) */}
            <MinimalPairQuiz
              initialPairId="pair_theta_t"
            />

            {/* Phonetic Exception Words & Grammatical Voicing Alternations (PRON-207) */}
            <VoicingRuleMastery
              initialCategory="s_es_endings"
            />

            {/* L1 Confusion-Trap Cross-Transition Drills (PRON-208) */}
            <CrossTransitionDrill
              initialTrapId="trap_s_sh"
            />

            {/* Numbered Target Phoneme System & Multi-Spelling Sound Maps (PRON-209) */}
            <MultiSpellingSoundMap
              initialPhoneme="sound_09_f"
            />

            {/* Video-Synchronized Masterclass & Exaggerated Articulation Modeling (PRON-210) */}
            <VideoMasterclassPlayer
              initialLessonId="mc_theta_01"
            />

            {/* Dense Target Sound Saturation Sentences (PRON-211) */}
            <SoundSaturationDrill
              initialSentenceId="sat_dj_01"
            />
          </>
        )}

        {/* Floating/Docked Recording Dock & Live Audio Visualizer (Always present across all sub-tabs) */}
        <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-md border border-slate-200/80 relative overflow-hidden mt-6">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-space-lg">
            {/* Live Waveform Visualizer Area */}
            <div className="w-full xl:w-2/5 flex flex-col gap-2">
              <div className="flex items-center justify-between font-label-mono text-label-mono">
                <span className="text-sky-700 flex items-center gap-1.5 font-bold">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
                  {isRecording ? 'REAL-TIME 16kHz MONO CAPTURE' : 'STANDBY 16kHz AI READY'}
                </span>
                <span className="text-slate-400 font-semibold">BUFFER: 512 SAMPLES</span>
              </div>

              <LiveWaveformCanvas
                analyserNode={analyserNode}
                isRecording={isRecording}
                barCount={64}
                height={68}
              />
            </div>

            {/* Microphone Centerpiece */}
            <div className="flex flex-col items-center justify-center relative py-2">
              {isRecording ? (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
                  <div className="absolute w-24 h-24 rounded-full bg-sky-500/25 animate-pulse pointer-events-none" />
                </>
              ) : null}

              <button
                type="button"
                onClick={handleMicToggle}
                aria-label="Bật tắt ghi âm giọng nói"
                className={`relative z-10 w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center text-white shadow-lg cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 ring-4 ring-rose-300 animate-pulse scale-105'
                    : 'bg-gradient-to-tr from-rose-600 to-rose-500 hover:shadow-[0_0_32px_rgba(225,29,72,0.45)] active:scale-95'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
              <span className="font-label-mono text-xs text-slate-800 mt-2 font-bold tracking-wider uppercase">
                {isRecording ? '● Đang Ghi Âm Lọc Ồn AI' : 'Nhấn Để Ghi Âm Luyện Phát Âm'}
              </span>
            </div>

            {/* Action Control Buttons */}
            <div className="w-full xl:w-2/5 flex flex-wrap items-center justify-center xl:justify-end gap-2">
              <button
                type="button"
                onClick={() => playAudio(targetSentence, 1.0)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sky-700 text-xs transition flex items-center gap-1.5 shadow-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
                <span>🔊 Nghe Bản Ngữ (Oxford)</span>
              </button>

              <button
                type="button"
                onClick={handleMicToggle}
                className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition flex items-center gap-1.5 shadow-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-rose-600">replay</span>
                <span>🔄 {isRecording ? 'Dừng Ghi Âm' : 'Ghi Âm Lại'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSpectrogramOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs transition flex items-center gap-1.5 shadow-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-rose-600">graphic_eq</span>
                <span>🔬 Thanh Tra Âm Cuối (VN-101)</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* VN-101: Ending Sound Inspector & Dual Oscilloscope Modal */}
      {spectrogramOpen && (
        <EndingSoundInspector
          initialWord={selectedWord || 'Six'}
          onClose={() => setSpectrogramOpen(false)}
        />
      )}

      {/* Mic Permission Guidance Modal */}
      <MicPermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionGranted={start}
      />

      {/* LEG-101 Voice Biometric Consent Modal (Nghị định 13/2023/NĐ-CP) */}
      <VoiceBiometricConsentModal
        isOpen={showVoiceConsentModal}
        onClose={() => setShowVoiceConsentModal(false)}
        onConsentGranted={() => {
          setIsVoiceConsented(true);
          try {
            localStorage.setItem('vietphonics_voice_biometric_consented', 'true');
          } catch {}
          start();
        }}
        accountId="default_user"
      />
    </div>
  );
}
