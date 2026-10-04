/**
 * PRON-212: Biomechanical Articulatory Comparison Engine
 * Computes geometric deltas between user's mouth snapshot landmarks and gold-standard 2D anatomical models.
 */

export const PHONEME_BENCHMARK_PROFILES = {
  // Dental Fricatives (/θ/, /ð/)
  '/θ/': {
    phoneme: '/θ/',
    name: 'Voiceless Dental Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 2.8,
    tongueInterdentalRequired: true,
    coronalType: 'dental',
    sampleWord: 'think'
  },
  '/ð/': {
    phoneme: '/ð/',
    name: 'Voiced Dental Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 2.8,
    tongueInterdentalRequired: true,
    coronalType: 'dental',
    sampleWord: 'this'
  },

  // Postalveolar Fricatives & Rounded Sounds (/ʃ/, /ʒ/, /uː/, /w/)
  '/ʃ/': {
    phoneme: '/ʃ/',
    name: 'Voiceless Postalveolar Fricative',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 1.25, // puckered circular
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'she'
  },
  '/ʒ/': {
    phoneme: '/ʒ/',
    name: 'Voiced Postalveolar Fricative',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 1.25,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'measure'
  },
  '/uː/': {
    phoneme: '/uː/',
    name: 'Close Back Rounded Vowel',
    targetApertureMm: 5.0,
    targetWidthHeightRatio: 1.15,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'too'
  },
  '/w/': {
    phoneme: '/w/',
    name: 'Voiced Labio-Velar Approximant',
    targetApertureMm: 4.5,
    targetWidthHeightRatio: 1.1,
    targetTeethGapMm: 1.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'wet'
  },

  // Open Low Vowels (/æ/, /ɑː/, /ʌ/)
  '/æ/': {
    phoneme: '/æ/',
    name: 'Near-Open Front Unrounded Vowel',
    targetApertureMm: 24.0, // wide drop
    targetWidthHeightRatio: 1.75,
    targetTeethGapMm: 14.0,
    tongueInterdentalRequired: false,
    coronalType: 'open',
    sampleWord: 'cat'
  },
  '/ɑː/': {
    phoneme: '/ɑː/',
    name: 'Open Back Unrounded Vowel',
    targetApertureMm: 26.0,
    targetWidthHeightRatio: 1.6,
    targetTeethGapMm: 16.0,
    tongueInterdentalRequired: false,
    coronalType: 'open',
    sampleWord: 'father'
  },

  // Spread High Front Vowels (/iː/, /ɪ/, /e/)
  '/iː/': {
    phoneme: '/iː/',
    name: 'Close Front Unrounded Vowel',
    targetApertureMm: 5.0,
    targetWidthHeightRatio: 3.4, // wide stretched smile
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'see'
  },
  '/ɪ/': {
    phoneme: '/ɪ/',
    name: 'Near-Close Near-Front Vowel',
    targetApertureMm: 8.0,
    targetWidthHeightRatio: 2.8,
    targetTeethGapMm: 3.5,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'sit'
  },

  // Labiodental Fricatives (/f/, /v/)
  '/f/': {
    phoneme: '/f/',
    name: 'Voiceless Labiodental Fricative',
    targetApertureMm: 4.0,
    targetWidthHeightRatio: 2.4,
    targetTeethGapMm: 1.0,
    tongueInterdentalRequired: false,
    coronalType: 'labiodental',
    sampleWord: 'fall'
  },
  '/v/': {
    phoneme: '/v/',
    name: 'Voiced Labiodental Fricative',
    targetApertureMm: 4.0,
    targetWidthHeightRatio: 2.4,
    targetTeethGapMm: 1.0,
    tongueInterdentalRequired: false,
    coronalType: 'labiodental',
    sampleWord: 'voice'
  },

  // Bilabial Stops (/p/, /b/, /m/)
  '/p/': {
    phoneme: '/p/',
    name: 'Voiceless Bilabial Plosive',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'pen'
  },
  '/b/': {
    phoneme: '/b/',
    name: 'Voiced Bilabial Plosive',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'bad'
  },
  '/m/': {
    phoneme: '/m/',
    name: 'Voiced Bilabial Nasal',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'man'
  },

  // Alveolar Stops & Fricatives (/t/, /d/, /s/, /z/, /n/, /l/)
  '/t/': {
    phoneme: '/t/',
    name: 'Voiceless Alveolar Plosive',
    targetApertureMm: 4.5,
    targetWidthHeightRatio: 2.3,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'tea'
  },
  '/d/': {
    phoneme: '/d/',
    name: 'Voiced Alveolar Plosive',
    targetApertureMm: 4.5,
    targetWidthHeightRatio: 2.3,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'dog'
  },
  '/s/': {
    phoneme: '/s/',
    name: 'Voiceless Alveolar Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.35,
    targetTeethGapMm: 1.5,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'see'
  },
  '/z/': {
    phoneme: '/z/',
    name: 'Voiced Alveolar Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.35,
    targetTeethGapMm: 1.5,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'zoo'
  },
  '/n/': {
    phoneme: '/n/',
    name: 'Voiced Alveolar Nasal',
    targetApertureMm: 4.0,
    targetWidthHeightRatio: 2.3,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'no'
  },
  '/l/': {
    phoneme: '/l/',
    name: 'Voiced Alveolar Lateral Approximant',
    targetApertureMm: 5.0,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 2.5,
    tongueInterdentalRequired: false,
    coronalType: 'alveolar',
    sampleWord: 'leg'
  },

  // Velar & Glottal Consonants (/k/, /g/, /ŋ/, /h/)
  '/k/': {
    phoneme: '/k/',
    name: 'Voiceless Velar Plosive',
    targetApertureMm: 11.0,
    targetWidthHeightRatio: 2.1,
    targetTeethGapMm: 6.5,
    tongueInterdentalRequired: false,
    coronalType: 'velar',
    sampleWord: 'cat'
  },
  '/g/': {
    phoneme: '/g/',
    name: 'Voiced Velar Plosive',
    targetApertureMm: 11.0,
    targetWidthHeightRatio: 2.1,
    targetTeethGapMm: 6.5,
    tongueInterdentalRequired: false,
    coronalType: 'velar',
    sampleWord: 'go'
  },
  '/ŋ/': {
    phoneme: '/ŋ/',
    name: 'Voiced Velar Nasal',
    targetApertureMm: 9.0,
    targetWidthHeightRatio: 2.1,
    targetTeethGapMm: 5.0,
    tongueInterdentalRequired: false,
    coronalType: 'velar',
    sampleWord: 'sing'
  },
  '/h/': {
    phoneme: '/h/',
    name: 'Voiceless Glottal Fricative',
    targetApertureMm: 12.0,
    targetWidthHeightRatio: 2.0,
    targetTeethGapMm: 6.0,
    tongueInterdentalRequired: false,
    coronalType: 'neutral',
    sampleWord: 'hat'
  },

  // Affricates & Approximants (/tʃ/, /dʒ/, /r/, /j/)
  '/tʃ/': {
    phoneme: '/tʃ/',
    name: 'Voiceless Postalveolar Affricate',
    targetApertureMm: 6.5,
    targetWidthHeightRatio: 1.3,
    targetTeethGapMm: 2.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'chair'
  },
  '/dʒ/': {
    phoneme: '/dʒ/',
    name: 'Voiced Postalveolar Affricate',
    targetApertureMm: 6.5,
    targetWidthHeightRatio: 1.3,
    targetTeethGapMm: 2.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'jump'
  },
  '/r/': {
    phoneme: '/r/',
    name: 'Voiced Post-Alveolar Approximant',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 1.35,
    targetTeethGapMm: 2.8,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'red'
  },
  '/j/': {
    phoneme: '/j/',
    name: 'Voiced Palatal Approximant',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 2.7,
    targetTeethGapMm: 2.5,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'yes'
  },

  // Additional Vowels (/e/, /ʌ/, /ɒ/, /ɔː/, /ʊ/, /ɜː/, /ə/)
  '/e/': {
    phoneme: '/e/',
    name: 'Close-Mid Front Unrounded Vowel',
    targetApertureMm: 12.0,
    targetWidthHeightRatio: 2.6,
    targetTeethGapMm: 4.5,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'bed'
  },
  '/ʌ/': {
    phoneme: '/ʌ/',
    name: 'Open-Mid Back Unrounded Vowel',
    targetApertureMm: 18.0,
    targetWidthHeightRatio: 1.85,
    targetTeethGapMm: 9.0,
    tongueInterdentalRequired: false,
    coronalType: 'open',
    sampleWord: 'cup'
  },
  '/ɒ/': {
    phoneme: '/ɒ/',
    name: 'Open Back Rounded Vowel',
    targetApertureMm: 22.0,
    targetWidthHeightRatio: 1.4,
    targetTeethGapMm: 12.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'hot'
  },
  '/ɔː/': {
    phoneme: '/ɔː/',
    name: 'Open-Mid Back Rounded Vowel',
    targetApertureMm: 16.0,
    targetWidthHeightRatio: 1.25,
    targetTeethGapMm: 8.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'door'
  },
  '/ʊ/': {
    phoneme: '/ʊ/',
    name: 'Near-Close Near-Back Vowel',
    targetApertureMm: 8.0,
    targetWidthHeightRatio: 1.3,
    targetTeethGapMm: 3.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'book'
  },
  '/ɜː/': {
    phoneme: '/ɜː/',
    name: 'Open-Mid Central Unrounded Vowel',
    targetApertureMm: 12.0,
    targetWidthHeightRatio: 2.1,
    targetTeethGapMm: 5.0,
    tongueInterdentalRequired: false,
    coronalType: 'neutral',
    sampleWord: 'bird'
  },
  '/ə/': {
    phoneme: '/ə/',
    name: 'Mid Central Vowel (Schwa)',
    targetApertureMm: 10.0,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 4.0,
    tongueInterdentalRequired: false,
    coronalType: 'neutral',
    sampleWord: 'about'
  },

  // 8 Diphthongs (/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/, /ɪə/, /eə/, /ʊə/)
  '/eɪ/': {
    phoneme: '/eɪ/',
    name: 'Closing Diphthong',
    targetApertureMm: 10.0,
    targetWidthHeightRatio: 2.7,
    targetTeethGapMm: 4.0,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'say'
  },
  '/aɪ/': {
    phoneme: '/aɪ/',
    name: 'Closing Diphthong',
    targetApertureMm: 18.0,
    targetWidthHeightRatio: 2.3,
    targetTeethGapMm: 8.0,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'my'
  },
  '/ɔɪ/': {
    phoneme: '/ɔɪ/',
    name: 'Closing Diphthong',
    targetApertureMm: 15.0,
    targetWidthHeightRatio: 1.8,
    targetTeethGapMm: 6.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'boy'
  },
  '/aʊ/': {
    phoneme: '/aʊ/',
    name: 'Closing Diphthong',
    targetApertureMm: 19.0,
    targetWidthHeightRatio: 1.5,
    targetTeethGapMm: 9.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'now'
  },
  '/əʊ/': {
    phoneme: '/əʊ/',
    name: 'Closing Diphthong',
    targetApertureMm: 11.0,
    targetWidthHeightRatio: 1.35,
    targetTeethGapMm: 4.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'go'
  },
  '/ɪə/': {
    phoneme: '/ɪə/',
    name: 'Centring Diphthong',
    targetApertureMm: 9.0,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 3.5,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'near'
  },
  '/eə/': {
    phoneme: '/eə/',
    name: 'Centring Diphthong',
    targetApertureMm: 14.0,
    targetWidthHeightRatio: 2.4,
    targetTeethGapMm: 6.0,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'hair'
  },
  '/ʊə/': {
    phoneme: '/ʊə/',
    name: 'Centring Diphthong',
    targetApertureMm: 9.0,
    targetWidthHeightRatio: 1.45,
    targetTeethGapMm: 4.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'tour'
  }
};

