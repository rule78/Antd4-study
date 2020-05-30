import { useState, useEffect, useCallback } from 'react';
import { queryCategoryInfo } from '@/services/category';

const useCategoryName = (value: string, immediate = true): any => {
  const [majoyName, setMajoyName] = useState<string>('--');
  const [mediumName, setMediumName] = useState<string>('--');
  const [minName, setMinName] = useState<string>('--');
  const [childName, setChildName] = useState<string>('--');
  const execute = useCallback(() => {
    if (value.length >= 2 && immediate) {
      queryCategoryInfo(value.substring(0, 2)).then(res => {
        setMajoyName(res.name);
      })
    }
    if (value.length >= 4 && immediate) {
      queryCategoryInfo(value.substring(0, 4)).then(res => {
        setMediumName(res.name);
      })
    }
    if (value.length >= 6 && immediate) {
      queryCategoryInfo(value.substring(0, 6)).then(res => {
        setMinName(res.name);
      })
    }
    if (value.length === 8 && immediate) {
      queryCategoryInfo(value).then(res => {
        setChildName(res.name);
      })
    }
  }, [value]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, value: `${majoyName}/${mediumName}/${minName}/${childName}` };
}

export {
  useCategoryName
}