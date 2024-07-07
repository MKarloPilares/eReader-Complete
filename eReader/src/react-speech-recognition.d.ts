declare module 'react-speech-recognition' {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    lang?: string;
    interimResults?: boolean;
    maxAlternatives?: number;
    onResult?: (event: SpeechRecognitionEvent) => void;
    onEnd?: () => void;
    onError?: (event: SpeechRecognitionError) => void;
  }

  export interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  export interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
    item(index: number): SpeechRecognitionResult;
  }

  export interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
    length: number;
  }

  export interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  export const useSpeechRecognition: () => {
    listening: boolean;
    supported: boolean;
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    resetTranscript: () => void;
    listen: () => void;
    stopListening: () => void;
  };

  export const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => void;
    abortListening: () => void;
    stopListening: () => void;
  };
}
