
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Percent, Tag, Save } from "lucide-react";
import { toast } from "sonner";

export const SystemSettingsPanel = () => {
  const [settings, setSettings] = useState({
    vatPercentage: 16,
    enableDiscounts: true,
    maxDiscountPercentage: 20,
    autoApplyTax: true,
    enableLoyaltyProgram: false,
    loyaltyPointsRate: 1,
    enableInventoryAlerts: true,
    lowStockThreshold: 10,
  });

  const handleSave = () => {
    // Here you would normally save to the database
    toast.success("Settings saved successfully!");
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Tax Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Tax Configuration
            </CardTitle>
            <CardDescription>
              Configure tax rates and automatic tax application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vat">VAT Percentage (%)</Label>
                <Input
                  id="vat"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.vatPercentage}
                  onChange={(e) => handleSettingChange('vatPercentage', parseFloat(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Switch
                  id="auto-apply-tax"
                  checked={settings.autoApplyTax}
                  onCheckedChange={(checked) => handleSettingChange('autoApplyTax', checked)}
                />
                <Label htmlFor="auto-apply-tax">Auto-apply tax to all sales</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discount Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Discount Rules
            </CardTitle>
            <CardDescription>
              Configure discount policies and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-discounts"
                checked={settings.enableDiscounts}
                onCheckedChange={(checked) => handleSettingChange('enableDiscounts', checked)}
              />
              <Label htmlFor="enable-discounts">Enable discount system</Label>
            </div>
            
            {settings.enableDiscounts && (
              <div>
                <Label htmlFor="max-discount">Maximum Discount Percentage (%)</Label>
                <Input
                  id="max-discount"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.maxDiscountPercentage}
                  onChange={(e) => handleSettingChange('maxDiscountPercentage', parseInt(e.target.value))}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loyalty Program */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program</CardTitle>
            <CardDescription>
              Configure customer loyalty program settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-loyalty"
                checked={settings.enableLoyaltyProgram}
                onCheckedChange={(checked) => handleSettingChange('enableLoyaltyProgram', checked)}
              />
              <Label htmlFor="enable-loyalty">Enable loyalty program</Label>
            </div>
            
            {settings.enableLoyaltyProgram && (
              <div>
                <Label htmlFor="loyalty-rate">Points per Dollar Spent</Label>
                <Input
                  id="loyalty-rate"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={settings.loyaltyPointsRate}
                  onChange={(e) => handleSettingChange('loyaltyPointsRate', parseFloat(e.target.value))}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>
              Configure inventory alerts and thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-alerts"
                checked={settings.enableInventoryAlerts}
                onCheckedChange={(checked) => handleSettingChange('enableInventoryAlerts', checked)}
              />
              <Label htmlFor="enable-alerts">Enable low stock alerts</Label>
            </div>
            
            {settings.enableInventoryAlerts && (
              <div>
                <Label htmlFor="stock-threshold">Low Stock Threshold</Label>
                <Input
                  id="stock-threshold"
                  type="number"
                  min="1"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};
