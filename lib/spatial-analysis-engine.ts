export interface SpatialObject {
  id: string
  type: "person" | "face" | "object" | "text" | "background"
  label: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  attributes: {
    [key: string]: any
  }
}

export interface FaceAnalysis {
  id: string
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  landmarks: {
    leftEye: { x: number; y: number }
    rightEye: { x: number; y: number }
    nose: { x: number; y: number }
    leftMouth: { x: number; y: number }
    rightMouth: { x: number; y: number }
  }
  attributes: {
    age: number
    gender: "male" | "female"
    emotion: string
    pose: {
      yaw: number
      pitch: number
      roll: number
    }
    quality: {
      sharpness: number
      lighting: number
      occlusion: number
    }
  }
  deepfakeIndicators: {
    eyeInconsistency: number
    skinTexture: number
    lightingAnomalies: number
    facialSymmetry: number
    blinkPattern: number
    microExpressions: number
  }
}

export interface SpatialAnalysisResult {
  sceneDescription: string
  objects: SpatialObject[]
  faces: FaceAnalysis[]
  technicalAnalysis: {
    resolution: { width: number; height: number }
    colorSpace: string
    compression: string
    noise: number
    sharpness: number
    lighting: {
      overall: "natural" | "artificial" | "mixed" | "inconsistent"
      shadows: "consistent" | "inconsistent" | "missing"
      highlights: "natural" | "artificial"
    }
  }
  deepfakeEvidence: {
    type: "supporting" | "contradicting"
    description: string
    confidence: number
    visualEvidence: {
      x: number
      y: number
      width: number
      height: number
      description: string
    }[]
  }[]
  reasoning: {
    summary: string
    keyFactors: string[]
    technicalDetails: string[]
    conclusion: string
  }
}

export class SpatialAnalysisEngine {
  private demoCounter = 0 // For demo purposes - every 2nd upload will be deepfake

  async analyzeSpatialContent(file: File, canvas?: HTMLCanvasElement): Promise<SpatialAnalysisResult> {
    // Increment demo counter
    this.demoCounter++
    const isDemoDeepfake = this.demoCounter % 2 === 0

    if (file.type.startsWith("image/")) {
      return await this.analyzeImage(file, isDemoDeepfake)
    } else if (file.type.startsWith("video/")) {
      return await this.analyzeVideo(file, isDemoDeepfake)
    } else if (file.type.startsWith("audio/")) {
      return await this.analyzeAudio(file, isDemoDeepfake)
    }

    throw new Error("Unsupported file type for spatial analysis")
  }

  private async analyzeImage(file: File, isDemoDeepfake: boolean): Promise<SpatialAnalysisResult> {
    // Load and analyze image
    const img = await this.loadImage(file)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    // Simulate object detection
    const objects = await this.detectObjects(canvas, isDemoDeepfake)

    // Simulate face detection and analysis
    const faces = await this.analyzeFaces(canvas, isDemoDeepfake)

    // Technical analysis
    const technicalAnalysis = await this.performTechnicalAnalysis(canvas, isDemoDeepfake)

    // Generate scene description
    const sceneDescription = this.generateSceneDescription(objects, faces, isDemoDeepfake)

    // Generate deepfake evidence
    const deepfakeEvidence = this.generateDeepfakeEvidence(faces, technicalAnalysis, isDemoDeepfake)

    // Generate reasoning
    const reasoning = this.generateReasoning(objects, faces, technicalAnalysis, deepfakeEvidence, isDemoDeepfake)

    return {
      sceneDescription,
      objects,
      faces,
      technicalAnalysis,
      deepfakeEvidence,
      reasoning,
    }
  }

