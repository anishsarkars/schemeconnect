import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  ExternalLink, 
  CheckCircle, 
  FileText,
  Download,
  Shield,
  AlertCircle
} from 'lucide-react';
import { sampleSchemes } from '@/data/sampleSchemes';

export default function SchemeDetail() {
  const { id } = useParams<{ id: string }>();
  const scheme = sampleSchemes.find(s => s.id === id);

  if (!scheme) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Scheme Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The scheme you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/schemes">Browse All Schemes</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/schemes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schemes
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={scheme.status === 'active' ? 'default' : scheme.status === 'upcoming' ? 'secondary' : 'outline'}
                      className={scheme.status === 'active' ? 'bg-secondary' : ''}
                    >
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {scheme.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  {scheme.isVerified && (
                    <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium text-secondary">AI Verified ({scheme.aiVerificationScore}%)</span>
                      <Shield className="h-4 w-4 text-secondary" />
                    </div>
                  )}
                </div>
                
                <CardTitle className="text-3xl">{scheme.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  {scheme.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Application Deadline</p>
                    <p className="text-muted-foreground">{scheme.applicationDeadline.toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Coverage Area</p>
                    <p className="text-muted-foreground">{scheme.location.join(', ')}</p>
                  </div>
                </div>
                
                {scheme.beneficiaryCount && (
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Target Beneficiaries</p>
                      <p className="text-muted-foreground">{scheme.beneficiaryCount.toLocaleString()} people</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Launch Date</p>
                    <p className="text-muted-foreground">{scheme.launchDate.toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Required */}
            {scheme.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {scheme.documents.map((doc, index) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{doc.name}</span>
                          <Badge variant="outline" className="text-xs uppercase">
                            {doc.type}
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="bg-gradient-primary text-white">
              <CardHeader>
                <CardTitle className="text-white">Ready to Apply?</CardTitle>
                <CardDescription className="text-white/80">
                  Apply directly through the official government portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90" asChild>
                  <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Related Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scheme.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Verification Details */}
            {scheme.isVerified && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    <span>AI Verification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Authenticity Score</span>
                    <span className="font-bold text-secondary">{scheme.aiVerificationScore}%</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary rounded-full h-2 transition-all duration-300" 
                      style={{ width: `${scheme.aiVerificationScore}%` }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    This scheme has been verified by our AI system against official government databases 
                    and documentation for authenticity and accuracy.
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-secondary">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified with official sources</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}