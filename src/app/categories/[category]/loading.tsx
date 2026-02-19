import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CategoryDetailLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        text="Loading category..." 
      />
    </div>
  );
}