  private async analyzeVideo(file: File, isDemoDeepfake: boolean): Promise<SpatialAnalysisResult> {
    // For video, analyze key frames
    const video = await this.loadVideo(file)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Analyze first frame for spatial content
    video.currentTime = 1
    await new Promise((resolve) => (video.onseeked = resolve))
    ctx.drawImage(video, 0, 0)

    // Similar analysis to image but with temporal considerations
    const objects = await this.detectObjects(canvas, isDemoDeepfake)
    const faces = await this.analyzeFaces(canvas, isDemoDeepfake)
    const technicalAnalysis = await this.performTechnicalAnalysis(canvas, isDemoDeepfake)

    // Add temporal analysis for video
    const temporalAnalysis = await this.analyzeTemporalConsistency(video, isDemoDeepfake)

    const sceneDescription = this.generateVideoSceneDescription(objects, faces, temporalAnalysis, isDemoDeepfake)
    const deepfakeEvidence = this.generateVideoDeepfakeEvidence(
      faces,
      technicalAnalysis,
      temporalAnalysis,
      isDemoDeepfake,
    )
    const reasoning = this.generateVideoReasoning(
      objects,
      faces,
      technicalAnalysis,
      deepfakeEvidence,
      temporalAnalysis,
      isDemoDeepfake,
    )

    return {
      sceneDescription,
      objects,
      faces,
      technicalAnalysis,
      deepfakeEvidence,
      reasoning,
    }
  }

  private async analyzeAudio(file: File, isDemoDeepfake: boolean): Promise<SpatialAnalysisResult> {
    // For audio, focus on spectral and voice analysis
    const audioContext = new AudioContext()
    const arrayBuffer = await file.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    // Simulate voice analysis
    const voiceAnalysis = await this.analyzeVoiceCharacteristics(audioBuffer, isDemoDeepfake)

    const sceneDescription = this.generateAudioSceneDescription(voiceAnalysis, isDemoDeepfake)
    const deepfakeEvidence = this.generateAudioDeepfakeEvidence(voiceAnalysis, isDemoDeepfake)
    const reasoning = this.generateAudioReasoning(voiceAnalysis, deepfakeEvidence, isDemoDeepfake)

    return {
      sceneDescription,
      objects: [], // No visual objects in audio
      faces: [], // No faces in audio
      technicalAnalysis: {
        resolution: { width: 0, height: 0 },
        colorSpace: "N/A",
        compression: "Audio compression detected",
        noise: voiceAnalysis.noiseLevel,
        sharpness: 0,
        lighting: {
          overall: "natural",
          shadows: "consistent",
          highlights: "natural",
        },
      },
      deepfakeEvidence,
      reasoning,
    }
  }

  private async detectObjects(canvas: HTMLCanvasElement, isDemoDeepfake: boolean): Promise<SpatialObject[]> {
    // Simulate object detection
    await new Promise((resolve) => setTimeout(resolve, 200))

    const objects: SpatialObject[] = []
    const width = canvas.width
    const height = canvas.height

    // Simulate detecting a person
    objects.push({
      id: "person_1",
      type: "person",
      label: "Person",
      confidence: 0.95,
      boundingBox: {
        x: width * 0.3,
        y: height * 0.1,
        width: width * 0.4,
        height: height * 0.8,
      },
      attributes: {
        clothing: "casual wear",
        posture: "standing",
        visibility: "full body",
      },
    })

    // Add background objects
    objects.push({
      id: "background_1",
      type: "background",
      label: isDemoDeepfake ? "Indoor setting with inconsistent lighting" : "Natural indoor setting",
      confidence: 0.88,
      boundingBox: {
        x: 0,
        y: 0,
        width: width,
        height: height,
      },
      attributes: {
        setting: "indoor",
        lighting: isDemoDeepfake ? "artificial and inconsistent" : "natural",
        complexity: "moderate",
      },
    })

    return objects
  }

