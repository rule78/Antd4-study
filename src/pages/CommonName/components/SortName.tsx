
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import { fetchCategory } from '@/services/category';
import { MediumCategoryList, itemType } from '../data.d';

interface SortNameProps {
  onChange?: (fields: string) => void;
  value?: string;
  haveChild?: boolean;
  disabled?: boolean | undefined;
}

const Option = Select.Option;
const threeItemStyle = { width: 'calc(32% - 3px)', marginRight: 7 }
const fourItemStyle = { width: 'calc(23% - 3px)', marginRight: 6 }

const SortNameSelect: React.FC<SortNameProps> = props => {
  const [majoyCategoryList, setMajoyCategoryList] = useState<MediumCategoryList>([]);
  const [mediumCategoryList, setMediumCategoryList] = useState<MediumCategoryList>([]);
  const [minCategoryList, setMinCategoryList] = useState<MediumCategoryList>([]);
  const [childCategoryList, setChildCategoryList] = useState<MediumCategoryList>([]);
  const { value, onChange, haveChild, disabled } = props
  const formatValue = (type:itemType): string=>{
    if ( !value ){
      return '';
    }
    if ( type === 'majoy') {
      return ( majoyCategoryList.length > 0 ) ? value.substring(0,2): '';
    } else if (type === 'medium') {
      return ( mediumCategoryList.length > 0 && value.length >= 4 ) ? value.substring(0,4): '';
    } else if (type === 'min') {
      return ( minCategoryList.length > 0 && value.length >= 6 ) ? value.substring(0,6): '';
    }
      return ( childCategoryList.length > 0 && value.length === 8 ) ? value: '';
  }
  const handleFetchCategory = (type: itemType, val: string | undefined) => {
    fetchCategory({ parentCode: val }).then((data) => {
      const list: MediumCategoryList = data.content;
      if ( type === 'majoy') {
        setMajoyCategoryList(list);
      } else if (type === 'medium') {
        setMediumCategoryList(list);
      } else if (type === 'min') {
        setMinCategoryList(list);
      } else {
        setChildCategoryList(list);
      }
    }).catch(() => {
      message.error('获取类型失败');
    });
  }
  const handleFieldsChange = (type: itemType, code: string | undefined) => {
    if (code && onChange) {
      onChange(code);
    }
    if (type === 'majoy') {
      setMediumCategoryList([]);
      setMinCategoryList([]);
      setChildCategoryList([]);
      handleFetchCategory('medium', code);
    } else if (type === 'medium') {
      setMinCategoryList([]);
      setChildCategoryList([]);
      handleFetchCategory('min', code);
    } else if (type === 'min') {
      setChildCategoryList([]);
      handleFetchCategory('child', code);
    }
  }
  useEffect(()=>{
    handleFetchCategory('majoy', undefined)
    if ( value && value.length >= 2 ) {
      handleFetchCategory('medium', value.substring(0,2))
    } 
    if ( value && value.length >= 4 ) {
      handleFetchCategory('min', value.substring(0,4))
    } 
    if ( value && value.length >= 6 ) {
      handleFetchCategory('child', value.substring(0,6))
    } 
  }, [value]);
  const itemStyle = haveChild ? fourItemStyle: threeItemStyle;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={itemStyle}>
        <Select
          disabled={disabled}
          value={formatValue('majoy')}
          style={{ width: '100%' }}
          onChange={(val)=>handleFieldsChange('majoy', val)}
        >
          {majoyCategoryList.map(item => (
            <Option key={item.code} value={item.code || ''}>{item.name}</Option>
          ))}
        </Select>
      </div>
      <div style={itemStyle}>
        <Select
          value={formatValue('medium')}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={(val)=>handleFieldsChange('medium', val)}
        >
          {mediumCategoryList.map(item => (
            <Option key={item.code} value={item.code || ''}>{item.name}</Option>
          ))}
        </Select>
      </div>
      <div style={itemStyle}>
        <Select
          value={formatValue('min')}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={(val)=>handleFieldsChange('min', val)}
        >
          {minCategoryList.map(item => (
            <Option key={item.code} value={item.code || ''}>{item.name}</Option>
          ))}
        </Select>
      </div>
      {
        haveChild && <div style={{ width: 'calc(24% - 3px)'}}>
        <Select
          value={formatValue('child')}
          disabled={disabled}
          style={{ width: '100%' }}
          onChange={(val)=>handleFieldsChange('child', val)}
        >
          {childCategoryList.map(item => (
            <Option key={item.code} value={item.code || ''}>{item.name}</Option>
          ))}
        </Select>
        </div>
      }
    </div>
  )
}

export default SortNameSelect;
