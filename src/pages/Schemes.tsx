import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, MapPin, Users, ExternalLink, CheckCircle, AlertCircle, PlusCircle } from 'lucide-react';
import { sampleSchemes, getSchemesByStatus } from '@/data/sampleSchemes';
import { Scheme, SchemeCategory } from '@/types/scheme';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const categories: { value: SchemeCategory; label: string }[] = [
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'rural-development', label: 'Rural Development' },
  { value: 'women-empowerment', label: 'Women Empowerment' },
  { value: 'employment', label: 'Employment' },
  { value: 'housing', label: 'Housing' },
  { value: 'skill-development', label: 'Skill Development' },
  { value: 'senior-citizen', label: 'Senior Citizen' },
];

export default function Schemes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('active');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const filteredSchemes = useMemo(() => {
    let schemes = getSchemesByStatus(activeTab);
    
    if (searchQuery) {
      schemes = schemes.filter(scheme =>
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      schemes = schemes.filter(scheme => scheme.category === selectedCategory);
    }
    
    if (selectedLocation !== 'all') {
      schemes = schemes.filter(scheme => 
        scheme.location.some(loc => loc.toLowerCase().includes(selectedLocation.toLowerCase()))
      );
    }
    
    return schemes;
  }, [activeTab, searchQuery, selectedCategory, selectedLocation]);

  // Form schema for adding a new scheme; keep validations realistic and strict
  const AddSchemeSchema = z.object({
    title: z.string().min(8, 'Title must be at least 8 characters'),
    description: z.string().min(30, 'Description must be at least 30 characters'),
    category: z.enum(categories.map(c => c.value) as [SchemeCategory, ...SchemeCategory[]]),
    applyLink: z.string().url('Provide a valid URL').refine((url) => /\.(gov\.in|nic\.in)(?:\/|$)/i.test(url), {
      message: 'Must be an official .gov.in or .nic.in link',
    }),
    deadline: z.string().transform((v) => new Date(v)).refine((d) => d.getTime() > Date.now() + 24*60*60*1000, {
      message: 'Deadline must be in the future',
    }),
    location: z.string().min(2).max(40),
    tags: z.string().optional(),
  }).superRefine((val, ctx) => {
    // prevent duplicates by title (case-insensitive)
    if (sampleSchemes.some(s => s.title.trim().toLowerCase() === val.title.trim().toLowerCase())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['title'], message: 'A scheme with this title already exists' });
    }
  });

  const form = useForm<z.infer<typeof AddSchemeSchema>>({
    resolver: zodResolver(AddSchemeSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'education',
      applyLink: '',
      deadline: new Date(Date.now() + 7*24*60*60*1000).toISOString().slice(0,10),
      location: 'All India',
      tags: '',
    } as any,
  });

  const onSubmit = form.handleSubmit((values) => {
    // In this demo, we only validate and close; persistence would require backend.
    setIsSubmitOpen(false);
  });

  const SchemeCard = ({ scheme }: { scheme: Scheme }) => (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant={scheme.status === 'active' ? 'default' : scheme.status === 'upcoming' ? 'secondary' : 'outline'}
            className={scheme.status === 'active' ? 'bg-secondary' : ''}
          >
            {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
          </Badge>
          
          {scheme.isVerified && (
            <div className="flex items-center space-x-1 text-secondary">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium">AI Verified</span>
            </div>
          )}
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          <Link to={`/scheme/${scheme.id}`}>
            {scheme.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="line-clamp-2">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {scheme.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {scheme.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{scheme.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {scheme.applicationDeadline.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{scheme.location[0]}</span>
          </div>
        </div>
        
        {scheme.beneficiaryCount && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{scheme.beneficiaryCount.toLocaleString()} beneficiaries</span>
          </div>
        )}
        
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1" asChild>
            <Link to={`/scheme/${scheme.id}`}>
              View Details
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Government Schemes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and apply for government schemes with AI-powered verification and smart filtering
          </p>
          <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
            <DialogTrigger asChild>
              <Button className="mt-2"><PlusCircle className="h-4 w-4 mr-2" />Submit a Scheme</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit a New Scheme</DialogTitle>
              </DialogHeader>
              <Form {...(form as any)}>
                <form onSubmit={onSubmit} className="space-y-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Official scheme title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Concise official description" {...field} />
                      </FormControl>
                      <FormDescription>Include purpose, key benefit, and eligibility summary.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="deadline" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" value={String(field.value).slice(0,10)} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="applyLink" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Official Apply Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.gov.in/..." {...field} />
                        </FormControl>
                        <FormDescription>Only .gov.in or .nic.in links are accepted.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Location</FormLabel>
                        <FormControl>
                          <Input placeholder="All India / State / Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="scholarship, health, subsidy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit">Submit for Review</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="all india">All India</SelectItem>
                <SelectItem value="urban">Urban Areas</SelectItem>
                <SelectItem value="rural">Rural Areas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for scheme status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Current</TabsTrigger>
            <TabsTrigger value="expired">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upcoming Schemes</h2>
              <Badge variant="secondary">{getSchemesByStatus('upcoming').length} schemes</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming schemes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or check back later for new schemes.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Current Active Schemes</h2>
              <Badge className="bg-secondary">{getSchemesByStatus('active').length} schemes</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No active schemes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find relevant schemes.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Past Schemes</h2>
              <Badge variant="outline">{getSchemesByStatus('expired').length} schemes</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No past schemes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or explore current schemes.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}