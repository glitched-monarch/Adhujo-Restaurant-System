
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Adhujo Restaurant System</h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete Restaurant Management Solution - Sign in to access your account
          </p>
        </div>
        
        <div className="flex justify-center items-center max-w-md mx-auto">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                  <LogIn className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your restaurant management dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/login">
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Secure, fast, and reliable restaurant management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
