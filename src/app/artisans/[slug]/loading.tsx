import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ArtisanDetailLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        text="Loading artisan profile..." 
      />
    </div>
  );
}