  private async analyzeFaces(canvas: HTMLCanvasElement, isDemoDeepfake: boolean): Promise<FaceAnalysis[]> {
    // Simulate face detection and analysis
    await new Promise((resolve) => setTimeout(resolve, 300))

    const width = canvas.width
    const height = canvas.height

    const face: FaceAnalysis = {
      id: "face_1",
      boundingBox: {
        x: width * 0.35,
        y: height * 0.15,
        width: width * 0.3,
        height: width * 0.3,
      },
      landmarks: {
        leftEye: { x: width * 0.42, y: height * 0.25 },
        rightEye: { x: width * 0.58, y: height * 0.25 },
        nose: { x: width * 0.5, y: height * 0.32 },
        leftMouth: { x: width * 0.46, y: height * 0.38 },
        rightMouth: { x: width * 0.54, y: height * 0.38 },
      },
      attributes: {
        age: 28 + Math.floor(Math.random() * 10),
        gender: Math.random() > 0.5 ? "male" : "female",
        emotion: isDemoDeepfake ? "neutral (artificially generated)" : "natural smile",
        pose: {
          yaw: isDemoDeepfake ? 15 : 5,
          pitch: isDemoDeepfake ? -10 : 2,
          roll: isDemoDeepfake ? 8 : 1,
        },
        quality: {
          sharpness: isDemoDeepfake ? 0.6 : 0.9,
          lighting: isDemoDeepfake ? 0.4 : 0.85,
          occlusion: 0.1,
        },
      },
      deepfakeIndicators: {
        eyeInconsistency: isDemoDeepfake ? 0.8 : 0.1,
        skinTexture: isDemoDeepfake ? 0.75 : 0.15,
        lightingAnomalies: isDemoDeepfake ? 0.85 : 0.2,
        facialSymmetry: isDemoDeepfake ? 0.9 : 0.1,
        blinkPattern: isDemoDeepfake ? 0.7 : 0.05,
        microExpressions: isDemoDeepfake ? 0.8 : 0.1,
      },
    }

    return [face]
  }

  private async performTechnicalAnalysis(
    canvas: HTMLCanvasElement,
    isDemoDeepfake: boolean,
  ): Promise<SpatialAnalysisResult["technicalAnalysis"]> {
    // Simulate technical analysis
    await new Promise((resolve) => setTimeout(resolve, 150))

    return {
      resolution: { width: canvas.width, height: canvas.height },
      colorSpace: "sRGB",
      compression: isDemoDeepfake ? "Heavy compression artifacts detected" : "Standard JPEG compression",
      noise: isDemoDeepfake ? 0.7 : 0.2,
      sharpness: isDemoDeepfake ? 0.4 : 0.8,
      lighting: {
        overall: isDemoDeepfake ? "inconsistent" : "natural",
        shadows: isDemoDeepfake ? "inconsistent" : "consistent",
        highlights: isDemoDeepfake ? "artificial" : "natural",
      },
    }
  }

  private generateSceneDescription(objects: SpatialObject[], faces: FaceAnalysis[], isDemoDeepfake: boolean): string {
    const person = objects.find((obj) => obj.type === "person")
    const face = faces[0]

    if (isDemoDeepfake) {
      return `The image shows a ${face?.attributes.gender} person in an indoor setting. However, several anomalies are detected: the facial features show signs of artificial generation, with inconsistent lighting across the face that doesn't match the environment. The skin texture appears unnaturally smooth in some areas while showing compression artifacts in others. The eye regions display asymmetrical characteristics typical of deepfake generation, and the overall facial geometry suggests digital manipulation.`
    } else {
      return `The image shows a ${face?.attributes.gender} person in a natural indoor setting. The subject appears to be ${face?.attributes.age} years old with a ${face?.attributes.emotion}. The lighting is consistent throughout the scene, with natural shadows and highlights that match the environment. The facial features show natural asymmetry and skin texture consistent with authentic photography. No signs of digital manipulation or artificial generation are detected.`
    }
  }

  private generateVideoSceneDescription(
    objects: SpatialObject[],
    faces: FaceAnalysis[],
    temporalAnalysis: any,
    isDemoDeepfake: boolean,
  ): string {
    const face = faces[0]

    if (isDemoDeepfake) {
      return `This video shows a ${face?.attributes.gender} person speaking or moving in an indoor environment. Critical temporal inconsistencies are detected throughout the sequence: facial features flicker between frames, lighting conditions change unnaturally, and the lip-sync appears artificially generated. The face shows signs of being digitally swapped or generated, with temporal artifacts typical of deepfake video generation techniques.`
    } else {
      return `This video shows a ${face?.attributes.gender} person in a natural setting. The temporal consistency is maintained throughout the sequence, with natural facial movements, consistent lighting, and authentic lip-sync patterns. The facial expressions and micro-movements appear genuine and consistent with natural human behavior.`
    }
  }

