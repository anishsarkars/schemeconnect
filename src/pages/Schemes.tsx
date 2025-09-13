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
import { useLanguage } from '@/contexts/LanguageContext';

export default function Schemes() {
  const { t } = useLanguage();
  
  const categories: { value: SchemeCategory; label: string }[] = [
    { value: 'education', label: t('schemes.categories.education') },
    { value: 'health', label: t('schemes.categories.health') },
    { value: 'agriculture', label: t('schemes.categories.agriculture') },
    { value: 'rural-development', label: t('schemes.categories.ruralDevelopment') },
    { value: 'women-empowerment', label: t('schemes.categories.womenEmpowerment') },
    { value: 'employment', label: t('schemes.categories.employment') },
    { value: 'housing', label: t('schemes.categories.housing') },
    { value: 'skill-development', label: t('schemes.categories.skillDevelopment') },
    { value: 'senior-citizen', label: t('schemes.categories.seniorCitizen') },
  ];
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
    <Card className="modern-card group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-3">
          <Badge 
            variant={scheme.status === 'active' ? 'default' : scheme.status === 'upcoming' ? 'secondary' : 'outline'}
            className={`text-xs ${
              scheme.status === 'active' 
                ? 'bg-black text-white' 
                : scheme.status === 'upcoming' 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
          </Badge>
          
          {scheme.isVerified && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{t('schemes.aiVerified')}</span>
            </div>
          )}
        </div>
        
        <CardTitle className="text-xl group-hover:text-gray-700 transition-colors mb-2">
          <Link to={`/scheme/${scheme.id}`} className="hover:underline">
            {scheme.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
          {scheme.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {scheme.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
              {tag}
            </Badge>
          ))}
          {scheme.tags.length > 3 && (
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
              +{scheme.tags.length - 3} {t('schemes.more')}
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{t('schemes.deadline')}: {scheme.applicationDeadline.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{scheme.location[0]}</span>
          </div>
        </div>
        
        {scheme.beneficiaryCount && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{scheme.beneficiaryCount.toLocaleString()} {t('schemes.beneficiaries')}</span>
          </div>
        )}
        
        <div className="flex space-x-3 pt-4">
          <Button size="sm" className="flex-1 modern-button-outline" asChild>
            <Link to={`/scheme/${scheme.id}`}>
              {t('schemes.viewDetails')}
            </Link>
          </Button>
          <Button size="sm" className="modern-button" asChild>
            <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('schemes.apply')}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-black">{t('schemes.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('schemes.subtitle')}
          </p>
          <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
            <DialogTrigger asChild>
              <Button className="modern-button mt-4"><PlusCircle className="h-4 w-4 mr-2" />{t('schemes.submitScheme')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('schemes.submitNewScheme')}</DialogTitle>
              </DialogHeader>
              <Form {...(form as any)}>
                <form onSubmit={onSubmit} className="space-y-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('schemes.form.title')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('schemes.form.titlePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('schemes.form.description')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('schemes.form.descriptionPlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>{t('schemes.form.descriptionHelp')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('schemes.form.category')}</FormLabel>
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
                        <FormLabel>{t('schemes.form.deadline')}</FormLabel>
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
                        <FormLabel>{t('schemes.form.applyLink')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('schemes.form.applyLinkPlaceholder')} {...field} />
                        </FormControl>
                        <FormDescription>{t('schemes.form.applyLinkHelp')}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('schemes.form.location')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('schemes.form.locationPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('schemes.form.tags')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('schemes.form.tagsPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit">{t('schemes.form.submit')}</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('schemes.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 focus:border-black focus:ring-black">
                <SelectValue placeholder={t('schemes.allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('schemes.allCategories')}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 focus:border-black focus:ring-black">
                <SelectValue placeholder={t('schemes.allLocations')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('schemes.allLocations')}</SelectItem>
                <SelectItem value="all india">All India</SelectItem>
                <SelectItem value="urban">Urban Areas</SelectItem>
                <SelectItem value="rural">Rural Areas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs for scheme status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto bg-gray-100 p-1">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-black">{t('schemes.upcoming')}</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:text-black">{t('schemes.current')}</TabsTrigger>
            <TabsTrigger value="expired" className="data-[state=active]:bg-white data-[state=active]:text-black">{t('schemes.past')}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t('schemes.upcomingSchemes')}</h2>
              <Badge variant="secondary">{getSchemesByStatus('upcoming').length} {t('schemes.schemes')}</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('schemes.noUpcomingFound')}</h3>
                <p className="text-muted-foreground">{t('schemes.noUpcomingDesc')}</p>
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
              <h2 className="text-2xl font-semibold">{t('schemes.currentSchemes')}</h2>
              <Badge className="bg-secondary">{getSchemesByStatus('active').length} {t('schemes.schemes')}</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('schemes.noActiveFound')}</h3>
                <p className="text-muted-foreground">{t('schemes.noActiveDesc')}</p>
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
              <h2 className="text-2xl font-semibold">{t('schemes.pastSchemes')}</h2>
              <Badge variant="outline">{getSchemesByStatus('expired').length} {t('schemes.schemes')}</Badge>
            </div>
            
            {filteredSchemes.length === 0 ? (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('schemes.noPastFound')}</h3>
                <p className="text-muted-foreground">{t('schemes.noPastDesc')}</p>
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