import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UploadedResumeInfo {
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  fileDataUrl?: string; // base64 or blob URL
}

interface MediaContextType {
  profilePhoto: string | null;
  uploadedResume: UploadedResumeInfo | null;
  setProfilePhoto: (photoUrl: string | null) => void;
  setUploadedResume: (resume: UploadedResumeInfo | null) => void;
  removeProfilePhoto: () => void;
  removeUploadedResume: () => void;
  isUploadModalOpen: boolean;
  openUploadModal: (defaultTab?: 'photo' | 'resume') => void;
  closeUploadModal: () => void;
  activeUploadTab: 'photo' | 'resume';
  setActiveUploadTab: (tab: 'photo' | 'resume') => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const STORAGE_KEY_PHOTO = 'kuldip_portfolio_profile_photo';
const STORAGE_KEY_RESUME_META = 'kuldip_portfolio_resume_meta';
const STORAGE_KEY_RESUME_DATA = 'kuldip_portfolio_resume_data';

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profilePhoto, setProfilePhotoState] = useState<string | null>(null);
  const [uploadedResume, setUploadedResumeState] = useState<UploadedResumeInfo | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeUploadTab, setActiveUploadTab] = useState<'photo' | 'resume'>('photo');

  // Load from localStorage on initialization
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem(STORAGE_KEY_PHOTO);
      if (savedPhoto) {
        setProfilePhotoState(savedPhoto);
      }

      const savedResumeMeta = localStorage.getItem(STORAGE_KEY_RESUME_META);
      const savedResumeData = localStorage.getItem(STORAGE_KEY_RESUME_DATA);

      if (savedResumeMeta) {
        const parsed = JSON.parse(savedResumeMeta);
        if (savedResumeData) {
          parsed.fileDataUrl = savedResumeData;
        }
        setUploadedResumeState(parsed);
      }
    } catch (e) {
      console.warn('Could not load cached profile media from localStorage', e);
    }
  }, []);

  const setProfilePhoto = (photoUrl: string | null) => {
    setProfilePhotoState(photoUrl);
    try {
      if (photoUrl) {
        localStorage.setItem(STORAGE_KEY_PHOTO, photoUrl);
      } else {
        localStorage.removeItem(STORAGE_KEY_PHOTO);
      }
    } catch (e) {
      console.warn('Storage quota exceeded for profile photo', e);
    }
  };

  const setUploadedResume = (resume: UploadedResumeInfo | null) => {
    setUploadedResumeState(resume);
    try {
      if (resume) {
        const { fileDataUrl, ...meta } = resume;
        localStorage.setItem(STORAGE_KEY_RESUME_META, JSON.stringify(meta));
        if (fileDataUrl && fileDataUrl.length < 4 * 1024 * 1024) {
          localStorage.setItem(STORAGE_KEY_RESUME_DATA, fileDataUrl);
        }
      } else {
        localStorage.removeItem(STORAGE_KEY_RESUME_META);
        localStorage.removeItem(STORAGE_KEY_RESUME_DATA);
      }
    } catch (e) {
      console.warn('Storage quota exceeded for resume data', e);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
  };

  const removeUploadedResume = () => {
    setUploadedResume(null);
  };

  const openUploadModal = (defaultTab: 'photo' | 'resume' = 'photo') => {
    setActiveUploadTab(defaultTab);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <MediaContext.Provider
      value={{
        profilePhoto,
        uploadedResume,
        setProfilePhoto,
        setUploadedResume,
        removeProfilePhoto,
        removeUploadedResume,
        isUploadModalOpen,
        openUploadModal,
        closeUploadModal,
        activeUploadTab,
        setActiveUploadTab,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
