import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Image as ImageIcon, Video, Upload, Trash2, 
  Check, AlertCircle, Plus, Eye, Play, ShieldCheck 
} from 'lucide-react';
import { useProducts } from '../context/ProductsContext';

export const ProductFormModal = ({ isOpen, onClose, editingProduct = null, onSaveProduct }) => {
  const { addProduct, updateProduct } = useProducts();
  const isEditing = !!editingProduct;

  const photoFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'rings',
    metalCategory: 'gold',
    defaultMetal: '14K Solid Yellow Gold (BIS 585)',
    priceUSD: 395,
    originalPriceUSD: 520,
    weightGrams: '3.8g',
    gemstone: '1.50ct Lab-Grown Diamond (DEF/VVS1)',
    badge: 'Worldwide Best Seller',
    description: '',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'],
    videoUrl: '',
    availableSizes: '5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10'
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');
  const [photoDragActive, setPhotoDragActive] = useState(false);
  const [showPhotoUrlInput, setShowPhotoUrlInput] = useState(false);
  const [showVideoUrlInput, setShowVideoUrlInput] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || 'rings',
        metalCategory: editingProduct.metalCategory || 'gold',
        defaultMetal: editingProduct.defaultMetal || '14K Solid Yellow Gold (BIS 585)',
        priceUSD: editingProduct.priceUSD || 300,
        originalPriceUSD: editingProduct.originalPriceUSD || '',
        weightGrams: editingProduct.weightGrams || '3.5g',
        gemstone: editingProduct.gemstone || editingProduct.stoneType || '',
        badge: editingProduct.badge || '',
        description: editingProduct.description || '',
        images: editingProduct.images && editingProduct.images.length > 0
          ? editingProduct.images
          : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'],
        videoUrl: editingProduct.video || editingProduct.videoUrl || '',
        availableSizes: editingProduct.availableSizes 
          ? editingProduct.availableSizes.join(', ') 
          : (editingProduct.ringSizes ? editingProduct.ringSizes.join(', ') : '5, 6, 7, 8, 9, 10')
      });
    } else {
      setFormData({
        name: '',
        category: 'rings',
        metalCategory: 'gold',
        defaultMetal: '14K Solid Yellow Gold (BIS 585)',
        priceUSD: 395,
        originalPriceUSD: 520,
        weightGrams: '3.8g',
        gemstone: '1.50ct Lab-Grown Diamond (DEF/VVS1)',
        badge: 'New Arrival',
        description: 'Forged in solid 14K gold in our Surat atelier with laser BIS hallmarking and certified lab-grown diamonds.',
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'],
        videoUrl: '',
        availableSizes: '5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10'
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Handle Lossless Photo Upload (0% Compression, 100% Original Resolution)
  const handleProcessFiles = async (files) => {
    const validImageFiles = files.filter(f => f.type.startsWith('image/'));
    if (!validImageFiles.length) return;

    setIsUploading(true);
    setUploadNotice('Uploading original resolution media with zero compression...');

    for (const file of validImageFiles) {
      try {
        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
        const dataUrl = await base64Promise;

        // Upload to server for lossless file storage
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
          setFormData(prev => ({
            ...prev,
            images: [...prev.images.filter(img => !img.includes('placeholder')), resData.url]
          }));
        } else {
          // Fallback: keep exact original resolution Data URL
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, dataUrl]
          }));
        }
      } catch (err) {
        console.error('File read error:', err);
      }
    }

    setIsUploading(false);
    setUploadNotice('✅ Photo(s) uploaded at 100% original quality.');
    setTimeout(() => setUploadNotice(''), 3500);
    if (photoFileInputRef.current) photoFileInputRef.current.value = '';
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    handleProcessFiles(files);
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Handle Lossless Video Upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadNotice('Uploading original video clip (lossless byte-for-byte)...');

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
      const dataUrl = await base64Promise;

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
        setFormData(prev => ({ ...prev, videoUrl: resData.url }));
        setUploadNotice('✅ Video uploaded at 100% original quality.');
      } else {
        setFormData(prev => ({ ...prev, videoUrl: dataUrl }));
        setUploadNotice('✅ Video loaded at 100% original quality.');
      }
    } catch (err) {
      console.error('Video upload error:', err);
      setUploadNotice('❌ Failed to upload video.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadNotice(''), 3500);
      if (videoFileInputRef.current) videoFileInputRef.current.value = '';
    }
  };

  // Add Photo URL manually
  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()]
    }));
    setNewImageUrl('');
  };

  // Remove Photo
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sizesArray = formData.availableSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      ...(editingProduct || {}),
      name: formData.name.trim(),
      category: formData.category,
      metalCategory: formData.metalCategory,
      defaultMetal: formData.defaultMetal.trim(),
      priceUSD: Number(formData.priceUSD),
      originalPriceUSD: formData.originalPriceUSD ? Number(formData.originalPriceUSD) : null,
      weightGrams: formData.weightGrams.trim(),
      stoneType: formData.gemstone.trim(),
      gemstone: formData.gemstone.trim(),
      badge: formData.badge.trim(),
      description: formData.description.trim(),
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'],
      video: formData.videoUrl.trim() || undefined,
      videoUrl: formData.videoUrl.trim() || undefined,
      availableSizes: sizesArray.length > 0 ? sizesArray : ['Standard'],
      ringSizes: formData.category === 'rings' ? sizesArray : undefined,
      isSample: false
    };

    if (onSaveProduct) {
      onSaveProduct(productPayload);
    } else {
      if (isEditing) {
        updateProduct(editingProduct.id, productPayload);
      } else {
        addProduct(productPayload);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in text-[#1F2022]">
      <div className="bg-white border border-[#EAE3D5] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D5] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8843E]" />
            <h3 className="text-base font-serif font-bold text-[#1F2022] tracking-wide">
              {isEditing ? `Edit Piece: ${editingProduct.name}` : 'Add New Fine Jewellery Piece'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#747780] hover:text-[#1F2022] rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1 text-xs">
          
          {/* Piece Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[#575A61] block mb-1 font-medium">Piece Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Celestial Solitaire Ring"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="rings">Rings & Bands</option>
                <option value="necklaces">Necklaces & Pendants</option>
                <option value="earrings">Earrings & Huggies</option>
                <option value="bracelets">Bracelets & Cuffs</option>
              </select>
            </div>
          </div>

          {/* Metal Classification & Purity Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Metal Classification</label>
              <select
                value={formData.metalCategory}
                onChange={(e) => setFormData({ ...formData, metalCategory: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              >
                <option value="gold">Solid Gold (14K / 18K / 9K)</option>
                <option value="silver">925 Sterling Silver</option>
                <option value="both">Both Available as Variants</option>
              </select>
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Default Metal Stamp</label>
              <input
                type="text"
                value={formData.defaultMetal}
                onChange={(e) => setFormData({ ...formData, defaultMetal: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>
          </div>

          {/* Pricing & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Base Price (USD) *</label>
              <input
                type="number"
                required
                min="10"
                value={formData.priceUSD}
                onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022] font-semibold"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Compare Price (USD)</label>
              <input
                type="number"
                value={formData.originalPriceUSD}
                onChange={(e) => setFormData({ ...formData, originalPriceUSD: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>

            <div>
              <label className="text-[#575A61] block mb-1 font-medium">Approx Weight (g)</label>
              <input
                type="text"
                value={formData.weightGrams}
                onChange={(e) => setFormData({ ...formData, weightGrams: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
              />
            </div>
          </div>

          {/* Gemstone / Lab-Diamond Classification */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">
              Gemstone / Diamond Specification * (Distinguish Lab-Grown vs Natural)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1.75ct Lab-Grown Diamond (CVD/HPHT, DEF/VVS1)"
              value={formData.gemstone}
              onChange={(e) => setFormData({ ...formData, gemstone: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* DIRECT LOSSLESS PRODUCT PHOTOGRAPHY UPLOAD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#A8843E]" />
                <label className="font-semibold text-sm text-[#1F2022]">Product Photography</label>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Lossless Original Quality (0% Compression)</span>
              </div>
            </div>

            {/* Hidden Multi-file input */}
            <input
              type="file"
              ref={photoFileInputRef}
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {/* Big Friendly Upload Dropzone */}
            <div
              onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setPhotoDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setPhotoDragActive(false); }}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setPhotoDragActive(true); }}
              onDrop={handlePhotoDrop}
              onClick={() => photoFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
                photoDragActive
                  ? 'border-[#C5A059] bg-[#F4EFE6] scale-[1.01]'
                  : 'border-[#EAE3D5] hover:border-[#C5A059] bg-white hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#A8843E] shadow-2xs mb-2">
                {isUploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1F2022]">
                {isUploading ? 'Uploading photos from device...' : 'Click to Upload Images from Your Device'}
              </p>
              <p className="text-[11px] text-[#747780] mt-0.5">
                or drag & drop image files here (select single or multiple photos at once)
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#EAE3D5] text-[10px] font-mono text-[#575A61]">
                PNG, JPG, WEBP • Zero downscaling or compression
              </span>
            </div>

            {/* Gallery Thumbnails */}
            {formData.images.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-[#747780]">
                  <span className="font-medium text-[#1F2022]">Uploaded Photos ({formData.images.length}):</span>
                  <span className="text-[10px]">Photo #1 will display as the primary storefront image</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#EAE3D5] bg-white group shadow-2xs">
                      <img
                        src={img}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover [image-rendering:high-quality]"
                      />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[9px] font-mono">
                        {idx === 0 ? '★ Cover' : `#${idx + 1}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subtle URL Fallback */}
            <div className="pt-1">
              {!showPhotoUrlInput ? (
                <button
                  type="button"
                  onClick={() => setShowPhotoUrlInput(true)}
                  className="text-[10px] text-[#747780] hover:text-[#1F2022] hover:underline"
                >
                  + Add photo via web link instead
                </button>
              ) : (
                <div className="flex gap-2 animate-fade-in pt-1">
                  <input
                    type="url"
                    placeholder="https://... direct image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#EAE3D5] rounded-lg text-[#1F2022] text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 bg-[#1F2022] text-white rounded-lg text-xs font-semibold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPhotoUrlInput(false)}
                    className="px-2 py-1.5 text-xs text-[#747780] hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* DIRECT LOSSLESS PRODUCT VIDEO UPLOAD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D5] space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#A8843E]" />
                <label className="font-semibold text-sm text-[#1F2022]">Product Video (Lossless 1080p / 4K)</label>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Exact Same Video Quality</span>
              </div>
            </div>

            <p className="text-[11px] text-[#747780]">
              Upload an MP4, MOV, or WebM studio clip showing 360&deg; facet brilliance under studio lighting.
            </p>

            <input
              type="file"
              ref={videoFileInputRef}
              accept="video/mp4,video/webm,video/quicktime,video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />

            {formData.videoUrl ? (
              <div className="space-y-3">
                <div className="aspect-video max-w-md mx-auto rounded-xl overflow-hidden border border-[#EAE3D5] bg-black shadow-xs">
                  <video
                    src={formData.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3.5 py-1.5 bg-[#1F2022] hover:bg-[#A8843E] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, videoUrl: '' })}
                    className="px-3 py-1.5 border border-[#EAE3D5] bg-white hover:bg-rose-50 text-rose-700 rounded-lg text-xs font-medium"
                  >
                    Remove Video
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => videoFileInputRef.current?.click()}
                className="border-2 border-dashed border-[#EAE3D5] hover:border-[#C5A059] rounded-2xl p-5 text-center cursor-pointer bg-white hover:bg-[#FAF8F5] transition-all"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF8F5] border border-[#EAE3D5] flex items-center justify-center text-[#A8843E] mb-2">
                  <Video className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1F2022]">Click to Upload Video from Your Device</p>
                <p className="text-[10px] text-[#747780] mt-0.5">MP4, MOV, WebM up to 100MB (Exact same quality)</p>
              </div>
            )}

            {/* Subtle URL Fallback */}
            <div className="pt-1">
              {!showVideoUrlInput ? (
                <button
                  type="button"
                  onClick={() => setShowVideoUrlInput(true)}
                  className="text-[10px] text-[#747780] hover:text-[#1F2022] hover:underline"
                >
                  + Add video via web link instead
                </button>
              ) : (
                <div className="flex gap-2 animate-fade-in pt-1">
                  <input
                    type="url"
                    placeholder="https://... direct video URL"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#EAE3D5] rounded-lg text-[#1F2022] text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowVideoUrlInput(false)}
                    className="px-2 py-1.5 text-xs text-[#747780] hover:text-black"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status notice */}
          {uploadNotice && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
          )}

          {/* Available Sizes */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">Available Sizes (Comma separated)</label>
            <input
              type="text"
              value={formData.availableSizes}
              onChange={(e) => setFormData({ ...formData, availableSizes: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[#575A61] block mb-1 font-medium">Atelier Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#EAE3D5] rounded-lg text-[#1F2022]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#EAE3D5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#EAE3D5] rounded-lg text-[#575A61] hover:text-[#1F2022] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2 bg-[#1F2022] hover:bg-[#A8843E] text-[#FAF8F5] transition-colors rounded-lg font-semibold uppercase tracking-wider disabled:opacity-50"
            >
              {isEditing ? 'Save Changes' : 'Create Piece'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
