// EmotionForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './EmotionForm.css';

interface EmotionResponse {
  emotion: string;
  confidence: number;
}

const EmotionForm: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', { text });
      console.log('Backend response:', response.data);  
      setResult(response.data);
    } catch (err) {
      console.error('API call failed:', err);
      setError('Failed to analyze emotion. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="form-container">
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your reflection here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Analyzing...' : 'Submit'}
      </button>
    </form>

    {error && <p className="error-message">{error}</p>}

    {result && (
      <div className="result-card">
        <h3>Detected Emotion:</h3>
        <p>
          <strong>{result.emotion}</strong> (Confidence: {(result.confidence * 100).toFixed(1)}%)
        </p>
      </div>
    )}
  </div>
);

};

export default EmotionForm;