/**
 * Retrieve benchmark metrics for any phoneme with safe fallback
 */
export function getBenchmarkMetrics(phoneme) {
  const clean = phoneme.startsWith('/') ? phoneme : `/${phoneme}/`;
  return (
    PHONEME_BENCHMARK_PROFILES[clean] ||
    PHONEME_BENCHMARK_PROFILES['/θ/'] || {
      phoneme: clean,
      name: 'Neutral Sound',
      targetApertureMm: 10.0,
      targetWidthHeightRatio: 2.2,
      targetTeethGapMm: 4.0,
      tongueInterdentalRequired: false,
      coronalType: 'neutral',
      sampleWord: 'about'
    }
  );
}

/**
 * Analyze real mouth features & pixel biometrics from captured camera Canvas
 * Detects mouth bounding box position, aperture opening, teeth visibility, and interdental tongue protrusion.
 * @param {HTMLCanvasElement|object} canvas OffscreenCanvas or HTML5 Canvas element
 * @param {string} targetPhoneme Target IPA symbol
 * @returns {object} Biometric measurements and responsive landmark bounding box percentages
 */
export function analyzeMouthCanvas(canvas, targetPhoneme = '/θ/') {
  const fallbackBox = { leftPercent: 50, topPercent: 52, widthPercent: 26, heightPercent: 15 };

  if (!canvas || typeof canvas.getContext !== 'function') {
    return {
      landmarkBox: fallbackBox,
      jawApertureMm: 3.5,
      lipWidthHeightRatio: 2.2,
      teethGapMm: 2.5,
      tongueProtrusionDetected: false
    };
  }

  try {
    const ctx = canvas.getContext('2d');
    const width = canvas.width || 640;
    const height = canvas.height || 480;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Search region for mouth in standard selfie portrait:
    // Horizontally centered (22% to 78%), vertically middle-face (38% to 72%)
    const minX = Math.floor(width * 0.22);
    const maxX = Math.floor(width * 0.78);
    const minY = Math.floor(height * 0.38);
    const maxY = Math.floor(height * 0.72);

    let sumLipX = 0;
    let sumLipY = 0;
    let lipPixelCount = 0;

    let minLipX = maxX;
    let maxLipX = minX;
    let minLipY = maxY;
    let maxLipY = minY;

    // Pass 1: Detect lip boundary & center via Red Chrominance Contrast (tolerant to low-light)
    for (let y = minY; y < maxY; y += 2) {
      for (let x = minX; x < maxX; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Red-dominant lip metric
        const lipChrominance = (2.0 * r - g - b) / (r + g + b + 1);
        const isRedDominant = r > 45 && (r > g * 1.12) && (r > b * 1.15);

        if (isRedDominant && lipChrominance > 0.08) {
          sumLipX += x;
          sumLipY += y;
          lipPixelCount++;
          if (x < minLipX) minLipX = x;
          if (x > maxLipX) maxLipX = x;
          if (y < minLipY) minLipY = y;
          if (y > maxLipY) maxLipY = y;
        }
      }
    }

    let mouthCenterX = width * 0.5;
    let mouthCenterY = height * 0.50;
    let mouthW = width * 0.28;
    let mouthH = height * 0.15;

    if (lipPixelCount > 35) {
      mouthCenterX = sumLipX / lipPixelCount;
      mouthCenterY = sumLipY / lipPixelCount;
      mouthW = Math.max(width * 0.20, Math.min(width * 0.48, (maxLipX - minLipX) * 1.25));
      mouthH = Math.max(height * 0.10, Math.min(height * 0.35, (maxLipY - minLipY) * 1.35));
    }

    // Pass 2: Inspect interior oral cavity for teeth gap and tongue protrusion
    const innerMinX = Math.floor(Math.max(minX, mouthCenterX - mouthW * 0.35));
    const innerMaxX = Math.floor(Math.min(maxX, mouthCenterX + mouthW * 0.35));
    const innerMinY = Math.floor(Math.max(minY, mouthCenterY - mouthH * 0.35));
    const innerMaxY = Math.floor(Math.min(maxY, mouthCenterY + mouthH * 0.45));

    let teethPixelCount = 0;
    let tonguePixelCount = 0;
    let darkCavityCount = 0;

    for (let y = innerMinY; y < innerMaxY; y += 2) {
      for (let x = innerMinX; x < innerMaxX; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Teeth: high luminance, neutral saturation
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const colorDelta = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
        if (luminance > 145 && colorDelta < 38) {
          teethPixelCount++;
        }

        // Tongue protrusion: distinct interdental fleshy pink/red
        if (r > 115 && r > g * 1.35 && (r - g) > 35 && b < 140) {
          tonguePixelCount++;
        }

        // Dark oral cavity
        if (luminance < 45) {
          darkCavityCount++;
        }
      }
    }

    // Determine if mouth is open vs closed
    const isMouthOpen = (darkCavityCount > 15 || teethPixelCount > 20 || (tonguePixelCount > 25 && mouthH > height * 0.10));
    const tongueProtrusionDetected = isMouthOpen && tonguePixelCount > 30;

    // Convert pixel dimensions to mm estimates (average mouth width = 50mm)
    const mmPerPx = 50.0 / Math.max(80, mouthW);

    let jawApertureMm;
    let teethGapMm;
    let lipWidthHeightRatio;

    if (!isMouthOpen) {
      // Closed mouth
      jawApertureMm = 1.0;
      teethGapMm = 0.5;
      lipWidthHeightRatio = Math.round((mouthW / Math.max(20, mouthH * 0.7)) * 100) / 100;
    } else {
      const verticalOpeningPx = Math.max(10, mouthH * (tongueProtrusionDetected ? 0.55 : 0.45));
      jawApertureMm = Math.round(verticalOpeningPx * mmPerPx * 10) / 10;
      teethGapMm = Math.round(Math.max(1.0, jawApertureMm * 0.45) * 10) / 10;
      lipWidthHeightRatio = Math.round((mouthW / Math.max(10, mouthH)) * 100) / 100;
    }

    const landmarkBox = {
      leftPercent: Math.round((mouthCenterX / width) * 1000) / 10,
      topPercent: Math.round((mouthCenterY / height) * 1000) / 10,
      widthPercent: Math.round((mouthW / width) * 1000) / 10,
      heightPercent: Math.round((mouthH / height) * 1000) / 10
    };

    return {
      landmarkBox,
      jawApertureMm,
      lipWidthHeightRatio,
      teethGapMm,
      tongueProtrusionDetected
    };
  } catch (err) {
    return {
      landmarkBox: fallbackBox,
      jawApertureMm: 3.5,
      lipWidthHeightRatio: 2.2,
      teethGapMm: 2.5,
      tongueProtrusionDetected: false
    };
  }
}