  private generateAudioSceneDescription(voiceAnalysis: any, isDemoDeepfake: boolean): string {
    if (isDemoDeepfake) {
      return `This audio contains synthesized speech with artificial voice characteristics. The spectral analysis reveals frequency patterns consistent with AI voice generation, including unnatural formant transitions, missing vocal tract resonances, and digital artifacts in the high-frequency range. The prosody and intonation patterns show signs of artificial generation.`
    } else {
      return `This audio contains natural human speech with authentic vocal characteristics. The spectral analysis shows natural formant patterns, consistent vocal tract resonances, and organic frequency variations typical of human speech production. The prosody and breathing patterns are consistent with natural speech.`
    }
  }

  private generateDeepfakeEvidence(
    faces: FaceAnalysis[],
    technicalAnalysis: any,
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["deepfakeEvidence"] {
    if (isDemoDeepfake) {
      const face = faces[0]
      return [
        {
          type: "supporting",
          description: "Facial asymmetry inconsistent with natural human features",
          confidence: 0.85,
          visualEvidence: [
            {
              x: face.boundingBox.x,
              y: face.boundingBox.y,
              width: face.boundingBox.width,
              height: face.boundingBox.height,
              description: "Face region showing artificial generation artifacts",
            },
          ],
        },
        {
          type: "supporting",
          description: "Lighting inconsistencies around facial features",
          confidence: 0.78,
          visualEvidence: [
            {
              x: face.landmarks.leftEye.x - 20,
              y: face.landmarks.leftEye.y - 15,
              width: 40,
              height: 30,
              description: "Eye region with inconsistent lighting",
            },
          ],
        },
        {
          type: "supporting",
          description: "Unnatural skin texture patterns",
          confidence: 0.82,
          visualEvidence: [
            {
              x: face.landmarks.nose.x - 25,
              y: face.landmarks.nose.y - 20,
              width: 50,
              height: 40,
              description: "Cheek area showing artificial skin texture",
            },
          ],
        },
      ]
    } else {
      return [
        {
          type: "contradicting",
          description: "Natural facial asymmetry consistent with authentic human features",
          confidence: 0.92,
          visualEvidence: [],
        },
        {
          type: "contradicting",
          description: "Consistent lighting throughout facial features",
          confidence: 0.88,
          visualEvidence: [],
        },
        {
          type: "contradicting",
          description: "Natural skin texture and pore patterns",
          confidence: 0.9,
          visualEvidence: [],
        },
      ]
    }
  }

  private generateVideoDeepfakeEvidence(
    faces: FaceAnalysis[],
    technicalAnalysis: any,
    temporalAnalysis: any,
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["deepfakeEvidence"] {
    if (isDemoDeepfake) {
      return [
        {
          type: "supporting",
          description: "Temporal inconsistencies in facial features between frames",
          confidence: 0.87,
          visualEvidence: [
            {
              x: faces[0]?.boundingBox.x || 0,
              y: faces[0]?.boundingBox.y || 0,
              width: faces[0]?.boundingBox.width || 0,
              height: faces[0]?.boundingBox.height || 0,
              description: "Face region showing frame-to-frame inconsistencies",
            },
          ],
        },
        {
          type: "supporting",
          description: "Artificial lip-sync patterns detected",
          confidence: 0.83,
          visualEvidence: [
            {
              x: (faces[0]?.landmarks.leftMouth.x || 0) - 30,
              y: (faces[0]?.landmarks.leftMouth.y || 0) - 15,
              width: 60,
              height: 30,
              description: "Mouth region showing artificial lip movement",
            },
          ],
        },
      ]
    } else {
      return [
        {
          type: "contradicting",
          description: "Consistent temporal flow in facial features",
          confidence: 0.91,
          visualEvidence: [],
        },
        {
          type: "contradicting",
          description: "Natural lip-sync and facial movement patterns",
          confidence: 0.89,
          visualEvidence: [],
        },
      ]
    }
  }

  private generateAudioDeepfakeEvidence(
    voiceAnalysis: any,
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["deepfakeEvidence"] {
    if (isDemoDeepfake) {
      return [
        {
          type: "supporting",
          description: "Artificial formant patterns in voice spectrum",
          confidence: 0.84,
          visualEvidence: [],
        },
        {
          type: "supporting",
          description: "Missing natural vocal tract resonances",
          confidence: 0.79,
          visualEvidence: [],
        },
      ]
    } else {
      return [
        {
          type: "contradicting",
          description: "Natural formant patterns consistent with human speech",
          confidence: 0.93,
          visualEvidence: [],
        },
      ]
    }
  }

  private generateReasoning(
    objects: SpatialObject[],
    faces: FaceAnalysis[],
    technicalAnalysis: any,
    deepfakeEvidence: any[],
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["reasoning"] {
    if (isDemoDeepfake) {
      return {
        summary:
          "Multiple indicators suggest this content has been artificially generated or manipulated using deepfake technology.",
        keyFactors: [
          "Facial features show signs of digital generation",
          "Lighting inconsistencies across the face",
          "Unnatural skin texture patterns",
          "Asymmetrical characteristics typical of AI generation",
          "Technical artifacts consistent with deepfake methods",
        ],
        technicalDetails: [
          `Face quality metrics: Sharpness ${(faces[0]?.attributes.quality.sharpness * 100).toFixed(1)}%, Lighting ${(faces[0]?.attributes.quality.lighting * 100).toFixed(1)}%`,
          `Deepfake indicators: Eye inconsistency ${(faces[0]?.deepfakeIndicators.eyeInconsistency * 100).toFixed(1)}%, Skin texture ${(faces[0]?.deepfakeIndicators.skinTexture * 100).toFixed(1)}%`,
          `Technical analysis: ${technicalAnalysis.compression}, Noise level ${(technicalAnalysis.noise * 100).toFixed(1)}%`,
        ],
        conclusion:
          "Based on comprehensive spatial and technical analysis, this content shows strong evidence of being artificially generated. The combination of facial inconsistencies, lighting anomalies, and technical artifacts indicates the use of deepfake or similar AI generation technology.",
      }
    } else {
      return {
        summary: "Analysis indicates this content is authentic with no signs of artificial generation or manipulation.",
        keyFactors: [
          "Natural facial asymmetry and features",
          "Consistent lighting throughout the image",
          "Authentic skin texture and pore patterns",
          "No temporal inconsistencies detected",
          "Technical characteristics consistent with genuine photography",
        ],
        technicalDetails: [
          `Face quality metrics: Sharpness ${(faces[0]?.attributes.quality.sharpness * 100).toFixed(1)}%, Lighting ${(faces[0]?.attributes.quality.lighting * 100).toFixed(1)}%`,
          `Authenticity indicators: All deepfake markers below threshold`,
          `Technical analysis: ${technicalAnalysis.compression}, Normal noise levels`,
        ],
        conclusion:
          "Comprehensive spatial analysis confirms this content is authentic. All technical and visual indicators support genuine content creation without artificial manipulation or generation.",
      }
    }
  }

  private async analyzeTemporalConsistency(video: HTMLVideoElement, isDemoDeepfake: boolean): Promise<any> {
    // Simulate temporal analysis
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      frameConsistency: isDemoDeepfake ? 0.4 : 0.9,
      motionFlow: isDemoDeepfake ? 0.3 : 0.85,
      lipSync: isDemoDeepfake ? 0.2 : 0.9,
    }
  }

  private async analyzeVoiceCharacteristics(audioBuffer: AudioBuffer, isDemoDeepfake: boolean): Promise<any> {
    // Simulate voice analysis
    await new Promise((resolve) => setTimeout(resolve, 150))

    return {
      formantPatterns: isDemoDeepfake ? 0.3 : 0.9,
      spectralConsistency: isDemoDeepfake ? 0.4 : 0.85,
      noiseLevel: isDemoDeepfake ? 0.6 : 0.2,
      prosody: isDemoDeepfake ? 0.35 : 0.88,
    }
  }

  private generateVideoReasoning(
    objects: SpatialObject[],
    faces: FaceAnalysis[],
    technicalAnalysis: any,
    deepfakeEvidence: any[],
    temporalAnalysis: any,
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["reasoning"] {
    if (isDemoDeepfake) {
      return {
        summary:
          "Video analysis reveals multiple temporal and spatial inconsistencies indicating deepfake manipulation.",
        keyFactors: [
          "Temporal inconsistencies between frames",
          "Artificial lip-sync patterns",
          "Facial feature flickering",
          "Inconsistent lighting across frames",
          "Motion flow anomalies",
        ],
        technicalDetails: [
          `Temporal consistency: ${(temporalAnalysis.frameConsistency * 100).toFixed(1)}%`,
          `Lip-sync accuracy: ${(temporalAnalysis.lipSync * 100).toFixed(1)}%`,
          `Motion flow: ${(temporalAnalysis.motionFlow * 100).toFixed(1)}%`,
        ],
        conclusion:
          "Video analysis confirms artificial generation with strong temporal and spatial evidence of deepfake manipulation.",
      }
    } else {
      return {
        summary: "Video shows consistent temporal and spatial characteristics of authentic content.",
        keyFactors: [
          "Consistent temporal flow",
          "Natural lip-sync patterns",
          "Stable facial features across frames",
          "Consistent lighting and shadows",
          "Natural motion patterns",
        ],
        technicalDetails: [
          `Temporal consistency: ${(temporalAnalysis.frameConsistency * 100).toFixed(1)}%`,
          `Lip-sync accuracy: ${(temporalAnalysis.lipSync * 100).toFixed(1)}%`,
          `Motion flow: ${(temporalAnalysis.motionFlow * 100).toFixed(1)}%`,
        ],
        conclusion: "Video analysis confirms authentic content with natural temporal and spatial characteristics.",
      }
    }
  }

  private generateAudioReasoning(
    voiceAnalysis: any,
    deepfakeEvidence: any[],
    isDemoDeepfake: boolean,
  ): SpatialAnalysisResult["reasoning"] {
    if (isDemoDeepfake) {
      return {
        summary: "Audio analysis reveals artificial voice generation characteristics.",
        keyFactors: [
          "Artificial formant patterns",
          "Missing vocal tract resonances",
          "Unnatural prosody patterns",
          "Digital generation artifacts",
        ],
        technicalDetails: [
          `Formant patterns: ${(voiceAnalysis.formantPatterns * 100).toFixed(1)}% natural`,
          `Spectral consistency: ${(voiceAnalysis.spectralConsistency * 100).toFixed(1)}%`,
          `Prosody naturalness: ${(voiceAnalysis.prosody * 100).toFixed(1)}%`,
        ],
        conclusion: "Audio analysis indicates artificial voice generation using AI synthesis technology.",
      }
    } else {
      return {
        summary: "Audio shows natural human speech characteristics.",
        keyFactors: [
          "Natural formant patterns",
          "Consistent vocal tract resonances",
          "Authentic prosody and intonation",
          "Natural breathing patterns",
        ],
        technicalDetails: [
          `Formant patterns: ${(voiceAnalysis.formantPatterns * 100).toFixed(1)}% natural`,
          `Spectral consistency: ${(voiceAnalysis.spectralConsistency * 100).toFixed(1)}%`,
          `Prosody naturalness: ${(voiceAnalysis.prosody * 100).toFixed(1)}%`,
        ],
        conclusion: "Audio analysis confirms authentic human speech with natural vocal characteristics.",
      }
    }
  }

  private async loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  private async loadVideo(file: File): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.onloadedmetadata = () => resolve(video)
      video.onerror = reject
      video.src = URL.createObjectURL(file)
    })
  }

  resetDemoCounter(): void {
    this.demoCounter = 0
  }

  getDemoCounter(): number {
    return this.demoCounter
  }
}

export const spatialAnalysisEngine = new SpatialAnalysisEngine()
