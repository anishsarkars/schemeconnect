import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Link as LinkIcon, FileText, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface FactCheckResult {
  id: string;
  url: string;
  title: string;
  status: 'verified' | 'false' | 'misleading' | 'unverified';
  confidence: number;
  sources: string[];
  summary: string;
  timestamp: Date;
}

export default function FactCheck() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<FactCheckResult[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);
    try {
      // Simulate API call for fact-checking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult: FactCheckResult = {
        id: Date.now().toString(),
        url: url,
        title: `Fact-check: ${url}`,
        status: Math.random() > 0.5 ? 'verified' : 'misleading',
        confidence: Math.floor(Math.random() * 40) + 60,
        sources: [
          'Reuters Fact Check',
          'Snopes',
          'PolitiFact',
          'FactCheck.org'
        ],
        summary: 'This content has been analyzed by multiple fact-checking organizations. The claims made in this article have been cross-referenced with official sources and expert opinions.',
        timestamp: new Date()
      };

      setResults(prev => [mockResult, ...prev]);
      setUrl('');
      toast({
        title: t('factCheck.toast.analysisComplete'),
        description: t('factCheck.toast.analysisCompleteDesc'),
      });
    } catch (error) {
      toast({
        title: t('factCheck.toast.error'),
        description: t('factCheck.toast.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: FactCheckResult = {
        id: Date.now().toString(),
        url: `Uploaded file: ${file.name}`,
        title: `Document Analysis: ${file.name}`,
        status: Math.random() > 0.3 ? 'verified' : 'false',
        confidence: Math.floor(Math.random() * 30) + 70,
        sources: [
          'Document Verification System',
          'Official Database Cross-Reference',
          'Digital Forensics Analysis'
        ],
        summary: 'This document has been analyzed using advanced verification techniques including metadata analysis, content cross-referencing, and digital signature verification.',
        timestamp: new Date()
      };

      setResults(prev => [mockResult, ...prev]);
      toast({
        title: t('factCheck.toast.fileAnalyzed'),
        description: t('factCheck.toast.fileAnalyzedDesc'),
      });
    } catch (error) {
      toast({
        title: t('factCheck.toast.error'),
        description: t('factCheck.toast.fileErrorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getStatusIcon = (status: FactCheckResult['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'false':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'misleading':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: FactCheckResult['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'false':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'misleading':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-black mb-6">
            {t('factCheck.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('factCheck.subtitle')}
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* URL Input */}
          <Card className="modern-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <LinkIcon className="h-6 w-6 text-black" />
                {t('factCheck.checkUrl')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {t('factCheck.checkUrlDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <Input
                  type="url"
                  placeholder={t('factCheck.urlPlaceholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isAnalyzing}
                  className="bg-white border-gray-300 focus:border-black focus:ring-black"
                />
                <Button 
                  type="submit" 
                  className="w-full modern-button" 
                  disabled={!url.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('factCheck.analyzing')}
                    </>
                  ) : (
                    t('factCheck.checkUrl')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card className="modern-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <FileText className="h-6 w-6 text-black" />
                {t('factCheck.uploadDocument')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {t('factCheck.uploadDocumentDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-4">
                  {t('factCheck.dragDropText')}
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="modern-button-outline"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('factCheck.processing')}
                    </>
                  ) : (
                    t('factCheck.chooseFile')
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-black">{t('factCheck.verificationResults')}</h2>
            {results.map((result) => (
              <Card key={result.id} className="modern-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-black">{result.title}</CardTitle>
                      <p className="text-sm text-gray-500 break-all">
                        {result.url}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <Badge className={getStatusColor(result.status)}>
                        {t(`factCheck.status.${result.status}`)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <span className="text-gray-500">{t('factCheck.confidence')}: </span>
                      <span className="font-semibold text-black">{result.confidence}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">{t('factCheck.analyzed')}: </span>
                      <span className="font-semibold text-black">
                        {result.timestamp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Alert className="bg-gray-50 border-gray-200">
                    <AlertDescription className="text-gray-700">{result.summary}</AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-semibold mb-3 text-black">{t('factCheck.sourcesConsulted')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((source, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <Card className="modern-card mt-16">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-8">
              <h3 className="text-2xl font-bold text-black">{t('factCheck.howItWorks')}</h3>
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="font-semibold text-black mb-3 text-lg">1. {t('factCheck.step1')}</div>
                  <p className="text-gray-600 leading-relaxed">{t('factCheck.step1Desc')}</p>
                </div>
                <div>
                  <div className="font-semibold text-black mb-3 text-lg">2. {t('factCheck.step2')}</div>
                  <p className="text-gray-600 leading-relaxed">{t('factCheck.step2Desc')}</p>
                </div>
                <div>
                  <div className="font-semibold text-black mb-3 text-lg">3. {t('factCheck.step3')}</div>
                  <p className="text-gray-600 leading-relaxed">{t('factCheck.step3Desc')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
