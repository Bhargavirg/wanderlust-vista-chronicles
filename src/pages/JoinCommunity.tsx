
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Mail, MessageCircle, Globe, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { submitCommunityJoinRequest } from "@/services/communityService";
import { subscribeToNewsletter } from "@/services/newsletterService";

const JoinCommunity = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submittingApplication, setSubmittingApplication] = useState(false);
  const [subscribingNewsletter, setSubscribingNewsletter] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingApplication(true);
    
    try {
      await submitCommunityJoinRequest(name, email, interests);
      toast({
        title: "Welcome to our community!",
        description: "Your application has been received. We'll be in touch soon.",
      });
      // Reset form fields
      setEmail("");
      setName("");
      setInterests("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingApplication(false);
    }
  };

  const handleSubscribe = async () => {
    if (!newsletterEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setSubscribingNewsletter(true);
    
    try {
      await subscribeToNewsletter(newsletterEmail);
      setIsSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "You have successfully subscribed to our newsletter.",
      });
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error subscribing to the newsletter. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setSubscribingNewsletter(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8 md:py-12 lg:py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with explorers, scientists, and storytellers from around the world. Share your knowledge and experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sky-500" />
                  Apply to Join
                </CardTitle>
                <CardDescription>
                  Fill out this form to join our community of content creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interests" className="text-sm font-medium">
                      Areas of Interest
                    </label>
                    <Textarea
                      id="interests"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="What topics are you interested in contributing to? (Science, Technology, History, etc.)"
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    disabled={submittingApplication}
                  >
                    {submittingApplication ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-sky-500" />
                    Subscribe to Newsletter
                  </CardTitle>
                  <CardDescription>
                    Stay updated with our latest content and community news
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      disabled={isSubscribed || subscribingNewsletter}
                    />
                    <Button 
                      onClick={handleSubscribe} 
                      disabled={isSubscribed || subscribingNewsletter}
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                    >
                      {subscribingNewsletter ? "Subscribing..." : (isSubscribed ? "Subscribed" : "Subscribe")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-sky-500" />
                    Community Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Share2 className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                      <span>Share your expertise with a global audience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                      <span>Connect with like-minded individuals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                      <span>Access exclusive resources and content</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/about">Learn More About Us</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinCommunity;
