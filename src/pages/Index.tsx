
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Your System</h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your account and access all features with ease
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <Card className="w-full md:w-80">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                  <LogIn className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your existing account
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
          
          <Card className="w-full md:w-80">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-full">
                  <UserPlus className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                New user? Get started here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/register">
                <Button variant="secondary" className="w-full" size="lg">
                  Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Secure, fast, and reliable system access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
