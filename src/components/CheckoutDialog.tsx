import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { CreditCard, Smartphone } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination: {
    id: string;
    name: string;
    price: number;
  };
}

export default function CheckoutDialog({ open, onOpenChange, destination }: CheckoutDialogProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    numTravelers: 1,
    travelDate: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCVV: ""
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(t.checkout.loginRequired);
      navigate("/auth");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.travelDate) {
      toast.error(t.checkout.fillAllFields);
      return;
    }

    if ((formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card") && (!formData.cardNumber || !formData.cardHolder || !formData.cardExpiry || !formData.cardCVV)) {
      toast.error(t.checkout.fillCardDetails);
      return;
    }

    setLoading(true);

    try {
      const totalAmount = destination.price * formData.numTravelers;
      
      const { error } = await supabase.from("purchases").insert({
        user_id: user.id,
        destination_id: destination.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        num_travelers: formData.numTravelers,
        travel_date: formData.travelDate,
        payment_method: formData.paymentMethod,
        card_number: formData.cardNumber ? `****${formData.cardNumber.slice(-4)}` : null,
        card_holder: formData.cardHolder || null,
        total_amount: totalAmount,
        status: "confirmed"
      });

      if (error) throw error;

      toast.success(t.checkout.success, {
        description: t.checkout.successDescription
      });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        numTravelers: 1,
        travelDate: "",
        paymentMethod: "credit_card",
        cardNumber: "",
        cardHolder: "",
        cardExpiry: "",
        cardCVV: ""
      });
      
      onOpenChange(false);
      navigate("/profile");
    } catch (error: any) {
      toast.error(t.checkout.error, {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = destination.price * formData.numTravelers;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.checkout.title}</DialogTitle>
          <p className="text-muted-foreground">{destination.name}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.checkout.personalInfo}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.checkout.fullName}</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Juan Pérez"
                  required
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
                  title={t.checkout.onlyLetters}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.checkout.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.checkout.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+58 412 1234567"
                  required
                  pattern="[0-9\s\+\-\(\)]+"
                  title={t.checkout.onlyNumbers}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numTravelers">{t.checkout.numTravelers}</Label>
                <Input
                  id="numTravelers"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.numTravelers}
                  onChange={(e) => handleChange("numTravelers", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="travelDate">{t.checkout.travelDate}</Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => handleChange("travelDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.checkout.paymentInfo}</h3>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">{t.checkout.paymentMethod}</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {t.checkout.creditCard}
                    </div>
                  </SelectItem>
                  <SelectItem value="debit_card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {t.checkout.debitCard}
                    </div>
                  </SelectItem>
                  <SelectItem value="mobile_payment">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      {t.checkout.mobilePayment}
                    </div>
                  </SelectItem>
                  <SelectItem value="bank_transfer">
                    {t.checkout.bankTransfer}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card") && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardNumber">{t.checkout.cardNumber}</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value.replace(/\D/g, ''))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    required
                    pattern="[0-9]{16}"
                    title={t.checkout.validCard}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardHolder">{t.checkout.cardHolder}</Label>
                  <Input
                    id="cardHolder"
                    value={formData.cardHolder}
                    onChange={(e) => handleChange("cardHolder", e.target.value)}
                    placeholder="JUAN PEREZ"
                    required
                    pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
                    title={t.checkout.onlyLetters}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">{t.checkout.cardExpiry}</Label>
                  <Input
                    id="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={(e) => handleChange("cardExpiry", e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardCVV">{t.checkout.cardCVV}</Label>
                  <Input
                    id="cardCVV"
                    value={formData.cardCVV}
                    onChange={(e) => handleChange("cardCVV", e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength={4}
                    required
                    pattern="[0-9]{3,4}"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{t.checkout.total}:</span>
              <span className="text-2xl font-bold text-primary">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
              disabled={loading}
            >
              {loading ? t.checkout.processing : t.checkout.confirmPayment}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}