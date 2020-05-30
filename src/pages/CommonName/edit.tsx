import React, { useEffect, useState } from 'react';
import { Card, Form, Input, message, Col, Row } from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DescriptionList from '@/components/DescriptionList';
import SortNameSelect from './components/SortName';
import { queryCategoryInfo } from '@/services/category';
import { useCategoryName } from '@/hooks/category'

interface params {
  code: string
}
interface EditProps {
  match: {
    params: params
  }
}
interface DescriptInfo {
  code? : string,
  name : string,
  sort? : string,
  remark? : string,
  createdBy : string,
  createdDate: string,
  lastModifiedBy? : string,
  lastModifiedDate : number | undefined
}
const Description = DescriptionList.Description
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

const formLayout = {
  xs: 23, sm: 22, md: 20, lg: 17, xxl: 14
}
const Edit: React.FC<EditProps> = props => {
  const [descriptInfo, setDescriptInfo] = useState<DescriptInfo>({
    name : '',
    remark : '',
    createdBy : '',
    createdDate: '',
    lastModifiedBy : '',
    lastModifiedDate : undefined,
  });
  const { params: { code } } = props.match
  const { createdBy, createdDate, } = descriptInfo
  const { value: typeName } = useCategoryName(code, true);
  const [form] = Form.useForm();

  useEffect(() => {
    queryCategoryInfo(code).then(res => { 
      setDescriptInfo(res);
      form.setFieldsValue(res);
    }).catch(() => {
      message.error('获取通用名详情失败');
    });
  }, []);
  const DescriptionEle =
    <DescriptionList size="small" col={2} layout='horizontal'>
      <Description term="创建人">{createdBy || '--'}</Description>
      <Description term="创建时间">
        {createdDate ? moment(createdDate).format('YYYY-MM-DD') : '--'}
      </Description>
      <Description term="所属类别">
        {typeName}
      </Description>
      <Description term="通用名总数">{'--'}</Description>
    </DescriptionList>
  return (
    <PageHeaderWrapper title={'编辑子分类'} content={DescriptionEle}>
      <Card title="基本信息">
        <Form
          name="validate_other"
          form={form}
          {...formItemLayout}
        >
          <Row>
            <Col {...formLayout}>
              <FormItem
                name="name"
                label="名称"
                rules={[{ required: true, message: '请输入名称！' }]}
              >
                <Input placeholder="请输入子分类名称" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...formLayout}>
              <FormItem
                name="code"
                label="分类"
              >
                <SortNameSelect haveChild disabled/>
              </FormItem>
            </Col>
          </Row>
          <Col {...formLayout}>
          <FormItem
            name="remark"
            label="描述"
          >
            <Input placeholder="分类描述" />
          </FormItem>
          </Col>
        </Form>
      </Card>
      <Card title="通用名列表" style={{ marginTop: 10 }}>卡片内容</Card>
    </PageHeaderWrapper>
  );
};

export default Edit;
