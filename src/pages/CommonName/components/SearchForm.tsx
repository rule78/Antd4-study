
import React, { useEffect, useState  } from 'react';
import { Form, message, Card } from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import { fetchCategory } from '@/services/category';
import { SearchFormProps, MediumCategoryList, FieldData, itemType } from '../data.d';

interface FormProps {
  onChange?: (fields: FieldData[]) => void;
}

interface SingleTagSelectProps {
  onChange?: (fields: string[]) => void;
  value?: string[];
  optionList: MediumCategoryList;
}

const SingleTagSelect: React.FC<SingleTagSelectProps> = props => {
  const filterSingle = (arr: string[]) => {
    if (arr.length <= 1) return arr;
    arr.shift();
    return arr;
  };
  const handleChange = (value: string[]) => {
    if (props.onChange) {
      props.onChange(filterSingle(value));
    }
  };
  return (
    <TagSelect className="" hideCheckAll Option={{}} value={props.value} onChange={handleChange}>
      {
        props.optionList.map((i) => {
          return <TagSelect.Option key={i.code} value={i.code}>{i.name}</TagSelect.Option>
        })
      }
    </TagSelect>
  )
}

const SearchForm: React.FC<SearchFormProps & FormProps> = props => {
  const [majoyCategoryList, setMajoyCategoryList] = useState<MediumCategoryList>([]);
  const [mediumCategoryList, setMediumCategoryList] = useState<MediumCategoryList>([]);
  const [minCategoryList, setMinCategoryList] = useState<MediumCategoryList>([]);
  const [childCategoryList, setChildCategoryList] = useState<MediumCategoryList>([]);
  const [fields, setFields] = useState<FieldData[]>([]);
  const { fetchList, haveChild } = props;
  const [form] = Form.useForm();

  const handleFetchCategory = (type: itemType, parentCode?: string) => {
    fetchCategory({ parentCode }).then((data) => {
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

  useEffect(()=>handleFetchCategory('majoy'), []);

  const formatCode = (type: itemType, allFields: FieldData[]): string => {
    const Item = allFields.find(i => i.name[0] === type) || { name: '' }
    return Item.value ? Item.value[0] : '';
  }

  const handleFieldsChange = (changedFields: FieldData[], allFields: FieldData[]): void => {
    if (!changedFields[0]) {
      return;
    }
    const type = changedFields[0].name[0];
    const code = formatCode(type, allFields);
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
    setFields(allFields);
    fetchList({parentCode: code});
  }
  return (
    <Card bordered={false}>
      <Form
        name="searchForm"
        layout="inline"
        form={form}
        fields={fields}
        onFieldsChange={handleFieldsChange}
      >
        {
          majoyCategoryList.length > 0 && <StandardFormRow title="大类" block>
            <Form.Item name="majoy">
              <SingleTagSelect optionList={majoyCategoryList} />
            </Form.Item>
          </StandardFormRow>
        }
        {
          mediumCategoryList.length > 0 && <StandardFormRow title="中类" last>
            <Form.Item name="medium" >
              <SingleTagSelect optionList={mediumCategoryList} />
            </Form.Item>
          </StandardFormRow>
        }
        {
          minCategoryList.length > 0 && <StandardFormRow title="小类" block>
            <Form.Item name="min">
              <SingleTagSelect optionList={minCategoryList} />
            </Form.Item>
          </StandardFormRow>
        }
        {
          haveChild && childCategoryList.length > 0 && <StandardFormRow title="子类" last>
            <Form.Item name="child" >
              <SingleTagSelect optionList={childCategoryList} />
            </Form.Item>
          </StandardFormRow>
        }
      </Form>
    </Card>
  );
};

export default SearchForm;
