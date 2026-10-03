import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, RefreshCw, Trash2, ShieldCheck, Link2 } from 'lucide-react';

export const ImageUploader = ({
  value,
  onChange,
  label = 'Upload Image',
  hint = 'PNG, JPG, WEBP (Lossless 100% Original Quality)',
  shape = 'rounded', // 'rounded', 'circle', 'banner'
  compact = false,
  allowUrlFallback = true
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const dataUrl = await base64Promise;

      // Upload lossless file to backend
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'LUMORA2026'
        },
        body: JSON.stringify({
          data: dataUrl,
          filename: file.name,
          fileType: file.type
        })
      });

      if (res.ok) {
        const resData = await res.json();
        onChange(resData.url);
      } else {
        // Fallback: use dataUrl directly
        onChange(dataUrl);
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  // Compact variant for table cells or small list items (e.g. Category Circles in Admin)
  if (compact) {
    return (
      <div className="space-y-1.5">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center gap-2">
          {/* Thumbnail preview */}
          <div className={`relative w-12 h-12 shrink-0 overflow-hidden border border-[#EAE3D5] bg-[#FAF8F5] shadow-xs ${
            shape === 'circle' ? 'rounded-full' : 'rounded-lg'
          }`}>
            {value ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover [image-rendering:high-quality]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#747780]">
                <ImageIcon className="w-5 h-5 opacity-40" />
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-[#C5A059] animate-spin" />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-1 min-w-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2.5 py-1 text-[11px] font-semibold bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded flex items-center gap-1 shadow-2xs whitespace-nowrap"
            >
              <Upload className="w-3 h-3" />
              <span>{value ? 'Change Photo' : 'Upload Image'}</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[10px] text-rose-600 hover:text-rose-800 text-left font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {uploadSuccess && (
          <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
            <Check className="w-3 h-3 text-emerald-600" />
            Uploaded successfully
          </span>
        )}
      </div>
    );
  }

  // Standard Full Uploader
  return (
    <div className="space-y-2 text-left">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#1F2022] tracking-wide uppercase">
            {label}
          </label>
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            <span>Lossless Full Quality (0% Compression)</span>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Drag & Drop / Click Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-5 transition-all cursor-pointer text-center ${
          dragActive
            ? 'border-[#C5A059] bg-[#F4EFE6]/70 scale-[1.01]'
            : 'border-[#EAE3D5] hover:border-[#C5A059] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5]'
        }`}
      >
        {value ? (
          <div className="space-y-3">
            {/* Image Preview */}
            <div className={`relative mx-auto overflow-hidden border border-[#EAE3D5] shadow-md ${
              shape === 'banner'
                ? 'w-full h-44 sm:h-52 rounded-xl'
                : shape === 'circle'
                ? 'w-32 h-32 rounded-full'
                : 'w-40 h-40 rounded-xl'
            }`}>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover [image-rendering:high-quality]"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs gap-2">
                  <RefreshCw className="w-6 h-6 text-[#C5A059] animate-spin" />
                  <span>Uploading original photo...</span>
                </div>
              )}
            </div>

            {/* Change / Replace Bar */}
            <div className="flex items-center justify-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-1.5 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Image</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 border border-[#EAE3D5] bg-white hover:bg-rose-50 text-rose-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 sm:py-8 space-y-2.5">
            <div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#EAE3D5] flex items-center justify-center text-[#A8843E] shadow-2xs">
              {isUploading ? (
                <RefreshCw className="w-6 h-6 animate-spin text-[#C5A059]" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#1F2022]">
                {isUploading ? 'Uploading file at original quality...' : 'Click to Upload Image from your device'}
              </p>
              <p className="text-[11px] text-[#747780] mt-0.5">
                or drag & drop your image file here
              </p>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#EAE3D5] text-[10px] text-[#575A61] font-mono">
              {hint}
            </div>
          </div>
        )}
      </div>

      {uploadSuccess && (
        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-1.5 animate-fade-in font-medium">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Image uploaded and applied successfully!</span>
        </div>
      )}

      {/* Subtle URL Fallback option if user ever needs it */}
      {allowUrlFallback && (
        <div className="pt-1">
          {!showUrlInput ? (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="text-[10px] text-[#747780] hover:text-[#1F2022] hover:underline flex items-center gap-1"
            >
              <Link2 className="w-3 h-3" />
              <span>Or enter web image URL</span>
            </button>
          ) : (
            <form onSubmit={handleManualUrlSubmit} className="flex gap-2 animate-fade-in">
              <input
                type="url"
                placeholder="https://... direct image URL"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 px-3 py-1 text-xs bg-white border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
              <button
                type="submit"
                className="px-3 py-1 text-xs bg-[#1F2022] text-white rounded-lg font-medium"
              >
                Set
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="px-2 py-1 text-xs text-[#747780] hover:text-black"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
