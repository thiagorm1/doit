import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../shared/layouts/MainLayout';
import { StudiesView } from '../modules/studies/StudiesView';
import { ContentEditorView } from '../modules/studies/ContentEditorView';
import { YoutubeFloatingPlayer } from '../modules/studies/components/YoutubeFloatingPlayer';
import { RichTextContextMenu } from '../shared/components/RichTextContextMenu';
import { initImageResizer } from '../shared/utils/ImageResizer';

export const App: React.FC = () => {
  useEffect(() => {
    initImageResizer();
  }, []);

  return (
    <BrowserRouter>
      <div id="app-root" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/estudos" replace />} />
          <Route 
            path="/estudos" 
            element={
              <MainLayout>
                <StudiesView />
              </MainLayout>
            } 
          />
          <Route path="/estudos/:moduleSlug/:contentSlug" element={<ContentEditorView />} />
          <Route path="*" element={<Navigate to="/estudos" replace />} />
        </Routes>

        {/* Global persistent floating widgets */}
        <YoutubeFloatingPlayer />
        <RichTextContextMenu />
      </div>
    </BrowserRouter>
  );
};
