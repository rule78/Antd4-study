
import React, { useEffect, useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import router from 'umi/router';
import SearchForm from './components/SearchForm';
import FormModal from './components/FormModal';
import { queryCategorySub } from '@/services/category';
import { FormModalItem, TableListItem, categorySubParamsType } from './data.d';

const formatQueryCategorySub = (param: categorySubParamsType = {}): Promise<any> => {
  const { current, ...res } = param;
  const params = {
    pageNum : current || '',
    ...res,
  };
  return queryCategorySub(params).then(data => {
    const { number, content, totalElements, size } = data
    return {
      current: number,
      data: content,
      total: totalElements,
      pageSize: size,
    }
  });
}

const TableList: React.FC<{}> = () => {
  const [params, setParams] = useState<categorySubParamsType>({});
  const [modalData, setModalData] = useState<FormModalItem>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  useEffect(()=>{
    formatQueryCategorySub();
  }, []);
  useEffect(()=>{
    if(actionRef.current){
      actionRef.current.reload();
    }
 },[params]);
  const handleEdit = (item?: FormModalItem) => {
    if (item) {
      router.replace(`/commonName/edit/${item.code}`);
    } else {
      setModalData({});
      setModalVisible(true);
    }
  }
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编码',
      dataIndex: 'code',
    },
    {
      title: '子类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <span>
          <a onClick={()=>handleEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </span>
      )
    },
  ]
  const searchFormProps = {
    haveChild: false,
    parentCode: '',
    pageSize: 1,
    fetchList: setParams
  }
  const formModalProps = {
    values: modalData,
    modalVisible,
    onCancel: ()=>{setModalVisible(false);}
  }
  return (
    <PageHeaderWrapper>
      <SearchForm {...searchFormProps} />
      <div style={{marginTop: '10px'}}>
        <ProTable<TableListItem>
          headerTitle={<Button type="primary" onClick={()=>handleEdit()}>新建子类</Button>}
          actionRef={actionRef}
          rowKey="key"
          search={false}
          params={params}
          request={params=>formatQueryCategorySub(params)}
          columns={columns}
          rowSelection={{}}
        />
      </div>
      <FormModal {...formModalProps} />
    </PageHeaderWrapper>
  );
};

export default TableList;
