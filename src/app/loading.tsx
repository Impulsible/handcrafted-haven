import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        text="Handcrafted Haven" 
        fullScreen 
      />
    </div>
  );
}
