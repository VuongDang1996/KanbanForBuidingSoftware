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

export default function PracticeStudioView() {
  const { setActiveTab } = useApp();
  const [selectedWord, setSelectedWord] = useState('six');
  const [showFormantGrid, setShowFormantGrid] = useState(true);
  const [spectrogramOpen, setSpectrogramOpen] = useState(false);
  const [drillMode, setDrillMode] = useState('sentence'); // 'sentence' | 'dictation'
  const [dictationAnswer, setDictationAnswer] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

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

  // AC 3: Push-to-Talk via Space key with debouncing
  usePushToTalk({
    onStart: start,
    onStop: async () => {
      await stop();
      await evaluateSpeech();
    },
    isRecording,
    disabled: showPermissionModal
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
      await start();
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Interactive State Context & Lab Control Bar */}
      <section className="w-full px-margin md:px-margin-desktop py-space-md">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-white border border-slate-200/80 p-space-md rounded-xl shadow-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-label-mono text-label-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              FORCED ALIGNMENT ENGINE: GOP v5.1
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-label-mono text-label-mono font-semibold">
              <span className="material-symbols-outlined text-sm">mic_external_on</span>
              16kHz Calibrated Telemetry
            </span>
            <span className="text-slate-500 font-label-mono text-label-mono hidden sm:inline">
              Profile: Vietnamese (Hanoi Dialect Bias: /z/ for /d/, coda unreleased)
            </span>
          </div>

          <div className="flex items-center gap-space-sm self-end md:self-auto">
            {/* Dictation Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold mr-1">
              <button aria-label="Nút tương tác" type="button"
                onClick={() => setDrillMode('sentence')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  drillMode === 'sentence' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đối Chiếu Sóng
              </button>
              <button aria-label="Chế độ luyện chính tả" type="button"
                onClick={() => setDrillMode('dictation')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  drillMode === 'dictation' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chính Tả Âm Đuôi
              </button>
            </div>

            <button aria-label="Nút tương tác" type="button"
              onClick={() => setShowFormantGrid(!showFormantGrid)}
              className={`px-3.5 py-1.5 rounded-lg border text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-1.5 shadow-sm font-medium ${
                showFormantGrid ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base text-sky-600">layers</span>
              <span>{showFormantGrid ? 'Lưới F1-F2: Bật' : 'Bật Lưới Âm Học'}</span>
            </button>
            <span className={`px-2.5 py-1 rounded-md border font-label-mono text-label-mono font-bold ${
              alignmentData.overallGop >= 85 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
              alignmentData.overallGop >= 60 ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-rose-50 border-rose-200 text-rose-700'
            }`}>
              SCORE: {alignmentData.overallGop}% GOP
            </span>
          </div>
        </div>
      </section>

      {/* Dictation Mode Exercise Container if active (PRON-202) */}
      {drillMode === 'dictation' && (
        <div className="w-full px-margin md:px-margin-desktop max-w-[1440px] mx-auto mb-space-md">
          <AudioDictationCard />
        </div>
      )}

      {/* Main Acoustic Inspection Grid */}
      <div className="w-full px-margin md:px-margin-desktop space-y-space-lg max-w-[1440px] mx-auto pb-space-xl">
        {/* 1. Target Practice Card (Character-level color coded & Interactive IPA Callouts) */}
        <section className="w-full bg-white rounded-xl p-space-md md:p-space-lg shadow-sm border border-slate-200/80 relative overflow-hidden">
          {/* Glow ambient background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-100/50 blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100/50 blur-[80px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-2 border-b border-slate-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono uppercase text-sky-700 font-bold tracking-wider">Acoustic Token Map</span>
              <span className="text-slate-400 font-label-mono text-label-mono">/ forced_alignment_v4 /</span>
            </div>
            <div className="flex items-center gap-3 font-label-mono text-label-mono font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Chuẩn xác (&gt;90%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Cảnh báo (60-89%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Lỗi nuốt/rụng âm (&lt;60%)
              </span>
            </div>
          </div>

          {/* Phonetic Dissection & Sentence Display */}
          <div className="py-space-md relative z-10">
            <div className="flex items-center justify-between mb-space-sm">
              <h2 className="font-headline-sm text-headline-sm text-slate-700 font-semibold">
                Câu thực hành mục tiêu &amp; Giám định âm học:
              </h2>
              <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                onClick={() => playAudio(targetSentence, 0.9)}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span> Nghe toàn câu mẫu
              </button>
            </div>

            {/* ELSA-201: Phoneme Error Heatmap with Forced Alignment */}
            <PhonemeHeatmapRenderer
              words={alignmentData.words}
              overallGop={alignmentData.overallGop}
              onPlayAudio={playAudio}
              colorblindMode={colorblindMode}
              onToggleColorblind={setColorblindMode}
            />
          </div>

          {/* Interactive Missing Ending Sound Callout Flags & Badges */}
          <div className="mt-space-sm pt-space-sm bg-slate-50 border border-slate-200/80 rounded-xl p-space-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm relative z-10">
            {/* Callout 1: Six */}
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
                <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                  onClick={() => playAudio('six', 0.6)}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">volume_up</span> Nghe bù âm
                </button>
              </div>
            </div>

            {/* Callout 2: baked */}
            <div className="p-space-sm rounded-lg bg-rose-50/80 border border-rose-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-rose-700">/t/ coda in "baked"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-rose-600 text-white font-bold">ERROR</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ⚠️ <strong className="text-rose-700">Quên bật âm /t/ đuôi!</strong> Đừng đọc là "bây-kơ" hay "bếc", chặn luồng hơi rồi bật nhẹ đầu lưỡi.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Stop-Consonant Void</span>
                <button aria-label="Chuyển phân hệ học" type="button"
                  onClick={() => setActiveTab('khau-hinh-2d')}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">play_arrow</span> Xem khẩu hình
                </button>
              </div>
            </div>

            {/* Callout 3: fresh */}
            <div className="p-space-sm rounded-lg bg-emerald-50/80 border border-emerald-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-emerald-700">/ʃ/ palato-alveolar in "fresh"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-emerald-600 text-white font-bold">PERFECT</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ✅ <strong className="text-emerald-700">Chu môi âm /ʃ/ chuẩn xác (96% GOP).</strong> Luồng khí xát đồng nhất, cộng hưởng vòm họng cực tốt.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Spectral Peak: 4.8kHz</span>
                <span className="text-emerald-700 font-bold">+15 XP Mastery</span>
              </div>
            </div>

            {/* Callout 4: months */}
            <div className="p-space-sm rounded-lg bg-amber-50/80 border border-amber-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-amber-700">Cluster /nθs/ in "months"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-amber-500 text-white font-bold">WARNING</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ⚠️ <strong className="text-amber-700">Cụm /nθs/ bị nuốt âm giữa!</strong> Đầu lưỡi chưa đặt giữa hai răng trước khi trượt sang âm xát /s/.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Missing Dental Transition</span>
                <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                  onClick={() => playAudio('months', 0.5)}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">slow_motion_video</span> Tập chậm 0.5x
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Dual Telemetry Instrumentation Bar (ELSA-204: Fluency Speedometer & Pause/Filler Monitor) */}
        <FluencyTimelineTracker
          fluencyData={fluencyData}
          onPlayAudioSlice={(startSec, endSec, text) => playAudio(text, 0.9)}
        />

        {/* 2b. Syllable Stress Bubbles & Three Pillars Evaluator (ELSA-202) */}
        <SyllableStressVisualizer
          initialWord="photography"
        />

        {/* 3. Suprasegmental Pitch & Sentence Intonation Melody Canvas (ELSA-203) */}
        <PitchContourMelodyView
          initialSentenceId="sent_yes_no_01"
        />

        {/* 3b. Syllable Stress vs Tone & Schwa Demotion (VN-103) */}
        <StressVsToneVisualizer
          initialWord="banana"
        />

        {/* 3c. Minimal Pair Auditory Discrimination Quizzes (ELSA-205) */}
        <MinimalPairQuiz
          initialPairId="pair_theta_t"
        />

        {/* 3d. Interactive 2D Anatomical Lip & Tongue Articulation Guide (PRON-201) */}
        <MouthAnatomyView
          initialPhoneme="/θ/"
        />

        {/* 3e. Phonemic Audio Dictation & Gap-Fill Exercises (PRON-202) */}
        {drillMode !== 'dictation' && (
          <AudioDictationCard />
        )}

        {/* 3f. Targeted Sound Read-Aloud & Contextual Fluency Drills (PRON-203) */}
        <TargetSoundSentenceView
          initialSentenceId="sat_theta_01"
        />

        {/* 4. Bottom Recording Dock & Live Audio Visualizer */}
        <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-md border border-slate-200/80 relative overflow-hidden">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-space-lg">
            {/* Live Waveform Visualizer Area (28 animated equalizer bars) */}
            <div className="w-full xl:w-2/5 flex flex-col gap-2">
              <div className="flex items-center justify-between font-label-mono text-label-mono">
                <span className="text-sky-700 flex items-center gap-1.5 font-bold">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                  {isRecording ? 'REAL-TIME 16kHz MONO CAPTURE' : 'STANDBY 16kHz AI READY'}
                </span>
                <span className="text-slate-400 font-semibold">BUFFER: 512 SAMPLES</span>
              </div>

              {/* Real-time 64-bar 2D Canvas Audio Visualizer at 60 FPS (PRON-101 AC 2) */}
              <LiveWaveformCanvas
                analyserNode={analyserNode}
                isRecording={isRecording}
                barCount={64}
                height={68}
              />
            </div>

            {/* Giant Glowing Pulsing Microphone Centerpiece */}
            <div className="flex flex-col items-center justify-center relative py-2">
              {/* Outer Pulsing Neon Rings */}
              {isRecording ? (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-rose-500/30 animate-ping pointer-events-none"></div>
                  <div className="absolute w-24 h-24 rounded-full bg-sky-500/25 animate-pulse pointer-events-none"></div>
                </>
              ) : null}

              {/* Circular 72px pill-shaped button */}
              <button aria-label="Bật tắt ghi âm giọng nói" type="button"
                onClick={handleMicToggle}
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
              <span className="font-label-mono text-label-mono text-slate-800 mt-2 font-bold tracking-wider uppercase">
                {isRecording ? '● Đang Ghi Âm Lọc Ồn AI' : 'Nhấn Để Ghi Âm Luyện Phát Âm'}
              </span>
            </div>

            {/* Action Control Buttons */}
            <div className="w-full xl:w-2/5 flex flex-wrap items-center justify-center xl:justify-end gap-space-sm">
              {/* Button 1: Sample Native Audio */}
              <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                onClick={() => playAudio(targetSentence, 1.0)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sky-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg">volume_up</span>
                <span>🔊 Nghe Giọng Bản Ngữ (Oxford US)</span>
              </button>

              {/* Button 2: Re-record */}
              <button aria-label="Bật tắt ghi âm giọng nói" type="button"
                onClick={handleMicToggle}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg text-rose-600">replay</span>
                <span>🔄 {isRecording ? 'Dừng Ghi Âm' : 'Ghi Âm Lại'}</span>
              </button>

              {/* Button 3: Ending Sound Burst Inspector (VN-101) */}
              <button aria-label="Thanh tra âm cuối và xung âm bật hơi" type="button"
                onClick={() => setSpectrogramOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg text-rose-600">graphic_eq</span>
                <span>🔬 Thanh Tra Âm Cuối &amp; Xung Âm (VN-101)</span>
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

      {/* Mic Permission Guidance Modal (PRON-101 AC 4) */}
      <MicPermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onPermissionGranted={start}
      />
    </div>
  );
}