/**
 * Evaluate user's mouth snapshot metrics against standard anatomical profile
 * @param {string} phoneme Target IPA symbol
 * @param {object} clientMetrics Extracted geometric features from canvas
 * @returns {object} Evaluation results with deltas, score, status, L1 flags, and advice
 */
export function evaluateMouthSnapshot(phoneme, clientMetrics = {}) {
  const benchmark = getBenchmarkMetrics(phoneme);

  const userAperture = typeof clientMetrics.jawApertureMm === 'number'
    ? clientMetrics.jawApertureMm
    : (clientMetrics.jawAperturePx ? clientMetrics.jawAperturePx * 0.4 : 10.0);

  const userRatio = typeof clientMetrics.lipWidthHeightRatio === 'number'
    ? clientMetrics.lipWidthHeightRatio
    : 2.0;

  const userTeethGap = typeof clientMetrics.teethGapMm === 'number'
    ? clientMetrics.teethGapMm
    : (clientMetrics.teethGapPx ? clientMetrics.teethGapPx * 0.35 : 2.5);

  const userTongueDetected = Boolean(clientMetrics.tongueProtrusionDetected);
  const landmarkBox = clientMetrics.landmarkBox || { leftPercent: 50, topPercent: 50, widthPercent: 26, heightPercent: 15 };

  // Compute absolute deltas
  const apertureDeltaMm = Math.round((userAperture - benchmark.targetApertureMm) * 10) / 10;
  const ratioDelta = Math.round(Math.abs(userRatio - benchmark.targetWidthHeightRatio) * 100) / 100;
  const teethDeltaMm = Math.round(Math.abs(userTeethGap - benchmark.targetTeethGapMm) * 10) / 10;

  // Detect L1 Vietnamese articulatory mistakes
  let l1ErrorFlag = null;
  let feedbackText = 'Khẩu hình cơ môi, răng và đầu lưỡi của bạn rất chuẩn xác so với âm mẫu y khoa!';
  let summary = 'Khẩu hình đạt chuẩn y khoa';

  if (benchmark.tongueInterdentalRequired && (!userTongueDetected || userTeethGap < 1.0)) {
    l1ErrorFlag = 'RETRACTED_TONGUE';
    summary = 'Cần thò đầu lưỡi giữa 2 răng';
    feedbackText = 'Bạn chưa thò đầu lưỡi ra ngoài 2-3mm giữa 2 hàm răng. Hãy hé răng và kẹp nhẹ đầu lưỡi để phát âm chuẩn, tránh nói thành âm "thờ" hoặc "t".';
  } else if (benchmark.coronalType === 'round' && userRatio > 1.85) {
    l1ErrorFlag = 'UNPUCKERED_LIPS';
    summary = 'Cần chu tròn môi chữ O';
    feedbackText = `Khóe môi đang bị kéo dẹt (${userRatio.toFixed(1)}). Hãy chu môi tròn nhô ra phía trước để tạo ống cộng hưởng chuẩn cho âm ${benchmark.phoneme}.`;
  } else if (benchmark.coronalType === 'open' && userAperture < benchmark.targetApertureMm - 6.0) {
    l1ErrorFlag = 'INSUFFICIENT_JAW_DROP';
    summary = 'Hàm dưới mở chưa đủ sâu';
    feedbackText = `Hàm mở được ${userAperture.toFixed(1)}mm (chuẩn: ${benchmark.targetApertureMm}mm). Hãy hạ cằm xuống sâu thêm sao cho vừa 2 ngón tay đặt ngang giữa 2 hàm răng.`;
  } else if (benchmark.coronalType === 'spread' && userAperture > benchmark.targetApertureMm + 9.0) {
    l1ErrorFlag = 'EXCESSIVE_JAW_DROP';
    summary = 'Khẩu hình mở quá rộng';
    feedbackText = `Khẩu hình đang mở quá lớn (${userAperture.toFixed(1)}mm). Hãy khép hàm hẹp lại dưới 8mm và kéo dẹt khóe môi sang hai bên như cười mỉm.`;
  } else if ((benchmark.phoneme === '/θ/' || benchmark.phoneme === '/ð/') && apertureDeltaMm > 3.0) {
    l1ErrorFlag = 'EXCESSIVE_JAW_DROP';
    summary = `Hàm mở hơi rộng cho âm ${benchmark.phoneme}`;
    feedbackText = `Bạn đã thò đầu lưỡi, nhưng đang há miệng hơi rộng (${userAperture.toFixed(1)}mm so với chuẩn ${benchmark.targetApertureMm}mm). Hãy khép nhẹ cằm lại để kẹp nhẹ đầu lưỡi tự nhiên hơn.`;
  }

  // Calculate composite score (0 - 100)
  const apertureScore = Math.max(0, 100 - Math.abs(apertureDeltaMm) * 5.0);
  const ratioScore = Math.max(0, 100 - ratioDelta * 28.0);
  const teethScore = Math.max(0, 100 - teethDeltaMm * 8.0);
  const tonguePenalty = (benchmark.tongueInterdentalRequired && !userTongueDetected) ? 40 : 0;

  const rawScore = (apertureScore * 0.45 + ratioScore * 0.35 + teethScore * 0.2) - tonguePenalty;
  const similarityScore = Math.min(100, Math.max(15, Math.round(rawScore)));

  // Categorize status
  let status = 'NEEDS_ADJUSTMENT';
  if (similarityScore >= 85 && !l1ErrorFlag) {
    status = 'EXCELLENT';
  } else if (similarityScore < 60) {
    status = 'POOR';
  }

  // If score is not excellent and no primary L1 error flag was assigned, explain what to adjust
  if (status !== 'EXCELLENT' && !l1ErrorFlag) {
    if (apertureDeltaMm > 3.0) {
      l1ErrorFlag = 'JAW_TOO_OPEN';
      summary = 'Độ mở hàm hơi rộng';
      feedbackText = `Độ mở hàm đang rộng hơn chuẩn +${apertureDeltaMm}mm. Hãy khép nhẹ cằm lại để phát âm chính xác hơn.`;
    } else if (apertureDeltaMm < -3.0) {
      l1ErrorFlag = 'JAW_TOO_CLOSED';
      summary = 'Độ mở hàm hơi hẹp';
      feedbackText = `Độ mở hàm đang hẹp hơn chuẩn ${Math.abs(apertureDeltaMm)}mm. Hãy hé mở cằm thêm một chút.`;
    } else if (ratioDelta > 0.45) {
      l1ErrorFlag = 'LIP_SHAPE_MISMATCH';
      summary = 'Khóe môi chưa đúng hình thái';
      feedbackText = `Tỷ lệ khóe môi đang lệch ${ratioDelta}. Hãy quan sát mô hình 2D bên cạnh để điều chỉnh độ chu hoặc dẹt của cơ môi.`;
    } else {
      l1ErrorFlag = 'NEEDS_REFINEMENT';
      summary = 'Cần tinh chỉnh nhẹ khẩu hình';
      feedbackText = 'Khẩu hình gần đạt chuẩn, hãy đối chiếu khung viền với mô hình 2D chuẩn để đạt điểm tối đa.';
    }
  }

  return {
    phoneme: benchmark.phoneme,
    similarityScore,
    status,
    metrics: {
      userApertureMm: Math.round(userAperture * 10) / 10,
      targetApertureMm: benchmark.targetApertureMm,
      apertureDeltaMm,
      userRatio: Math.round(userRatio * 100) / 100,
      targetRatio: benchmark.targetWidthHeightRatio,
      ratioDelta,
      userTeethGapMm: Math.round(userTeethGap * 10) / 10,
      targetTeethGapMm: benchmark.targetTeethGapMm,
      teethDeltaMm,
      interdentalTongueDetected: userTongueDetected,
      tongueRequired: benchmark.tongueInterdentalRequired,
      landmarkBox,
      jawOpenScore: clientMetrics.jawOpenScore ?? null,
      mouthPuckerScore: clientMetrics.mouthPuckerScore ?? null,
      provider: clientMetrics.provider ?? 'client_vision'
    },
    feedback: {
      summary,
      actionAdvice: feedbackText,
      l1ErrorFlag
    }
  };
}
