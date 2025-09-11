import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  className?: string;
}

export const VoiceAssistant = ({ className }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionConstructor();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceQuery(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  const startListening = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (recognitionRef.current) {
        setTranscript('');
        setResponse('');
        recognitionRef.current.start();
      }
    } catch (error) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice assistant.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceQuery = async (query: string) => {
    try {
      // Mock AI processing - replace with actual API call
      const mockResponse = generateMockResponse(query);
      setResponse(mockResponse);
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(mockResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error processing voice query:', error);
      toast({
        title: "Processing Error",
        description: "Unable to process your query. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('education') || lowerQuery.includes('scholarship')) {
      return "I found 5 active education schemes including PM Scholarship for students. The application deadline is March 31st, 2024.";
    } else if (lowerQuery.includes('health') || lowerQuery.includes('medical')) {
      return "There are 3 health schemes available including Ayushman Bharat for free medical coverage up to 5 lakh rupees.";
    } else if (lowerQuery.includes('agriculture') || lowerQuery.includes('farmer')) {
      return "PM Kisan Yojana provides 6000 rupees annually to farmers. Current applications are open until next month.";
    } else {
      return "I found several government schemes that might interest you. Would you like me to show you schemes by category or location?";
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={isListening ? "destructive" : "secondary"}
        size="sm"
        onClick={isListening ? stopListening : startListening}
        className="relative overflow-hidden"
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4 mr-2" />
            <span className="relative z-10">Listening...</span>
            <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            Voice Assistant
          </>
        )}
      </Button>

      {/* Voice interaction panel */}
      {(transcript || response) && (
        <Card className="absolute top-full right-0 mt-2 w-80 z-50 shadow-card-hover">
          <CardContent className="p-4 space-y-4">
            {transcript && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">You said:</span>
                </div>
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  "{transcript}"
                </p>
              </div>
            )}

            {response && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">Assistant:</span>
                  </div>
                  {isPlaying && (
                    <Button variant="ghost" size="sm" onClick={stopSpeaking}>
                      <VolumeX className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm bg-secondary/10 p-2 rounded border-l-2 border-secondary">
                  {response}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};