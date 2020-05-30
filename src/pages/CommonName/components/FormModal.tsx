import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { TableListItem, FormModalItem } from '../data.d';
import SortNameSelect from './SortName';

interface CreateFormProps {
  values: FormModalItem;
  modalVisible: boolean;
  onCancel: () => void;
}

export interface FormValueType extends Partial<TableListItem> {
  lastModifiedDate?: number;
}

const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 24 },
};

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, onCancel, values } = props;
  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue(values)
  }, [values]);
  return (
    <Modal
      destroyOnClose
      title="新增子类"
      width={580}
      visible={modalVisible}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        layout='vertical'
      >
        <FormItem
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="code"
          label="所属类别"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <SortNameSelect haveChild/>
        </FormItem>
        <FormItem
          name="sort"
          label="末两位编号"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="remark"
          label="描述"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
