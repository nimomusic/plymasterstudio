
import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PlaylistSuggestion {
  title: string;
  description: string;
  tracks: Array<{
    title: string;
    artist: string;
    duration: string;
  }>;
  visualTheme: string;
}