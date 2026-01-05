import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface LoginRequiredToastProps {
  show: boolean;
  action: string;
  onClose: () => void;
}

export const LoginRequiredToast = ({ show, action, onClose }: LoginRequiredToastProps) => {
  const router = useRouter();
  
  if (!show) return null;

  const handleSignIn = () => {
    router.push('/auth/signin');
    onClose();
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
    onClose();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-[#235C47]/30 rounded-lg shadow-lg p-4 max-w-sm w-full flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[#235C47]">Login Required</h3>
          <button 
            onClick={onClose}
            className="text-[#235C47] hover:text-[#235C47]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[#235C47]/80 text-sm mb-4">
          You need to be logged in to {action}. Please sign in to continue.
        </p>
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-[#235C47] hover:bg-[#235C47]/90 text-white text-xs"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 border-[#235C47] text-[#235C47] hover:bg-[#F9F7F6] text-xs"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};