import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

export default function TestSupabase() {
  const [results, setResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (message: string, isError = false) => {
    setResults(prev => [...prev, `${isError ? '❌' : '✅'} ${message}`]);
  };

  const testConnection = async () => {
    setResults([]);
    setTesting(true);

    // Test 1: Check environment variables
    addResult('Testing environment variables...');
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!url) {
      addResult('VITE_SUPABASE_URL is missing!', true);
      setTesting(false);
      return;
    }
    if (!key) {
      addResult('VITE_SUPABASE_ANON_KEY is missing!', true);
      setTesting(false);
      return;
    }
    addResult('Environment variables are set');

    // Test 2: Check Supabase client
    addResult('Testing Supabase client...');
    if (!supabase) {
      addResult('Supabase client is null!', true);
      setTesting(false);
      return;
    }
    addResult('Supabase client initialized');

    // Test 3: Test insert
    addResult('Testing database insert...');
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        rating: 5,
        comment: 'Test review - can be deleted',
        approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([testData])
        .select();

      if (error) {
        addResult(`Insert failed: ${error.message}`, true);
        addResult(`Error code: ${error.code}`, true);
        addResult(`Error details: ${JSON.stringify(error.details)}`, true);
        addResult(`Error hint: ${error.hint || 'none'}`, true);
      } else {
        addResult('Insert successful!');
        addResult(`Created review with ID: ${data?.[0]?.id}`);
        
        // Test 4: Test select
        addResult('Testing database select...');
        const { data: selectData, error: selectError } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', data[0].id);

        if (selectError) {
          addResult(`Select failed: ${selectError.message}`, true);
        } else {
          addResult(`Select successful! Found ${selectData?.length || 0} review(s)`);
        }
      }
    } catch (err: any) {
      addResult(`Exception: ${err.message}`, true);
      addResult(`Stack: ${err.stack}`, true);
    }

    setTesting(false);
  };

  return (
    <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
          
          <div className="mb-6">
            <Button onClick={testConnection} disabled={testing}>
              {testing ? 'Testing...' : 'Run Tests'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setResults([])} 
              className="ml-4"
            >
              Clear
            </Button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <div className="mb-2 font-semibold">Environment Variables:</div>
            <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</div>
            <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</div>
            <div className="mt-2">Supabase Client: {supabase ? '✅ Initialized' : '❌ Null'}</div>
          </div>

          {results.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Test Results:</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className={result.includes('❌') ? 'text-red-400' : ''}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This page is for testing only. After fixing issues, you can remove this route.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

