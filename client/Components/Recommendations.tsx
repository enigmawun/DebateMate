import React, { useState } from 'react';

interface ParsedResponse {
  movieRecommendation: string;
}

const Recommendations = () => {
  const [userQuery, setUserQuery] = useState('');
  const [userTopMovies, setUserTopMovies] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [numRecalled, setNumRecalled] = useState(0);

  const handleSubmit = async (e: React.FormEvent, hasBeenCalled: boolean) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendation('');
    
    if (!hasBeenCalled) {
      setNumRecalled(0);
    } else {
      setNumRecalled(numRecalled + 1);
    }

      try {
      const response = await fetch('/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userTopMovies, 
            userQuery, 
            startYear, 
            endYear, 
            hasBeenCalled, 
            numRecalled }),
      });
     

      if (response.status !== 200) {
        const parsedError: { err: string } = await response.json();
        setError(parsedError.err);
      } else {
        const parsedResponse: ParsedResponse = await response.json();
        setRecommendation(parsedResponse.movieRecommendation);
      }
    } catch (_err) {
      setError('Error fetching recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={(e) => handleSubmit(e, false)}>
        <label>
          My top 5 movies are:
          <input
            type="text"
            value={userTopMovies}
            onChange={(e) => setUserTopMovies(e.target.value)}
            placeholder="Optional, for better recommendations"
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
        </label>
        <label>
          I want to watch a movie about:
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Enter movie summary"
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
        </label>
        <label>
          start year:
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="Enter start year"
            style={{ width: '20%', padding: '8px', marginTop: '8px' }}
          />
        </label>
        <label>
          end year
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="Enter end year"
            style={{ width: '20%', padding: '8px', marginTop: '8px' }}
          />
        </label>
        <button type="submit" style={{ marginTop: '16px' }} disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendation'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {recommendation && (
        <div style={{ marginTop: '24px' }}>
          <h2>Recommendation:</h2>
          <p>{recommendation}</p>
          
          <form onSubmit={(e) => handleSubmit(e, true)}>
            {/* <label>
              I want to watch a movie about:
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Enter movie summary"
                style={{ width: '100%', padding: '8px', marginTop: '8px' }}
              />
            </label>   */}
          <button type="submit" style={{ marginTop: '16px' }} disabled={loading}>
            {loading ? 'Loading...' : `I want a different recommendation`}
          </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default Recommendations;
