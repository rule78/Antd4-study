import React, { useState, useEffect, useCallback } from 'react';

interface reqProps {
    code: string;
    data: any;
}
type asyncFuncProps = ()=>Promise<any>

// Hook
const useAsync = (asyncFunction: asyncFuncProps, immediate = true) => {
    const [pending, setPending] = useState(false);
    const [value, setValue] = useState<reqProps|null>(null);
    const [error, setError] = useState<string|null>(null);
  
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
      setPending(true);
      setValue(null);
      setError(null);
      return asyncFunction()
        .then((response:reqProps) => setValue(response))
        .catch((error: string) => setError(error))
        .finally(() => setPending(false));
    }, [asyncFunction]);
  
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
      if (immediate) {
        execute();
      }
    }, [execute, immediate]);
  
    return { execute, pending, value, error };
  };

  export {
    useAsync
  }