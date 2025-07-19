
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  User, 
  Camera,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const KYCVerification = () => {
  const { toast } = useToast();
  const [kycStatus, setKycStatus] = useState<'not_started' | 'pending' | 'approved' | 'rejected'>('not_started');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const handleStartKYC = () => {
    toast({
      title: "KYC Process Started",
      description: "Redirecting to our secure verification partner...",
    });
    // Here you would redirect to your third-party KYC provider
    setKycStatus('pending');
    setCompletionPercentage(25);
  };

  const handleDocumentUpload = () => {
    toast({
      title: "Document Upload",
      description: "Opening secure document upload portal...",
    });
    setCompletionPercentage(50);
  };

  const handleIdentityVerification = () => {
    toast({
      title: "Identity Verification",
      description: "Starting identity verification process...",
    });
    setCompletionPercentage(75);
  };

  const getStatusBadge = () => {
    switch (kycStatus) {
      case 'not_started':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Not Started</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Under Review</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (kycStatus) {
      case 'not_started':
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const verificationSteps = [
    {
      id: 1,
      title: "Personal Information",
      description: "Provide your basic personal details",
      icon: User,
      status: kycStatus !== 'not_started' ? 'completed' : 'pending',
      action: handleStartKYC
    },
    {
      id: 2,
      title: "Document Upload",
      description: "Upload government-issued ID documents",
      icon: FileText,
      status: completionPercentage >= 50 ? 'completed' : 'pending',
      action: handleDocumentUpload
    },
    {
      id: 3,
      title: "Identity Verification",
      description: "Complete biometric verification",
      icon: Camera,
      status: completionPercentage >= 75 ? 'completed' : 'pending',
      action: handleIdentityVerification
    },
    {
      id: 4,
      title: "Final Review",
      description: "Our team reviews your submission",
      icon: ShieldCheck,
      status: kycStatus === 'approved' ? 'completed' : 'pending',
      action: () => {}
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            KYC Verification
          </h1>
          <p className="text-muted-foreground">Complete your identity verification to unlock all features</p>
        </div>
        {getStatusBadge()}
      </div>

      {/* KYC Status Card */}
      <Card className="border-border bg-gradient-to-r from-card via-card to-card/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-xl font-semibold">Verification Status</h3>
              <p className="text-sm text-muted-foreground font-normal">
                {kycStatus === 'not_started' && "Start your KYC process to access premium features"}
                {kycStatus === 'pending' && "Your documents are being reviewed by our team"}
                {kycStatus === 'approved' && "Your account is fully verified and ready to use"}
                {kycStatus === 'rejected' && "Please review and resubmit your documents"}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {kycStatus === 'not_started' && (
            <Button onClick={handleStartKYC} className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Start KYC Verification
            </Button>
          )}

          {kycStatus === 'pending' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Under Review</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Your documents are being reviewed. This typically takes 1-3 business days.
              </p>
            </div>
          )}

          {kycStatus === 'approved' && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-800 dark:text-green-200">Verification Complete</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Your account is fully verified. You now have access to all premium features.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Verification Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verificationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className={`p-2 rounded-full ${
                  step.status === 'completed' 
                    ? 'bg-green-100 dark:bg-green-900/20' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <step.icon className={`h-5 w-5 ${
                    step.status === 'completed' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={step.action}
                      disabled={index > 0 && verificationSteps[index - 1].status !== 'completed'}
                    >
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card className="border-border bg-gradient-to-r from-primary/5 via-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Verification Benefits
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Higher withdrawal limits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Faster transaction processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Access to premium features</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Enhanced security protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Compliance with regulations</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            If you encounter any issues during the verification process, our support team is here to help.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View FAQ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCVerification;
