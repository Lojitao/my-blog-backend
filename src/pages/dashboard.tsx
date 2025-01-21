import { useApi } from '../context/ApiContext'; // 引入全局 API 的 Hook
import { useEffect,useState } from 'react';
import { Space, Table, Modal, Button, Form, Input, message } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type ActionType = "add" | "edit" | "preview" | "delete";

export const DashboardRoute = () => {
  const api = useApi(); // 全局 API

  useEffect(() => {
    const fetchData = async () => {
      await loadList();
    };
    fetchData();
  }, []);

  const [list, setList] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null); // 初始值为 null

  const [form] = Form.useForm(); // 创建表单实例

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '文章類別名稱',
      dataIndex: 'name',
    },
    {
      title: '新增日期',
      dataIndex: 'createdAt',
    },
    {
      title: '更新日期',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handlePreviewOrEdit(record,'preview')}>檢視</a>
          <a onClick={() => handlePreviewOrEdit(record,'edit')}>編輯</a>
          <a onClick={() => handleDelete(record)}>刪除</a>
        </Space>
      ),
    },
  ];
  
  // 列表讀取
  async function loadList(){
    const query = {
      currentPage:1,
      pageSize:10,
      name:"",
    }
    const response = await api.blogCategory.getList(query);
    const {data} = response
    setList(data)
  }
  
  async function handlePreviewOrEdit(item:DataType,action:ActionType){
    const response = await api.blogCategory.getDataById(item.id); 
    const {data,status} = response
    if(status===200){
      setSelectedRow(item)// 儲存當前選中的row
      setCurrentAction(action)
      setIsModalVisible(true);
      form.setFieldsValue({ name: data.name }); // 动态设置表单值
    }
  }

  const getModalTitle = () => {
    switch (currentAction) {
      case "add":
        return "新增";
      case "edit":
        return "編輯";
      case "delete":
        return "刪除";
      case "preview":
          return "檢視";
      default:
        return "操作";
    }
  };

  function handleDelete(item:DataType){
    Modal.confirm({
      title: "確認刪除",
      content: `您確定要刪除文章類別 "${item.name}" 嗎？`,
      okText: "確認",
      cancelText: "取消",
      onOk: async () => {
        try {
          await api.blogCategory.deleteDataById(item.id); // 调用删除接口
          message.success(`文章類別 "${item.name}" 刪除成功！`);
          await loadList(); // 刷新列表
        } catch (error) {
          console.error("刪除失敗：", error);
          message.error("刪除失敗，請稍後再試！");
        }
      },
      onCancel: () => {
        message.info("已取消刪除操作");
      },
    });
  }

  // 開啟Modal
  const showModal = (action:ActionType) => {
    setCurrentAction(action)
    setIsModalVisible(true);
  };

  // 關閉Modal並清除相關值
  function resetAll(){
    setIsModalVisible(false);//關閉Modal
    setCurrentAction(null)//將操作動作reset為null
    form.resetFields();//重置表单
  }

  //提交表单
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // 验证表单
      let response:any; // 用來存儲 API 的響應結果
  
      if(currentAction==='add') response = await api.blogCategory.add({name:values.name})
      if(currentAction==='edit') response = await api.blogCategory.update(selectedRow?.id,{name:values.name})

      if (response && (response.status === 200 || response.status === 201)) {
        message.success(`${currentAction==='add'?'新增':'編輯'}成功`);
        loadList()
        resetAll()
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => showModal("add")}>
        新增
      </Button>

      <Modal
        title={`${getModalTitle()}彈窗`}
        open={isModalVisible}
        onOk={handleOk} // 点击确认时触发提交逻辑
        onCancel={resetAll}
        okText="送出"
        cancelText="取消"
        footer={
          currentAction === "preview"
            ? [
                <Button key="cancel" onClick={resetAll}>取消</Button>,
              ]
            : [
                <Button key="cancel" onClick={resetAll}>取消</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>送出</Button>
              ]
        }
      >
        <Form form={form} layout="vertical" name="addForm">
          <Form.Item
            label="文章類別名稱"
            name="name"
            rules={[
              { required: true, message: "Please input the name!" },
              { min: 3, message: "Name must be at least 3 characters!" },
            ]}
          >
            <Input placeholder="Enter name" disabled={currentAction==='preview'}/>
          </Form.Item>
        </Form>
      </Modal>

      <Table<DataType> rowKey="id" columns={columns} dataSource={list} />
    </>
  );
};

// export default DashboardRoute