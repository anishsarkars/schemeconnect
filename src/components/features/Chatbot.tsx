import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Loader2,
  ExternalLink,
  Shield
} from 'lucide-react';
import { sampleSchemes, searchSchemes } from '@/data/sampleSchemes';
import { Scheme } from '@/types/scheme';
import { GeminiFactCheckService } from '@/lib/gemini';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  factCheck?: {
    isVerified: boolean;
    confidence: number;
    source?: string;
    warning?: string;
  };
  relatedSchemes?: Scheme[];
}

interface ChatbotProps {
  className?: string;
}

export const Chatbot = ({ className }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'bot',
        content: 'Hello! I\'m your Government Schemes Assistant. I can help you find information about various government schemes and yojanas, verify facts, and provide accurate details. What would you like to know?',
        timestamp: new Date(),
        factCheck: {
          isVerified: true,
          confidence: 100,
          source: 'System'
        }
      }]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const processQuery = async (query: string) => {
    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await generateResponse(query);
    const factCheck = await performFactCheck(query, response);
    const relatedSchemes = findRelatedSchemes(query);
    
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      factCheck,
      relatedSchemes
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const generateResponse = async (query: string): Promise<string> => {
    const lowerQuery = query.toLowerCase();
    
    // Check if this is a fact-checking question
    if (lowerQuery.includes('fact check') || lowerQuery.includes('verify') || lowerQuery.includes('true') || lowerQuery.includes('false')) {
      try {
        return await GeminiFactCheckService.chatFactCheck(query);
      } catch (error) {
        console.error('Gemini API error:', error);
        return 'I apologize, but I encountered an error while fact-checking. Please try again later.';
      }
    }
    
    // Search for relevant schemes
    const relevantSchemes = searchSchemes(query);
    
    if (relevantSchemes.length > 0) {
      const scheme = relevantSchemes[0];
      return `I found information about "${scheme.title}". ${scheme.description} 

**Key Details:**
- **Category:** ${scheme.category}
- **Status:** ${scheme.status}
- **Eligibility:** ${scheme.eligibility.slice(0, 3).join(', ')}
- **Application Deadline:** ${scheme.applicationDeadline.toLocaleDateString()}
- **Beneficiaries:** ${scheme.beneficiaryCount?.toLocaleString() || 'N/A'} people

${scheme.isVerified ? '✅ This scheme is verified and authentic.' : '⚠️ Please verify this information independently.'}`;
    }
    
    // Use Gemini for general queries about government schemes
    try {
      return await GeminiFactCheckService.chatFactCheck(query);
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback to local responses
      if (lowerQuery.includes('scholarship') || lowerQuery.includes('education')) {
        return `I found several education schemes available:

1. **PM Scholarship Scheme 2024** - Financial assistance for meritorious students
2. **Beti Bachao Beti Padhao** - Girl child education initiative
3. **Skill India Mission** - Skill development programs

All these schemes are currently active and accepting applications. Would you like detailed information about any specific scheme?`;
      }
      
      return `I can help you with information about various government schemes including:
- Education and scholarship programs
- Health and medical coverage schemes
- Agricultural and farmer support programs
- Housing and urban development schemes
- Women empowerment initiatives
- Skill development programs

Please ask me about any specific scheme or category you're interested in!`;
    }
  };

  const performFactCheck = async (query: string, response: string) => {
    try {
      // Use Gemini API for fact-checking
      const factCheckResult = await GeminiFactCheckService.factCheckContent({
        content: `${query}\n\nResponse: ${response}`,
        type: 'text'
      });
      
      return {
        isVerified: factCheckResult.isVerified,
        confidence: factCheckResult.confidence,
        source: 'Gemini AI Fact-Check',
        warning: factCheckResult.verdict === 'unverified' ? 'Please verify this information from official sources' : undefined
      };
    } catch (error) {
      console.error('Fact-checking error:', error);
      
      // Fallback to basic fact-checking
      const lowerQuery = query.toLowerCase();
      const lowerResponse = response.toLowerCase();
      
      const hasVerifiedInfo = lowerResponse.includes('verified') || 
                             lowerResponse.includes('authentic') || 
                             lowerResponse.includes('government');
      
      const hasWarningSigns = lowerQuery.includes('fake') || 
                             lowerQuery.includes('scam') || 
                             lowerResponse.includes('unverified');
      
      let confidence = 85;
      let warning = '';
      
      if (hasVerifiedInfo) {
        confidence = 95;
      }
      
      if (hasWarningSigns) {
        confidence = 60;
        warning = 'Please verify this information from official government sources';
      }
      
      return {
        isVerified: confidence > 80,
        confidence,
        source: 'Basic Analysis',
        warning: warning || undefined
      };
    }
  };

  const findRelatedSchemes = (query: string): Scheme[] => {
    return searchSchemes(query).slice(0, 3);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    processQuery(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getFactCheckIcon = (factCheck: ChatMessage['factCheck']) => {
    if (!factCheck) return null;
    
    if (factCheck.isVerified && factCheck.confidence > 90) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (factCheck.confidence > 70) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getFactCheckBadge = (factCheck: ChatMessage['factCheck']) => {
    if (!factCheck) return null;
    
    const variant = factCheck.isVerified && factCheck.confidence > 90 ? 'default' : 
                   factCheck.confidence > 70 ? 'secondary' : 'destructive';
    
    return (
      <Badge variant={variant} className="text-xs">
        {factCheck.confidence}% Verified
      </Badge>
    );
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
          data-chatbot-trigger
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>Scheme Assistant</span>
                <Shield className="h-4 w-4 text-green-500" />
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          
                          {message.factCheck && (
                            <div className="mt-2 flex items-center space-x-2">
                              {getFactCheckIcon(message.factCheck)}
                              {getFactCheckBadge(message.factCheck)}
                              {message.factCheck.warning && (
                                <span className="text-xs text-yellow-600">
                                  {message.factCheck.warning}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {message.relatedSchemes && message.relatedSchemes.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <Separator />
                              <p className="text-xs font-medium text-muted-foreground">
                                Related Schemes:
                              </p>
                              {message.relatedSchemes.map((scheme) => (
                                <div
                                  key={scheme.id}
                                  className="text-xs p-2 bg-background rounded border"
                                >
                                  <div className="font-medium">{scheme.title}</div>
                                  <div className="text-muted-foreground mt-1">
                                    {scheme.description.substring(0, 100)}...
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {scheme.status}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs"
                                      onClick={() => window.open(scheme.applyLink, '_blank')}
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Apply
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Fact-checking and searching...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about government schemes..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
