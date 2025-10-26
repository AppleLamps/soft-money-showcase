import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Bell, Shield, Smartphone, Camera, ChevronRight, Save, AtSign, MessageSquare, TrendingUp, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    monthlyReports: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Setting updated');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Profile & Settings</h2>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      {/* Profile Picture Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center ring-4 ring-border shadow-lg">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1 text-foreground">{userData.name}</h3>
              <p className="text-muted-foreground mb-4">Member since October 2024</p>
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="pl-11 h-11 focus-visible:ring-2 transition-shadow"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="pl-11 h-11 focus-visible:ring-2 transition-shadow"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="pl-11 h-11 focus-visible:ring-2 transition-shadow"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gap-2 font-semibold">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <AtSign className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggleSetting('emailNotifications')}
              />
            </div>
            
            <Separator />

            <div className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggleSetting('pushNotifications')}
              />
            </div>
            
            <Separator />

            <div className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-foreground">Transaction Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify me about all transactions</p>
                </div>
              </div>
              <Switch
                checked={settings.transactionAlerts}
                onCheckedChange={() => handleToggleSetting('transactionAlerts')}
              />
            </div>
            
            <Separator />

            <div className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-foreground">Monthly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive spending summaries</p>
                </div>
              </div>
              <Switch
                checked={settings.monthlyReports}
                onCheckedChange={() => handleToggleSetting('monthlyReports')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-between h-12 text-left hover:bg-accent transition-colors group">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-semibold">Change Password</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between h-12 text-left hover:bg-accent transition-colors group">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-semibold">Two-Factor Authentication</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between h-12 text-left hover:bg-accent transition-colors group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-semibold">View Login History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
