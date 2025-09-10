
import React, { useState, useCallback } from 'react';
import Card from './Card';
import Button from './Button';
import Spinner from './Spinner';
import { ModelSelection, EnvironmentSelection } from '../types';
import { GENDER_OPTIONS, ETHNICITY_OPTIONS, AGE_OPTIONS, ENVIRONMENT_OPTIONS } from '../constants';
import { fileToBase64, generateMarketingVisual } from '../services/geminiService';

const NewProjectWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [model, setModel] = useState<ModelSelection>({ gender: '', ethnicity: '', age: '', useAI: false });
  const [environment, setEnvironment] = useState<EnvironmentSelection>({ type: '', customPrompt: '' });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setProductImages(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setProductImagePreviews(previews);
      setSelectedImageIndex(0);
    }
  };

  const constructPrompt = useCallback(() => {
    let modelDesc = model.useAI
      ? 'an AI-suggested model that perfectly fits the product style'
      : [model.gender, model.ethnicity, model.age ? `aged ${model.age}` : '', 'model']
          .filter(Boolean)
          .join(' ');
    
    let envDesc = '';
    if (environment.type === 'Custom') {
      envDesc = environment.customPrompt;
    } else if (environment.type) {
      const presets = {
          'Studio': 'in a professional, minimalist studio with clean lighting',
          'Outdoor': 'in a vibrant outdoor city scene, like New York City or Tokyo',
          'Cultural': 'in a setting that reflects a specific cultural aesthetic, like a Moroccan riad or a Japanese garden'
      };
      envDesc = presets[environment.type] || '';
    }

    const prompt = `Create a photorealistic, high-fashion marketing image.
    Feature this product worn by a ${modelDesc}.
    The setting is ${envDesc}.
    The image should be visually stunning, with professional lighting and composition, suitable for an e-commerce website or social media campaign. Focus on making the product look appealing and desirable.`;
    
    setFinalPrompt(prompt);
  }, [model, environment]);

  const handleNextStep = () => {
    if (step === 3) {
      constructPrompt();
    }
    setStep(s => s + 1);
  };
  
  const handleGenerate = async () => {
    if (!productImages[selectedImageIndex] || !finalPrompt) {
      setError("Please ensure you have an image selected and a prompt ready.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
        const file = productImages[selectedImageIndex];
        const base64Image = await fileToBase64(file);
        const result = await generateMarketingVisual(base64Image, file.type, finalPrompt);
        setGeneratedImage(result.imageUrl);
    } catch (e: any) {
        setError(e.message || "An unknown error occurred.");
    } finally {
        setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Upload Product
        return (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Step 1: Upload Your Product</h3>
            <div className="p-8 border-2 border-dashed border-dark-border rounded-lg text-center">
                <input type="file" id="file-upload" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                <label htmlFor="file-upload" className="cursor-pointer text-brand-light-purple font-semibold">
                    {productImages.length > 0 ? `${productImages.length} image(s) selected` : 'Choose 2-3 images'}
                </label>
                <p className="text-sm text-dark-text-secondary mt-2">PNG, JPG, WEBP up to 10MB</p>
            </div>
            {productImagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {productImagePreviews.map((src, index) => (
                        <img key={index} src={src} className={`w-full h-32 object-cover rounded-md cursor-pointer border-2 ${selectedImageIndex === index ? 'border-brand-purple' : 'border-transparent'}`} onClick={() => setSelectedImageIndex(index)} />
                    ))}
                </div>
            )}
          </Card>
        );
      case 2: // Select Model
        return (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Step 2: Describe Your Model</h3>
            <div className="space-y-4">
                <div className="flex items-center">
                    <input type="checkbox" id="ai-model" checked={model.useAI} onChange={(e) => setModel({...model, useAI: e.target.checked})} className="h-4 w-4 rounded border-dark-border text-brand-purple focus:ring-brand-purple bg-dark-bg" />
                    <label htmlFor="ai-model" className="ml-2">Let AI suggest the best model</label>
                </div>
                {!model.useAI && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select value={model.gender} onChange={(e) => setModel({...model, gender: e.target.value as any})} className="bg-dark-bg border border-dark-border rounded-md p-2 w-full">
                            <option value="">Select Gender</option>
                            {GENDER_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                         <select value={model.ethnicity} onChange={(e) => setModel({...model, ethnicity: e.target.value as any})} className="bg-dark-bg border border-dark-border rounded-md p-2 w-full">
                            <option value="">Select Ethnicity</option>
                            {ETHNICITY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                         <select value={model.age} onChange={(e) => setModel({...model, age: e.target.value as any})} className="bg-dark-bg border border-dark-border rounded-md p-2 w-full">
                            <option value="">Select Age</option>
                            {AGE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                )}
            </div>
          </Card>
        );
      case 3: // Select Environment
        return (
          <Card>
            <h3 className="text-xl font-semibold mb-4">Step 3: Choose an Environment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[...ENVIRONMENT_OPTIONS, 'Custom'].map(o => (
                    <button key={o} onClick={() => setEnvironment({...environment, type: o as any})} className={`p-4 border-2 rounded-lg text-center ${environment.type === o ? 'border-brand-purple' : 'border-dark-border'}`}>
                        {o}
                    </button>
                ))}
            </div>
            {environment.type === 'Custom' && (
                <textarea value={environment.customPrompt} onChange={(e) => setEnvironment({...environment, customPrompt: e.target.value})} placeholder="e.g., A futuristic cyberpunk city at night with neon lights" className="w-full bg-dark-bg border border-dark-border rounded-md p-2" rows={3}></textarea>
            )}
          </Card>
        );
      case 4: // Generate & Refine
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <h3 className="text-xl font-semibold mb-4">Step 4: Generate & Refine</h3>
                <p className="text-dark-text-secondary mb-2">Review the final prompt. You can edit it before generating.</p>
                <textarea value={finalPrompt} onChange={(e) => setFinalPrompt(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-sm" rows={8}></textarea>
                <Button onClick={handleGenerate} className="w-full mt-4" disabled={isLoading}>
                    {isLoading ? <Spinner /> : 'Generate Image'}
                </Button>
            </Card>
            <Card className="flex items-center justify-center">
                {isLoading && (
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-2 text-dark-text-secondary">Generating your masterpiece...</p>
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {generatedImage && <img src={generatedImage} alt="Generated visual" className="rounded-lg max-h-96" />}
                {!isLoading && !generatedImage && (
                  <div className="text-center text-dark-text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="mt-2">Your generated image will appear here.</p>
                  </div>
                )}
            </Card>
          </div>
        );
    }
  };

  const isNextDisabled = () => {
      if(step === 1 && productImages.length === 0) return true;
      if(step === 2 && !model.useAI && (!model.gender || !model.ethnicity || !model.age)) return true;
      if(step === 3 && (!environment.type || (environment.type === 'Custom' && !environment.customPrompt))) return true;
      return false;
  }

  return (
    <div className="p-8">
      {renderStep()}
      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => setStep(s => s - 1)} disabled={step === 1}>
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={handleNextStep} disabled={isNextDisabled()}>
            Next
          </Button>
        ) : (
          generatedImage && <Button>Download Image</Button>
        )}
      </div>
    </div>
  );
};

export default NewProjectWizard;
