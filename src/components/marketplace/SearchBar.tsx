"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, Hash, Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDebounce } from '@/hooks/use-debounce';

interface SearchSuggestion {
  id: number;
  type: 'product' | 'category' | 'artisan' | 'tag';
  title: string;
  subtitle?: string;
  image?: string;
  popularity?: number;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onQuickSearch?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  initialValue?: string;
}

const mockRecentSearches = [
  { id: 1, type: 'product' as const, title: 'Ceramic Mug', subtitle: '12 products' },
  { id: 2, type: 'category' as const, title: 'Pottery', subtitle: '45 products' },
  { id: 3, type: 'artisan' as const, title: 'Elena Rodriguez', subtitle: 'Oaxaca, Mexico' },
  { id: 4, type: 'tag' as const, title: 'Handmade', subtitle: 'Popular tag' },
];

const mockTrendingSearches = [
  { id: 5, type: 'product' as const, title: 'Wooden Cutting Board', popularity: 95 },
  { id: 6, type: 'category' as const, title: 'Sustainable Living', popularity: 88 },
  { id: 7, type: 'tag' as const, title: 'Eco-Friendly', popularity: 82 },
  { id: 8, type: 'product' as const, title: 'Handwoven Scarf', popularity: 76 },
];

export default function SearchBar({
  onSearch,
  onQuickSearch,
  placeholder = 'Search for products, artisans, or categories...',
  className = '',
  autoFocus = false,
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecent, setShowRecent] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounce(query, 300);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        setShowRecent(true);
        return;
      }

      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockResults: SearchSuggestion[] = [
          { id: 1, type: 'product', title: `${debouncedQuery} Mug`, subtitle: '12 products' },
          { id: 2, type: 'category', title: `${debouncedQuery} Collection`, subtitle: 'Category' },
          { id: 3, type: 'artisan', title: `Artisans in ${debouncedQuery}`, subtitle: 'Location' },
          { id: 4, type: 'tag', title: `${debouncedQuery} Style`, subtitle: 'Popular tag' },
          { id: 5, type: 'product', title: `Handmade ${debouncedQuery}`, subtitle: '8 products' },
        ];
        
        setSuggestions(mockResults);
        setShowRecent(false);
        setIsLoading(false);
      }, 200);
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(true);
    setShowRecent(true);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (onQuickSearch) {
      onQuickSearch(suggestion);
    } else {
      setQuery(suggestion.title);
      onSearch(suggestion.title);
    }
    setIsOpen(false);
  };

  const handleRecentSearchClick = (recent: SearchSuggestion) => {
    setQuery(recent.title);
    onSearch(recent.title);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product': return <Hash className="w-4 h-4" />;
      case 'category': return <Hash className="w-4 h-4" />;
      case 'artisan': return <Hash className="w-4 h-4" />;
      case 'tag': return <Hash className="w-4 h-4" />;
      default: return <Hash className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product': return 'bg-blue-100 text-blue-700';
      case 'category': return 'bg-green-100 text-green-700';
      case 'artisan': return 'bg-purple-100 text-purple-700';
      case 'tag': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-12 pr-12 py-6 text-base rounded-2xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm"
            autoFocus={autoFocus}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            {/* Search Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">
                  {showRecent ? 'Recent Searches' : 'Search Results'}
                </p>
                {!showRecent && suggestions.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {suggestions.length} results
                  </Badge>
                )}
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : query.trim() && suggestions.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No results found for "{query}"</p>
                  <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
                </div>
              ) : null}
            </div>

            {/* Search Suggestions */}
            {!isLoading && (suggestions.length > 0 || showRecent) && (
              <div className="max-h-96 overflow-y-auto">
                {/* Recent Searches */}
                {showRecent && (
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-700">Recent Searches</p>
                    </div>
                    <div className="space-y-2">
                      {mockRecentSearches.map((recent) => (
                        <button
                          key={recent.id}
                          onClick={() => handleRecentSearchClick(recent)}
                          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className={`p-2 rounded-lg ${getTypeColor(recent.type)}`}>
                            {getTypeIcon(recent.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{recent.title}</p>
                            <p className="text-sm text-gray-500">{recent.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {suggestions.length > 0 && (
                  <div className="p-4 border-b">
                    <div className="space-y-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                            {getTypeIcon(suggestion.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{suggestion.title}</p>
                            <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
                          </div>
                          {suggestion.popularity && (
                            <Badge variant="outline" className="text-xs">
                              {suggestion.popularity}%
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">Trending Now</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockTrendingSearches.map((trending) => (
                      <Badge
                        key={trending.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200 gap-1"
                        onClick={() => handleSuggestionClick(trending)}
                      >
                        <Sparkles className="w-3 h-3" />
                        {trending.title}
                        {trending.popularity && (
                          <span className="text-xs text-gray-500 ml-1">
                            {trending.popularity}%
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white border rounded">?</kbd>
                    <kbd className="px-2 py-1 bg-white border rounded">?</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white border rounded">Enter</kbd>
                    <span>to select</span>
                  </span>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!query.trim()}
                  className="px-4"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

